import React from 'react';
import { connect } from 'react-redux';

import FormProfile from '../../components/FormProfile/FormProfile';

function ProfilePage({ history, firstName, lastName }) {
    return (
        <div>
            <h1>
                {firstName} {lastName}'s Profile
            </h1>
            <FormProfile history={history} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    firstName: state.user.firstName,
    lastName: state.user.lastName
});

export default connect(mapStateToProps)(ProfilePage);
