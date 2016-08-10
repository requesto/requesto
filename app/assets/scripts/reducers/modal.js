import {MODAL} from '../actions/index';

export default function(state = [],action) {
    switch (action.type){
        case MODAL:
            console.log("MODAL reducer",action.payload);
            return action.payload;
    }
    return state;
}
