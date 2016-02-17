import React from 'react';
import ReactDOM from 'react-dom';
import List from './list.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
    // this.updateWeekBackwards = this.updateWeekBackwards.bind(this);
    this.state = { modules: ['Hello','Test'] };
  }

  addItem() {
    const input = document.getElementById('input')
    const mods = this.state.modules;
    const itemAdd = input.value;
    input.value = '';
    mods.push(itemAdd);
    this.setState({modules: mods})
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

        <button className="load" value="Load">Load</button>
      </div>
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('content'));
