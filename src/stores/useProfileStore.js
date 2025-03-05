import pb from '@/api/pb';
import { create } from 'zustand';

const useProfileStore = create((set) => ({
  userList: [],
  user: {},
  job: null,
  license: null,
  nickname: null,

  fetchUserData: () => {
    const authUser = pb.authStore.model;

    if (!authUser?.id) {
      console.warn('로그인 정보 없음. fetchUserData 실행 중단');
      return;
    }

    pb.collection('users')
      .getOne(authUser.id)
      .then((user) => set({ user }))
      .catch((error) => {
        console.error('사용자 정보 조회 실패:', error);
      });
  },

  setJob: (job) => {
    set({ job });
  },
  setLicense: (license) => {
    set({ license });
  },
  setNickname: (nickname) => {
    set({ nickname });
  },
}));

export default useProfileStore;
