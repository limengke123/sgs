import rollupTypescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input: './src/background.ts',
    output: {
        file: './lib/js/background.js',
        format: 'iife'
    },
    plugins: [
        resolve(),
        commonjs(),
        rollupTypescript(),
    ]
}
