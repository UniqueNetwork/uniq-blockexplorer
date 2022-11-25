import { FC, useMemo, useState } from 'react';
import ReactTooltip from 'react-tooltip';

import { useDeviceSize, DeviceSize } from '@app/hooks';
import { Tabs } from '@app/components';
import { Question } from '@app/images/icons/svgs';

import TokensTab from './TokensTab';
import BundlesTab from './BundlesTab';

interface TokensComponentProps {
  searchString?: string;
  pageSize?: number;
  collectionId?: string;
}

const TokensComponent: FC<TokensComponentProps> = ({ collectionId, pageSize = 16 }) => {
  const [activeAssetsTabIndex, setActiveAssetsTabIndex] = useState<number>(0);
  const deviceSize = useDeviceSize();

  const tokensLimit = useMemo(() => {
    if (deviceSize === DeviceSize.xs || deviceSize === DeviceSize.xxs) return 10;

    if (deviceSize === DeviceSize.sm) return 12;

    if (deviceSize === DeviceSize.lg || deviceSize === DeviceSize.md) return 16;

    return 10;
  }, [deviceSize]);

  return (
    <>
      <Tabs
        content={[
          'tokens',
          <div className="flex-row">
            Bundles
            <img data-tip={true} alt="tooltip" data-for="sadFace" src={Question} />
            <ReactTooltip id="sadFace" effect="solid">
              <span>A tree with nested tokens</span>
            </ReactTooltip>
          </div>,
        ]}
        currentTabIndex={activeAssetsTabIndex}
        setCurrentTabIndex={setActiveAssetsTabIndex}
      />
      {activeAssetsTabIndex === 0 && (
        <TokensTab
          collectionId={collectionId}
          pageSize={pageSize}
          tokensLimit={tokensLimit}
        />
      )}
      {activeAssetsTabIndex === 1 && (
        <BundlesTab
          collectionId={collectionId}
          pageSize={pageSize}
          tokensLimit={tokensLimit}
        />
      )}
    </>
  );
};

export default TokensComponent;
