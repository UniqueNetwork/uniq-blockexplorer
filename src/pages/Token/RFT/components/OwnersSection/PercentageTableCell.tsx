import React, { useMemo } from 'react';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import ProgressBar from '@app/components/ProgressBar';
import { DeviceSize, useDeviceSize } from '@app/hooks';

const PercentageTableCell = ({ value, total }: { value: number; total: number }) => {
  const deviceSize = useDeviceSize();
  let barWidth = 134;

  if (deviceSize === DeviceSize.lg) barWidth = 198;

  if (deviceSize === DeviceSize.xl) barWidth = 262;

  if (deviceSize === DeviceSize.xxl) barWidth = 341;

  const percent = useMemo(() => {
    return ((value || 0) / (total || 1)) * 100;
  }, [value, total]);

  const percentText = useMemo(() => {
    if (percent < 0.01) {
      return '<0.01 %';
    }

    if (percent > 99.99) {
      return '>99.99 %';
    }

    return `${percent.toFixed(2)} %`;
  }, [percent]);

  return (
    <FlexWrapper>
      <ProgressBar filledPercent={percent} height={8} width={barWidth} />
      <Text>{percentText}</Text>
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
