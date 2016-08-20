import {TAB_ADD,TAB_DELETE} from '../actions/index';

export default function(state = [],action) {
    switch (action.type){
        case TAB_ADD:
            return [...state,action.payload];
        case TAB_DELETE:
            const tabs = state.slice();
            tabs.splice(action.payload.tab,1);
            return tabs;
    }
    return state;
}
