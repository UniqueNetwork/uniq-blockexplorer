import { VFC } from 'react';
import Jdenticon from 'react-jdenticon';
import styled from 'styled-components';
import { useNotifications } from '@unique-nft/ui-kit';

interface IdentityIconProps {
  address: string;
  className?: string;
}

export const IdentityIcon: VFC<IdentityIconProps> = ({ address, className }) => {
  const { info } = useNotifications();

  const handleAddressCopy = (address: string) => {
    info(`Address ${address} successfully copied`);
  };

  return (
    <div>
      <Jdenticon size="48" value={address} />
    </div>
  );
};