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