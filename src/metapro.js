import App from 'components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import authorize from 'util/authorize';
import './style/index.css';

const productPath = "/admin/products/";
const expectedPaths = [productPath];

function addApp(path) {
  if(path.startsWith(productPath)) {
    authorize().then((auth) => {
      var rootApp = document.createElement("metapro_app")
      rootApp.id = "metapro_app"
      document.body.appendChild(rootApp)
      ReactDOM.render(<App
        auth={auth}
        id={parseInt(path.replace(productPath, ""))}
        resource="product"
      />,
        document.getElementById('metapro_app'));
    })
  }
}

let path;
setInterval(() => {
  if(path == location.pathname) {
    return
  }
  path = location.pathname;
  let appEl = document.getElementById('metapro_app');
  if (!appEl) {
    for (let i = 0; i < expectedPaths.length; i++) {
      if(path.startsWith(expectedPaths[i])) {
        addApp(path)
        return
      }
    }
  }
  appEl.parentNode.removeChild(appEl);
}, 100)
