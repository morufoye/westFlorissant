module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        { targets: { ie: '11' }, useBuiltIns: 'entry', corejs: 3 },
    ],
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-throw-expressions',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-syntax-jsx',
    ],
};