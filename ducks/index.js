import { combineReducers } from "redux";
import informationScreen from './informationScreen';
import tabScreen from './tabScreen';
import detailScreen from './detailScreen';

export default combineReducers({
    informationScreen,
    tabScreen,
    detailScreen
})