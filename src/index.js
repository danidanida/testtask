import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css' 
import './index.css';
import reportWebVitals from './reportWebVitals';

import {Tree} from './components/Tree';

ReactDOM.render(
  <div>
    <Tree/>
  </div>,
  document.getElementById('global')
);
reportWebVitals();
