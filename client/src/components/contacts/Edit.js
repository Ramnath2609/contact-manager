import React from 'react'
import { connect } from 'react-redux'
import Form from './Form'
import { startEditContact } from '../../actions/contacts'

function Edit (props){

    const handleSubmit = (formData) => {
        const id = props.contact._id
        props.dispatch(startEditContact(formData, id))
    }

    return (
        <div>
            <h1>Edit</h1>
            <Form contact = { props.contact } handleSubmit = { handleSubmit } />
        </div>
    )
}



const mapStateToProps = (state, props) => {
    return {
        contact : state.contacts.find(contact => contact._id == props.match.params.id)
    }
}

export default connect(mapStateToProps)(Edit)