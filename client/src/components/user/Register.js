import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import "./styles.css";
import "antd/dist/antd.css";

class NormalRegistrationForm extends React.Component {
    constructor() {
        super ()
        this.state = {
            username : '',
            email : '',
            password : '',
            mobile : ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div style={{padding:'40px'}}>
            <Row justify = "center">
                <Col offset={8} span={8}>
                <h1>Register with us</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" name = "username" onChange = { this.handleChange } style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                        prefix={<Icon type="mail" name ="email" onChange = { this.handleChange } style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: 'Please input your mobile number!' }],
                    })(
                        <Input
                        prefix={<Icon type="mobile" name = "mobile " onChange = { this.handleChange } style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Mobile"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" name = "password" onChange = { this.handleChange } style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                    </Form.Item>
                </Form>
                
            
                            </Col>
            </Row>
        </div>  
    )
        }
}

const WrappedRegistrationForm = Form.create({ name: 'normal_login' })(NormalRegistrationForm);


export default WrappedRegistrationForm