const path = require('path')
const fs = require('fs')

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/alenafiddler.github.io/" : "/",
};
