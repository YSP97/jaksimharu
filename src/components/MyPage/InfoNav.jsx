import { signOut } from '@/api/user';
import InfoContent from './InfoContent';
import { useNavigate } from 'react-router-dom';
import { object } from 'prop-types';
import pb from '@/api/pb';
import useCategoryStore from '@/stores/useCategoryStore';

InfoNav.propTypes = {
  user: object,
};

function InfoNav({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      pb.authStore.clear();
      useCategoryStore.getState().clearStore();
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col gap-[18px] p-4">
      <InfoContent>설정</InfoContent>
      <InfoContent>서비스 정보</InfoContent>
      <InfoContent>공지사항</InfoContent>
      <InfoContent
        isMoreInfo={true}
        userId={user.nickname}
        handleLogout={handleLogout}
      >
        로그아웃
      </InfoContent>
    </div>
  );
}

export default InfoNav;
