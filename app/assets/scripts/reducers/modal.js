import {MODAL_OPEN} from '../actions/index';

export default function(state = [],action) {
    switch (action.type){
        case MODAL_OPEN:
            console.log("MODAL_OPEN reducer",action.payload);
            return action.payload;
    }
    return state;
}
