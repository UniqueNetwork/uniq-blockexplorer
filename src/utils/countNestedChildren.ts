import { NestingToken } from '@app/api/graphQL/bundleTree/types';

export const countNestedChildren = (nestingChildTokens: NestingToken[]) => {
  let count = 0;
  const countChildren = (tokenChildren: NestingToken[]) => {
    if (tokenChildren.length === 0) return count;
    else {
      count += tokenChildren.length;
      tokenChildren.forEach((child) => countChildren(child.nestingChildren || []));
    }
  };
  countChildren(nestingChildTokens || []);
  return count;
};
