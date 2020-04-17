import { combineReducers } from 'redux';

const INITIAL_VALUE = {
    message: 'Startup message from messageReducer',
    doctors: [{ physician: "Daffy" }, { physician: "Woody" }, { physician: "Jimmy" }, { physician: "RoadRunner" }],
    patients: []
};

// reducer #1
const messageReducer = (state = INITIAL_VALUE, action) => {
    console.log("in messageReducer .. " + state.message)
    // handle action types here...
    //if (action.type === ActionTypes.UPDATE_MESSAGE) {
    if (action.type === 'UPDATE_MESSAGE') {
        //console.log("before in messageReducer action ", state);
        //console.log("before2 in messageReducer action ", action.value);
        return {
            ...state, message: action.value
        }
    } else if (action.type === 'UPDATE_DOCTORS') {
        //console.log("before in messageReducer doctors action ", state);
        console.log("messageReducer doctors action ", action.value);
        return {
            ...state, doctors: action.value
        }
    } else if (action.type === 'UPDATE_PATIENTS') {
        //console.log("before in messageReducer doctors action ", state);
        console.log("messageReducer patients action ", action.value);
        return {
            ...state, patients: action.value
        }
    }
    else
        return state;
}

const CUSTOMER_VALUE = {
    name: 'Arnold Palmer',
    address: "100 Main St",
    city: "Omaha"
};

// reducer #2
const customerReducer = (state = CUSTOMER_VALUE, action) => {
    console.log("in customerReducer .. " + state.name + " " + state.address)
    // handle action types here...
    //if (action.type === ActionTypes.UPDATE_MESSAGE) {
    if (action.type === 'UPDATE_CUSTOMER') {
        console.log("before in customerReducer action ", state);
        console.log("before2 in customerReducer action ", action.name);
        return {
            ...state,
            name: action.name
        }
    } else
        return state;
}

export default combineReducers({
    messageValue: messageReducer,
    customerValue: customerReducer
});