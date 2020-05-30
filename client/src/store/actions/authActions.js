import firebase from '../../config/firebase';

export const logIn = (credentials) => {
  return (dispatch, getState) => {

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      // window.location = 'menu';
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err});
    })
  }
};

export const logOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'LOGOUT_SUCCESS' });
    })
  }
}