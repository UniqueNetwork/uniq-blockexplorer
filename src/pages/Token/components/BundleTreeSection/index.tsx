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
  const [isMobileViewVisible, setIsMobileViewVisible] = useState(false);
  const [bundle, setBundle] = useState<INestingToken[]>();
  const [selectedToken, setSelectedToken] = useState<INestingToken>();
  const { currentChain } = useApi();
  const { bundle: bundleQL, isBundleFetching } = useGraphQLBundleTree(
    collection_id,
    token_id,
  );

  const onActionClick = useCallback(
    (/* action: BundleModalType */) => (token: INestingToken) => {
      setSelectedToken(token);
      // setModalType(action);
    },
    [],
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
        return bundle.token_id === token_id && bundle.collection_id === collection_id;
      }

      bundle.opened = !!bundle.nestingChildren.filter((token) =>
        openNodeIfChildsPageOpened(token),
      ).length;
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
        `/${currentChain.network.toLowerCase()}/nfts/${token.collection_id}/${
          token.token_id
        }`,
      );

      if (onViewTokenDetailsProps) onViewTokenDetailsProps(token);
      // if (isMobileViewVisible) closeView();
    },
    [onViewTokenDetailsProps, isMobileViewVisible, navigate],
  );

  if (isBundleFetching) return <BundleIsLoading />;

  if (!bundle) return null;

  return (
    <>
      <BundlePagePaper>
        <HeaderStyled id={'bundle'}>
          <Heading size={'2'}>Bundle tree structure</Heading>
          <Text color="grey-500" size="m">
            {tokensCount + 1} items total
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
`;

const Content = styled.div`
  display: flex;
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  @media (max-width: 991px) {
    display: block;
  }

  .tree-container {
    overflow: auto;
    width: 550px;
    height: 306px;
    @media (max-width: 1440px) {
      width: 618px;
    }
    @media (max-width: 1199px) {
      width: 462px;
      height: 554px;
    }
    @media (max-width: 991px) {
      width: 100%;
      height: 354px;
    }
    @media (max-width: 479px) {
      height: 346px;
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
