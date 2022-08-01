import { VFC } from 'react';
import styled from 'styled-components';
// @ts-ignore
import Jdenticon from 'react-jdenticon';
import { useNotifications } from '@unique-nft/ui-kit';

interface IdentityIconProps {
  address: string;
  className?: string;
  size?: string;
}

export const IdentityIcon: VFC<IdentityIconProps> = ({ address, className, size = '16' }) => {
  const { info } = useNotifications();

  const handleAddressCopy = () => {
    navigator.clipboard.writeText(address);

    info(`Address ${address} successfully copied`);
  };

  return (
    <Wrapper
      className={className}
      onClick={handleAddressCopy}
    >
      <Jdenticon
        size={size}
        value={address}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  div {
    display: flex;
    align-items: center;
  }
`;