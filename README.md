# About

# Development

Configure your .env.local file to start local development. The .env-example can be used as an example

## Branching and PR's

1. Each branch should be related to a Jira issue and follow the next pattern: PROJECT_NAME-ISSUE_NUMBER-title
   Example: NFTPAR-959-automation-testing
   Title have to be minimalistic info about what branch is about, it doesn't have to be exact copy of jira issue (but usually will be)
2. If multiple tasks are done in single PR you can specify other tasks in commit messages following same pattern (you can abandone task title, since you already have commit message)

## Testing

1. Start project with `npm start`. Now it starts on localhost:3005 by default.
2. Open new tab in command line and type `cypress open`.
3. For ci can be used `cypress run`. But cypress base url should be changed to staging url.