const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const path = require('path')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    // 通过 http 请求的方式向 webpack-dev-server 去请求这个template
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(e => reject(e))
    })
} 

const Module = module.constructor

const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err,stats) => {
    // 监听 webpack 的 entry 下的所有依赖文件的变化
    console.log('监听到了变化')
    if(err) throw err;
    // stats 是一个对象，webpack打包过程中输出的东西（打包过程中，依赖文件，输出的文件）。
    stats = stats.toJson() 
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf-8')
    const m = new Module()
    m._compile(bundle, 'server-entry.js')
    serverBundle = m.exports.default
})

module.exports = function(app) {
    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }))
    app.get('*', function(req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->', content))
        })
    })
}