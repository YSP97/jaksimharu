import router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import useCategoryStore from './stores/useCategoryStore';
import { useEffect } from 'react';
import { FadeLoader } from 'react-spinners';

function App() {
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  const categories = useCategoryStore((state) => state.categories);
  const isLoading = useCategoryStore((state) => state.isLoading);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, categories]);

  if (isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <FadeLoader color="#79b2d1" />
      </div>
    );
  }

  return (
    <HelmetProvider>
      <div className="App h-screen relative min-w-[320px] max-w-[430px] overflow-auto no-scrollbar mx-auto border border-gray-100">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  );
}


export default App;
