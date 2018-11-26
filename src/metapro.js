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

  const id = parseInt(location.pathname.replace(productPath, ""));
  ReactDOM.render(<App id={id} resource="product"/>, document.getElementById('metapro_app'));
}

authorize().then(init);
