import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

// Components
import App from './components/app';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const routerHistory = useRouterHistory(createHashHistory)({queryKey:false})
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers,devTools)}>
        <Router history={routerHistory} onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/" component={App}>
                <IndexRoute component={App} />
            </Route> 
            <Route path="*" component={App}/>
        </Router>
    </Provider>
,document.querySelector('.app'));



// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//
// const Axios = require('axios');
// const $ = require("jquery");
// jQuery = $;
// require("jquery.json-viewer/json-viewer/jquery.json-viewer");
// // const {ipcMain} = require('electron');
// //
// // console.log(ipcMain);
//
//
// $(".bar .input-button").click(function() {
//
//     const action = $(".bar .input-action").val();
//     const url = $(".bar .input-url").val();
//
//     $('#json-renderer').html("Carregando....");
//
//     Axios({
//         method: action,
//         url: url
//     }).then(function(response) {
//         // $(".result").html(JSON.stringify(response));
//         $('#json-renderer').jsonViewer(response);
//     })
//     .catch(function(error) {
//         // $(".result").html(JSON.stringify(error));
//         $('#json-renderer').jsonViewer(error);
//     });
// })
