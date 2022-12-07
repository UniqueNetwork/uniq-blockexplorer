import Api from '../../links/Api';

describe("Tokens.Item.desc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
                {}
              ]
            },
            "orderBy": {
              "token_id": "desc_nulls_last"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(24)
      })
    });
  })

  describe("Tokens.Item.asc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
                {}
              ]
            },
            "orderBy": {
              "token_id": "asc_nulls_first"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(24)
      })
    });
  })

describe("Tokens.Created.desc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
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
      cy.log(resp.body.data.tokens.data)
      expect(resp.status).to.eq(200)
      expect(resp.body.data.tokens.data.length).to.eq(24)
    })
  });
})

describe("Tokens.Created.asc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
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
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(24)
      })
    });
  })

  describe("Tokens.Collection.desc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
                {}
              ]
            },
            "orderBy": {
              "collection_id": "desc_nulls_last"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(24)
      })
    });
  })

  describe("Tokens.Collection.asc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
                {}
              ]
            },
            "orderBy": {
              "collection_id": "asc_nulls_last"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(24)
      })
    });
  })

  describe("Tokens.Transfers.desc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
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
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(24)
      })
    });
  })

  describe("Tokens.Transfers.asc_nulls_last", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
                {}
              ]
            },
            "orderBy": {
              "transfers_count": "asc_nulls_last"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(24)
      })
    });
  })

  describe("Tokens.36", () => {
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
                parent_id
                token_id
                token_prefix
                transfers_count
                type
                burned
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
                  },
                  "_or": [
                    {
                      "type": {
                        "_eq": "NFT"
                      }
                    },
                    {
                      "type": {
                        "_eq": "NESTED"
                      }
                    }
                  ]
                },
                {},
                {}
              ]
            },
            "orderBy": {
              "date_of_creation": "desc_nulls_last"
            },
            "limit": 36,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokens.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokens.data.length).to.eq(36)
      })
    });
  })