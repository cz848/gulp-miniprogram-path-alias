const through = require('through2');
const PluginError = require('plugin-error');
const alias = require('./alias');

module.exports = function (options) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }
        if (file.isStream()) {
            return cb(new PluginError('gulp-miniprogram-path-alias', 'stream not supported'));
        }
        let content = file.contents.toString('utf8');
        content = alias(options, content, file.path);
        file.contents = Buffer.from(content);
        cb(null, file);
    });
}
