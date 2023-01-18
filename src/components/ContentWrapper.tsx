import styled from 'styled-components/macro';

import { DeviceSizes } from '@app/hooks';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > :first-of-type {
    margin-bottom: calc(var(--gap) * 1.5);
  }
  .pagination {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;

    .count-with-page-size {
      display: flex;
      align-items: center;
      gap: calc(var(--gap) * 1.5);

      .page-size {
        display: flex;
        grid-column-gap: calc(var(--gap) / 2);
        align-items: center;

        .unique-select {
          width: 72px;
        }
      }

      @media (max-width: ${DeviceSizes.sm}) {
        grid-column-gap: var(--gap);
      }
    }
  }
`;
