## 前端技术选型

多页应用特征：

* 内容都由服务端用模板生成
* 每次页面跳转都要经过服务端
* JavaScript 更多只是做做动画

多页应用常用的类库：

* jQuery： 对原生DOM 的 API 做了一定的封装。解决了原生DOM使用不方便的问题和原生DOM跨浏览器兼容的问题
* mootools： 类似于 jQuery 对原生的DOM进行了封装而且还扩展了很多的DOM的API。修改的原生JavaScript对象的prototype里很多的方法，使我们使用起来更方便。问题： 修改了原生对象，可能带来一些兼容性问题。
* YUI: 比较老牌，出现在 jQuery 之前。用得很少。

多页应用上，无特定前端工具，前端跟后端配合。也出现了不太好用的工具 `grunt` 和 `gulp` ，可以把 `gulp` 理解为 `grunt ` 的简化版。通过提前注册好任务，然后去跑这些任务，方便了我们的使用。目前已经被 `npm script` 代替了。

多页应用时代，js 的代码量很少，故没有使用 模块化工具。后来才出现了 seajs（支付宝公司）、requirejs。

多页应用下静态文件的处理：使用 gulp 或 grunt 等工具手动编译到 html 中，自由度低。操作复杂，或者甚至不处理，交给后端，让后端服务处理

**单页应用**

特征： 

* 所有内容都在前端生成，后端不需要提供模板引擎了，只需要提供一个json数据请求的接口。
* JS 承担更多的业务逻辑，后端只提供API
* 页面路由跳转不需要经过后端。

常用类库：

* React：使用 JSX 来书写页面。每个组件都是用 `class` 定义的。
* Vue：使用 `.vue` 文件的开发模式，且支持引入vue.js 文件来做局部的使用
* Angluar：使用 typescript 来开发。有非常多超前的理念。
* backbone.js 抽象了传统前端的事件监听机制。经典的ＭVC模式。

vue 天生支持双向绑定，而 react 天生是单向数据流。

架构工具：

* npm
* bower
* jspm

模块化工具：

* webpack: 打包前端任何形式的静态文件。
* rollup
* browserify： 有点过时了。

处理静态文件：

静态文件可以直接在 JS 代码中进行引用，并且交由模块化工具转化成线上可用的静态资源，并且可以定制转化工程以适应不同的需求场景。

技术选型的其他考虑因素：

* 浏览器兼容性

* toB（面向商业） 还是 toC（面向普通用户）
* 移动端还是 PC 端，分辨率和网络速度

## WebApp 架构简介

**工程架构**：

* 解放生产力，我们只需关注业务逻辑的开发，不用关心文件夹的组织，代码的打包，浏览器的刷新。这些重复性的劳动我们都不用关心，交由工程架构来负责。
  * 源代码预处理（编译）
  * 自动打包，自动更新页面
  * 自动处理图片依赖，保证开发和正式环境的统一（包括图片依赖，图片长缓存的版本名控制）
* 围绕解决方案搭建环境。每个不同的框架（如 vue、react、angular） 的开发模式可能都不同。让编译过程自动的去完成。
  * 不同的前端框架需要不同的运行架构
  * 预期可能出现的问题并规避
* 保证项目质量。代码的规范性。ESLint。
  * code lint 规法代码的写法
  * 不同环境（不同操作系统写的代码）之间提交的代码排除差异 `.editorconfig` 文件
  * `git commit` 预处理。强制 `git commit `之前强制做代码的 eslint 检测。

**项目架构**：

业务代码如何去组织。

* 技术选型
* 数据解决方案。如 redux、mobx
* 整体代码风格。整体代码组织的层面。哪些东西需要存在 mobx里，哪些数据只需存在页面里面。目录结构的组织

## web开发中常用的网络优化

优化方法：

* 合并资源文件，减少 HTTP 请求。（浏览器对于并发的http请求数量是有限制的。）

* 压缩资源文件，减少请求的大小

* 合理利用缓存机制`cache-control`，尽可能使用缓存减少请求。缓存的更新机制。打包的时候，根据文件的内容计算出来一串hash值。这串hash值用来标识文件内容有无变化。文件名以hash值结尾。

## Webpack 基础配置

> webpack is a module bundler for modern javascript applications

这是 webpack官方的介绍，一个为现代 JS 应用诞生的模块打包器。但其实 webpack 不仅仅用来打包 JS，css,、图片、字体、神之石你自己发明的东西你都可以用 webpack 来打包。前端应用中用得到的所有资源都可以用 webpack 来打包。

下面是一个 webpack 的 demo：

* 新建一个 webpack-demo 文件夹

* 进入 webpack-demo 文件夹，npm init 生成 package.json 文件
* npm install webpack, react
* 在 webpack-demo 下新建一个 build 文件夹。build 文件夹下放一些 webpack 的 config 文件，以及其他的一些脚本文件。
* 在 webpack-demo 下新建一个 client 文件夹。下面放我们前端应用的文件。
* 在 client 文件夹下 新建一个  app.js 文件（应用入口）和一个 App.jsx 文件（声明我们整个页面的内容）。
* 在根目录下的 build 文件，新建一个 webpack.config.js 文件。

```javascript
const path = require('path') // path 这个包是用来帮我们生成绝对路径的。
module.exports = {
    entry: {
        app： path.join(__dirname, '../client/app.js')
    }，
    output： {
    	filename: '[name].[hash].js'，
    	path： path.join(__dirname, '../dist/'),
    	publicPath: '/public'
	}
}
```

* 在 `package.json` 中的 `scripts` 字段中写一条：

  ```javascript
  "build": "webpack-cli --config build/webpack.config.js"
  ```

* 在命令行下执行 `npm run build` 即可执行打包

有时候 entry 可以指定多个，即一个项目有多个入口，webpack 会从这几个入口出发向下去寻找依赖，并进行打包。多个入口可能出现入口之间依赖了相同的文件，如果不作专门的配置的话，webpack只会从入口文件出发一层层的寻找依赖，最后有几个入口文件，就会生成几个出口文件。如果入口之间依赖了相同的文件，那么打包之后这些相同的文件也会出现在各个出口文件中。这就造成了代码的冗余和重复。

output 中的 filename 中的 `[name]` 只一个变量，对应与 `entry` 中的名字（entry 对象中键值对的键名）,` [hash] `  就是一个用来标识文件内容的一个 hash 值。

**这里的hash好像是不本次操作的hash，不是内容的hash，目前这一点存疑**

`publicPath` 就是一个静态资源引用的一个路径。这个 `publicPath` 可以为项目中的所有资源指定一个基础路径。

* `publicPath: ''`  publicPath 为 '' (为空的话)， 在html上面生成的 `script` 标签路径为 `/app.hash.js/`
* 指定 `publicPath： 'public'`  ，在html上面生成的script标签的路径为 `/public/app.hash.js`

**publicPath ** 是加在我们引用的js文件路径前面。帮我们去区分一个url是静态资源还是 api 请求。（后端的概念），方便我们后端去做一些区分。如果我们的静态资源是部署到CDN上，对于静态资源我们可以把它的 `publicPath` 直接写 CDN 的域名。方便我们直接在html中引用放在CDN上的资源。

下面来书写 `App.jsx` 代码：

```javascript
import React from 'react'

export default class App extends React.Component {
    render() {
        return (
        	<div>This is App.jsx</div>
        )
    }
}
```

`app.js`: 

`react-dom` ：是用来把 `react` 组件渲染到 `dom` 里面用的。类似还有其他工具如 `react-native` 是用来把 `react` 组件渲染到手机app里面的。

app.js 引用了 `React` 是为了支持 JSX 语法的书写。

```javascript
// app.js
import ReactDom from 'react-dom'
import React from 'react'
import App from './App.jsx'

ReactDom.render(<App />, document.body)
```

在 `webpack.config.js` 中增加一点东西，增加我们对 `jsx` 文件的支持。

```javascript
const path = require('path')

module.exports = {
    entry: {}， // 同上次
    ouput: {},  // 同上次，
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },{
                test: /.js$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, '../node_modules')
            }
        ]
    }
}
```

`babel-loader` 不仅仅支持 `es6` 的编译，也支持 `jsx` 的编译。

```shell
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
# babel-core 是 babel 的核心代码
```

另外 `babel-loader` 也需要配置，因为 `babel-loader` 默认只支持 es6 的语法，需要通过配置文件来支持 `jsx` 的语法。我们在项目根目录下新建一个 `.babelrc` 的文件。

```
{
    "presets": [
            "@babel/preset-env", "@babel/preset-react"
        ]
}
```

`presets` 英文意思为： 预先布置；实现调整；预先决定；实现安排；这里指babel要支持哪些语法。因为 `babel` 可以支持的编译的语法很多，没必要每次把所有的支持都包含进来。故先安装 `babel-core` 这个通用核心部件，在指定耳和安装具体支持哪些语法。`loose` 表示`松散` 不严格的意思。

```shell
npm install -D babel-preset-es2015  babel-preset-es2015-loose babel-preset-react
```

**只有安装了babel支持相关语法特性的包，已经在 .babelrc 配置文件中指定了要支持的语法，才可以跑通对 .jsx 文件的编译**

```shell
npm install html-webpack-plugin -D
```

在 `webpack.config.js `中引入一下 `html-webpack-plugin` 插件

```javascript
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        
    },
    output: {
        
    }, 
    mode: 'development',
    module: {rules: []},
    plugins: [
        new HTMLPlugin()
    ]
}
```

`html-webpack-plugin` 插件用来生成一个 html 页面，并把 webpack 打包后生成的文件注入到这个 html 文件中。

**只要 .js 文件中需要写 jsx 代码，就需要 import react**

## webpack 知识点集

帮助处理 javascript 越来越负责，社区提出了一些方法来处理这个问题：

* javascript 的模块化（module），把大的 javascript 文件分开，不同的功能的 javascript 放到不同的而文件中。
* 预处理或者预编译（pre-processor），可以把现阶段浏览器不支持的语言比如 coffescript，es6 等等便已成为 ‘ 原生 ’ 的 javascript

尽管这些方法非常有帮助，但是相应的我们在开发阶段需要多引入一个步骤 `打包和编译`。 这就需要使用到 webpack。

webpack 是一个模块打包工具，一个可以自动分析项目的文件结构，寻找 javascript 的 module，和其他的资源比如css, 图片等等，来打包供给浏览器使用。

## 服务端渲染基础配置

会什么会出现服务端渲染？

 因为单页应用存在的问题。现在的web app 开发中，用的很多的框架都是在浏览器端渲染html内容。

* SEO 不友好。搜索引擎只会爬出html代码，不会执行页面中的js代码。传统的浏览器端渲染拿到的只是一个空白的html页面。

* 首次等待的时间较长。体验不好。需要等 js 代码执行完毕之后才能看到页面的内容。

服务端渲染，即在 node.js 环境下，将 react 组件渲染到一个html页面中。然会服务器返回这个 html页面。

**webpack 不同于 grunt、gulp 等任务执行工具和打包工具**，它本身严格来说并不是一个打包工具，它依赖很多的 loader 和 plugins 。

* grunt 和 gulp 来实现打包，它是按照配置的要求来寻找相应的文件，然后编译和打包。
* webpack却是整体的分析这个项目，获得整体的依赖关系，然后根据不同的资源采用相应的 loader 来进行编译和打包。

`package.json` 是一个空的 nodejs 的包依赖关系氢弹，类似于 rails 的 gamfile，通过 `npm init` 来初始化一个 package.json.

**webpack 需要你指定一个输入文件（entry file），然后 webpack通过这个输入文件来分析整个项目，然后打包为一个最终的文件。**

**产生source map**

webpack 有一个非常重要的配置参数，可以在开发的时候产生相当有帮助和重要的信息 `source map`

当我们把所有的文件都打包到一个文件中，在浏览器中调试，是不是非常不爽，不知道在源码中那个文件的哪行出了bug，在加上如果有编译的过程就更苦逼了。`source map` 的作用就是解决这个困境的，就是在浏览器中出现问题时，能够自动映射到源文件中，知道是哪个文件的哪一行出了问题。

在 webpack 配置object中是通过 devtool 来设置 source map 的，这里有几个选择：

 * source-map 这个是产生一个完整的 source-map,这个选项的效果最好，但是它会降低 build 的效率
 * cheap-module-source-map 这个选项也是单独产生一个 source map 文件，但是去掉了具体的列信息，所以会降低调试的方便，却提高了 build 的效率。
 * eval-source-map bundle 源代码就是利用 `eval` ，source map 完整的和 bundle 的结果在同一个文件中。这个有很好的调试效果，同时不影响 build 的效率，但是可能会有执行效率和安全性的确定吗，但是在开发过程中是一个很好的选择
 * cheap-module-eval-source 这个是 build 效率最高的方式，he eval-source-map 相似，但是缺掉了具体的列信息。和 eval-source-map 相似，它有执行效率和安全性的缺点，所以不适用于生产环境中。

正如你看到的一样，这四个选项从上而下 build 的速度越来越快，但是越上面的越产生没有缺点的source map。

特别在中小型的项目中， eval-source-map 是一个不错的选择，它 build 的效率比较高，同时调试比较方便。同时我们可以写一个专门用于生产环境的 webpack 配置文件。

## webpack development server 概述

`webpack development server` 是一个 webpack 可选的本地开发的 server 。他通过 nodejs 的 express 来起一个 server 提供静态文件服务，同时它根据配置信息来打包资源，存在内存中，同时当你的代码发生改变的时候，他还可以刷新你的浏览器。它是一个单独的 npm module， 通过 `npm install webpackk-dev-server -D` 来给项目安装依赖。

`webpack dev server` 可以通过 webpack.config.js 的 `devServer` 选项来配置，具体配置包括：

* contentBase : 默认 `webpack dev server` 是从项目的根目录提供静态资源服务。如果要从不同的目录提供服务，可以通过 contentBase 来配置。
* port： 默认 webpack 是用 8080 端口启动，通过 port可以配成其他的端口。
* inline： 设置为 true，代码有变化，浏览器刷新。
* colors： 当 server 跑的时候，terminal 输出带颜色。
* historyApiFallback： 对于单页面程序，浏览器的 brower history 可以设置成 `html5 history api` 或者 `hash`。如果使用为 `html5 history api` 的，如果刷新浏览器会出现 `404 not found` 。`historyApiFallback` 在开发单页应用时非常有用，他依赖于 `HTML5 history API`。如果设置为 `true` ，所有的跳转都指向 index.html。即所有手动刷新失败（返回404）的操作都返回首页。

#### loaders

webpack 通过 loader 来加载各种各样的资源，不同的资源应用不同的 loader。loaders 是通过单独的 npm 来安装的，然后再 webpack.config.js 中通过 module 来配置。loader的配置包括：

 * test： 一个正则表达式，用于检测不同的文件的后缀名，然帮配置不同的loader。
 * loader: loader 的名字，比如 'babel-loader'
 * include / exclude: 一个选项来配置哪些目录和文件需要排除掉或加上
 * query： 这个 query setting 可以传递不同的参数给 loader。为loaders提供额外的设置选项（可选）

**babel**

babel 是一个编译 javascript的工具，它可以实现：

1. 让你用下一代javascript来写代码
2. 可以使用javascript的扩展语法，比如 react jsx

**babel 的安装和配置**

babel 是一个模块化的并且分发到不同的 npm moudles。核心功能包 `babel-core` ,但是对于一些其他的功能和扩展要单独安装。（最常用的是 `babel-preset-es2015` 和 `babel-preset-react` 分别用来支持es6和react jsx）。

```shell
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```

**CSS module**

被称为 `CSS modules` 的技术意在把 JS 的模块化思想带入 CSS 中来。通过 CSS 模块，所有的类名，动画名默认都只作用于当前模块。Webpack 对 CSS 模块化提供了非常好的支持，只需在 CSS loader 中进行简单配置即可，然后就可以直接把 CSS 的类名传递到组件的代码中，这样做有效避免了全局污染。

```javascript
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用 css modules
                            localIdentName: '[name]__[local]-[hash:base64:5]' // 指定css 的类名格式
                        }
                    }
                ]
            }
        ]
    }
}
```

我们在 app 文件夹下创建一个 `Greeter.css` 文件来测试一下：

```css
/* Greeter.css */
.root {
    background-color: #eee;
    padding: 10px;
    border: 3px solid #ccc;
}
```

导入 `.root` 到 Greeter.js 中

```javascript
import React, {Component} from 'react';
import styles from './Greeter.css';

class Greeter extends Component{
    render() {
        return (
        	<div className={styles.root}> // 使用cssModule 添加类名的方法
            	this is my test
            </div>
        )
    }
}
export default Greeter
```

最后生成的class名字：`Greeter__root__16xre`

#### webpack 中常用的插件

1. HtmlWebpackPlugin

   这个插件的作用就是依据一个简单的 index.html 模板，生成一个自动引用了你打包后的 JS 文件的新 `index.html`。 这在每次生成的 js 名称不同时非常有用（比如添加了 hash 值）。

2. Hot Module Replacement

   `Hot Module Replacement` ( HMR ) 也是 webpack 里很有用的一个插件，他允许你在修改组件代码后，自动刷新实时预览后的效果。

   在 webpack 中实现 HMR 也很简单，只需要做两项配置：

   1. 在 webpack 配置文件中添加 HMR 插件；
   2. 在 `webpack dev server` 中添加 `hot` 参数。

#### React 中如何使用服务端渲染

`react-dom` 是 React 专门为 web 端开发的渲染工具。我们可以在客户端使用 `react-dom` 的 `render` 方法渲染组件。而在服务端， `react-dom/server` 提供给我们将 `react` 组件渲染成 HTML 的方法。

我们在之前的浏览器端渲染中:

```javascript
ReactDom.render(<App />, document.body)
```

但是在我们的服务器端，是没有 document.body 这个对象的（这些是浏览器提供的功能）。

我们在 `client` 文件夹下新建一个 `server-entry.js` 文件：

```javascript 
import React from 'react'
import App from './App,jsx';

export default <App />
```

新建一个 `webpack.config.server.js`

```javascript
const path = require('path')

module.exports = {
    target: 'node', // 表示打包出的js文件是在node环境下执行而不是web
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    }, 
    output: {
        filename: 'server-entry.js', 
        path: path.join(__dirname, '../dist'),
        publicPath: '',
        libraryTarget: 'commonjs2' // 使用 commonjs2 这个模块化方案。适用于 node.js 端
    },
    module: {
        rules: [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },{
                test: /.js$/,
                loader: 'babel-loader',
                exclude: path.join(__dirname, '../node_modules')
            }
        ]
    }
}
```

将 `package.json` 中的 `script`部分修改如下：

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:client": "webpack-cli --config build/webpack.config.client.js",
    "build:server": "webpack-cli --config build/webpack.config.server.js",
    "clear": "rimraf dist",
    "build": "npm run clear && npm run build:client && npm run build:server"
  },
```

### 新建一个 server 服务器

在根目录下新建一个 `server` 文件夹，下面新建一个 `server.js`

利用 express 来做一个 `server`

```javascript
const express = require('express')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server-entry.js').default

const app = express() 
app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(appString)
})

app.listen('3333', () => {
    console.log('server is listening on port 3333')
})
```

当一个文件是通过 `export default` obj  这种形式导出的，正常导入的方式是： `import obj from './xxx.js'` 。如果使用 `export` 这种导出方式，却使用 `require` 来导入，则需要这样来写：`const serverEntry = require('xxx.js').default` 。**记住： require 一个用 export default 导出的东西，在require的时候也要加default**

#### 总结一下 react 服务端渲染

* 服务端渲染一定是在服务端做 `render` 的工作。前端代码只需要以标签的形式（如 <App />）来 export 这个组件即可
* 对于服务端渲染，webpack在编译的时候需要单独写一份 config 文件。config 文件中的 `target` 指明编译后的文件运行在服务端node环境中。`libraryTarget` 指明使用的模块化方案是传统 node.js 使用的 commonjs2 方案。其他配置与前端编译无差别。
* 服务端渲染，即 `render` 的过程放在服务端。需要 `require('react-dom/server')`,引入之前导出的编译后的react组件的js文件。通过 `ReactSSR.renderToString` 来返回渲染后的 html 代码。

#### 工程实际中的服务端渲染

上面只是实现了最粗糙的 服务端渲染。我们工程中实际使用的服务端渲染肯定是把一个组件及相关的 js文件 插入到html模板中，由后端返回这个 html 页面。

在 client文件夹下新建一个 	`template.html` 文件：

```html
<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="root">
        <app></app>
    </div>
</body>
</html>
```

把 `app.js` 中的 `ReactDOM.render(<App />, document.body)` 修改为 `ReactDOM.render(<App />, document.getElementById('root'))`

如何使用这个模板？ 在 webpack 中修改一下 `html-webpack-plugin` 的配置。

```javascript
// webpack.config.client.js
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
}
```

这样在打包前端的部分是就能自动把打包生成的 JS 文件插入到html中。

对于服务端渲染，修改后端服务器的`server` 

```javascript
const express = require('express')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry.js').default

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = express()

app.use('/public', express.static(path.join(__dirname, '../dist/')))
app.get('*', function(req, res) {
    const appString = ReactSSR.renderToString(serverEntry);
    res.send(template.replace('<app></app>', appString))
})
app.listen('3333', () => {
    console.log('server is listening on port 3333') 
})
```

总结一下上面的内容。上面就是通过服务端把html中插入我们渲染之后的html代码片段。不过html中引用的 js 还是常规的 webpack 打包之后的 js 文件。这个 js 文件在执行的时候，准备渲染页面时，一看，丫的，我准备渲染的东西原来已经有了，故我就不重复渲染了。

浏览器端的 react 代码实际上会对页面上已经存在的和前端准备渲染的页面进行比较，一致的话就放弃前端的重复渲染。

新版的 react 要求，如果页面使用了 服务端渲染，客户端的 js 则需要使用 `ReactDOM.hydrate`()  来代替 `ReactDOM.render()` 方法。故我们需要把 `app.js` 中的 `ReactDOM.render()` 改为 `ReactDOM.hydrate()`

## 项目开发时的常用配置

通过用 `webpack dev server` 配置去启动一个 server。把所有的文件存在内存中，每次文件变化都在内存中重新编译。故开发的时候不需要每次都去重新编译和启动 server。

`Hot module replacement`：文件重新编译后，`Hot module replacement` 允许在浏览器不刷新的情况下替换文件，看到新的效果。

以上两个功能都是在我们开发阶段使用。故在配置文件中需要识别当前是否为开发环境：

```javascript 
// build/webpack.config.client.js
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
    entry: {},
    output: {},
    module: {
        rules: []
    }
    plugins: ()
}
if(isDev){
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {	// 编译过程如果出现了错误，则在网页上显示一层遮罩，上面显示错误信息。
            errors: true // 只显示 errors 级别的错误。
        },
        publicPath: '/public/', // 即所有资源都得用/public前缀来访问
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
}

module.exports = config
```

```
npm install webpack-dev-server -D
npm install cross-env -D
```

安装完成之后，在 `package.json` 中新写一条 srcipts： 

```json
"scripts": {
    "dev:client": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js "
}
```

以后通过 `npm run dev:client` 

注意点：

* 在启动 `npm run dev:client` 一定要先删除掉 `dist` 目录（因为我们把 `contentBase ` 设置在 `dist` 目录）。`webpack-dev-server` 总是会先编译后启动服务。
* 在还没做进一步的 `hot module replacement ` 配置前，先把 `hot: true` 注释掉。

* `contentBase` 用于配置提供额外静态文件内容的目录，之前提到的 `publicPath` 是配置构建好的结果以什么路径去访问，而 `contentBase` 是配置额外的静态文件内容的访问路径，即哪些不经过 webpack 构建，但是需要在 `webpack-dev-server` 中提供访问的静态资源（如部分图片等）。推荐使用绝对路径。

  > publicPath 的优先级高于 contentBase

* 在做客户端开发时，需要把 `React-DOM.hydrate` 替换为 `React-DOM.render`, 在做服务端渲染开发时，需要把 `React-DOM.render` 方法替换为 `React-DOM.hydrate`

  > 我们想用 hydrate 替换 render, 需要满足一个十分重要的条件：
  >
  > 在服务端渲染和客户端首次渲染的结果完全一致的情况下，才能使用 hydrate 替换 render , 否则就自求多福吧！

### hot module replacement

在 webpack 中实现 HMR 也很简单，只需要做两项配置：

1. 在 webpack 配置文件中添加 HMR 插件；
2. 在 `webpack dev server` 中添加 `hot` 参数。

不过配置玩这些后，JS 模块其实还是不能自动热重载的，还需要在你的 JS 模块中执行一个 webpack 提供的 API 才能实现热加载。虽然这个 API 不难使用，但是如果是 React 模块，使用我们已经熟悉的 Babel 可以更方便的实现功能热重载。

整理下我们的思路：

 * `Babel` 和 `webpack` 是独立的工具，二者可以一起工作。二者也都可以通过插件拓展功能。
 * HMR 是 webpack的插件，它让你能在浏览器中实时观察模块修改后的效果。但是如果你想让它工作，你需要对模块进行额外的配额；
 * Babel 有一个叫做 `react-hot-loader` 的插件，可以在不对 React  模块进行额外配置的前提下让HMR 正常工作。



1. 为 `.babelrc` 配置添加 `plugins` 一行：

```json
{
    "presets": [
            "@babel/preset-env", "@babel/preset-react"
        ],
    "plugins": ["react-hot-loader/babel"]
}
```

`react-hot-loader` 就是为我们提供 `react` 的热重载`hot module replacement` 功能的包。`babel` 说明这个包是基于 `babel` 的。需要安装这个包 `npm install react-hot-loader`

2. 修改 app.js 

   把你的应用包裹在 `<AppContainer>` , 当发生更新时，所有 `<AppContainer>` 的 children 会被 reloaded。

```javascript
import ReactDom from 'react-dom'
import React from 'react'
import App from './App.jsx'
// 我们需要使用 AppContainer 去包裹根结点实际想要渲染的内容。
import { AppContainer } from 'react-hot-loader'
const root = document.getElementById('root')

render(App)

// 下面是新增内容
if(module.hot) {
    module.hot.accept('./App.jsx', () => {
        // 当我们需要热重载的内容出现时，我们去把整个 app 重新加载一遍
        const NextApp = require('./App.jsx').default
        // 重新渲染这个组件
       render(NextApp)
    })
}

const render = (Component) => {
    ReactDom.hydrate(
    	<AppContainer>
        	<Component />
        </AppContainer>
    ),
    root
}
```

3. 把 webpack.config.client.js 中做修改：

   * `hot: true`

   * 引用webpack （const webpack = require('webpack')）并 在 isDev 判断里面一行 `config.plugins.push(new webpack.HotModuleReplacement())`

   * 修改 `entry`。 在 isDev 判断体中增加一行：

     ```
     if(isDev) {
     	config.entry = {
             app: [
                 'react-hot-loader/patch',
                 path.join(__dirname, '../client/app.js')
             ]
     	}
         ...
     }
     ```

### 开发时的服务端渲染

在我们使用 `devServer` 开发阶段，编译的文件都放在内存中。而在开发时搞服务端渲染，我们都是从硬盘上读取 html 和打包编译之后的 react组件文件。那么问题来了，如何在开发时，从内存中而不是从硬盘上读取编译之后的文件呢？

```javascript
// server.js
const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development'
const app =express();

if(!isDev){
    const serverEntry = require('../dist/server-entry').default
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('*', function(req, res) {
        const appString = ReactSSR.renderToString(serverEntry)
        res.send(template.replacement('<!-- app -->', appString))
    })
}else{
    // 这一部分的代码比较多，我们单独写在一个文件里，在这里引入
    const devStatic = require('./util/dev-static')
    devStatic(app) // app 即那个 server 对象
}

app.listen(3333, function() {
    console.log('server is listening on 3333');
})
```

在 `server` 文件夹下新建 `util/dev-static.js` 文件。

```javascript
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
        // 模块的热重载等功能仍有原来的 webpack-dev-server 来提供
        // 热重载功能都是通过 /public 接口。
        target: 'http://localhost:8888'
    }))
    app.get('*', function(req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->', content))
        })
    })
}
```

```shell
npm install --save-dev memory-fs
// memory-fs 支持我们在内存中读取文件
```

## 使用 eslint 和 editor config 规范代码

* 规范代码有利于团队协作 
* 纯手工的规范费时费力而且不能保证正确性
* 能配合编辑自动提醒错误，提高开发效率

`eslint`: 是随着 ECMAScript版本一直更新的 js lint 工具。插件丰富，并且能够套用规范，规则非常丰富，能够满足大多数的需求。

`eslint` 配合 git : 为了最大程度的控制每个人的规范，我们可以在 git commit 代码的时候，使用 git hook 调用 eslint 进行代码规范验证，不规范的代码无法提交到仓库。

`editorconfig` ：不同的编辑器对文本会有一定的区别，如果不统一规范，可能你跟别人合作的时候每次更新下来别人的代码都会一大堆报错。

* ```
  npm isntall eslint -D
  ```

* 根目录下新建一个 .eslintrc 文件

  ```json
  {
      "extends": "standard"
  }
  ```

  同样，在 client 文件夹下新建一个 .eslintrc 文件

  继承自 `airbnb`， 但是不检测分号。parser 是指定一个解析器。`env` 来作为环境，下面的配置表示我们的代码是运行在浏览器端的且支持es6和node(支持 node 主要是因为webpack打包过程中运行在 node 环境中，需要使用node 环境下的一些变量和方法，如path、process)。

  `sourceType` 两个被选项：`script` (默认) 和 `module` ，即 js 文件是以 `script` 标签的形式引入还是模块化的方式引入。

  ```json
  {
      ”parser“: "babel-eslint",
      "extends": "airbnb",
      ”env“: {
          "browser": true,
          "es6": true,
          "node": true
      },
      "parserOptions": {
          "ecmaVersion": 6,
          "sourceType": "module"
      },
      "rules": {
          "semi": [0]
      }
  }
  ```

    在 `webpack.config.client.js` 中添加一条 rules：

  ```
  module: {
      rules: [
          {
              enforce: 'pre', // pre 代表在执行真正的代码编译之前先执行这个 loader, 一旦 eslint 报错了，我们下面的打包编译过程就不进行下去了。
              test: /.(js|jsx)$/,
              loader: 'eslint-loader',
              exclude: [
                  path.resolve(__dirname, '../node_modules')
              ]
          }
      ]
  }
  ```

* 安装依赖

  ```
  npm i -D babel-eslint eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-jsx-ally eslint-plugin-node eslint-plugin-promise eslint-plugin-react eslint-plugin-standard
  ```

  后面那些 `eslint-plugin-*` 都是 `eslint-config-airbnb` 需要的。

#### editorconfig 编辑器配置

在根目录下新建一个 `.editorconfig` 文件。编辑这个文件，内容如下：

```
root = true	// 代表目前配置文件所在位置是项目的根目录
[*] 		// * 表示所有文件都应用同一个规则
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true	// 末尾自动加一个空行
trim_trailing_whitespace = true // 自动删掉一行后面的多余空格
```

在一行代码后面写注释 `// eslint-disable-line ` 来禁用 eslint 对这一行的检测。

**怎么强制要求代码 git commit 之前必须通过 eslint 检测？**

```shell
npm i husky
# 也可以安装 pre-commit
```

在 `package.json` 下面的 `scripts` 新增一条命令：

```json
"scripts"： {
    "lint": "eslint --ext .js --ext .jsx client/"
    "precommit": "npm run lint"
}
```

### 工程架构优化

```\
const webpackMerge = require('webpack-merge')
// webpack-merge 是官方提供的专门用来合并webpack配置文件的。
// 这种拷贝实现了深度拷贝，而不是简单的覆盖
const baseConfig = require('./webpack.base.js')

const config = webpackMerge(baseConfig, {
    ...
    ...
})
module.exports = config
```



