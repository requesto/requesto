import {MODAL} from '../actions/index';

export default function(state = [],action) {
    switch (action.type){
        case MODAL:
            return action.payload;
    }
    return state;
}
