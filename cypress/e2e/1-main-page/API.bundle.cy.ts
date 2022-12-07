import Api from '../../links/Api';
import PageUrl from '../../links/linksUrl'

describe("Bundle.Bundle_created.desc_nulls_last", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=bundle_created-desc_nulls_last')  
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
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Bundle_created.asc_nulls_first", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
    
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=bundle_created-asc_nulls_first')
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
              "bundle_created": "asc_nulls_first"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Bundle.desc_nulls_last", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=token_name-desc_nulls_last')  
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
              "token_name": "desc_nulls_last"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Bundle.asc_nulls_first", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=token_name-asc_nulls_first')  
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
              "token_name": "asc_nulls_first"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Collection.desc_nulls_last", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=collection_name-desc_nulls_last')  
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
              "collection_name": "desc_nulls_last"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Collection.asc_nulls_first", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=collection_name-asc_nulls_first')  
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
              "collection_name": "asc_nulls_first"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Nested items.desc_nulls_last", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=children_count-desc_nulls_last')  
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
              "children_count": "desc_nulls_last"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Nested items.asc_nulls_first", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=children_count-asc_nulls_first')  
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
              "children_count": "asc_nulls_first"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Transfers.desc_nulls_last", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=transfers_count-desc_nulls_last')  
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
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })

  describe("Bundle.Transfers.asc_nulls_first", () => {
    const ApiUrl = new Api();
    const linksUrl = new PageUrl();
  
    it('status 200, amount of elements', () => {
        cy.visit(linksUrl.thisLinksUrl+'bundles/?sort=transfers_count-asc_nulls_first')  
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
              "transfers_count": "asc_nulls_first"
            },
            "limit": 24,
            "offset": 0
          }
          `,
        },
      })
      .then((resp) => {
        cy.log(resp.body.data.tokenBundles.data)
        expect(resp.status).to.eq(200)
        expect(resp.body.data.tokenBundles.data.length).to.eq(24)
      })
    });
  })