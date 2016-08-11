import {FOLDER_ADD} from '../actions/index';

let initialState = {
    name:"Folder",
    id: 1,
    items:[
    {
        name:"/user",
        description:"Create new user",
        type:"POST"
    },
    {
        name:"/user/:id",
        description:"Get user by ID",
        type:"GET"
    },
    {
        name:"/user/:id",
        description:"Change a new User",
        type:"PUT"
    }]
}

export default function(state = [initialState],action) {
    switch (action.type){
        case FOLDER_ADD:
            return [...state,action.payload];
    }
    return state;
}
