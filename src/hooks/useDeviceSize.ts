// Here are the dimensions according to the grid SCAN.2.0
import { useEffect, useMemo, useState } from 'react';

export enum DeviceSize {
  xxs, // < 480
  xs, // 575 - 480
  sm, // 767 - 576
  md, // 991 - 768
  lg, // 1199 - 992
  xl, // 1679 - 1200
  xxl, // > 1680
}

export const DeviceSizes = {
  xxsTop: '479px',
  xsBottom: '480px',
  xsTop: '575p',
  smBottom: '576px',
  smTop: '767px',
  mdBottom: '768px',
  mdTop: '991px',
  lgBottom: '992px',
  lgTop: '1199px',
  xlBottom: '1200px',
  xlTop: '1679px',
  xxlBottom: '1680',
};

// for css @media queries
// Deprecated: use DeviceSizes
export const deviceWidth = {
  only: {
    xxs: '(max-width: 479px)',
    xs: '(min-width: 480px) and (max-width: 575px)',
    sm: '(min-width: 576px) and (max-width: 767px)',
    md: '(min-width: 768px) and (max-width: 991px)',
    lg: '(min-width: 992px) and (max-width: 1199px)',
    xl: '(min-width: 1200px) and (max-width: 1679px)',
    xxl: '(min-width: 1680px)',
  },
  biggerThan: {
    xxs: '(min-width: 480px)',
    xs: '(min-width: 576px)',
    sm: '(min-width: 768px)',
    md: '(min-width: 992px)',
    lg: '(min-width: 1200px)',
    xl: '(min-width: 1680px)',
  },
  smallerThan: {
    xs: '(max-width: 479px)',
    sm: '(max-width: 575px)',
    md: '(max-width: 767px)',
    lg: '(max-width: 991px)',
    xl: '(max-width: 1199px)',
    xxl: '(max-width: 1679px)',
  },
};

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
    if (windowWidth && windowWidth < 480) return DeviceSize.xxs;
    if (windowWidth && windowWidth < 576) return DeviceSize.xs;
    if (windowWidth && windowWidth < 768) return DeviceSize.sm;
    if (windowWidth && windowWidth < 992) return DeviceSize.md;
    if (windowWidth && windowWidth < 1200) return DeviceSize.lg;
    if (windowWidth && windowWidth < 1680) return DeviceSize.xl;

    return DeviceSize.xxl;
  }, [windowWidth]);
};

export default useDeviceSize;
