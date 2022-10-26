import { gql, useQuery } from '@apollo/client';

import { BundleTreeVariables, BundleTreeData } from './types';

const bundleTreeQuery = gql`
  fragment tokenFields on NestingToken {
    attributes
    bundle_created
    burned
    children_count
    collection_id
    date_of_creation
    image
    is_sold
    owner
    owner_normalized
    parent_id
    properties
    token_id
    token_name
    token_prefix
  }
  query getBundleTree($tokenId: Int!, $collectionId: Int!) {
    bundleTree(input: { collection_id: $collectionId, token_id: $tokenId }) {
      ...tokenFields
      nestingChildren {
        ...tokenFields
        nestingChildren {
          ...tokenFields
          nestingChildren {
            ...tokenFields
            nestingChildren {
              ...tokenFields
              nestingChildren {
                ...tokenFields
              }
            }
          }
        }
      }
    }
  }
`;

export const useGraphQLBundleTree = (collection_id: number, token_id: number) => {
  const { data, loading: isBundleFetching } = useQuery<BundleTreeData, BundleTreeVariables>(
    bundleTreeQuery,
    {
      notifyOnNetworkStatusChange: true,
      variables: { collectionId: collection_id, tokenId: token_id },
    },
  );

  return { bundle: data?.bundleTree, isBundleFetching };
};
