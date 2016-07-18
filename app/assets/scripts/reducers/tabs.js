import {TAB_ADD} from '../actions/index';

const initialState = {
    name: "untitled"
}

export default function(state = [initialState],action) {
    switch (action.type){
        case TAB_ADD:
            console.log("TAB_ADD reducer",action.payload);
            return [...state,action.payload];
    }
    return state;
}
