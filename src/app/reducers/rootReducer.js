import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';

const rootReducer = combineReducers({
      events: eventReducer,
      form: FormReducer,
      modals: modalReducer
})

export default rootReducer;