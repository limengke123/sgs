import rollupTypescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const FILE_NAME = process.env.FILE
const mode = process.env.mode

export default {
    input: `./src/js/${FILE_NAME}.ts`,
    output: {
        file: `./lib/js/${FILE_NAME}.js`,
        format: 'iife'
    },
    plugins: [
        resolve(),
        commonjs(),
        rollupTypescript({
            abortOnError: mode === 'production'
        }),
    ]
}
