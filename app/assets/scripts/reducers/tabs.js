import {TAB_ADD} from '../actions/index';

export default function(state = [],action) {
    switch (action.type){
        case TAB_ADD:
            console.log("TAB_ADD reducer",action.payload);
            return [...state,action.payload];
    }
    return state;
}
