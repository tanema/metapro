import App from 'components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import authorize from 'util/authorize';
import './style/index.css';

const productPath = "/admin/products/";
function init() {
  var rootApp = document.createElement("metapro_app")
  rootApp.id = "metapro_app"
  document.body.appendChild(rootApp)
  ReactDOM.render(<App
    id={parseInt(location.pathname.replace(productPath, ""))}
    resource="product"
  />, document.getElementById('metapro_app'));
}

authorize().then(init);
