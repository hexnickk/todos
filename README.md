# Todos

You don't need to build it locally, there is [Live version](https://todos.kozlovzxc.ru/).

Also, if you are using Vimium, it may affect application functionality, I haven't fixed it yet.

## Install

### Web

1. Go to web folder `cd apps/web`.
2. Install deps `yarn`.
3. Run `./scripts/start.mjs`.
4. Open in browser [http://localhost:1234/](http://localhost:1234/).

### Web E2E tests

1. Start [Web](#web) first.
1. Go to web-e2e folder `cd apps/web-e2e`.
1. Install deps `yarn`
1. Run `./scripts/run.mjs`

## Technologies

This app is intentionally a bit overcomplitacted, so some of the solution down below aren't necessary in smaller apps, but some other solutions may be needed in bigger apps.

- CD via [Netlify](https://www.netlify.com/).
- CI via [Github Actions](https://github.com/features/actions).
  - PRs can't be merged if there are failing checks.
  - [Reusable actions](https://github.com/kozlovzxc/todos/blob/master/.github/actions/install-web/action.yml).
  - Linters.
    - [Prettier](https://prettier.io/).
    - [Eslint](https://eslint.org/).
    - [Typescript](https://www.typescriptlang.org/).
  - [E2E tests](https://github.com/kozlovzxc/todos/tree/master/apps/web-e2e) via [Cypress](https://www.cypress.io/).
- Errors Monitoring via [Sentry](https://sentry.io/welcome/).
- [There is a package possibly reusable in multiple apps](https://github.com/kozlovzxc/todos/tree/master/libs/common-react-hooks).
- [There are sharable configs](https://github.com/kozlovzxc/todos/tree/master/libs/eslint-config-typescript).
- Build via [Parcel](https://parceljs.org/).
- Scripts are written using [zx](https://github.com/google/zx).
- Web app itself writtin in [React](https://reactjs.org/) & [Typescript](https://www.typescriptlang.org/).
- [State management](https://github.com/kozlovzxc/todos/tree/master/apps/web/src/todos/stores/todos) is implemented using [Effector](https://effector.dev/).
- Most of the styling is done via [Bootstrap](https://getbootstrap.com/).
- There are also dev and prod [environments](https://parceljs.org/features/node-emulation/#environment-variables).
