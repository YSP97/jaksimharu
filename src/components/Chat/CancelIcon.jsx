import { memo } from 'react';
import { func } from 'prop-types';

CancelIcon.PropTypes = {
  onClose: func,
};

function CancelIcon({ onClose }) {
  return (
    <button type="button" onClick={onClose}>
      <svg className="w-4 h-4">
        <use href="/stack.svg#close" />
      </svg>
    </button>
  );
}

export default memo(CancelIcon);
