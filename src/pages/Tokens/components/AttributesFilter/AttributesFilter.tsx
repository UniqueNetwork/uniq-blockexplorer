import React, { Fragment } from 'react';
import styled from 'styled-components/macro';
import { Button, Scrollbar, Text } from '@unique-nft/ui-kit';

import { Checkbox } from '@app/components';
import { AttributeValue, CollectionAttribute } from '@app/api/graphQL/attributes/types';
import { ChosenAttributesMap } from '@app/api';
import { DeviceSize, deviceWidth, useDeviceSize } from '@app/hooks';

interface AttributesFilterProps {
  attributes: CollectionAttribute[];
  selectedAttrs: ChosenAttributesMap;
  handleCheck: (key: string, attribute: AttributeValue, attributeKey: string) => void;
  handleReset: () => void;
  handleApply: () => void;
}
const AttributesFilter = ({
  attributes,
  selectedAttrs,
  handleCheck,
  handleReset,
  handleApply,
}: AttributesFilterProps) => {
  const deviceSize = useDeviceSize();
  return (
    <Wrapper>
      <Scrollbar
        width={deviceSize <= DeviceSize.md ? 'calc(100% - 5px)' : '100%'}
        height={228}
      >
        {attributes.map((attribute) => (
          <Fragment key={attribute.key}>
            <Text size={'s'} color={'grey-500'} key={attribute.key}>
              {attribute.name._}
            </Text>
            <Attributes>
              {attribute.values.map((value) => (
                <Attribute
                  key={`K${attribute.key}V${
                    typeof value.value === 'string' ? value.value : value.value._
                  }`}
                >
                  <Checkbox
                    checked={
                      !!selectedAttrs[
                        `K${attribute.key}V${
                          typeof value.value === 'string' ? value.value : value.value._
                        }`
                      ]
                    }
                    label={typeof value.value === 'string' ? value.value : value.value._}
                    size={'m'}
                    onChange={() => {
                      handleCheck(
                        `K${attribute.key}V${
                          typeof value.value === 'string' ? value.value : value.value._
                        }`,
                        value,
                        attribute.key,
                      );
                    }}
                  />
                  <AttributesCount color={'grey-500'}>
                    {value.tokens_count}
                  </AttributesCount>
                </Attribute>
              ))}
            </Attributes>
          </Fragment>
        ))}
      </Scrollbar>
      <ButtonsWrapper>
        <ApplyButton
          title={'Apply'}
          role={'primary'}
          disabled={Object.keys(selectedAttrs).length === 0}
          onClick={handleApply}
        />
        <ResetButton
          title={'Clear all'}
          role={'danger'}
          disabled={Object.keys(selectedAttrs).length === 0}
          onClick={handleReset}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 343px;
  max-height: 276px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: calc(var(--gap) / 2);
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  @media ${deviceWidth.smallerThan.lg} {
    width: calc(100% - 5px);
  }
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
const ButtonsWrapper = styled.div`
  @media ${deviceWidth.smallerThan.lg} {
    display: none;
  }
`;
const ApplyButton = styled(Button)`
  width: 230px;
  margin-right: 8px;
`;
const ResetButton = styled(Button)`
  width: 89px;
`;

export default AttributesFilter;
