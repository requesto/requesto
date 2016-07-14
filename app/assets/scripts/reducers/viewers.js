import {VIEWER_ADD} from '../actions/index';

const initialState = []

export default function(state = initialState,action) {
    switch (action.type){
        case {VIEWER_ADD}:
            return [...action.payload,initialState]; //concat
    }
    return state;
}
