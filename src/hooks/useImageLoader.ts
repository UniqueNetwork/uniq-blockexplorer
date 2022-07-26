import { useCallback, useEffect, useState } from 'react';
import { RemoveThis } from '@app/images/icons/svgs';

export const useImageLoader = (imageSrc: string | undefined) => {
  const [imgSrc, setImgSrc] = useState<string>(RemoveThis);

  const checkImageBeforeLoad = useCallback(
    (url: string) => {
      if (!imageSrc) {
        return;
      }

      const image = new Image();

      image.onload = () => {
        setImgSrc(imageSrc);
      };

      image.src = url;
    },
    [imageSrc]
  );

  useEffect(() => {
    if (imageSrc) {
      checkImageBeforeLoad(imageSrc);
    }
  }, [checkImageBeforeLoad, imageSrc]);

  return imgSrc;
};
