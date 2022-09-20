import PropTypes from 'prop-types';

import './Messages.css';

const Messages = ({ text, isError }) => {
  return (
    <span
      className={`${isError ? 'Messages-Error' : 'Messages-info'}`}
    >
      {text}
    </span>
  );
};

Messages.propTypes = {
  text: PropTypes.string.isRequired,
  isError: PropTypes.bool,
};

Messages.defaultProps = {
  isError: false,
};

export default Messages;
