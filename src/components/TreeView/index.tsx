import React, { useCallback, useMemo, useState } from 'react';
import { Scrollbar } from '@unique-nft/ui-kit';

import { Tree } from './Tree';
import { IBundleTree, INode } from './types';
import useDeviceSize, { DeviceSize } from '../../hooks/useDeviceSize';

function BundleTree<T extends INode>({
  dataSource,
  nodeView: NodeView,
  onNodeClicked: onNodeClickedProps,
  nestedSectionView: NestedSectionView,
  className,
  compareNodes,
  childrenProperty,
  selectedToken: selectedTokenProps,
  getKey,
  onViewNodeDetails,
  onUnnestClick,
  onTransferClick,
}: IBundleTree<T>) {
  const [selectedToken, setSelectedToken] = useState<T | null>(
    selectedTokenProps || null,
  );
  const deviceSize = useDeviceSize();
  const onNodeClicked = useCallback((data: T) => {
    if (!data.selected) setSelectedToken(null);
    else setSelectedToken(data);

    onNodeClickedProps(data);
  }, []);

  const scrollWidth = useMemo(() => {
    if (deviceSize <= DeviceSize.md) return '100%';

    if (deviceSize <= DeviceSize.lg) return 462;

    if (deviceSize <= DeviceSize.xl) return 618;

    return 682;
  }, [deviceSize]);

  return (
    <>
      <Scrollbar height={'100%'} width={scrollWidth}>
        <Tree<T>
          dataSource={dataSource}
          nodeView={NodeView}
          className={className}
          compareNodes={compareNodes}
          childrenProperty={childrenProperty}
          getKey={getKey}
          onNodeClicked={onNodeClicked}
          onViewNodeDetails={onViewNodeDetails}
          onUnnestClick={onUnnestClick}
          onTransferClick={onTransferClick}
        />
      </Scrollbar>
      {NestedSectionView && (
        <NestedSectionView
          selectedToken={selectedToken}
          onViewNodeDetails={onViewNodeDetails}
          onUnnestClick={onUnnestClick}
          onTransferClick={onTransferClick}
        />
      )}
    </>
  );
}

export default BundleTree;
