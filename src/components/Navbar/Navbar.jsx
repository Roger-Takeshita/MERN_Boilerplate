import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/user';

function Navbar({ history, username, logoutUser }) {
    const logoutUserFromApp = () => {
        logoutUser();
        history.push('/');
    };

    const navbar = username ? (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/logout" onClick={logoutUserFromApp}>
                    Log Out
                </Link>
            </li>
        </ul>
    ) : (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/login">Log In</Link>
            </li>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
        </ul>
    );
    return <div className="my-navbar">{navbar}</div>;
}

const mapStateToProps = (state) => ({
    username: state.user ? state.user.firstName : undefined
});

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
