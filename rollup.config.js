import vue from 'rollup-plugin-vue';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss'

export default [
    {
        input: 'src/index.js',
        output: [
            {
                format: 'esm',
                file: 'dist/library.mjs'
            },
            {
                format: 'cjs',
                file: 'dist/library.js'
            }
        ],
        plugins: [
            scss({
                name: 'output.css',
                fileName: 'output.css',
                outputStyle: 'compressed'
            }),
            vue(), peerDepsExternal()
        ],
        external: ['JSONView']
    }
];