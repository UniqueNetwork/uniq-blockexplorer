import { FC } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { Skeleton } from '@unique-nft/ui-kit';

import { useCheckImageExists } from '@app/hooks';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';

interface PictureProps {
  className?: string;
  src?: string | null;
  alt: string;
}

const Picture: FC<PictureProps> = ({ alt, className, src }) => {
  const { imgSrc, loading } = useCheckImageExists(getCoverURLFromCollection(src || ''));

  return (
    <PictureWrapper className={classNames('picture', className)}>
      {loading ? (
        <Skeleton height="100%" width="100%" />
      ) : (
        <>
          {imgSrc ? (
            <img alt={alt} src={imgSrc} />
          ) : (
            <svg fill="white" height="100%" viewBox="0 0 1000 1000" width="100%">
              <g>
                <rect fill="#D2D3D6" height={1000} width={1000} x={0} y={0} />
                <g transform="translate(151.000000,511.000000) scale(0.070000,-0.070000)">
                  <path d="M4482.2,4999.3C2572,4785,953.1,3484.5,349.7,1678.3c-93.6-274.7-162.3-563.9-212.2-880.2c-49.9-328.8-49.9-1038.3,0-1373.3C299.8-1621.8,745-2541.5,1446.3-3269.8c420.3-439,826.1-734.5,1373.3-1007.1c1446.1-722,3139.9-688.7,4552.8,91.6c428.6,237.2,740.7,476.5,1113.2,851.1C9234.7-2581.1,9698.7-1653,9861-585.6c52,343.3,52,1067.5,0,1404.5c-135.3,878.1-491.1,1695.8-1032.1,2372.1c-189.3,237.2-609.7,645-853.1,826.1c-663.8,497.3-1362.9,796.9-2195.2,944.7C5493.4,5011.8,4777.6,5032.6,4482.2,4999.3z M5666.1,4345.9c1552.3-264.3,2811.1-1298.4,3356.3-2757c183.1-491.1,251.8-892.7,251.8-1477.4c0-476.5-22.9-674.2-122.8-1061.2c-58.3-220.6-239.3-728.3-262.2-728.3c-12.5,0-7445.1,4113.7-7465.9,4132.4c-29.1,27,428.6,584.7,640.9,782.4c674.2,622.2,1483.6,1005,2405.4,1129.9C4738.1,4404.2,5393.5,4393.8,5666.1,4345.9z M4856.7-163.2C7449.4-1601,8577.1-2237.7,8568.8-2256.4c-27-74.9-355.8-472.3-541-659.6C6519.2-4435,4143-4593.2,2409.7-3292.7c-218.5,164.4-582.6,520.2-759.5,740.7c-370.4,466.1-638.8,998.8-790.7,1568.9C749.2-568.9,726.3-377.5,726.3,111.5c0,476.5,22.9,674.2,122.8,1061.2c60.4,235.1,241.4,728.3,264.3,728.3C1123.7,1901,2807.1,970.9,4856.7-163.2z" />
                  <path d="M4182.5,2683.4c-195.6-70.7-343.3-222.6-399.5-414.1c-20.8-66.6-31.2-193.5-31.2-349.6c0-143.6-8.3-247.6-20.8-251.8c-10.4-2.1,226.8-143.6,530.6-312.1l553.5-308h172.7c349.6,0,680.4-131.1,934.3-372.5c83.2-79.1,185.2-201.8,226.8-274.7l79.1-133.2l940.5-522.3L8111-779.1l6.3,963.4c4.2,923.9,2.1,969.7-37.5,1077.8c-54.1,145.7-156.1,260.1-293.4,337.1l-112.4,62.4l-711.6,6.2l-713.7,6.2v258c0,208.1-8.3,280.9-41.6,370.4c-54.1,145.7-156.1,260.1-293.4,337.1l-112.4,62.4l-769.9,4.2C4419.7,2710.4,4244.9,2706.2,4182.5,2683.4z" />
                  <path d="M1883.2-506.5c6.2-1489.8,6.2-1516.9,49.9-1610.5c64.5-137.3,162.3-237.2,295.5-303.8l118.6-58.3h2653h2653l120.7,58.3c66.6,33.3,116.5,70.8,112.4,83.2c-4.2,16.6-1718.7,984.2-1881.1,1059.1c-39.5,18.7-58.3,10.4-139.4-60.4c-387-341.2-982.1-409.9-1469.1-170.6c-355.8,174.8-636.7,541-719.9,934.3c-29.1,139.4-31.2,453.6-4.2,557.6c6.2,22.9-703.3,430.7-1623,934.3l-172.7,93.6L1883.2-506.5z" />
                  <path d="M4280.3-412.9c20.8-133.2,126.9-335,222.6-422.4c143.6-129,291.3-185.2,486.9-187.3c158.2,0,364.1,52,364.1,91.6c0,14.6-1048.7,605.5-1075.8,605.5C4272-325.5,4272-365,4280.3-412.9z" />
                </g>
              </g>
            </svg>
          )}
        </>
      )}
    </PictureWrapper>
  );
};

const PictureWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;

  img {
    width: 100%;
  }
`;

export default Picture;
