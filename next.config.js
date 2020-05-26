const withCSS = require("@zeit/next-css");
require('dotenv').config()
const path = require('path')
const Dotenv = require('dotenv-webpack')
const withImages = require('next-images')

module.exports = withCSS(
    withImages({
        inlineImageLimit: 16384,
        webpack(config, {defaultLoaders}) {
            config.plugins = [
                ...config.plugins,

                new Dotenv({
                    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
                    systemvars: true
                })
            ];
        
            return config
        }
    })
)