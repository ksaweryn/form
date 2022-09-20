import PropTypes from 'prop-types';
import { useState } from 'react';

import './Tooltip.css';

const Tooltip = ({
  tooltipText,
  isClickable,
  clickedText,
  handleTooltipClick,
  children,
}) => {
  const [text, setText] = useState(tooltipText);

  const handleClick = () => {
    if (isClickable) {
      handleTooltipClick();
      setText(clickedText);
      setTimeout(() => {
        setText(tooltipText);
      }, 1500);
    }
  };

  return (
    <div className="Tooltip">
      {children}
      <span
        className={`Tooltip-text ${isClickable ? 'Tooltip-clickable' : ''}`}
        onClick={handleClick}
      >
        {text}
      </span>
    </div>
  );
};

Tooltip.propTypes = {
  tooltipText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  clickedText: PropTypes.string,
  isClickable: PropTypes.bool,
  handleTooltipClick: PropTypes.func,
};

Tooltip.defaultProps = {
  clickedText: '',
  isClickable: false,
  handleTooltipClick: () => {},
};

export default Tooltip;
