# React 中 lazy, Suspense 以及错误边界(Error Boundaries)的使用

## lazy 


> `lazy` 是 `react` 提供的组件懒加载的能力，在官方没有支持 `lazy`之前，在 `react` 中我们一般使用 `react-loadable` 来实现组件懒加载的能力，但是，`lazy` 并不支持 服务端渲染（`SSR`），所以在使用ssr的情况下，`lazy` 暂时不能使用

`React.lazy` 接受一个函数，这个函数内部调用 `import()` 动态导入。它必须返回一个 `Promise`，该 `Promise` 需要 `resolve` 一个 `defalut export` 的 `React` 组件。


具体如何使用呢，看下面例子

```javascript
  import React, { lazy } from 'react'

  const AppTitle = lazy(() => import('./title'))

  class App extends React.Component {
    render () {
      return (
       <AppTitle></AppTitle>
      )
    }
  }

  export default App

```

当我们把这段代码运行起来的时候，却发现程序报错了

```javascript
  Error: A React component suspended while rendering, but no fallback UI was specified.

  Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.
      in Unknown (at lazy/index.jsx:8)
      in App (at src/index.js:7)
```

这个时候就需要 `react` 中内置的组件 `Suspense` 来配合使用，只需要将 `Suspense` 引入，然后将异步导入的组件包裹起来，同时也要指定 `fallback` 属性， 可以支持传入一段
`jsx`， 或者一个组件实例，类似  `<Loading></Loading>`


```javascript
  import React, { lazy, Suspense } from 'react'

  const AppTitle = lazy(() => import('./title.jsx'))

  class App extends React.Component {
    render () {
      return (
        <Suspense fallback={<div>Loading</div>}><AppTitle></AppTitle></Suspense>
      )
    }
  }


  export default App

```

当我们使用 `lazy` 之后，我们可以打开 `chrome` 的 `network` 然后选择 `js` 来观察 发起的请求，我们发现这个时候会出现  `1.chunk.js` 这种 数字开头的`js`文件，其实每个  `.js`  就对应我们每一个组件，当我们需要去 指定每个 异步组件 打包的`js`文件名时，我们只需要在 `import()` 函数中 添加 `/* webpackChunkName: "title" */` 这段注释，webpack 在打包时，自动会将我们指定的名字作为文件名

```javascript
  import React, { lazy, Suspense } from 'react'

  const AppTitle = lazy(() => import(/* webpackChunkName: "title" */'./title.jsx'))

  class App extends React.Component {
    render () {
      return (
        <Suspense fallback={<div>Loading</div>}><AppTitle></AppTitle></Suspense>
      )
    }
  }


  export default App

```

如果当一个组件异步加载下载`js`文件时，网络错误，无法下载 `js` 文件，那么 `react` 会表现出什么情况呢

```javascript
  Error: Loading chunk 3 failed.
  (error: http://192.168.4.183:3000/static/js/title.chunk.js)
```

`很明显，Suspense` 无法处理这种错误情况， 在 `react` 中有一个 错误边界 `（Error Boundaries）`的概念，用来解决这种问题，它是利用了 `react` 生命周期的 `componetDidCatch` 方法来处理

有两种方式，一种是 生命周期 `componentDidCatch` 来处理错误，还有一种 是 静态方法 `static getDerivedStateFromError` 来处理错误，

官网的建议是 

>请使用 static getDerivedStateFromError() 渲染备用 UI ，使用 componentDidCatch() 打印错误信息。

```javascript
  import React, { lazy, Suspense } from 'react'

  const AppTitle = lazy(() => import(/* webpackChunkName: "title" */'./title.jsx'))

  class App extends React.Component {
    state = {
      isError: false
    }

    static getDerivedStateFromError(error) {
      return { isError: true };
    }

    componentDidCatch (err, info) {
      console.log(err, info)
    }

    render () {
      if (this.state.isError) {
        return (<div>error</div>)
      }
      return (
        <div>
          <Suspense fallback={<div>Loading</div>}><AppTitle></AppTitle></Suspense>
        </div>
      )
    }
  }


  export default App
```

注意：使用 `create-react-app` 创建的项目，在开发环境，就算使用了 `componentDidCatch` 或者 `getDerivedStateFromError`，错误依然会被抛出，在 `build` 后，错误将会捕获，不会导致整个项目卸载


根据官方文档所说，在 `react 16` 以后，任何未被错误边界捕获的错误将会导致整个 `React` 组件树被卸载。 所以我们在开发项目时，需要去捕获错误边界的错误，并提供一个备用`UI` 
