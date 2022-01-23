# Todos

You don't need to build it locally, there is [Live version](https://todos.kozlovzxc.ru/).

## Install

### Web

1. Go to web folder `cd apps/web`.
2. Install deps `yarn`.
3. Run `./scripts/start.mjs`.
4. Open in browser [http://localhost:1234/](http://localhost:1234/).

### Web E2E tests

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
- CI
    - [ ] Add Github Actions checks
    - [ ] Run linter
    - [ ] Run cypress
- Libs
    - [ ] Cover common-react-hooks with tests
- Docs
    - [ ] Add notes how to run app locally
    - [ ] Add notes about inline styles
    - [ ] Add notes about shared libs
    - [ ] Add notes about e2e tests
    - [ ] Notes about used linters
- Monitoring
    - [ ] Add sentry checks

### v2

- [ ] Add event broker
- [ ] Add backend
    - [ ] Add authentication/authorization

## Resources

Api reference -> [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/guide/)

State management -> [effector.dev](https://effector.dev/)

Components library -> [ant.design](https://ant.design/)
