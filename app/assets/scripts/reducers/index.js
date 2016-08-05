import { combineReducers } from 'redux';
import Tabs from './tabs';
import Folders from './folders';
import Modal from './modal';

const Reducers = combineReducers({
    tabs: Tabs,
    folders: Folders,
    modal: Modal,
});

export default Reducers;
