// 3rd-party libs
import React from 'react';
import ReactDOM from 'react-dom';

// our own code
import App from './components/App';

// our own libraries
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('app-root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
