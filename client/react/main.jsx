import React from 'react';
import ReactDOM from 'react-dom';
import List from './list.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
    this.submitMods = this.submitMods.bind(this);
    this.state = { modules: [] };
  }

  addItem() {
    const input = document.getElementById('input')
    const mods = this.state.modules;
    const itemAdd = input.value;
    input.value = '';
    mods.push(itemAdd);
    this.setState({modules: mods})
  }

  submitMods() {
    let url = './sandbox?';
    for(let j in this.state.modules) {
      url += `mod[]=${this.state.modules[j]}&`
    }
    window.location.href = url;
  }

  render() {
    const list = [];
    for(let i in this.state.modules) {
      list.push(<List module={this.state.modules[i]} key={i} />);
    }

    return (
      <div className="welcome-container">
        <div className='banner'>
          <h1>Hello, welcome to Dev Sandbox</h1>
        </div>

        <div className="add-mods">
          <input className='input-mods' id="input" placeholder="Input some modules to try out..."></input>
          <button className="submit-module" value="Submit" onClick={this.addItem}>Add</button>
          <ul>
            {list}
          </ul>
        </div>

        <button className="load" value="Load" onClick={this.submitMods}>Load</button>
        <div id="finished"></div>
      </div>
    );
  }
};

class Console extends React.Component {
  render() {
    return (
      <div>Test</div>
    )
  }
}
if(document.getElementById('content')) {
  ReactDOM.render(<App/>, document.getElementById('content'));
} else {
  ReactDOM.render(<Console/>, document.getElementById('console'));
}
