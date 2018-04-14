import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';


import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


const PasswordForgetPage = () =>
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;


    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }


  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    const styles = {
      formStyle : {
        maxWidth:'400px',
        margin:'auto', 
        marginTop:'20vh', 
        padding:'50px',
        borderRadius:'9px',
        boxShadow: '2px 3px 68px -4px rgba(0,0,0,0.28)'
      }
    }
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.onSubmit} style={styles.formStyle} >
        <FormItem
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input onChange={event => this.setState(updateByPropertyName('email', event.target.value))} />
          )}
        </FormItem>
        <FormItem style={{margin:'auto'}}>
          <Button type="primary" htmlType="submit">Reset Password</Button>
          <Button type="primary" style={{margin:'0 10px'}}><Link to={routes.SIGN_IN}>Back</Link></Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedPasswordForgetForm = Form.create()(PasswordForgetForm);

export default withRouter(WrappedPasswordForgetForm);

export {
  WrappedPasswordForgetForm
};
