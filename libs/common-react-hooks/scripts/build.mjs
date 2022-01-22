#!/usr/bin/env zx

let build = async () => {
    await $`rm -rf dist`
    await $`yarn parcel build index.ts`
}

void build()
