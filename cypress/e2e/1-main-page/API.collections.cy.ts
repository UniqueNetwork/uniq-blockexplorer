import Api from '../../links/Api';

describe("Collections.Name.desc_nulls_last", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "name": "desc_nulls_last"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Name.asc_nulls_first", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "name": "asc_nulls_first"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Date_of_creation.asc_nulls_first", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "date_of_creation": "asc_nulls_first"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Date_of_creation.desc_nulls_last", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
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
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Holders.desc_nulls_last", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "holders_count": "desc_nulls_last"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Holders.asc_nulls_first", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "holders_count": "asc_nulls_first"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Items.asc_nulls_first", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "tokens_count": "asc_nulls_first"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Items.desc_nulls_first", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "tokens_count": "desc_nulls_first"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Transfers.asc_nulls_first", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "transfers_count": "asc_nulls_first"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Transfers.desc_nulls_first", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {},
                "burned": {
                  "_eq": "false"
                }
              },
              {}
            ]
          },
          "orderBy": {
            "transfers_count": "desc_nulls_first"
          },
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.Only nesting enabled", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {
                  "_eq": "true"
                },
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
          "limit": 24,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body.data.collections.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(24)
    })
  });
})

describe("Collections.36", () => {
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
                "_or": [
                  {}
                ],
                "nesting_enabled": {
                  "_eq": "true"
                },
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
          "limit": 36,
          "offset": 0
        }
        `,
      },
    })
    .then((resp) => {
      cy.log(resp.body)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.collections.data.length).to.eq(36)
    })
  });
})