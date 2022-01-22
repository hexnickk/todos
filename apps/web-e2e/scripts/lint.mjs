#!/usr/bin/env zx

const prettier = async (globe = '*', fix = false) => {
    await $`yarn prettier -c ${'**/' + globe} ${fix ? '--write' : ''}`
}

const eslint = async (globe = '*', fix = false) => {
    await $`yarn eslint ${'**/' + globe} ${fix ? '--fix' : ''}`
}

const lintTs = async (fix = false) => {
    await prettier('*.{js,ts,tsx}', fix)
    await eslint('*.{js,ts,tsx}', fix)
}

let lint = async () => {
    const fix = argv.fix || false
    await lintTs(fix);
}

lint()
