import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layout'
class App extends React.Component {
  render() {
    return <Layout />
  }
}
ReactDOM.render(<App />, document.getElementById('app'))