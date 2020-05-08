import React, { useState } from 'react';
import userService from '../../utils/userService';
import { loginUser } from '../../redux/user';
import { connect } from 'react-redux';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

function FormLogin({ history, loginUser }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        message: ''
    });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.loginUser(form);
            loginUser();
            history.push('/');
        } catch (error) {
            setForm({ ...form, message: error.message });
        }
    };

    function isFormValid() {
        return !(form.email && form.password);
    }

    const doneErrorMessage = () => {
        setForm({
            ...form,
            message: ''
        });
    };

    return (
        <div className="form-login">
            <form className="form-login__form" onSubmit={handleSubmit}>
                <div className="form-login__form__ctrl">
                    <div className="form-login__form__ctrl__input">
                        <label>Email</label>
                        <input
                            required
                            name="email"
                            type="email"
                            autoComplete="username"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-login__form__ctrl__input">
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
                    <div className="form-login__form__ctrl__buttons">
                        <div className="form-login__form__ctrl__buttons__part1">
                            <button
                                className={
                                    isFormValid()
                                        ? 'form-login__form__ctrl__buttons__part1__btn-submit--disabled'
                                        : 'form-login__form__ctrl__buttons__part1__btn-submit'
                                }
                                type="submit"
                                disabled={isFormValid()}
                            >
                                Log In
                            </button>
                        </div>
                        <div className="form-login__form__ctrl__buttons__part2">
                            <button
                                type="button"
                                className="form-login__form__ctrl__buttons__part2__btn-cancel"
                                onClick={() => history.push('/signup')}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-login__form__error">
                    {form.message !== '' ? (
                        <ErrorMessage message={form.message} doneErrorMessage={doneErrorMessage} />
                    ) : (
                        ''
                    )}
                </div>
            </form>
            <table className="form-login__table">
                <tbody>
                    <tr>
                        <th className="form-login__table__column-one">Email</th>
                        <th className="form-login__table__column-two">test@test.com</th>
                    </tr>
                    <tr>
                        <td className="form-login__table__column-one">Password</td>
                        <td className="form-login__table__column-two">test123</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: () => dispatch(loginUser())
});

export default connect(null, mapDispatchToProps)(FormLogin);
