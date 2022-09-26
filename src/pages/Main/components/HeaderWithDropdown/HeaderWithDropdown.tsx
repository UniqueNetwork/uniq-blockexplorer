import { isValidElement, VFC } from 'react';
import styled from 'styled-components';

import { Header } from '@app/styles/styled-components';
import { deviceWidth } from '@app/hooks';
import { Dropdown, SVGIcon, DropdownOptionProps } from '@app/components';

interface HeaderWithDropdownProps {
  options?: DropdownOptionProps[];
  selectedSort?: DropdownOptionProps;
  setSelectedSort?: (option: DropdownOptionProps) => void;
  title: string;
}

export const HeaderWithDropdown: VFC<HeaderWithDropdownProps> = ({
  options,
  selectedSort,
  setSelectedSort,
  title,
}) => {
  const optionRender = (option: DropdownOptionProps) => {
    if (option.iconRight && isValidElement(option.iconRight)) {
      return (
        <>
          {option.title}
          {option.iconRight}
        </>
      );
    }

    return undefined;
  };
  return (
    <Wrapper>
      <StyledHeader size="2">{title}</StyledHeader>
      {selectedSort && (
        <Dropdown
          optionRender={optionRender}
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

  .skan-dropdown {
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
