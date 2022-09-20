import { useState } from 'react';
import PropTypes from 'prop-types';
import { getInputElementData } from '../../util/elementUtil';
import { EMAIL_REGEX } from '../../util/regexUtil';
import Messages from '../Messages';
import { EMAIL_ACTION } from '../../reduce/form/actions';

const Email = ({ dispatchAction }) => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailBlur = (event) => {
    const { inputElementValue } = getInputElementData(event);
    const matchRegex = inputElementValue.match(EMAIL_REGEX);
    if (!!matchRegex) {
      setIsValidEmail(true);
      setShowMessage(false);
      dispatchAction({ type: EMAIL_ACTION, payload: true });
    } else {
      setIsValidEmail(false);
      setShowMessage(true);
      setMessage('It is not a valid email address');
      dispatchAction({ type: EMAIL_ACTION, payload: false });
    }
  };

  return (
    <>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        autoComplete="email"
        name="email"
        type="text"
        placeholder="Email"
        className={isValidEmail ? '' : 'App-error'}
        onBlur={handleEmailBlur}
      />
      {showMessage && <Messages text={message} isError={!isValidEmail} />}
    </>
  );
};

Email.propTypes = {
  dispatchAction: PropTypes.func.isRequired,
};

export default Email;
