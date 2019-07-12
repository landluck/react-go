# React 中性能优化、 memo、 PureComponent、shouldComponentUpdate 的使用

## 场景


> `React` 是一个用于构建用户界面的 `JavaScript` 库，主要负责将数据转换为视图，要保证数据和视图的统一，`react` 通过 重新 `render` 来保证数据和视图的统一，但当数据没有变化时，视图重新渲染，就会造成不必要的性能浪费

看下面这个例子，


```javascript
  import React from 'react'

  class Children extends React.Component {
    render () {
      console.log(' Children render ')
      return (<div>Children Component </div>)
    }
  }

  export default class Parnet extends React.Component {
    state = {
      count: 0
    }
    render () {
      return (
        <div> 
          <button onClick={() => { this.setState({ count: this.state.count + 1})}}>button</button>
          <Children></Children>
          count: { this.state.count }
        </div>
      )
    }
  }

```
这个例子主要是用两个组件，一个 `Parent` 组件 和 一个 `Children` 组件，当我们在修改 `Parent` 组件的 `count` 时， `Parent` 组件应该重新渲染，保持数据 和 视图的统一，而 `Children` 组件 这个时候应不应该重新渲染呢，按道理，不会重新渲染，因为他本身的数据没有变，但当我们点击按钮的时候，发现 每次 `count` 改变， `Children` 组件都会重新渲染一次，这明显存在问题，而 `react` 提供了几种方案，供我们解决这种问题

##  shouldComponentUpdate

生命周期 `shouldComponentUpdate` 如果返回 `false`，该组件就不会重新渲染，我们认为，只要 `Children` 组件当前的 `name` 和 下一次 更新的值 相等，那么 `Children` 组件就没必要重新渲染，`shouldComponentUpdate` 函数 接受两个参数，第一个是 下一次更新的 `porps` 值，第二个 是 下一次 更新的 `state` 值， 只需要当 `nextProps.name === this.props.name` 时，`return false，Children` 就不会重新渲染


```javascript
  import React from 'react'

  class Children extends React.Component {
    // 利用生命周期 shouldComponentUpdate 对 xia
    shouldComponentUpdate (nextProps, nextState) {
      if (nextProps.name === this.props.name) return false
      return true
    }
    render () {
      console.log(' Children render ')
      return (<div>Children Component name { this.props.name }</div>)
    }
  }

  export default class Parnet extends React.Component {
    state = {
      count: 0
    }
    render () {
      return (
        <div> 
          <button onClick={() => { this.setState({ count: this.state.count + 1})}}>button</button>
          <Children name="jake"></Children>
          count: { this.state.count }
        </div>
      )
    }
  }
```
## PureComponet
有了 `shouldComponentUpdate，` 我们就可以随便 控制我们的组件是否需要重新渲染，如果传入的值，层次比较复杂，就需要我们深层次对比，如果比较简单，就像上面这个例子一样，那我们就可以使用 `react` 提供的语法糖 `PureComponet` 来实现需求


```javascript
    import React, { PureComponent } from 'react'
    // 子组件直接继承 PureComponent， 我们就不需要写 shouldComponentUpdate。 react 会自动帮我们做对比//// 优化
    class Children extends PureComponent {
      render () {
        console.log(' Children render ')
        return (<div>Children Component name { this.props.name }</div>)
      }
    }

    export default class Parnet extends React.Component {
      state = {
        count: 0
      }
      render () {
        return (
          <div> 
            <button onClick={() => { this.setState({ count: this.state.count + 1})}}>button</button>
            <Children name="jake"></Children>
            count: { this.state.count }
          </div>
        )
      }
    }

```

当然，`PureComponent` 是有局限性的，只有传入值属性的对比，如果传入的值内部发生变化，`PureComponent` 是会出现，数据更新，视图不更新的情况的

请运行下面这个例子


```javascript
  import React, { PureComponent } from 'react'

 class Children extends PureComponent {
    render () {
      console.log(' Children render ')
      return (<div>Children Component name { this.props.human.name} age { this.props.human.age}</div>)
    }
  }

  export default class Parnet extends React.Component {
    state = {
      count: 0,
      human: {
        name: 'jake',
        age: 100
      }
    }
    render () {
      const human = this.state.human
      return (
        <div> 
          <button onClick={() => { 
            human.age++
            this.setState({ count: this.state.count + 1, human})}
          
          }>button</button>
          <Children human={this.state.human}></Children>
          count: { this.state.count }
        </div>
      )
    }
  }

```

当我们点击按钮的时候，我们的 `human` 的 `age` 其实是在变化的，但 `PureComponent` 没有检查到数据的变化，导致视图没有更新，这就是 `PureComponent` 的局限性，所以在使用 `PureComponent` 的时候，我们注意这个问题，避免出现 视图 不更新的bug

其实，`PureComponent` 还有一个 `bug`，那就是 我们不去改变 `Children` 的 `props`，但我们在 `Children` 组件实例上，传入一个 立即执行函数，当我们去更新 `Parent` 组件时，也会导致 `Children` 每次都更新

```javascript
  class Children extends PureComponent {
    render () {
      console.log(' Children render ')
      return (<div>Children Component name { this.props.human.name} age { this.props.human.age}</div>)
    }
  }

  export default class Parnet extends React.Component {
    state = {
      count: 0,
      human: {
        name: 'jake',
        age: 100
      }
    }
    render () {
      const human = this.state.human
      return (
        <div> 
          <button onClick={() => { 
            human.age++
            this.setState({ count: this.state.count + 1})}
          
          }>button</button>
          {/* 传入一个 函数 */}
          <Children human={this.state.human} fn={() => {}}></Children>
          count: { this.state.count }
        </div>
      )
    }
  }
```

这是因为 `Children` 组件的 `human` 没有变化，但 `fn` 每次都是新创建的函数，也会导致 `Children` 重复的渲染，那么怎么解决这个问题呢，有的人就想，那我可以创建一个类方法，供 `fn` 使用，那我们可以试试, 


```javascript
  class Children extends PureComponent {
    render () {
      console.log(' Children render ')
      return (<div>Children Component name { this.props.human.name} age { this.props.human.age}</div>)
    }
  }

  export default class Parnet extends React.Component {
    state = {
      count: 0,
      human: {
        name: 'jake',
        age: 100
      }
    }

    fnHandle () {
      
    }

    render () {
      const human = this.state.human
      return (
        <div> 
          <button onClick={() => { 
            human.age++
            this.setState({ count: this.state.count + 1})}
          
          }>button</button>
          <Children human={this.state.human} fn={this.fnHandle}></Children>
          count: { this.state.count }
        </div>
      )
    }
  }
```
当我们在点击 `button` 的时候，发现 `Children` 组件没有重新渲染，的确达到我们的目的了，但是还有一个问题，就是 fnHandle 的 this 指向问题， 当我们在 `Children` 中去执行 `fn` 时，发现 `fnHandle` 根本不会执行，所以我们解决 `this` 指向的问题， 


第一种方法是 `bind` 

```javascript

  <Children human={this.state.human} fn={this.fnHandle.bind(this)}></Children>

```
但这个时候，我们发现 `Children` 组件 又会重新渲染，所以 这种方式排除，不能满足我们的需求


第二种方法是 `constructor` 中 去 `bind this`

```javascript

  constructor () {
    super()
    this.fnHandle = this.fnHandle.bind(this)
  }

```

这种方法没有问题，可以实现我们的需求，但 每个方法我们都需要 去 写 `bind` 方法，当方法过多时，过于臃肿，有个 更好的 办法，就是 把每个方式作为类的属性


```javascript

  fnHandle = () => {
    console.log(this)
  }


```
## memo 

说了这么多，我们没有说到 `memo，` 但其实我们已经说完了，在使用 `class` 去创建 组件时，我们可以使用 `PureComponent`，但当我们使用 函数组件时，我们就没办法 继承 `PureComponent`，所以这个时候就用到 `memo` 了

```javascript

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
```

我们只需要使用 `memo` 包裹 一个函数组件，返回一个新组件，就可以实现 `PureComponent` 的 功能, 但是在使用的时候，也要注意到 `PureComponent` 的限制