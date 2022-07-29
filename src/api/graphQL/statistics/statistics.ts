import { gql } from '@apollo/client';

export const statisticsQuery = gql`
  query getStatistics($limit: Int, $offset: Int, $where: StatisticsWhereParams = {}, $orderBy: StatisticsOrderByParams = {}) {
    statistics(
        where: $where
        limit: $limit
        offset: $offset
        order_by: $orderBy
      ) {
        data {
          count
          name
        }
        count
      }
    }
`;
