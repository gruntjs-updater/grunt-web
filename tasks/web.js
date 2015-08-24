/*
 * grunt-web
 * https://github.com/503592366/grunt-web
 *
 * Copyright (c) 2015 yj
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var http = require('http');
    var url = require('url');
    var queryString = require('querystring');

    /**地址正则表达式
    允许的地址：/                                   默认执行default任务
                /?t=任务名称[,任务名称...]          
                /?q=任务名称[,任务名称...]
                /?tasks=任务名称[,任务名称...]
    **/
    var urlReg = /^\/(\?(t|tasks|q)=.+)?$/;
    grunt.registerMultiTask('web', 'Excute grunt tasks in browser or any http request', function() {
        var done = this.async();
        var port = this.data['port'] || 8801;
        var host = this.data['host'] || 'localhost';

        http.createServer(function(request, response) {
            response.setHeader('Content-Type', 'text/plain;charset=utf8');
            // 锁定地址
            if (!request.url.match(urlReg)) {
                response.statusCode = 404;
                response.write('Not find，这里没有你想要的');
                response.end();
                return;
            }

            var body = [];
            var query = queryString.parse(url.parse(request.url).query);
            var tasks = ((query.t || query.tasks || query.q) || 'default').split(',');

            grunt.log.writeln('Running Task:[  ' + tasks + '  ]');

            var std = grunt.util.spawn({
                cmd: 'grunt',
                args: tasks
            }, function(err, res, code) {
                var outInfo = res.stdout;
                if (code === 0) {
                    grunt.log.oklns(outInfo);
                    grunt.log.success('success');
                    response.write('success');
                } else {
                    grunt.log.errorlns(outInfo);
                    grunt.log.fail('fail!!!');
                    response.write('fail!!!');
                }
                response.end();
            });

            std.stdout.on('data', function(buff) {
                var str = String(buff);
                //移除控制台颜色代码 \x1b:ESC符号, \x07:响铃符号 
                response.write(str.replace(/((\x1b)\[[0-9]{1,2}m)|(\x07)/g, ''));
            });

        }).listen(port, host);

        grunt.log.writeln('Run grunt-web on ' + host + ':' + port);
    });
};