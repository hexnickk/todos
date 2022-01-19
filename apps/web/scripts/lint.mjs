#!/usr/bin/env zx

const prettier = async (globe = '*', fix = false) => {
    await $`yarn prettier -c ${'src/**/' + globe} ${fix ? '--write' : ''}`
}

const eslint = async (globe = '*', fix = false) => {
    await $`yarn eslint ${'src/**/' + globe} ${fix ? '--fix' : ''}`
}

const lintTs = async (fix = false) => {
    await prettier('*.{js,ts,tsx}', fix)
    await eslint('*.{js,ts,tsx}', fix)
}

const lintHtml = async (fix = false) => {
    await prettier('*.html', fix)
}

let lint = async () => {
    const fix = argv.fix || false
    await lintTs(fix);
    await lintHtml(fix)
}

lint()
