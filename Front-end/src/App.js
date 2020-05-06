import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Head from './components/Head/Head';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App({ history, firstName }) {
    let pages = firstName ? (
        <Switch>
            <Route exact path="/profile" render={({ history }) => <ProfilePage history={history} />} />
            <Route exact path="/" render={({ history }) => <HomePage history={history} />} />
            <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
    ) : (
        <Switch>
            <Route exact path="/login" render={({ history }) => <LoginPage history={history} />} />
            <Route exact path="/signup" render={({ history }) => <SignupPage history={history} />} />
            <Route exact path="/" render={({ history }) => <HomePage history={history} />} />
            <Route render={() => <Redirect to={{ pathname: '/login' }} />} />
        </Switch>
    );

    return (
        <div className="App">
            <Head history={history} />
            <main>{pages}</main>
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => ({
    firstName: state.user ? state.user.firstName : undefined
});

export default connect(mapStateToProps)(App);
