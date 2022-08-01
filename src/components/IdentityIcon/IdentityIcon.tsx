import { VFC } from 'react';
import BaseIdentityIcon from '@polkadot/react-identicon';
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
    <BaseIdentityIcon
      className={className}
      onCopy={handleAddressCopy}
      // prefix='2'
      size={32}
      theme='substrate'
      value={address}
    />
  );
};
