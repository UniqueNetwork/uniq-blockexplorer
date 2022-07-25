import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Icon, Text } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import { useApi } from '../hooks/useApi';
import { logUserEvents } from '@app/utils/logUserEvents';

const Menu: FC = () => {
  const { currentChain } = useApi();

  // user analytics
  const onMenuClick = (bullit: string) => () => {
    const path = window.location.pathname;

    const getCurrentPage = () => {
      if (path.includes('tokens')) {
        return 'NFTS';
      } else if (path.includes('collections')) {
        return 'COLLECTIONS';
      } else {
        return 'MAIN';
      }
    };

    const currentPage = getCurrentPage();

    logUserEvents(`CLICK_${bullit}_MENU_BUTTON_FROM_${currentPage}_PAGE`);
  };

  const options = [
    { id: 'id1', title: 'Blocks' },
    { id: 'id2', title: 'Transfers' }
  ];

  return (
    <>
      <NavLink
        onClick={ onMenuClick('NFTS')}
        to={`/${currentChain ? currentChain?.network + '/' : ''}tokens`}
      >
        <Text
          color={'additional-dark'}
          size={'l'}
        >NFTs</Text></NavLink>
      <NavLink
        onClick={ onMenuClick('COLLECTIONS')}
        to={`/${currentChain ? currentChain?.network + '/' : ''}collections`}
      >
        <Text
          color={'additional-dark'}
          size={'l'}
        >Collections</Text></NavLink>
      {/* Open comment after creating blockchain and accounts pages */}
      {/* <DropdownStyled
        optionRender={ (option) => {
          return <div style={{ alignItems: 'center', columnGap: '8px', display: 'flex', padding: '4px 36px 4px 8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <NavLink
                to={`/${currentChain ? currentChain?.network + '/' : ''}blockchain/${(option.title as string).toLowerCase()}`}
              >
                <Text
                  color={'additional-dark'}
                  size={'l'}
                >{option.title as string}</Text></NavLink>
            </div>
          </div>;
        }}
        options={options}
        placement='left'
      >
        <><Text
          size='l'
          weight='regular'
        >Blockchain</Text>
        <Icon
          color= 'var(--blue-grey-700)'
          name='triangle'
          size={8}
        ></Icon>
        </></DropdownStyled>
      <NavLink
        onClick={ onMenuClick('ACCOUNTS')}
        to={`/${currentChain ? currentChain?.network + '/' : ''}accounts`}
      >
        <Text
          color={'additional-dark'}
          size={'l'}
        >Accounts</Text></NavLink> */}
    </>
  );
};

const DropdownStyled = styled(Dropdown)`
  cursor: pointer;

  div[role=listbox]{
    left: -24px;
  }

   &&& svg{
    position: relative;
    right: 0;
    top: -4px;
    margin-left:8px;
  }
`;

export default Menu;
