import React, { useState } from 'react';
import './App.css';


function App (props) {
  // const defaultCount = (() => {
  //   console.log('获取')
  //   return  props.count || 0
  // })
  const [ count, setCount ] = useState(() => {
    console.log('huoqu')
    return props.count || 0
  })
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>点解</button>
      Click {count}
    </div>
  )
}

class App1 extends React.Component {
  state = {
    count: 0
  }
  render () {
    const { count } = this.state
    return (
      <div>
        <button onClick={() => this.setState({ count: count + 1})}>点解</button>
        Click {count}
      </div>
    )
  }
}


export default App;
