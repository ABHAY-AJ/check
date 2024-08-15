import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import jobReducer from './jobReducer';
import internshipReducer from './internshipReducer';
import courseReducer from './courseReducer';
import resumeReducer from './resumeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  events: eventReducer,
  jobs: jobReducer,
  internships: internshipReducer,
  courses: courseReducer,
  resume:resumeReducer,
});

export default rootReducer;
