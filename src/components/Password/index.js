import { useState } from 'react';
import PropTypes from 'prop-types';
import { getInputElementData } from '../../util/elementUtil';
import { PASSWORD_REGEX } from '../../util/regexUtil';
import Messages from '../Messages';
import Tooltip from '../Tooltip';
import { randomPassword } from '../../util/textUtil';

import './Password.css';

const INFO_ICON = '/info.svg';

const Password = ({ setState }) => {
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const passwordVisibleIcon = showPassword
    ? '/showPassword.svg'
    : '/hidePassword.svg';

  const handlePasswordBlur = (event) => {
    const { inputElementValue } = getInputElementData(event);
    const hasPasswordRequirements = inputElementValue.match(PASSWORD_REGEX);
    if (!hasPasswordRequirements) {
      setIsValidPassword(false);
      setMessage('Not valid password');
      setState(false);
      return;
    }
    setMessage('');
    setIsValidPassword(true);
    setState(true);
  };

  const changePasswordVisibility = () => {
    const element = document.getElementById('password');
    if (!showPassword) {
      element.type = 'text';
    } else element.type = 'password';
    setShowPassword((current) => !current);
  };

  const handleTooltipClick = () => {
    const newPassword = randomPassword();
    const element = document.getElementById('password');
    element.focus();
    element.value = newPassword;
    navigator.clipboard.writeText(newPassword);
  };

  const handleInfoClick = () => {
    if (!message.length) {
      setMessage(
        'Password should have a minimuin length of 8 with at least: 1 lower case, 1 upper case, 1 number, 1 symbol'
      );
    } else {
      setMessage('');
    }
  };

  return (
    <>
      <label htmlFor="password" className="Password-label">
        Password
        <img
          className="Password-icon-image"
          src={INFO_ICON}
          alt="Change password visibility"
          onClick={handleInfoClick}
        />
      </label>
      <div className="App-input-container">
        <Tooltip
          tooltipText={'Generate password'}
          clickedText={'Password copied, please save it!'}
          isClickable={true}
          handleTooltipClick={handleTooltipClick}
        >
          <input
            id="password"
            autoComplete="password"
            minLength={8}
            name="password"
            type="password"
            placeholder="Password"
            className={`App-input ${isValidPassword ? '' : 'App-error'}`}
            onBlur={handlePasswordBlur}
          />
        </Tooltip>
        <img
          className="App-icon-image"
          src={passwordVisibleIcon}
          alt="Change password visibility"
          onClick={changePasswordVisibility}
        />
      </div>
      {message && <Messages text={message} isError={!isValidPassword} />}
    </>
  );
};

Password.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default Password;
