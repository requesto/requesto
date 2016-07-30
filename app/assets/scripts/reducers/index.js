import { combineReducers } from 'redux';
import Tabs from './tabs';
import Folders from './folders';

const Reducers = combineReducers({
    tabs: Tabs,
    folders: Folders,
});

export default Reducers;
