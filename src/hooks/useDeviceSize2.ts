// Here are the dimensions according to the grid SCAN.2.0
import { useEffect, useMemo, useState } from 'react';

export enum DeviceSize2 {
  xsm, // < 480
  ssm, // 575 - 480
  sm, // 767 - 576
  md, // 991 - 768
  lg, // 1199 - 992
  xl, // 1679 - 1200
  xxl // > 1680
}

export const useDeviceSize2 = (): DeviceSize2 => {
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
    if (windowWidth && windowWidth < 480) return DeviceSize2.xsm;
    if (windowWidth && windowWidth < 576) return DeviceSize2.ssm;
    if (windowWidth && windowWidth < 768) return DeviceSize2.sm;
    if (windowWidth && windowWidth < 992) return DeviceSize2.md;
    if (windowWidth && windowWidth < 1200) return DeviceSize2.lg;
    if (windowWidth && windowWidth < 1680) return DeviceSize2.xl;

    return DeviceSize2.xxl;
  }, [windowWidth]);
};

export default useDeviceSize2;
