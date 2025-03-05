import { func } from 'prop-types';
import { memo } from 'react';

ChatExitNav.propTypes = {
  handleExit: func,
};

function ChatExitNav({ handleExit }) {
  const handleClick = () => {
    handleExit?.();
  };
  return (
    <div className="w-full h-[63px] bg-gray-100 flex items-center justify-between px-3 absolute bottom-0 z-40">
      <button
        type="button"
        onClick={handleClick}
        aria-label="채팅방 나가기"
        title="채팅방 나가기"
      >
        <svg className="w-[26px] h-[26px]">
          <use href="/stack.svg#exit" />
        </svg>
      </button>
      <div className="flex gap-4">
        <button type="button">
          <svg className="w-[26px] h-[26px]">
            <use href="/stack.svg#chatAlarm" />
          </svg>
        </button>
        <button type="button">
          <svg className="w-[26px] h-[26px]">
            <use href="/stack.svg#setting" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default memo(ChatExitNav);
