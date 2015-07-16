/*
 * grunt-web
 * https://github.com/503592366/grunt-web
 *
 * Copyright (c) 2015 yj
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var http = require('http');
    var url = require('url');
    var queryString = require('querystring');
    
    
    var urlReg = /\/[^?,\/]+/g;
    
    grunt.registerMultiTask('web', 'Excute grunt tasks in browser or any http request', function () {
        var done = this.async();
        var port = this.data['port'] || 8801;
        var host = this.data['host'] || 'localhost';
        
        http.createServer(function (request, response) {
            response.setHeader("Content-Type", "text/plain;charset=utf8");
            
            // Just response host?t=xxx not host/a?t=xxx
            if (request.url.match(urlReg)) {
                response.statusCode = 404;
                response.end();
                return;
            }
            
            var body = [];
            var query = queryString.parse(url.parse(request.url).query);
            
            var tasks = ((query.t || query.tasks || query.q) || 'default').split(',');
            
            grunt.log.writeln('Running Task:[  ' + tasks + '  ]');
            
            var std = grunt.util.spawn({
                cmd: "grunt",
                args: tasks
            }, function (err, res, code) {
                var outInfo = res.stdout;
                if (code === 0) {
                    grunt.log.oklns(outInfo);
                    grunt.log.success("success");
                    response.write('success');
                }
                else {
                    grunt.log.errorlns(outInfo);
                    grunt.log.fail("fail!!!");
                    response.write('fail!!!');
                }
                response.end();
            });
            
            std.stdout.on('data', function (buff) {
                var str = String(buff);
                response.write(str.replace(/(\S?\[[0-9]{1,2}m)|(\cg)/g, ''));
            });

        }).listen(port, host);
        
        grunt.log.writeln('Run grunt-web on ' + port);
    });
};
