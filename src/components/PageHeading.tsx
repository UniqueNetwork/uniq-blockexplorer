import { VFC } from 'react';
import styled from 'styled-components/macro';

import { DeviceSizes } from '@app/hooks';

interface PageHeadingProps {
  title: string;
}

const PageHeading: VFC<PageHeadingProps> = (props) => {
  const { title } = props;

  return (
    <TopBar>
      <Title>{title}</Title>
    </TopBar>
  );
};

const TopBar = styled.div`
  display: grid;
  grid-column-gap: calc(var(--gap) * 2);
  grid-template-columns: 1fr 560px 72px;
  margin-bottom: calc(var(--gap) * 2.5);

  .unique-select .select-wrapper > svg {
    z-index: unset;
  }

  @media (max-width: ${DeviceSizes.sm}) {
    margin-bottom: 24px;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 36px;
  line-height: 48px;
`;

export default PageHeading;
