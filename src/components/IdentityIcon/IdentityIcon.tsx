import { VFC } from 'react';
import styled from 'styled-components/macro';
// @ts-ignore
import Jdenticon from 'react-jdenticon';
import { useNotifications } from '@unique-nft/ui-kit';

interface IdentityIconProps {
  address: string;
  className?: string;
  copyable?: boolean;
  size?: string;
}

export const IdentityIcon: VFC<IdentityIconProps> = ({
  address,
  className,
  copyable,
  size = '16',
}) => {
  const { info } = useNotifications();

  const handleAddressCopy = () => {
    if (!copyable) {
      return;
    }

    navigator.clipboard.writeText(address);

    info(`Address ${address} successfully copied`);
  };

  return (
    <Wrapper copyable={copyable} className={className} onClick={handleAddressCopy}>
      <Jdenticon size={size} value={address} />
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs<{ copyable?: boolean }>((props) => ({
  copyable: props.copyable,
}))<{ copyable?: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.copyable ? 'pointer' : 'normal')};

  div {
    display: flex;
    align-items: center;
  }
`;
