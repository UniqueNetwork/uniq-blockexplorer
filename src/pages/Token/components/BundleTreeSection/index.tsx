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

import NodeView from './BundleTree/Node/NodeView';
import { INestingToken } from './BundleTree/types';
import { NestedSection } from './BundleTree/NestedSection/NestedSection';

const areNodesEqual = (a: INestingToken, b: INestingToken) =>
  a.collection_id === b.collection_id && a.token_id === b.token_id;

const getKey = (a: INestingToken) => `T${a.token_id}C${a.collection_id}`;

const sortTokensInBundle = (bundle: INestingToken) => {
  if (!bundle.nestingChildren?.length) return bundle;

  bundle.nestingChildren = bundle.nestingChildren
    ?.sort((a, b) => (a.token_id > b.token_id ? 1 : -1))
    .map((token) => sortTokensInBundle(token));
  return bundle;
};

interface IProps {
  token: Token;
  onViewTokenDetails?: Dispatch<SetStateAction<INestingToken | undefined>>;
}

function BundleTreeSection({
  onViewTokenDetails: onViewTokenDetailsProps,
  token,
}: IProps) {
  const navigate = useNavigate();
  const [isMobileViewVisible, setIsMobileViewVisible] = useState(false);
  const [bundle, setBundle] = useState<INestingToken[]>();
  const [selectedToken, setSelectedToken] = useState<INestingToken>();
  const { bundle: bundleQL, isBundleFetching } = useGraphQLBundleTree(
    token.collection_id,
    token.token_id,
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

    if (bundleQL && !isBundleFetching) {
      setBundle([sortTokensInBundle(JSON.parse(JSON.stringify(bundleQL)))]);
    }
  }, [bundle, bundleQL, isBundleFetching]);

  const onNodeClicked = useCallback((data: INestingToken) => {}, []);

  const tokensCount = useMemo(() => {
    if (!bundle || !bundle[0]?.nestingChildren) return 0;

    return countNestedChildren(bundle[0].nestingChildren);
  }, [bundle]);

  const onViewTokenDetails = useCallback(
    (token: INestingToken) => {
      navigate(`/token/${token.collection_id}/${token.token_id}`);

      if (onViewTokenDetailsProps) onViewTokenDetailsProps(token);
      // if (isMobileViewVisible) closeView();
    },
    [onViewTokenDetailsProps, isMobileViewVisible],
  );

  if (isBundleFetching) return <BundleIsLoading />;

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

  .tree-container {
    width: 536px;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  @media (max-width: 567px) {
    display: none;
  }
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
