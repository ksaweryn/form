import { useReducer, useState } from 'react';
import './App.css';
import Email from './components/Email';
import Messages from './components/Messages';
import Password from './components/Password';
import ConfirmationPassword from './components/Password/ConfirmationPassword';
import UserName from './components/UserName';
import users, { addUser } from './data/users';
import { USERNAME_ACTION } from './reduce/form/actions';
import { formInitialState } from './reduce/form/formInitialState';
import { formReducer } from './reduce/form/reducer';

function App() {
  const [state, dispatch] = useReducer(formReducer, formInitialState);

  const [message, setMessage] = useState('');
  const isValidForm =
    state.usernameState &&
    state.emailState &&
    state.passwordState &&
    state.passwordConfirmationState;

  const handleSubmit = (event) => {
    const formElement = event.target.form;
    const [user, email, password, passwordConfirmation] = formElement;
    const response = addUser(user.value, email.value);
    if (response === false) {
      setMessage(
        `User ${user.value} or email ${email.value} already used, please change it`
      );
    } else {
      setMessage('Welcome to the future!');
      user.value = null;
      email.value = null;
      password.value = null;
      passwordConfirmation.value = null;
      dispatch({ type: USERNAME_ACTION, payload: false });
      console.dir(users);
    }

    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Hello to #futureShaper</h3>
        <p>Please register to start shaping the future</p>
      </header>
      {message && (
        <Messages text={message} isError={message.indexOf('future') === -1} />
      )}
      <div className="App-form-container">
        <form className="App-form" autoComplete="on">
          <UserName dispatchAction={dispatch} />
          <Email dispatchAction={dispatch} />
          <Password dispatchAction={dispatch} />
          <ConfirmationPassword dispatchAction={dispatch} />

          <div className="App-form-actions">
            <input
              type="button"
              value="Let's shape the future"
              className="App-button"
              disabled={!isValidForm}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
