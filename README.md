# Todos

You don't need to build it locally, there is [Live version](https://todos.kozlovzxc.ru/).

## Install

### Web

1. Go to web folder `cd apps/web`.
2. Install deps `yarn`.
3. Run `./scripts/start.mjs`.
4. Open in browser [http://localhost:1234/](http://localhost:1234/).

### Web E2E tests

1. Start [Web](#web) first.
1. Go to web-e2e folder `cd apps/web-e2e`.
2. Install deps `yarn`
3. Run `./scripts/run.mjs`

## TODO:

### v1

- [ ] Add gif with app functionality for this README
- [ ] Save state to local storage
- [ ] Add stylelint checks
- Pages
    - Not Found
        - [ ] Style page
    - Todo list
        - [ ] Test on mobile
- Tests
    - [ ] Add tests for storage
- Libs
    - [ ] Cover `common-react-hooks` with tests
    - [ ] Add 
- CI
  - Don't run linter if there are no changes in related folders
- Docs
    - [ ] CI (Github Actions)
    - [ ] CD (Netlify)
    - [ ] Inline styles
    - [ ] Shared libs
    - [ ] E2E tests
    - [ ] Linters
- Monitoring
    - [ ] Add sentry checks

### v2

- [ ] Add event broker
- [ ] Add backend
    - [ ] Add authentication/authorization
