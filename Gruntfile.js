/*
 * grunt-web
 * https://github.com/503592366/grunt-web
 *
 * Copyright (c) 2015 yj
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        
        web: {
            server: {
                host: "localhost",
                port: 8801
            }
        }

    });
    
    grunt.loadTasks('tasks');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    
    grunt.registerTask('default', ['jshint', 'web']);
};
