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
  filterChanged: boolean;
}
const AttributesFilter = ({
  attributes,
  selectedAttrs,
  handleCheck,
  handleReset,
  handleApply,
  filterChanged,
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
              {attribute.values.map((value) => {
                const isSelected =
                  !!selectedAttrs[
                    `K${attribute.key}V${
                      typeof value.value === 'string' ? value.value : value.value._
                    }`
                  ];
                return (
                  <Attribute
                    key={`K${attribute.key}V${
                      typeof value.value === 'string' ? value.value : value.value._
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      disabled={
                        !isSelected &&
                        Object.keys(selectedAttrs).some((key) =>
                          key.startsWith(`K${attribute.key}`),
                        )
                      }
                      label={
                        typeof value.value === 'string' ? value.value : value.value._
                      }
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
                );
              })}
            </Attributes>
          </Fragment>
        ))}
      </Scrollbar>
      <ButtonsWrapper>
        <Mute />
        <ApplyButton
          title={'Apply'}
          role={'primary'}
          disabled={!filterChanged}
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
  margin-bottom: calc(var(--gap) * 1.5);
  display: flex;
  flex-direction: column;
`;
const Attribute = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 12px 6px 8px;
`;
const AttributesCount = styled(Text)`
  padding: 0 8px;
  background-color: var(--grey-100);
  border-radius: 12px;
`;
const Mute = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: -48px;
  height: 48px;
  background: linear-gradient(0deg, #ffffff 10.61%, rgba(255, 255, 255, 0) 100%);
`;
const ButtonsWrapper = styled.div`
  position: relative;
  display: flex;
  @media ${deviceWidth.smallerThan.lg} {
    display: none;
  }
`;
const ApplyButton = styled(Button)`
  flex: 1;
  margin-right: 8px;
`;
const ResetButton = styled(Button)`
  width: 89px;
`;

export default AttributesFilter;
