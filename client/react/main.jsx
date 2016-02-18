import React from 'react';
import ReactDOM from 'react-dom';
import List from './list.jsx';
import Consolelog from './Consolelog.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.addItem = this.addItem.bind(this);
    this.submitMods = this.submitMods.bind(this);
    this.state = {
      modules: []
    };
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
    if (this.state.modules === []) {

      return;
    }
    let url = './sandbox?';
    for (let j in this.state.modules) {
      url += `mod[]=${this.state.modules[j]}&`
    }
    window.location.href = url;
    document.getElementsByClassName('load')[0].remove();
    document.getElementsByClassName('add-mods')[0].remove();
    document.getElementsByClassName('lists')[0].remove();
    const img = document.createElement('img');
    img.src = "/static/progress.gif";
    const finish = document.getElementById('finished')
    finish.appendChild(img);
    function fadeIn(el) {
      el.style.opacity = 0;

      var last = +new Date();
      var tick = function() {
        el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
        last = +new Date();

        if (+ el.style.opacity < 1) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
        }
      };

      tick();
    }

    fadeIn(img);
  }

  render() {
    const list = [];
    for (let i in this.state.modules) {
      list.push(< List module = {
        this.state.modules[i]
      }
      key = {
        i
      } />);
    }

    return (
      <div className="welcome-container">
        <div className='banner'>
          <h1>Welcome to Dev Sandbox</h1>
          <h2>Tell me which modules to fetch</h2>
        </div>

        <div className="add-mods">
          <input className='input-mods' id="input" placeholder="Input some modules..."></input>
          <button id="add" className="submit-module" value="Submit" onClick={this.addItem}>Add</button>
        </div>
        <div className="lists">
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
  constructor() {
    super();
    this.eval = this.eval.bind(this);
    this.state = {
      log: []
    };
  }

  eval(event) {
    if (event.charCode === 13 && event.shiftKey) {
      event.preventDefault();
      const newLogs = this.state.log.slice(0);
      const input = document.getElementById('input-cons');
      newLogs.push(input.value)
      let evaluation = input.value;
      input.value = '';
      eval(evaluation);
      this.setState({log: newLogs})
    }
  }

  render() {
    const logs = [];
    for (let k in this.state.log) {
      logs.push(< Consolelog log = {
        this.state.log[k]
      }
      key = {
        k + 'l'
      } />)
    }
    return (
      <div id='container'>
        <div id="input">
          <textarea className='input-con' id="input-cons" placeholder="Type console commands here..." onKeyPress={this.eval}></textarea>
        </div>
        <div id="log">
          <h4>Previous commands</h4>
          {logs}
        </div>
      </div>
    )
  }
}

if (document.getElementById('content')) {
  ReactDOM.render(< App />, document.getElementById('content'));
} else {
  ReactDOM.render(< Console />, document.getElementById('console'));
}
