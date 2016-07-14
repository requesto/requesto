import {VIEWER_ADD} from '../actions/index';

const initialState = {
    name: "initial"
}

export default function(state = [initialState],action) {
    switch (action.type){
        case VIEWER_ADD:
            console.log("VIEWER_ADD reducer",action.payload);
            state = [...action.payload,initialState]
            return state;
    }
    return state;
}
