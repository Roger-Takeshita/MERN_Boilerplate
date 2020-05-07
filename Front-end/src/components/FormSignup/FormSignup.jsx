import React, { useState } from 'react';
import userService from '../../utils/userService';
import { signupUser } from '../../redux/user';
import { connect } from 'react-redux';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

function FormSignup({ history, signupUser }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        message: ''
    });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signupUser(form);
            history.push('/');
            signupUser();
        } catch (error) {
            setForm({ ...form, message: error.message });
        }
    };

    function isFormValid() {
        return !(form.firstName && form.lastName && form.email && form.password === form.confirmPassword);
    }

    const doneErrorMessage = () => {
        setForm({
            ...form,
            message: ''
        });
    };

    return (
        <div className="form-signup">
            <form className="form-signup__form" onSubmit={handleSubmit}>
                <div className="form-signup__form__ctrl">
                    <div className="form-signup__form__ctrl__input">
                        <label>First Name</label>
                        <input
                            required
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-signup__form__ctrl__input">
                        <label>Last Name</label>
                        <input
                            required
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-signup__form__ctrl__input">
                        <label>Email</label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-signup__form__ctrl__input">
                        <label>Password</label>
                        <input
                            required
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Password"
                            minLength="7"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-signup__form__ctrl__input">
                        <label>Confirm Password</label>
                        <input
                            required
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Confirm Password"
                            minLength="7"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-signup__form__ctrl__button">
                        <div>
                            <button
                                type="submit"
                                className="form-login__form__ctrl__button__submit"
                                disabled={isFormValid()}
                            >
                                Sign Up
                            </button>
                        </div>
                        <div>
                            <button
                                type="button"
                                className="form-signup__form__ctrl__button__cancel"
                                onClick={() => history.push('/login')}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-signup__form__error">
                    {form.message !== '' ? (
                        <ErrorMessage message={form.message} doneErrorMessage={doneErrorMessage} />
                    ) : (
                        ''
                    )}
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    signupUser: () => dispatch(signupUser())
});

export default connect(null, mapDispatchToProps)(FormSignup);
