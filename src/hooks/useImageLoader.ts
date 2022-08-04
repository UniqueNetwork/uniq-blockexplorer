import { useEffect, useState } from 'react';

export const useImageLoader = (imageSrc: string | undefined) => {
  const [imgSrc, setImgSrc] = useState<string>();

  useEffect(() => {
    let isMounted = true;

    if (imageSrc) {
      if (!imageSrc) {
        return;
      }

      const image = new Image();

      image.onload = () => isMounted && setImgSrc(imageSrc);

      image.src = imageSrc;
    }
    
    return () => {
      isMounted = false;
    };
  }, [imageSrc]);

  return imgSrc;
};
