import React, { memo } from 'react'

// class Children extends React.Component {
//   shouldComponentUpdate (nextProps, nextState) {
//     if (nextProps.name === this.props.name) return false
//     return true
//   }
//   render () {
//     console.log(' Children render ')
//     return (<div>Children Component name { this.props.name }</div>)
//   }
// }

// class Children extends PureComponent {
//   render () {
//     console.log(' Children render ')
//     return (<div>Children Component name { this.props.human.name} age { this.props.human.age}</div>)
//   }
// }

// export default class Parnet extends React.Component {
//   state = {
//     count: 0,
//     human: {
//       name: 'jake',
//       age: 100
//     }
//   }
//   render () {
//     const human = this.state.human
//     return (
//       <div> 
//         <button onClick={() => { 
//           human.age++
//           this.setState({ count: this.state.count + 1, human})}
        
//         }>button</button>
//         <Children human={this.state.human}></Children>
//         count: { this.state.count }
//       </div>
//     )
//   }
// }

// class Children extends PureComponent {
//   render () {
//     console.log(' Children render ')
//     return (<div>Children Component name { this.props.human.name} age { this.props.human.age}</div>)
//   }
// }

// export default class Parnet extends React.Component {
//   state = {
//     count: 0,
//     human: {
//       name: 'jake',
//       age: 100
//     }
//   }
//   render () {
//     const human = this.state.human
//     return (
//       <div> 
//         <button onClick={() => { 
//           human.age++
//           this.setState({ count: this.state.count + 1})}
        
//         }>button</button>
//         <Children human={this.state.human} fn={() => {}}></Children>
//         count: { this.state.count }
//       </div>
//     )
//   }
// }

// class Children extends PureComponent {
//   render () {
//     console.log(' Children render ')
//     return (<div>Children Component name { this.props.human.name} age { this.props.human.age}</div>)
//   }
// }

// export default class Parnet extends React.Component {

//   // constructor () {
//   //   super()
//   //   this.fnHandle = this.fnHandle.bind(this)
//   // }

//   state = {
//     count: 0,
//     human: {
//       name: 'jake',
//       age: 100
//     }
//   }

//   fnHandle = () => {
//     console.log(this)
//   }

//   render () {
//     const human = this.state.human
//     return (
//       <div> 
//         <button onClick={() => { 
//           human.age++
//           this.setState({ count: this.state.count + 1})}
        
//         }>button</button>
//         {/* <Children human={this.state.human} fn={this.fnHandle.bind(this)}></Children> */}
//         <Children human={this.state.human} fn={this.fnHandle}></Children>
//         count: { this.state.count }
//       </div>
//     )
//   }
// }



function ChildrenFunc (props) {
  return (
    (<div>Children Component name { props.human.name} age { props.human.age}</div>)
  )
}

const Children = memo(ChildrenFunc)

export default class Parnet extends React.Component {

  // constructor () {
  //   super()
  //   this.fnHandle = this.fnHandle.bind(this)
  // }

  state = {
    count: 0,
    human: {
      name: 'jake',
      age: 100
    }
  }

  fnHandle = () => {
    console.log(this)
  }

  render () {
    const human = this.state.human
    return (
      <div> 
        <button onClick={() => { 
          human.age++
          this.setState({ count: this.state.count + 1})}
        
        }>button</button>
        {/* <Children human={this.state.human} fn={this.fnHandle.bind(this)}></Children> */}
        <Children human={this.state.human} fn={this.fnHandle}></Children>
        count: { this.state.count }
      </div>
    )
  }
}