module.exports = {
    paths: {
        appSourceMain: 'src/main-app.js',
        html: 'src/**/*.html',
        resources: ['src/resources/**'],
        libResources: ['node'],
        build: 'build',
        appDestName: 'main-app.js',
        libDestName: 'libs.js'
    },
    modules: [
        "@atorma/multimodule-angular-app-navigation",
        "@atorma/multimodule-angular-app-app-1"
    ]
};