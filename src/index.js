// 3rd-party libs
import React from 'react';
import ReactDOM from 'react-dom';
import { setNodeUri } from 'oo7-substrate'

// our own code
import ReactiveApp from './components/App';
import * as serviceWorker from './serviceWorker';

// our assets
import './assets/css/index.css';

setNodeUri(['ws://127.0.0.1:9944/']);

ReactDOM.render(<ReactiveApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
