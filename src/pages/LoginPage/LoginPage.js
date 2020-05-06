import React from 'react';
import FormLogin from '../../components/FormLogin/FormLogin';

function LoginPage({ history }) {
    return (
        <div>
            <FormLogin history={history} />
        </div>
    );
}

export default LoginPage;
