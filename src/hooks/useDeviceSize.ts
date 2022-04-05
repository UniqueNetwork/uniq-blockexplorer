import { useEffect, useMemo, useState } from 'react';

export enum DeviceSize {
  xxs, // < 567
  xs, // 767 - 568
  sm, // 1023 - 768
  md, // 1279 - 1024
  lg, // 1439 - 1280
  xl, // 1919 - 1440
  xxl // > 1920
}

export const useDeviceSize = (): DeviceSize => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to stateeState<number | undefined>();
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return useMemo(() => {
    if (windowWidth && windowWidth < 567) return DeviceSize.xxs;
    if (windowWidth && windowWidth < 768) return DeviceSize.xs;
    if (windowWidth && windowWidth < 1024) return DeviceSize.sm;
    if (windowWidth && windowWidth < 1280) return DeviceSize.md;
    if (windowWidth && windowWidth < 1440) return DeviceSize.lg;
    if (windowWidth && windowWidth < 1920) return DeviceSize.xl;

    return DeviceSize.xxl;
  }, [windowWidth]);
};

export default useDeviceSize;
