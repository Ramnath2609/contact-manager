import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import "./styles.css";
import { startLoginUser } from '../../actions/user'
import "antd/dist/antd.css";
import { connect } from 'react-redux'

class NormalLoginForm extends React.Component {
        constructor(){
            super()
            this.state = {
                email : '',
                password : ''
            }
        }


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.dispatch(startLoginUser(values, this.props))
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div style={{padding:'40px'}}>
            <Row justify = "center">
                <Col offset={8} span={8}>
                
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1>Login</h1>
                    <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
                
            
                            </Col>
            </Row>
        </div>  
    )
        }
}


const WrappedLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default connect()(WrappedLoginForm)