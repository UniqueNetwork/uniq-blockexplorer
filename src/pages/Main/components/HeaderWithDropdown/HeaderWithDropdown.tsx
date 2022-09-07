import { VFC } from 'react';
import styled from 'styled-components';
import { Dropdown, SelectOptionProps } from '@unique-nft/ui-kit';

import { Header } from '@app/styles/styled-components';
import { deviceWidth } from '@app/hooks';
import { SVGIcon } from '@app/components/SVGIcon';

interface HeaderWithDropdownProps {
  options?: SelectOptionProps[];
  selectedSort?: SelectOptionProps;
  setSelectedSort?: (option: SelectOptionProps) => void;
  title: string;
}

export const HeaderWithDropdown: VFC<HeaderWithDropdownProps> = ({
  options,
  selectedSort,
  setSelectedSort,
  title,
}) => {
  return (
    <Wrapper>
      <StyledHeader size="2">{title}</StyledHeader>
      {selectedSort && (
        <Dropdown
          options={options}
          value={selectedSort.id as string}
          onChange={setSelectedSort}
        >
          <SelectedOption>
            {selectedSort.title}
            <StyledSVGIcon height={16} name="triangle" width={16} />
          </SelectedOption>
        </Dropdown>
      )}
    </Wrapper>
  );
};

const StyledSVGIcon = styled(SVGIcon)`
  margin-left: calc(var(--gap) / 2);

  svg path {
    fill: var(--primary-500);
  }
`;

const StyledHeader = styled(Header)`
  @media ${deviceWidth.smallerThan.md} {
    font-size: 20px !important;
    line-height: 28px !important;
    font-weight: 700 !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) / 2);
  margin-bottom: calc(var(--gap) * 2);

  .unique-dropdown {
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 42px;
    color: var(--primary-500);
    cursor: pointer;

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

  @media ${deviceWidth.biggerThan.sm} and ${deviceWidth.smallerThan.xl} {
    position: relative;

    .header-dropdown-link {
      display: block;
      position: absolute;
      top: calc(var(--gap) / 2);
      right: 0;
    }
  }
`;

const SelectedOption = styled.div`
  display: flex;
  @media ${deviceWidth.smallerThan.md} {
    font-size: 20px !important;
    line-height: 28px !important;
    font-weight: 700 !important;
  }
`;
