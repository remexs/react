import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './pages/Home';
import UserAddPage from './pages/user/UserAdd';
ReactDOM.render((
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/user/add" component={UserAddPage}/>
        </Switch>
    </Router>
), document.getElementById('app'));