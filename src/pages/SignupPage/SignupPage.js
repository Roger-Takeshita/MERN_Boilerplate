import React from 'react';
import FormSignup from '../../components/FormSignup/FormSignup';

function SignupPage({ history }) {
    return (
        <div>
            <FormSignup history={history} />
        </div>
    );
}

export default SignupPage;
