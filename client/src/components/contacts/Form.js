import React from 'react'
import { Form, Input, Row, Col, Icon, Button } from 'antd'
import { connect } from 'react-redux'


class ContactForm extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            email : props.contact ? props.contact.email : '',
            name : props.contact ? props.contact.name : '',
            mobile : props.contact ? props.contact.mobile : '',
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name ] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values)
            this.props.handleSubmit(values)
          }
        })
        
    }
    


    render () {
        const { getFieldDecorator } = this.props.form;
    return (
        <div style={{padding:'40px'}}>
            <Row justify = "center">
                <Col offset={8} span={8}>
                
                <Form onSubmit={this.handleSubmit} className="login-form">
                    
                    <Form.Item>
                    {getFieldDecorator('name', {
                        initialValue : this.state.name,
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" name = "name"  onChange = { this.handleChange } style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Name"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('email', {
                        initialValue : this.state.email,
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                        prefix={<Icon type="mail" name = "email"   onChange = { this.handleChange } style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('mobile', {
                        initialValue : this.state.mobile,
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                        prefix={<Icon type="mobile" name="mobile"   onChange = { this.handleChange } style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="mobile"
                        placeholder="Mobile"
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Add
                    </Button>
                    </Form.Item>
                </Form>
                
            
                            </Col>
            </Row>
        </div>  
    )
    }
}

const WrappedContactForm = Form.create({ name: 'normal_login' })(ContactForm);

export default connect()(WrappedContactForm)
