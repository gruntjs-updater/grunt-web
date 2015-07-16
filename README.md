# grunt-web

> Excute grunt tasks in browser or any http request

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-web --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-web');
```

## The "web" task

### Overview
In your project's Gruntfile, add a section named `web` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  web: {
    server: {
      host:"localhost",
	  port:8801
    }
  },
});
```

### Options

#### options.host
Type: `String`
Default value: `'localhost'`

主机地址

#### options.port
Type: `Int`
Default value: `8801`

监听端口

### Usage Examples
http://localhost:2425/ run task 'default'
or
http://localhost:2425/?t=jshint
or
http://localhost:2425/?t=default,jshint  run task 'default' and 'jshint'

