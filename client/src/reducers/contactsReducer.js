const contactsIntialState = []

const contactsReducer = (state = contactsIntialState, action) => {
    switch(action.type){
        case 'SET_CONTACTS' : {
            return action.payload
        }
        case 'ADD_CONTACT' : {
            return [...state, action.payload]
        }
        default : {
            return [...state]
        }
    }
}
export default contactsReducer