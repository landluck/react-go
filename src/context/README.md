# `React` 中 `Context` 的使用



## context 


> `Context` 提供了一种方式，能够让数据在组件树中传递时不必一级一级的手动传递

一般情况下，数据在组件中，要一级一级的传递，单向数据流，比如Parent组件中的theme值，需要在Item组件中使用，就需要我们从Parent中向下传递，
但当我们有了`Context`后，我们就不需要一级一级传递了

```
    Parent(theme=red)
        List(theme=red)
            Item(theme=red)
            
    ThemeContext.Provider value={'red'}
        List
            ThemeContext.Customer  (theme) => { theme }

```
具体如何使用呢，看下面例子

```

   
    import React, { createContext } from 'react';

    // 创建Context的唯一方法
    const ThemeContext = createContext()
    
    
    
    class App extends React.Component {
      render () {
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={'red'}>
            <Middle></Middle>
          </ThemeContext.Provider>
        )
      }
    }
    
    class Bottom extends React.Component {
      render () {
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          <ThemeContext.Consumer>
            {
              theme => <h1>ThemeContext 的 值为 {theme}</h1>
            }
          </ThemeContext.Consumer>
        )
      }
    }
    
    
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    export default App;


```

当 Provider 提供的值更改时，Consumer 必须重新渲染

```
    import React, { createContext } from 'react';
    
    // 创建Context的唯一方法
    const ThemeContext = createContext()
    
    
    
    class App extends React.Component {
      state = {
        theme: 'red'
      }
      render () {
        const { theme } = this.state
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={theme}>
            {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
            <button onClick={() => {this.setState({ theme: 'yellow'})}}>按钮</button>
            <Middle></Middle>
          </ThemeContext.Provider>
        )
      }
    }
    
    class Bottom extends React.Component {
      render () {
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          <ThemeContext.Consumer>
            {
              theme => <h1>ThemeContext 的 值为 {theme}</h1>
            }
          </ThemeContext.Consumer>
        )
      }
    }
    
    
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    export default App;




```

当出现多个Context的时候，应该如何使用呢

```
    import React, { createContext } from 'react';

    // 创建Context的唯一方法
    const ThemeContext = createContext()
    const SizeContext = createContext()
    
    
    class App extends React.Component {
      state = {
        theme: 'red',
        size: 'small'
      }
      render () {
        const { theme, size } = this.state
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={theme}>
            {/* 当出现多个Context的时候，只需要将Context.Provider 嵌套即可 */}
            <SizeContext.Provider value={size}>
              {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
              <button onClick={() => {this.setState({ theme: 'yellow', size: 'big'})}}>按钮</button>
              <Middle></Middle>
            </SizeContext.Provider>
          </ThemeContext.Provider>
        )
      }
    }
    
    class Bottom extends React.Component {
      render () {
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          // 当出现 多个Consumer的时候，进行嵌套，每个Consumer 的子组件必须是一个函数，即可
          <ThemeContext.Consumer>
            {
              theme => (
                <SizeContext.Consumer>
                  {
                    size => (<h1>ThemeContext 的 值为 {theme}; SizeContext 的值为 {size}</h1>)
                  }
                </SizeContext.Consumer>
              )
            }
          </ThemeContext.Consumer>
        )
      }
    }
    
    
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    export default App;
```

假如、`Consumer` 向上找不到 `Provider` 的时候，怎么办，`react` 并不会报错，只不过取不到值而已、这个时候创建 `Context` 的时候
`createContext` 可以传入默认值，当找不到 `Provider` 的时候，就会显示默认值



注意：`context `类似于全局变量做法，会让组件失去独立性、复用起来更困难，不能滥用、但本身它一定有适合使用的场景，具体看情况使用

## contextType

> `contextType` 可以简化 context 的使用，不使用 consumer 也可以共享变量



具体看下面例子


```
    import React, { createContext } from 'react';
    
    // 创建Context的唯一方法
    const ThemeContext = createContext()
    const SizeContext = createContext()
    
    
    class App extends React.Component {
      state = {
        theme: 'red',
        size: 'small'
      }
      render () {
        const { theme, size } = this.state
        return (
          // 使用 Context.Provider 包裹后续组件，value 指定值 
          <ThemeContext.Provider value={theme}>
            {/* 当出现多个Context的时候，只需要将Context.Provider 嵌套即可 */}
            <SizeContext.Provider value={size}>
              {/* 当Context的Provider值更改时，Consumer 的值必须重新渲染 */}
              <button onClick={() => {this.setState({ theme: 'yellow', size: 'big'})}}>按钮</button>
              <Middle></Middle>
            </SizeContext.Provider>
          </ThemeContext.Provider>
        )
      }
    }
    
    class Bottom extends React.Component {
      // 申明静态变量、contextType 将 context 直接赋值于 contextType
      static contextType = ThemeContext
      
      render () {
        // 在 render 函数中 可以直接 访问 this.context 获取共享变量、这样就可以不使用 consumer
        const theme = this.context
        return (
          // Context.Consumer Consumer消费者使用Context得值
          // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
          // 当出现 多个Consumer的时候，进行嵌套，每个Consumer 的子组件必须是一个函数，即可
          <div>
            <h1>ThemeContext 的 值为 {theme} </h1>
          </div>
        )
      }
    }
    
    
    
    class Middle extends React.Component {
      render () {
        return <Bottom></Bottom>
      }
    }
    
    export default App;

```

注意： 
-     contextType 只能在类组件中使用
-     一个组件如果有多个 consumer ， contextType 只对其中一个有效，所以说，contextType 只能有一个