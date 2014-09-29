'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var BaseGenGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine BaseGen generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What would you like to call this app?',
      default: 'defaultname'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  }, 

  writing: {
    app: function () {
      this.directory('css', 'css');
      this.directory('img', 'img');
      this.directory('js', 'js');
      this.directory('sass', 'sass');

      this.template('index.html', 'index.html', {
        appName: this.appName
      });

      this.copy('_package.json', 'package.json', {
        appName: this.appName
      })

      this.gruntfile.insertConfig('compass', '{ watch: { watch: true } }');
      this.gruntfile.loadNpmTasks('grunt-contrib-sass');
      this.gruntfile.loadNpmTasks('grunt-contrib-watch');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    var done = this.async();
    this.npmInstall(['grunt', 'grunt-contrib-sass', 'grunt-contrib-watch'], {'saveDev': true}, done);
  }
});

module.exports = BaseGenGenerator;
