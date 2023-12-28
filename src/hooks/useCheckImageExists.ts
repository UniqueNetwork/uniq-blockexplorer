import { useEffect, useState } from 'react';

const toThumborImage = (imageUrl: string) => {
  if (imageUrl?.startsWith('https://ipfs.unique.network')) {
    return imageUrl.replace(
      'https://ipfs.unique.network',
      'https://rest.uniquenetwork.dev/thumbor/unsafe/500x500/ipfs.unique.network',
    );
  }

  return imageUrl;
};

export const useCheckImageExists = (imageSrc?: string | null) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    if (imageSrc) {
      const image = new Image();

      const finalImageSrc = toThumborImage(imageSrc);

      image.onload = () => {
        if (isMounted) {
          setImgSrc(finalImageSrc);
          setLoading(false);
        }
      };

      image.onerror = () => {
        setLoading(false);
      };

      image.src = finalImageSrc;
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [imageSrc]);

  return {
    imgSrc,
    loading,
  };
};
