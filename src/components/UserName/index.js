import { useState } from 'react';
import PropTypes from 'prop-types';
import { getInputElementData } from '../../util/elementUtil';
import { getLastCharacterTyped } from '../../util/textUtil';
import { INVALID_USERNAME_CHARACTERS_REGEX } from '../../util/regexUtil';
import Messages from '../Messages';
import './UserName.css';

const EMPTY_CHAR = '';
const INFO_ICON = '/info.svg';

const isValidPassword = (newPassword) =>
  newPassword.match(INVALID_USERNAME_CHARACTERS_REGEX);

const UserName = ({ setState }) => {
  const [hasInputError, setHasInputError] = useState(false);
  const [message, setMessage] = useState('');

  const handleUsernameChange = (event) => {
    const { inputElement, inputElementValue } = getInputElementData(event);

    const hasNotValidCharacter = isValidPassword(inputElementValue);
    if (hasNotValidCharacter) {
      setMessage(
        `You typed "${getLastCharacterTyped(inputElementValue)}", not valid`
      );
      inputElement.value = inputElement.value.replaceAll(
        INVALID_USERNAME_CHARACTERS_REGEX,
        EMPTY_CHAR
      );
      setHasInputError(true);
      setState(false);
      return;
    }
    setMessage('');
    setState(true);
    setHasInputError(false);
  };

  const handleInfoClick = () => {
    if (!message.length) {
      setMessage('Please only use letters and numbers');
    } else {
      setMessage('');
    }
  };

  return (
    <>
      <label htmlFor="username" className="UserName-label">
        Username
        <img
          className="UserName-icon-image"
          src={INFO_ICON}
          alt="Change password visibility"
          onClick={handleInfoClick}
        />
      </label>

      <div className="App-input-container">
        <input
          id="username"
          autoComplete="username"
          name="username"
          type="text"
          placeholder="Username"
          className={`UserName ${hasInputError ? 'App-error' : ''}`}
          onChange={handleUsernameChange}
          onBlur={handleUsernameChange}
        />
      </div>
      {message && <Messages text={message} isError={hasInputError} />}
    </>
  );
};

UserName.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default UserName;
