import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './index.css'
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;



const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    const { getFieldDecorator } = this.props.form;

    const styles = {
      formStyle : {
        margin:'auto', 
        marginTop:'20vh', 
        padding:'50px',
       
        borderRadius:'9px',
        boxShadow: '2px 3px 68px -4px rgba(0,0,0,0.28)'
      }
    }


    return (
      <Form onSubmit={this.onSubmit} className="login-form" style={styles.formStyle}>
        
         <FormItem>
          {getFieldDecorator('userName', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            },
            { required: true, message: 'Please input your email' }],
          })(
            <Input 
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))} 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email" />
          )}
        </FormItem>
       
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input onChange={event => this.setState(updateByPropertyName('password', event.target.value))} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href=""><Link to={routes.PASSWORD_FORGET}>Forgot password?</Link></a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href=""><Link to={routes.SIGN_UP}>register now!</Link></a>
        </FormItem>
        

        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}

const WrappedSignInForm = Form.create()(SignInForm);

export default withRouter(WrappedSignInForm);

export {
  WrappedSignInForm,
};
