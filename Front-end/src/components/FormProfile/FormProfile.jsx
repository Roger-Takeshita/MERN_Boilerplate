import React, { useState, useEffect } from 'react';
import userService from '../../utils/userService';
import { updateUser } from '../../redux/user';
import { connect } from 'react-redux';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

function FormProfile({ history, updateUser, firstName, lastName }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        message: ''
    });

    useEffect(() => {
        async function getProfile() {
            try {
                const user = await userService.getUserProfile();
                setForm({
                    firstName: firstName,
                    lastName: lastName,
                    email: user.email,
                    password: '',
                    newPassword: '',
                    confirmNewPassword: '',
                    message: ''
                });
            } catch (error) {
                setForm({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    newPassword: '',
                    confirmNewPassword: '',
                    message: error.message
                });
            }
        }
        getProfile();
    }, [setForm, firstName, lastName]);

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateUser(form);
            updateUser();
            setForm({
                ...form,
                firstName,
                lastName,
                password: '',
                newPassword: '',
                confirmNewPassword: '',
                message: ''
            });
        } catch (error) {
            setForm({ ...form, message: error.message });
        }
    };

    function isFormValid() {
        return !(
            form.firstName &&
            form.lastName &&
            form.email &&
            form.newPassword === form.confirmNewPassword &&
            form.password
        );
    }

    const doneErrorMessage = () => {
        setForm({
            ...form,
            message: ''
        });
    };

    return (
        <div className="form-profile">
            <form className="form-profile__form" onSubmit={handleSubmit}>
                <div className="form-profile__form__ctrl">
                    <div className="form-profile__form__ctrl__input">
                        <label>First Name</label>
                        <input
                            required
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-profile__form__ctrl__input">
                        <label>Last Name</label>
                        <input
                            required
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-profile__form__ctrl__input">
                        <label>Email</label>
                        <input
                            required
                            disabled
                            name="email"
                            type="email"
                            placeholder="Email"
                            autoComplete="username"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-profile__form__ctrl__input">
                        <label>New Password</label>
                        <input
                            name="newPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="New Password"
                            minLength="7"
                            value={form.newPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-profile__form__ctrl__input">
                        <label>Confirm Password</label>
                        <input
                            name="confirmNewPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Confirm New Password"
                            minLength="7"
                            value={form.confirmNewPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-profile__form__ctrl__input">
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
                    <div className="form-profile__form__ctrl__buttons">
                        <div className="form-profile__form__ctrl__buttons__part1">
                            <button
                                type="submit"
                                className={
                                    isFormValid()
                                        ? 'form-profile__form__ctrl__buttons__part1__btn-submit--disabled'
                                        : 'form-profile__form__ctrl__buttons__part1__btn-submit'
                                }
                                disabled={isFormValid()}
                            >
                                Update
                            </button>
                        </div>
                        <div className="form-profile__form__ctrl__buttons__part2">
                            <button
                                type="button"
                                className="form-profile__form__ctrl__buttons__part2__btn-cancel"
                                onClick={() => history.push('/login')}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-profile__form__error">
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

const mapStateToProps = (state) => ({
    firstName: state.user.firstName,
    lastName: state.user.lastName
});

const mapDispatchToProps = (dispatch) => ({
    updateUser: () => dispatch(updateUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(FormProfile);
