import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, useRouterHistory} from 'react-router'
import { createHashHistory } from 'history'
import ReduxPromise from 'redux-promise';
import Reducers from './reducers';

// Components
import App from './components/app';
import Index from './components/index';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const routerHistory = useRouterHistory(createHashHistory)({queryKey:false})
const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(Reducers,devTools)}>
        <Router history={routerHistory} onUpdate={() => window.scrollTo(0, 0)}>
            <Route path="/" component={App}>
                <IndexRoute component={Index}/>
            </Route>
        </Router>
    </Provider>
,document.querySelector('.component-root'));
