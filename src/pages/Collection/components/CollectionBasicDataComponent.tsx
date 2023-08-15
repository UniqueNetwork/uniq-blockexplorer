import { FC } from 'react';
import styled from 'styled-components/macro';
import { Heading, Text } from '@unique-nft/ui-kit';

import { Collection, TokenTypeEnum } from '@app/api';
import { timestampFormat } from '@app/utils';
import { useDeviceSize, DeviceSize, DeviceSizes } from '@app/hooks';

import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

interface BasicDataComponentProps {
  collection?: Collection;
}

const CollectionBasicDataComponent: FC<BasicDataComponentProps> = ({ collection }) => {
  const {
    collection_id: id,
    date_of_creation: createdOn,
    description,
    holders_count: holders,
    nesting_enabled: nestingEnabled,
    owner,
    token_prefix: prefix,
    tokens_count: tokensCount,
    mode,
  } = collection || {};

  const deviceSize = useDeviceSize();

  return (
    <>
      <PropertiesWrapper>
        <CreatedAccountWrapper>
          <div>
            <Text color="grey-500" weight="light">
              created on {timestampFormat((createdOn || 0) * 1000)}
            </Text>
          </div>
        </CreatedAccountWrapper>
        <GeneralInfoWrapper>
          <GeneralInfo>
            <div>
              <Text color="grey-500" size="l" weight="light">
                ID:
              </Text>
              <Text color="black" size="l" weight="light">
                {id?.toString() || ''}
              </Text>
            </div>
            <div>
              <Text color="grey-500" size="l" weight="light">
                Collection type:
              </Text>
              <Text color="black" size="l" weight="light">
                {mode === TokenTypeEnum.RFT ? 'fractions' : 'NFT'}
              </Text>
            </div>
            <div>
              <Text color="grey-500" size="l" weight="light">
                Items:
              </Text>
              <Text color="black" size="l" weight="light">
                {tokensCount?.toString() || '0'}
              </Text>
            </div>
            <div>
              <Text color="grey-500" size="l" weight="light">
                Symbol:
              </Text>
              <Text color="black" size="l" weight="light">
                {prefix?.toString() || ''}
              </Text>
            </div>
            <div>
              <Text color="grey-500" size="l" weight="light">
                Holders:
              </Text>
              <Text color="black" size="l" weight="light">
                {holders?.toString() || '0'}
              </Text>
            </div>
            <div>
              <Text color="grey-500" size="l" weight="light">
                Minting:
              </Text>
              <Text color="black" size="l" weight="light">
                yes
              </Text>
            </div>
            <div>
              <Text color="grey-500" size="l" weight="light">
                Nesting:
              </Text>
              <Text color="black" size="l" weight="light">
                {nestingEnabled ? 'yes' : 'no'}
              </Text>
            </div>
          </GeneralInfo>
          <DescriptionWrapper>
            <Text color="black" size="l" weight="light">
              {description || ''}
            </Text>
          </DescriptionWrapper>
          <OwnerAccountWrapper>
            <StyledHeading size="4">Owner</StyledHeading>
            <AccountLinkComponent
              noShort={deviceSize >= DeviceSize.sm}
              value={owner || ''}
            />
          </OwnerAccountWrapper>
        </GeneralInfoWrapper>
      </PropertiesWrapper>
    </>
  );
};

const PropertiesWrapper = styled.div`
  margin-top: calc(var(--gap) * 2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GeneralInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--gap);
`;

const GeneralInfo = styled.div`
  display: flex;
  column-gap: var(--gap);

  div {
    display: flex;
    column-gap: calc(var(--gap) / 4);
  }

  @media (max-width: ${DeviceSizes.md}) {
    flex-wrap: wrap;
  }
`;

const StyledHeading = styled(Heading)`
  margin-bottom: var(--gap) !important;
`;

const DescriptionWrapper = styled.div`
  word-break: break-word;
  max-width: 1040px;
`;

const CreatedAccountWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  row-gap: calc(var(--gap) / 2);
  flex-direction: column;
  margin-bottom: calc(var(--gap) * 1.5);
`;

const OwnerAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  column-gap: var(--gap);
  margin-top: calc(var(--gap) / 2);

  svg {
    height: 24px;
    width: 24px;
  }
`;

export default CollectionBasicDataComponent;
