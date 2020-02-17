import React from 'react'
import { connect } from 'react-redux'
import { Card, Col, Row } from 'antd';

function List(props) {
    return (
        <div>
            <h2>Listing contacts - { props.contacts.length }</h2>
                <Row type="flex" justify="space-around">{
                    props.contacts.map(contact => {
                        return <div>
                                    <Col span = {4}>
                                        <Card title={contact.name} extra={<a href="#">edit</a>} style={{ width: 300 }}>
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

