# About

# Development

To display data when developing a project locally, the following variables must be written in the file .env.local :

REACT_APP_NET_DEFAULT=QUARTZ
REACT_APP_IPFS_GATEWAY=https://ipfs.uniquenetwork.dev/ipfs
REACT_APP_NET_UNIQUE_API = https://scan-api.dev.uniquenetwork.dev/v1/graphql
REACT_APP_NET_UNIQUE_NAME = Unique Network
REACT_APP_NET_UNIQUE_RPC = wss://ws.unique.network
REACT_APP_NET_QUARTZ_NAME=QUARTZ by UNIQUE
REACT_APP_NET_QUARTZ_RPC=wss://ws-rc.unique.network
REACT_APP_NET_QUARTZ_API=https://scan-api.dev.uniquenetwork.dev/v1/graphql

## Branching and PR's

1. Each branch should be related to a Jira issue and follow the next pattern: PROJECT_NAME-ISSUE_NUMBER-title
   Example: NFTPAR-959-automation-testing
   Title have to be minimalistic info about what branch is about, it doesn't have to be exact copy of jira issue (but usually will be)
2. If multiple tasks are done in single PR you can specify other tasks in commit messages following same pattern (you can abandone task title, since you already have commit message)
