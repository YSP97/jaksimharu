import { memo, useEffect, useRef } from 'react';
import pb from '@/api/pb';
import { useNavigate } from 'react-router-dom';
import CancelIcon from './CancelIcon';
import { array, bool, func, string } from 'prop-types';
import ChatUser from './ChatUser';
import gsap from 'gsap';

ChatModal.propTypes = {
  isOpened: bool.isRequired,
  users: array,
  roomId: string,
  authUserId: string,
  onClose: func,
};

function ChatModal({ users, roomId, authUserId, onClose }) {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // 모달 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => onClose(),
      });
    } else {
      onClose();
    }
  };

  const handleExit = async (e) => {
    e.stopPropagation();
    if (confirm('채팅방을 나가시겠습니까?')) {
      try {
        const roomData = await pb.collection('ChatRooms').getOne(roomId);

        const updatedUsers = roomData.user.filter(
          (userId) => userId !== authUserId
        );

        await pb.collection('ChatRooms').update(roomId, {
          user: updatedUsers,
        });

        navigate(-1);
      } catch (error) {
        console.error('채팅방에서 유저 데이터 삭제를 실패했습니다.:', error);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[99] flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-white max-w-[300px] w-full max-h-[500px] h-full shadow-lg flex flex-col rounded-lg"
      >
        <div className="flex flex-col flex-grow overflow-y-auto">
          <div className="flex flex-row justify-between border-b p-2">
            <h3 className="text-[14px]">참여중인 이웃</h3>
            <CancelIcon onClose={handleClose} />
          </div>
          {users.map((user) => (
            <ChatUser
              key={user.id}
              userName={user.nickname}
              userImg={
                user.avatar
                  ? pb.files.getUrl(user, user.avatar)
                  : '/favicon.svg'
              }
              userLink={`/profile/${user.id}`}
            />
          ))}
        </div>

        <div className="w-full h-[63px] bg-gray-100 flex items-center justify-between px-3 rounded-b-lg">
          <button
            type="button"
            onClick={handleExit}
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
      </div>
    </div>
  );
}

export default memo(ChatModal);
