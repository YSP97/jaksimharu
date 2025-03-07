import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import pb from '@/api/pb';

const useCategoryStore = create(
  persist(
    (set, get) => ({
      categories: [],
      selectedCategory: null,
      isLoading: false,
      error: null,

      fetchCategories: async () => {
        set({ isLoading: true, error: null });

        const user = pb.authStore.model;
        if (!user) {
          set({ categories: [], isLoading: false });
          return;
        }

        const categoryIdArray = user?.category || [];
        if (categoryIdArray.length === 0) {
          set({ categories: [], isLoading: false });
          return;
        }

        try {
          const categories = await Promise.all(
            categoryIdArray.map((id) => pb.collection('Categories').getOne(id))
          );
          set({ categories });
        } catch (error) {
          set({ error: '카테고리를 불러오는 데 실패했습니다.' });
        } finally {
          set({ isLoading: false });
        }
      },

      setSelectedCategory: (category) => set({ selectedCategory: category }),

      clearStore: () => {
        set({
          categories: [],
          selectedCategory: null,
          error: null,
        });
      },
    }),
    {
      name: 'category-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        categories: state.categories,
        selectedCategory: state.selectedCategory,
      }),
    }
  )
);

export default useCategoryStore;
