import rollupTypescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import copy from 'rollup-plugin-copy'

const mode = process.env.mode

export default {
    input: './src/main.ts',
    output: {
        file: './lib/js/inject.js',
        format: 'iife'
    },
    plugins: [
        resolve(),
        commonjs(),
        rollupTypescript({
            abortOnError: mode === 'production'
        }),
        copy({
            verbose: true,
            targets: [
                {src: 'src/html/**/*', dest: 'lib/html'},
                {src: 'src/css/**/*', dest: 'lib/css'},
                {src: 'src/img/**/*', dest: 'lib/img'},
                // {src: 'src/js/**/*', dest: 'lib/js'},
                {src: 'src/manifest.json', dest: 'lib/'},
            ]
        })
    ]
}
