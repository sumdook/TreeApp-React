import React from 'react';

import AuthUserContext from '../Session/AuthUserContext';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../Session/withAuthorization';

const styles = {
      formStyle : {
        maxWidth:'500px',
        margin:'auto', 
        marginTop:'20vh', 
        padding:'50px',
        borderRadius:'9px',
        boxShadow: '2px 3px 68px -4px rgba(0,0,0,0.28)'
      },
      textStyle : {
        maxWidth:'500px',
        margin:'auto',  
        padding:'0 90px',
        borderRadius:'9px',
      }
    }

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div style={styles.formStyle}>
        <h2 style={styles.textStyle} >Account: {authUser.email}</h2>
        <PasswordChangeForm />
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);