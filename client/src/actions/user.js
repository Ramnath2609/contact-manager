import axios from 'axios'
import { setContacts } from './contacts'
import Swal from 'sweetalert2'

export const setUser = (user) => {
    return {
        type : 'SET_USER',
        payload : user
    }
}

export const startLoginUser = (formData, props) => {
    return dispatch => {
        axios.post('http://localhost:3434/users/login', formData , {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        .then(response => {
            if(response.data.hasOwnProperty('errors')) {
                Swal.fire('oops!', 'Something went wrong', 'error')
            }
            const { user, token } = response.data
                localStorage.setItem('authToken', token)
                dispatch(setUser(user))
                
                //Swal.fire('Good job', 'Successsfully logged in', 'success')
                
                return axios.get('http://localhost:3434/contacts', {
                    headers : {
                        'x-auth' : token
                    }
                })
                
           
        })
        .then(response => {
            const contacts = response.data
            dispatch(setContacts(contacts))
            //props.history.push('/')
            window.location.href = "/"
        })
        .catch(err => {
            alert(err)
        })
    }
}

export const startSetUser = () => {
    return dispatch => {
        const req1 = axios.get('http://localhost:3434/users/account', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        const req2 = axios.get('http://localhost:3434/contacts', {
            headers : {
                'x-auth' : localStorage.getItem('authToken')
            }
        })
        Promise.all([req1, req2])
            .then(responses => {
                const [ user, contacts ] = responses
                dispatch(setUser(user.data))
                dispatch(setContacts(contacts.data))
            })
    }
}