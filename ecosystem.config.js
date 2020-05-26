module.exports = {
    apps : [{
        name: 'web-app',
        script: './node_modules/next/dist/bin/next',
        args:'start -p 8888',
        instances: 0,
        exec_mode:'cluster',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production'
        }
    }]
};
