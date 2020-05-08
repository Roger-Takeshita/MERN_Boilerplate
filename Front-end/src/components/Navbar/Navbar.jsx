import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/user';
import userService from '../../utils/userService';

import ModalMessage from '../ModalMessage/ModalMessage';

function Navbar({ history, firstName, lastName, logoutUser }) {
    const [showModal, setShowModal] = useState(false);

    const logoutUserFromApp = () => {
        logoutUser();
        history.push('/');
    };

    const handleDeleteAcc = () => {
        setShowModal('true');
    };

    const handleCancelModal = () => {
        setShowModal(false);
    };

    const handleOkModal = async () => {
        try {
            setShowModal(false);
            await userService.deleteUser();
            logoutUserFromApp();
        } catch (error) {
            console.log(error);
        }
    };

    const navbar = firstName ? (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/delete" onClick={handleDeleteAcc}>
                    Delete Profile
                </Link>
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
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/login">Log In</Link>
            </li>
            <li>
                <Link to="/signup">Sign Up</Link>
            </li>
        </ul>
    );

    return (
        <div className="my-navbar">
            {navbar}
            <ModalMessage
                title="Delete Account"
                message={
                    <>
                        <p>Are you sure you want to delete your account?</p>
                        <p>
                            This processes is irreversible. Please click on <strong>Confirm</strong> to
                            processed.
                        </p>
                    </>
                }
                cancelLabel="Cancel"
                okLabel="Confirm"
                handleCancelModal={handleCancelModal}
                handleOkModal={handleOkModal}
                showModal={showModal}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    firstName: state.user ? state.user.firstName : undefined,
    lastName: state.user ? state.user.lastName : undefined
});

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
