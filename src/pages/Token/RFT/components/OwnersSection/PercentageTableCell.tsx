import React from 'react';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import ProgressBar from '@app/components/ProgressBar';
import { DeviceSize, useDeviceSize } from '@app/hooks';

const PercentageTableCell = ({ value }: { value: number }) => {
  const deviceSize = useDeviceSize();
  let barWidth = 134;

  if (deviceSize === DeviceSize.lg) barWidth = 198;

  if (deviceSize === DeviceSize.xl) barWidth = 262;

  if (deviceSize === DeviceSize.xxl) barWidth = 341;

  return (
    <FlexWrapper>
      <ProgressBar filledPercent={(value / 10000) * 100} height={8} width={barWidth} />
      <Text>{(value / 10000) * 100} %</Text>
    </FlexWrapper>
  );
};

const FlexWrapper = styled.div`
  display: flex;
  gap: 8px;
  height: 24px;
  align-items: center;
`;

export default PercentageTableCell;
