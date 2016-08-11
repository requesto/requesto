import {FOLDER_ADD,FOLDER_ADD_ITEM} from '../actions/index';

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
        case FOLDER_ADD_ITEM:
            return state.map(function(item){
                if (item.id == action.payload.folder){
                    item.items.push({
                        name: action.payload.item.name,
                        description: action.payload.item.description,
                        type: action.payload.item.type
                    })
                }
                return item;
            });
    }
    return state;
}
