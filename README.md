[✨ Demo](https://affectionate-carson-38718b.netlify.app/)

# How to run

First, you need to install dependencies.

```bash
yarn
```

If you want to run web app.

```bash
yarn web:start
```

If you want to run web-e2e app, first, start the web app, and then.

```bash
yarn web-e2e:open
```

# Screenshots

Desktop
![](.github/assests/Screen%20Shot%202021-06-04%20at%2001.09.49.png)

Desktop search example
![](.github/assests/Screen%20Shot%202021-06-04%20at%2001.10.22.png)

Tablet
![](.github/assests/Screen%20Shot%202021-06-04%20at%2001.10.08.png)

Mobile
![](.github/assests/Screen%20Shot%202021-06-04%20at%2001.10.00.png)

E2E tests
![](.github/assests/Screen%20Shot%202021-06-04%20at%2000.20.24.png)

Linter checks
![](.github/assests/Screen%20Shot%202021-06-04%20at%2001.15.11.png)

# Features

-   🟨 Linters

    -   ✅ HTML via Prettier
    -   ✅ TS via eslint (tslint) + Prettier
    -   ❌ SCSS via stylelint

-   🟨 Test

    -   ✅ E2E tests with cypress for the whole app
    -   ❌ Unit tests for stores
    -   ❌ Sentry checks

-   🟨 Apps

    -   🟨 Web
        -   ✅ Initial loader
        -   🟨 Not found page
            -   ✅ Add basic not found page and it's route
            -   ❌ Style not found page
        -   ✅ Todos table page
        -   ✅ Publish app to Netlify
        -   ❌ Fix minification for Parcel (it's broken on Parcel itself)
        -   ❌ Change favicon
        -   ❌ Load only required ant design CSS files (so we don't load unused styles)
        -   ❌ Reduce bundle size (there are some issues with it now, it is huge)
        -   ❓ Add create/update todo functionality (wasn't required)
    -   ✅ Web-e2e
    -   ✅ Libs (code shared between different apps)

-   ❌ CI/CD
    -   ❌ Basic docker-compose files
    -   ❌ Basic linter checks during the deploy
    -   ❌ Basic e2e tests check during the deploy

# Resources

Api reference -> [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/guide/)

State management -> [effector.dev](https://effector.dev/)

Components library -> [ant.design](https://ant.design/)
