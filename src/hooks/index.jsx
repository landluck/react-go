import React, { useReducer, forwardRef, useImperativeHandle, useMemo, useState, useRef, useCallback, PureComponent, useEffect, createContext, useContext } from 'react'

// function App (props) {
//   // const [ count, setCount ] = useState(0)
//   const [ count, setCount ] = useState(() => {
//     console.log('useState default value function is call')
//     return props.count || 0
//   })
//   return (
//     <div>
//       点击次数: { count } 
//       <button onClick={() => { setCount(count + 1)}}>点我</button>
//     </div>
//     )
// }

// function App () {
//   const [ count, setCount ] = useState(0)
//   console.log('component render count')
//   return (
//     <div>
//       点击次数: { count } 
//       <button onClick={() => { setCount(count)}}>点我</button>
//     </div>
//     )
// }

// function App (props) {
//   let count, setCount
//   let sum, setSum
//   if (count > 2) {
//     [ count, setCount ] = useState(0)
//     [ sum, setSum ] = useState(10)
//   } else {
//     [ sum, setSum ] = useState(10)
//     [ count, setCount ] = useState(0)
//   }
//   return (
//     <div>
//       点击次数: { count } 
//       总计：{ sum }
//       <button onClick={() => { setCount(count + 1); setSum(sum - 1)}}>点我</button>
//     </div>
//     )
// }


// class App extends PureComponent {
//   state = {
//     count: 0
//   }

//   componentDidMount() {
//     document.title = count
//   }

//   componentDidUpdate() {
//     document.title = count
//   }
//   render () {
//     const { count } = this.state
//     return (
//       <div>
//         页面名称: { count } 
//         <button onClick={() => { this.setState({ count: count + 1 })}}>点我</button>
//       </div>
//     )
//   }
// }

// function App () {
//   const [ count, setCount ] = useState(0)

//   useEffect(() => {
//     document.title = count
//   })

//   return (
//     <div>
//       页面名称: { count } 
//       <button onClick={() => { setCount(count + 1 )}}>点我</button>
//     </div>
//     )
// }

// function App () {
//   const [ count, setCount ] = useState(0)
//   const [ width, setWidth ] = useState(document.body.clientWidth)

//   const onChange = () => {
    
//     setWidth(document.body.clientWidth)
//   }

//   useEffect(() => {
//     window.addEventListener('resize', onChange, false)

//     return () => {
//       window.removeEventListener('resize', onChange, false)
//     }
//   })

//   useEffect(() => {
//     document.title = count
//   })

//   return (
//     <div>
//       页面名称: { count } 
//       页面宽度: { width }
//       <button onClick={() => { setCount(count + 1)}}>点我</button>
//     </div>
//     )
// }


// function App () {
//   const [ count, setCount ] = useState(0)
//   const [ width, setWidth ] = useState(document.body.clientWidth)

//   const onChange = () => {
    
//     setWidth(document.body.clientWidth)
//   }

//   useEffect(() => {
//     // 相当于 componentDidMount
//     console.log('add resize event')
//     window.addEventListener('resize', onChange, false)

//     return () => {
//       // 相当于 componentWillUnmount
//       window.removeEventListener('resize', onChange, false)
//     }
//   }, [])

//   useEffect(() => {
//     // 相当于 componentDidUpdate
//     document.title = count
//   })

//   useEffect(() => {
//     console.log(`count change: count is ${count}`)
//   }, [ count ])

//   return (
//     <div>
//       页面名称: { count } 
//       页面宽度: { width }
//       <button onClick={() => { setCount(count + 1)}}>点我</button>
//     </div>
//     )
// }

// const Context = createContext(0)

// class Item1 extends PureComponent {
//   render () {
//     return (
//       <Context.Consumer>
//         {
//           (count) => (<div>{count}</div>)
//         }
//       </Context.Consumer>
//     )
//   }
// }

// class Item2 extends PureComponent {
//   static contextType = Context
//   render () {
//     const count = this.context
//     return (
//       <div>{count}</div>
//     )
//   }
// }

// function Item3 () {
//   const count = useContext(Context);
//   return (
//     <div>{ count }</div>
//   )
// }

// function App () {
//   const [ count, setCount ] = useState(0)
//   return (
//     <div>
//       点击次数: { count } 
//       <button onClick={() => { setCount(count + 1)}}>点我</button>
//       <Context.Provider value={count}>
//         <Item1></Item1>
//         <Item2></Item2>
//         <Item3></Item3>
//       </Context.Provider>
//     </div>
//     )
// }

// function App () {
//   const [ count, setCount ] = useState(0)
//   const add = useMemo(() => {
//     return count + 1
//   }, [count])
//   return (
//     <div>
//       点击次数: { count }
//       <br/>
//       次数加一: { add }
//       <button onClick={() => { setCount(count + 1)}}>点我</button>
//     </div>
//     )
// }

// function App () {
//   const [ count, setCount ] = useState(0)
//   const onClick = useMemo(() => {
//     return () => {
//       console.log('button click')
//     }
//   }, [])
//   const onClick = useCallback(() => {
//     console.log('button click')
//    }, [])
//   return (
//     <div>
//       点击次数: { count }
//       <button onClick={onClick}>点我</button>
//     </div>
//     )
// }

// class Children extends PureComponent {
//   render () {
//     const { count } = this.props
//     return (
//       <div>{ count }</div>
//     )
//   }
// }

// function App () {
//   const [ count, setCount ] = useState(0)
//   const childrenRef = useRef(null)
//   // const 
//   const onClick = useMemo(() => {
//     return () => {
//       console.log('button click')
//       console.log(childrenRef.current)
//       setCount((count) => count + 1)
//     }
//   }, [])
//   return (
//     <div>
//       点击次数: { count }
//       <Children ref={childrenRef}  count={count}></Children>
//       <button onClick={onClick}>点我</button>
//     </div>
//     )
// }

// function App () {
//   const [ count, setCount ] = useState(0)
//   const timer = useRef(null)
//   let timer2 
  
//   useEffect(() => {
//     let id = setInterval(() => {
//       setCount(count => count + 1)
//     }, 500)

//     timer.current = id
//     timer2 = id
//     return () => {
//       clearInterval(timer.current)
//     }
//   }, [])

//   const onClickRef = useCallback(() => {
//     clearInterval(timer.current)
//   }, [])

//   const onClick = useCallback(() => {
//     clearInterval(timer2)
//   }, [])

//   return (
//     <div>
//       点击次数: { count }
//       <button onClick={onClick}>点我</button>
//       <button onClick={onClickRef}>点我 useRef </button>
//     </div>
//     )
// }

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

// function App() {
//   const [state, dispatch] = useReducer(reducer, {
//     count: 0
//   });
//   return (
//     <>
//       点击次数: {state.count}
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//     </>
//   );
// }

// function Kun (props, ref) {
//   const kun = useRef()

//   const introduce = useCallback (() => {
//     console.log('i can sing, jump, rap, play basketball')
//   }, [])
//   useImperativeHandle(ref, () => ({
//     introduce: () => {
//       introduce()
//     }
//   }));

//   return (
//     <div ref={kun}> { props.count }</div>
//   )
// }

// const KunKun = forwardRef(Kun)

// function App () {
//   const [ count, setCount ] = useState(0)
//   const kunRef = useRef(null)

//   const onClick = useCallback (() => {
//     setCount(count => count + 1)
//     console.log(kunRef.current)
//     kunRef.current.introduce()
//   }, [])
//   return (
//     <div>
//       点击次数: { count }
//       <KunKun ref={kunRef}  count={count}></KunKun>
//       <button onClick={onClick}>点我</button>
//     </div>
//     )
// }

function useWidth (defaultWidth) {
  const [width, setWidth] = useState(document.body.clientWidth)

  const onChange = useCallback (() => {
    setWidth(document.body.clientWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onChange, false)

    return () => {
      window.removeEventListener('resize', onChange, false)
    }
  }, [onChange])

  return width
}

function App () {

  const width = useWidth(document.body.clientWidth)

  return (
    <div> 
      页面宽度: { width }
    </div>
    )
}
export default App