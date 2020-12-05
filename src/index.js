import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css' 
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Tree} from './components/Tree';

import { startMirage } from './server-mock'

if (process.env.NODE_ENV === 'development') {
  startMirage()
}  

ReactDOM.render(
  <div>
    <Tree/>
  </div>,
  document.getElementById('global')
);
reportWebVitals();
