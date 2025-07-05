import { setScreenSize } from '@/Redux/ReduxSlices/SidebarSlice';
import type { AppDispatch } from '@/Redux/Store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


type ScreenCategory = 'mobile' | 'tablet' | 'desktop';

const getDeviceCategory = (width: number): ScreenCategory => {
  if (width < 640) return 'mobile';
  if (width >= 640 && width < 1024) return 'tablet';
  return 'desktop';
};

const ScreenSizeListener: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const updateScreenSize = () => {
      const category = getDeviceCategory(window.innerWidth);
      dispatch(setScreenSize(category));
    };

    updateScreenSize(); // initial call
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [dispatch]);

  return null; // No UI
};

export default ScreenSizeListener;
