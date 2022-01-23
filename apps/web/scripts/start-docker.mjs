#!/usr/bin/env zx

let main = async () => {
    await $`./scripts/build.mjs`;

    await $`docker stop todos_web || true`;
    await $`docker build . -t todos_web`;
    await $`docker run -p 1234:80 -d --name todos_web todos_web`;
};

void main();
