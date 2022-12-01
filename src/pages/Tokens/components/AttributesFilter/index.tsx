import React from 'react';
import styled from 'styled-components/macro';

import { InputTag } from '@app/components';

import { Dropdown } from './Dropdown';
import AttributesFilterComponent from './AttributesFilter';

const AttributesFilter = ({}) => {
  return (
    <DropdownStyled
      iconRight={{
        name: 'triangle',
        width: 8,
        height: 8,
        className: 'icon-triangle',
      }}
      dropdownRender={() => <AttributesFilterComponent />}
    >
      <InputTagStyled placeholder="All attributes" />
    </DropdownStyled>
  );
};

const DropdownStyled = styled(Dropdown)`
  width: 343px;
  cursor: pointer;
  border: 1px solid var(--grey-300);
  padding-right: calc(var(--gap) * 2);
  border-radius: 4px;
  &:hover,
  &:focus-within {
    border: 1px solid var(--grey-500);
  }
`;

const InputTagStyled = styled(InputTag)`
  width: 100%;
  input {
    cursor: pointer;
  }
  .rti--container {
    overflow-x: auto;
    flex-wrap: nowrap;
    border: none;
    outline: none;
    .rti--tag {
      word-break: unset;
    }
  }
  .rti--container:hover,
  .rti--container:focus-within {
    border: none;
  }
`;

export default AttributesFilter;
