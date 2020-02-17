import React from 'react'
import Form from './Form'
import { connect } from 'react-redux'
import { startAddContact } from '../../actions/contacts'

function New(props){

    const handleSubmit = (formData) => {
        props.dispatch(startAddContact(formData))
    }

    return (
        <div>
            <h1>Add a new contact</h1>
            <Form handleSubmit = { handleSubmit }/>
        </div>
    )
}



export default connect()(New)
