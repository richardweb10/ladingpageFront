import { combineReducers } from 'redux';
import users from './usersReducer';
import companies from './companyReducer';

export default combineReducers({
  users,
  companies,
});
