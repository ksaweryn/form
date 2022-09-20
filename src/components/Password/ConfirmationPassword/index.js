import { useState } from 'react';
import PropTypes from 'prop-types';
import { getInputElementData } from '../../../util/elementUtil';
import Messages from '../../Messages';

import './ConfirmationPassword.css';
import { PASSWORD_CONFIRMATION_ACTION } from '../../../reduce/form/actions';

const ConfirmationPassword = ({ dispatchAction }) => {
  const [isPasswordEqual, setIsPasswordEqual] = useState(true);
  const [showConfirmedPassWord, setShowConfirmedPassword] = useState(false);
  const [message, setMessage] = useState('');

  const passwordConfirmationVisibleIcon = showConfirmedPassWord
    ? '/showPassword.svg'
    : '/hidePassword.svg';

  const changePasswordConfirmationVisibility = () => {
    const element = document.getElementById('passwordConfirmation');
    if (!showConfirmedPassWord) {
      element.type = 'text';
    } else element.type = 'password';
    setShowConfirmedPassword((current) => !current);
  };

  const handlePasswordConfirmationBlur = (event) => {
    const { inputElementValue } = getInputElementData(event);
    let test = inputElementValue;
    const passwordElement = document.getElementById('password').value;
    if (test !== passwordElement) {
      setIsPasswordEqual(false);
      setMessage('Passwords are not equal');
      dispatchAction({ type: PASSWORD_CONFIRMATION_ACTION, payload: false });
      return;
    }
    setMessage('');
    setIsPasswordEqual(true);
    dispatchAction({ type: PASSWORD_CONFIRMATION_ACTION, payload: true });
  };

  return (
    <>
      <label htmlFor="passwordConfirmation">Confirm Password</label>
      <div className="ConfirmationPassword-container">
        <input
          id="passwordConfirmation"
          autoComplete="password"
          name="passwordConfirmation"
          type="password"
          placeholder="Again the previous password"
          className={`App-input ${isPasswordEqual ? '' : 'App-error'}`}
          onBlur={handlePasswordConfirmationBlur}
        />
        <img
          className="App-icon-image"
          src={passwordConfirmationVisibleIcon}
          alt="Change password visibility"
          onClick={changePasswordConfirmationVisibility}
        />
      </div>
      {message && <Messages text={message} isError={!isPasswordEqual} />}
    </>
  );
};

ConfirmationPassword.propTypes = {
  dispatchAction: PropTypes.func.isRequired,
};

export default ConfirmationPassword;
