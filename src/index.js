import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './pages/Home';
import UserList from './pages/user/UserList';
import UserAddPage from './pages/user/UserAdd';
ReactDOM.render((
    <Router basename="/">
        <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/user" component={UserList}/>
            <Route exact path="/user/add"  component={UserAddPage}/>
            <Route exact path="/user/add/:id"  component={UserAddPage}/>
        </Switch>
    </Router>
), document.getElementById('app'));