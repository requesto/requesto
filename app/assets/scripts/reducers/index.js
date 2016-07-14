import { combineReducers } from 'redux';
import Viewers from './viewers';

const Reducers = combineReducers({
    viewers: Viewers
});

export default Reducers;
