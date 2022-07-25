import { VFC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Header } from '@app/styles/styled-components';
import { Dropdown, Icon, SelectOptionProps, Text } from '@unique-nft/ui-kit';

interface HeaderWithDropdownProps {
  linkText?: string;
  linkUrl?: string;
  options: SelectOptionProps[];
  selectedSort: SelectOptionProps;
  setSelectedSort: (option: SelectOptionProps) => void;
  title: string;
}

export const HeaderWithDropdown: VFC<HeaderWithDropdownProps> = ({ linkText, linkUrl, options, selectedSort, setSelectedSort, title }) => {
  const canDisplayLink = !!(linkText && linkUrl);

  return (
    <Wrapper>
      <Header size='2'>
        {title}
      </Header>
      <Dropdown
        onChange={setSelectedSort}
        options={options}
        value={selectedSort.id as string}
      >
        <SelectedOption>
          {selectedSort.title}
          <Icon
            name='triangle'
            size={12}
          />
        </SelectedOption>
      </Dropdown>
      { canDisplayLink && (
        <Link
          className='header-dropdown-link'
          to={linkUrl}
        >
          <Text
            color='primary-600'
            size='m'
          >
            {linkText}
          </Text>
        </Link>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) / 2);
  margin-bottom: calc(var(--gap) * 2);
  
  .unique-dropdown {
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 42px;
    color: var(--link-color);
    cursor: pointer;
    
    .dropdown-wrapper {
      .icon-triangle {
        position: inherit;
        margin-left: calc(var(--gap) / 2);
        
        use {
          fill: var(--link-color);
        }
      }
    }
    
    .dropdown-options {
      width: 142px;

      .dropdown-option {
        font-family: var(--prop-font-family);
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        padding: calc(var(--gap) / 4) calc(var(--gap) / 2);
        color: var(--black-color);
        
        &.selected {
          color: var(--link-color);
        }
      }
    }
  }
  
  .header-dropdown-link {
    display: none;
  }

  @media (min-width: 758px) and (max-width: 1199px) {
    position: relative;
    
    .header-dropdown-link {
      display: block;
      position: absolute;
      top: calc(var(--gap) / 2);
      right: 0;
    }
  }
`;

const SelectedOption = styled.div``;
