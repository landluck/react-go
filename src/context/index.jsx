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

// class Bottom extends React.Component {
//   render () {
//     return (
//       // Context.Consumer Consumer消费者使用Context得值
//       // 但子组件不能是其他组件，必须渲染一个函数，函数的参数就是Context得值
//       // 当出现 多个Consumer的时候，进行嵌套，每个Consumer 的子组件必须是一个函数，即可
//       <ThemeContext.Consumer>
//         {
//           theme => (
//             <SizeContext.Consumer>
//               {
//                 size => (<h1>ThemeContext 的 值为 {theme}; SizeContext 的值为 {size}</h1>)
//               }
//             </SizeContext.Consumer>
//           )
//         }
//       </ThemeContext.Consumer>
//     )
//   }
// }

class Bottom extends React.Component {
  static contextType = ThemeContext
  // static sizeContextType = SizeContext
  render () {
    const theme = this.context
    // const size = this.sizeContextType
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
