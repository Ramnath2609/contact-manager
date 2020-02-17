import React from 'react'
import { connect } from 'react-redux'
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom'

function List(props) {
    return (
        <div style={{ background: '#ECECEC', padding: '30px' }}>
            <h2>Listing contacts - { props.contacts.length }</h2>
                <Row gutter={16}>{
                    props.contacts.map(contact => {
                        return <div>
                                    <Col span = {8}>
                                        <Card title={contact.name} extra={<Link to ={`/contacts/edit/${contact._id}`}>edit</Link>} style={{ width: 300 }}>
                                        <p>{contact.mobile}</p>
                                        <p>{contact.email}</p>
                                        </Card>
                                    </Col>
                                    
                                </div>
                    })
                }
                </Row>
                
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        contacts : state.contacts
    }
}

export default connect(mapStateToProps)(List)

