import axios from 'axios'
import Swal from 'sweetalert2'

export const setContacts = (contacts) => {
    return {
        type : 'SET_CONTACTS',
        payload : contacts 
    }
}

export const editContact = (contact) => {
    return {
        type : 'EDIT_CONTACT',
        payload : contact
    }
}

export const addContact = (contact) => {
    return {
        type : 'ADD_CONTACT',
        payload : contact
    }
}

export const startGetContacts = () => {
    return dispatch => {
        axios.get('http://localhost:3434/contacts', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            const contacts = response.data
            dispatch(setContacts(contacts))
        })
    }
}

export const startAddContact = (formdata) => {
    return dispatch => {
        axios.post('http://localhost:3434/contacts', formdata, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')){
                Swal.fire('Oops !', 'Somwething went wrong', 'error')
            }
            const contact = response.data
            dispatch(addContact(contact))
            Swal.fire('Good job !', 'Contact has been added', 'success')
            window.location.href = "/contacts"
        })
    }
}

export const startEditContact = (formdata, id) => {
    return dispatch => {
        axios.put(`http://localhost:3434/contacts/${id}`, formdata, {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            console.log(response)
            if(response.data.hasOwnProperty('errors')){
                Swal.fire('Oops !', 'Somwething went wrong', 'error')
            }
            const contact = response.data
            dispatch(editContact(contact))
            Swal.fire('Good job !', 'Contact has been edited', 'success')
            window.location.href = "/contacts"
        })
    }
}