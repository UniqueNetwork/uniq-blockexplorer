import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { Text, Button } from '@unique-nft/ui-kit';

import { Checkbox } from '@app/components';

const AttributesFilter = ({}) => {
  const [selectedAttrs, setSelectedAttrs] = useState<{ [key: string]: boolean }>({});
  const handleCheck = useCallback((attr: string) => {
    setSelectedAttrs((selectedAttrs) => {
      return { ...selectedAttrs, [attr]: !selectedAttrs[attr] };
    });
  }, []);

  return (
    <Wrapper>
      <Text size={'s'} color={'grey-500'}>
        Specification
      </Text>
      <Attributes>
        <Attribute>
          <Checkbox
            checked={selectedAttrs['old']}
            label="Old"
            size={'m'}
            onChange={() => {
              handleCheck('old');
            }}
          />
          <AttributesCount color={'grey-500'}>12</AttributesCount>
        </Attribute>
        <Attribute>
          <Checkbox
            checked={selectedAttrs['king']}
            label="King"
            size={'m'}
            onChange={() => {
              handleCheck('king');
            }}
          />
          <AttributesCount color={'grey-500'}>7654</AttributesCount>
        </Attribute>
        <Attribute>
          <Checkbox
            checked={selectedAttrs['fat']}
            label="Fat"
            size={'m'}
            onChange={() => {
              handleCheck('fat');
            }}
          />
          <AttributesCount color={'grey-500'}>45</AttributesCount>
        </Attribute>
      </Attributes>
      <Text size={'s'} color={'grey-500'}>
        Who made
      </Text>
      <Attributes>
        <Attribute>
          <Checkbox
            checked={selectedAttrs['parents']}
            label="Parents"
            size={'m'}
            onChange={() => {
              handleCheck('parents');
            }}
          />
          <AttributesCount color={'grey-500'}>9</AttributesCount>
        </Attribute>
      </Attributes>
      <ButtonsWrapper>
        <ApplyButton
          title={'Apply'}
          role={'primary'}
          disabled={Object.keys(selectedAttrs).length === 0}
        />
        <ResetButton
          title={'Reset all'}
          role={'danger'}
          disabled={Object.keys(selectedAttrs).length === 0}
          onClick={() => {
            setSelectedAttrs({});
          }}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 343px;
  display: flex;
  flex-direction: column;
  padding: calc(var(--gap) / 2);
`;
const Attributes = styled.div`
  margin-top: calc(var(--gap) / 2);
  margin-bottom: var(--gap);
  display: flex;
  flex-direction: column;
`;
const Attribute = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
`;
const AttributesCount = styled(Text)`
  padding: 0 8px;
  background-color: var(--grey-100);
  border-radius: 12px;
`;
const ButtonsWrapper = styled.div``;
const ApplyButton = styled(Button)`
  width: 230px;
  margin-right: 8px;
`;
const ResetButton = styled(Button)`
  width: 89px;
`;

export default AttributesFilter;
