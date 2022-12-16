import Api from '../../links/Api';

describe("Statistics", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getStatistics',
        query: `
        query getStatistics($limit: Int, $offset: Int, $where: StatisticsWhereParams = {}, $orderBy: StatisticsOrderByParams = {}) {
          statistics(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
            data {
              count
              name
              __typename
            }
            count
            __typename
          }
        }
        `,
        variables:
        `
        {
          "where": {},
          "limit": 10,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.statistics.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.statistics.data.length).to.eq(9)
    })
  });
})

describe("Tokens.New", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getTokens',
        query: `
        query getTokens($limit: Int, $offset: Int, $where: TokenWhereParams = {}, $orderBy: TokenOrderByParams = {}) {
          tokens(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
            data {
              attributes
              collection_cover
              collection_description
              collection_id
              collection_name
              date_of_creation
              owner
              owner_normalized
              image
              token_id
              token_prefix
              transfers_count
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "where": {
            "_and": [
              {
                "burned": {
                  "_eq": "false"
                }
              },
              {},
              {}
            ]
          },
          "orderBy": {
            "date_of_creation": "desc_nulls_last"
          },
          "limit": 12,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.tokens.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.tokens.data.length).to.eq(12)
    })
  });
})

describe("Tokens.Top", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getTokens',
        query: `
        query getTokens($limit: Int, $offset: Int, $where: TokenWhereParams = {}, $orderBy: TokenOrderByParams = {}) {
          tokens(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
            data {
              attributes
              collection_cover
              collection_description
              collection_id
              collection_name
              date_of_creation
              owner
              owner_normalized
              image
              token_id
              token_prefix
              transfers_count
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "where": {
            "_and": [
              {
                "burned": {
                  "_eq": "false"
                }
              },
              {},
              {}
            ]
          },
          "orderBy": {
            "transfers_count": "desc_nulls_last"
          },
          "limit": 12,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.tokens.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.tokens.data.length).to.eq(12)
    })
  });
})

describe("Bundle.New", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getBundles',
        query: `
        query getBundles($limit: Int, $offset: Int, $where: TokenWhereParams = {}, $orderBy: TokenOrderByParams = {}) {
          tokenBundles(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
            data {
              attributes
              children_count
              collection_cover
              collection_description
              collection_id
              collection_name
              date_of_creation
              owner
              owner_normalized
              image
              token_id
              token_prefix
              transfers_count
              type
              bundle_created
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "where": {
            "_and": [
              {
                "_or": [
                  {}
                ],
                "burned": {
                  "_eq": "false"
                }
              },
              {},
              {}
            ]
          },
          "orderBy": {
            "bundle_created": "desc_nulls_last"
          },
          "limit": 12,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.tokenBundles
        .data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.tokenBundles.data.length).to.eq(12)
    })
  });
})

describe("Bundle.Top", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getBundles',
        query: `
        query getBundles($limit: Int, $offset: Int, $where: TokenWhereParams = {}, $orderBy: TokenOrderByParams = {}) {
          tokenBundles(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
            data {
              attributes
              children_count
              collection_cover
              collection_description
              collection_id
              collection_name
              date_of_creation
              owner
              owner_normalized
              image
              token_id
              token_prefix
              transfers_count
              type
              bundle_created
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "where": {
            "_and": [
              {
                "_or": [
                  {}
                ],
                "burned": {
                  "_eq": "false"
                }
              },
              {},
              {}
            ]
          },
          "orderBy": {
            "transfers_count": "desc_nulls_last"
          },
          "limit": 12,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.tokenBundles
        .data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.tokenBundles.data.length).to.eq(12)
    })
  });
})

describe("Last transfers.NFTs", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getNftTransfers',
        query: `
        query getNftTransfers($limit: Int, $offset: Int, $orderBy: TransactionsOrderByParams = {}, $where: TransactionWhereParams = {}) {
          tokenTransactions(
            limit: $limit
            offset: $offset
            order_by: $orderBy
            where: $where
          ) {
            data {
              block_index
              collection_id
              collection_name
              image
              owner
              owner_normalized
              timestamp
              to_owner
              to_owner_normalized
              token_id
              token_name
              token_prefix
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "orderBy": {
            "timestamp": "desc"
          },
          "where": {
            "_and": {}
          },
          "limit": 6,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.tokenTransactions.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.tokenTransactions.data.length).to.eq(6)
    })
  });
})

describe("Last transfers.Coins", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getLastTransfers',
        query: `
        query getLastTransfers($limit: Int, $offset: Int, $orderBy: ExtrinsicOrderByParams = {}, $where: ExtrinsicWhereParams = {}) {
          extrinsics(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
            data {
              block_number
              block_index
              amount
              fee
              from_owner
              from_owner_normalized
              hash
              success
              timestamp
              to_owner
              to_owner_normalized
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "orderBy": {
            "timestamp": "desc"
          },
          "where": {
            "_and": {
              "amount": {
                "_neq": 0
              },
              "method": {
                "_in": [
                  "transfer",
                  "transferAll",
                  "transferKeepAlive",
                  "vestedTransfer"
                ]
              }
            }
          },
          "limit": 6,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.extrinsics
        .data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.extrinsics.data.length).to.eq(6)
    })
  });
})

describe("Last blocks", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'GetLatestBlocks',
        query: `
        query GetLatestBlocks($limit: Int, $offset: Int, $order_by: BlockOrderByParams, $where: BlockWhereParams) {
          block(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
            data {
              block_number
              total_events
              total_extrinsics
              timestamp
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "limit": 6,
          "offset": 0,
          "order_by": {
            "block_number": "desc"
          },
          "where": {}
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.block.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.block.data.length).to.eq(6)
    })
  });
})





describe("Collection.New", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getCollections',
        query: `
        query getCollections($limit: Int, $offset: Int, $where: CollectionWhereParams = {}, $orderBy: CollectionOrderByParams = {}) {
          collections(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
            data {
              attributes_schema
              collection_cover
              collection_id
              date_of_creation
              description
              holders_count
              nesting_enabled
              name
              offchain_schema
              owner
              owner_normalized
              schema_version
              token_prefix
              tokens_count
              transfers_count
              type
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "where": {
            "_and": [
              {
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "date_of_creation": "desc_nulls_last"
          },
          "limit": 6,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(6)
    })
  });
})

describe("Collection.Top", () => {
  const ApiUrl = new Api();

  it('status 200, amount of elements', () => {
    cy.request({
      method: 'POST',
      url: ApiUrl.thisApi,
      body: {
        operationName: 'getCollections',
        query: `
        query getCollections($limit: Int, $offset: Int, $where: CollectionWhereParams = {}, $orderBy: CollectionOrderByParams = {}) {
          collections(where: $where, limit: $limit, offset: $offset, order_by: $orderBy) {
            data {
              attributes_schema
              collection_cover
              collection_id
              date_of_creation
              description
              holders_count
              nesting_enabled
              name
              offchain_schema
              owner
              owner_normalized
              schema_version
              token_prefix
              tokens_count
              transfers_count
              type
              __typename
            }
            count
            timestamp
            __typename
          }
        }
        `,
        variables:
        `
        {
          "where": {
            "_and": [
              {
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "transfers_count": "desc_nulls_last"
          },
          "limit": 6,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(6)
    })
  });
})



