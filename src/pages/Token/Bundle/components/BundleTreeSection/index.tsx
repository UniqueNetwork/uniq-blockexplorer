import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Heading, Text, Skeleton } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { PagePaper, BundleTree } from '@app/components';
import { countNestedChildren } from '@app/utils';
import { Token } from '@app/api';
import { useGraphQLBundleTree } from '@app/api/graphQL/bundleTree/bundleTree';
import { useApi } from '@app/hooks';

import NodeView from './BundleTree/Node/NodeView';
import { INestingToken } from './BundleTree/types';
import { NestedSection } from './BundleTree/NestedSection/NestedSection';

const areNodesEqual = (a: INestingToken, b: INestingToken) =>
  a.collection_id === b.collection_id && a.token_id === b.token_id;

const getKey = (a: INestingToken) => `T${a.token_id}C${a.collection_id}`;

interface IProps {
  token: Token;
  onViewTokenDetails?: Dispatch<SetStateAction<INestingToken | undefined>>;
}

function BundleTreeSection({
  onViewTokenDetails: onViewTokenDetailsProps,
  token,
}: IProps) {
  const { collection_id, token_id } = token;
  const navigate = useNavigate();
  const [bundle, setBundle] = useState<INestingToken[]>();
  const [selectedToken, setSelectedToken] = useState<INestingToken>();
  const { currentChain } = useApi();
  const { bundle: bundleQL, isBundleFetching } = useGraphQLBundleTree(
    collection_id,
    token_id,
  );

  useEffect(() => {
    if (bundle) return;

    const sortTokensInBundleAndSelectOpened = (bundle: INestingToken) => {
      if (bundle.token_id === token_id && bundle.collection_id === collection_id) {
        bundle.selected = true;
        bundle.opened = true;
        setSelectedToken(bundle);
      }

      if (!bundle.nestingChildren?.length) return bundle;

      bundle.nestingChildren = bundle.nestingChildren
        ?.sort((a, b) => (a.token_id > b.token_id ? 1 : -1))
        .map((token) => sortTokensInBundleAndSelectOpened(token));
      return bundle;
    };

    const openNodeIfChildsPageOpened = (bundle: INestingToken) => {
      if (!bundle.nestingChildren?.length) {
        bundle.opened =
          bundle.token_id === token_id && bundle.collection_id === collection_id;
        return bundle;
      }

      if (!bundle.opened) {
        bundle.opened = !!bundle.nestingChildren.filter((token) =>
          openNodeIfChildsPageOpened(token),
        ).length;
      }

      return bundle;
    };

    if (bundleQL && !isBundleFetching) {
      let allowedToEditBundle = JSON.parse(JSON.stringify(bundleQL));
      allowedToEditBundle = sortTokensInBundleAndSelectOpened(allowedToEditBundle);
      allowedToEditBundle = openNodeIfChildsPageOpened(allowedToEditBundle);
      setBundle([allowedToEditBundle]);
    }
  }, [bundle, bundleQL, isBundleFetching, token_id, collection_id]);

  const onNodeClicked = useCallback((data: INestingToken) => {}, []);

  const tokensCount = useMemo(() => {
    if (!bundle || !bundle[0]?.nestingChildren) return 0;

    return countNestedChildren(bundle[0].nestingChildren);
  }, [bundle]);

  const onViewTokenDetails = useCallback(
    (token: INestingToken) => {
      navigate(
        `/${currentChain.network.toLowerCase()}/tokens/${token.collection_id}/${
          token.token_id
        }`,
      );

      if (onViewTokenDetailsProps) onViewTokenDetailsProps(token);
    },
    [onViewTokenDetailsProps, navigate],
  );

  if (isBundleFetching) return <BundleIsLoading />;

  if (!bundle) return null;

  return (
    <>
      <BundlePagePaper>
        <HeaderStyled id={'bundle'}>
          <Heading size={'2'}>Bundle tree structure</Heading>
          <Text color="grey-500" size="m">
            {tokensCount + 1} nested items
          </Text>
        </HeaderStyled>
        <Content>
          <BundleTree<INestingToken>
            dataSource={bundle || []}
            nodeView={NodeView}
            nestedSectionView={NestedSection}
            className={'tree-container'}
            compareNodes={areNodesEqual}
            childrenProperty={'nestingChildren'}
            selectedToken={selectedToken}
            getKey={getKey}
            onNodeClicked={onNodeClicked}
            onViewNodeDetails={onViewTokenDetails}
          />
        </Content>
      </BundlePagePaper>
    </>
  );
}

const BundlePagePaper = styled(PagePaper)`
  display: block;
`;

const HeaderStyled = styled.div`
  display: flex;
  gap: var(--gap);

  & > span {
    padding-top: 12px;
  }
  @media (max-width: 575px) {
    flex-direction: column;
    gap: calc(var(--gap) / 2);
    margin-bottom: calc(var(--gap) * 2);
    & > span {
      padding-top: 0;
    }
    & > .unique-font-heading.size-2 {
      margin: 0;
    }
  }
`;

const Content = styled.div`
  display: flex;
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  height: 306px;
  .unique-scrollbar {
    div:nth-last-child(-n + 2) {
      z-index: 2;
    }
    .unique-modal-wrapper {
      z-index: 50 !important;
    }
  }
  @media (max-width: 1199px) {
    height: 554px;
  }
  @media (max-width: 991px) {
    display: block;
    height: 354px;
  }
  @media (max-width: 479px) {
    height: 346px;
  }

  .tree-container {
    width: 570px;
    height: 100%;
    @media (max-width: 1440px) {
      width: 544px;
    }
    @media (max-width: 1199px) {
      width: 462px;
    }
    @media (max-width: 991px) {
      width: 100%;
    }
  }
`;

export default BundleTreeSection;

const BundleIsLoading = () => (
  <BundlePagePaper>
    <HeaderStyled>
      <Heading size={'2'}>Bundle tree structure</Heading>
    </HeaderStyled>
    <Skeleton height={60} width={'100%'} />
  </BundlePagePaper>
);
