import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Icon, SelectOptionProps } from '@unique-nft/ui-kit';

import { tokensOptions } from '@app/pages/Main/components/TokensBlock/tokensOptions';
import { DeviceSizes, deviceWidth } from '@app/hooks';
import { Header } from '@app/styles/styled-components';

import PagePaper from '../../components/PagePaper';
import TokensComponent from './components/TokensComponent';

const TokensPage: FC = () => {
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(tokensOptions[0]);

  return (
    <>
      <Wrapper>
        <StyledHeader size="1">NFTs</StyledHeader>
        {selectedSort && (
          <Dropdown
            options={tokensOptions}
            value={selectedSort.id as string}
            onChange={setSelectedSort}
          >
            <SelectedOption>
              {selectedSort.title}
              <Icon name="triangle" size={12} />
            </SelectedOption>
          </Dropdown>
        )}
      </Wrapper>
      <PagePaper>
        <TokensComponent />
      </PagePaper>
    </>
  );
};

const StyledHeader = styled(Header)`
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 48px;
`;

const SelectedOption = styled.div`
  @media ${deviceWidth.smallerThan.md} {
    font-size: 20px !important;
    line-height: 28px !important;
    font-weight: 700 !important;
  }
`;

// TODO - reuse this from HeaderWithDropdown
const Wrapper = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) / 2);
  margin-bottom: calc(var(--gap) * 1.5);

  .unique-dropdown {
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 48px;
    color: var(--primary-500);
    cursor: pointer;

    .dropdown-wrapper {
      .icon-triangle {
        right: -22px;

        use {
          fill: var(--primary-500);
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
          color: var(--primary-500);
        }
      }
    }
  }

  @media (min-width: ${DeviceSizes.sm}) and (max-width: ${DeviceSizes.xl}) {
    position: relative;

    .header-dropdown-link {
      display: block;
      position: absolute;
      top: calc(var(--gap) / 2);
      right: 0;
    }
  }
`;

export default TokensPage;
