import authReducer from './authreducers';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

// Combines the reducers which updates information on the auth and project property
// inside their state objects
const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer;