'use strict';

angular.module('trulescent')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      {
        'key': 'angular',
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'key': 'browsersync',
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'key': 'gulp',
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'key': 'jasmine',
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'key': 'karma',
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'key': 'protractor',
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'key': 'less',
        'title': 'Less',
        'url': 'http://lesscss.org/',
        'description': 'Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.',
        'logo': 'less.png'
      }
    ];
    angular.forEach($scope.awesomeThings, function(awesomeThing) {
      awesomeThing.rank = Math.random();
    });

    $scope.steps = [
      {
        tooltip: {
          content:'yop',
          template:'<div class="tlsc-tooltip"><div>{{content}} de la balle</div><button class="btn" ng-click="prevStep()">Back</button><button class="btn" ng-click="nextStep()">Next</button><button class="btn" ng-click="stop()">End</button></div>',
          placement: 'top'
        },
        location: {
          selector:'.thumbnail'
        },
        transition: {
          event:'click',
          selector:'#btn-tlsc-test'
        }
      },
      {
        tooltip: {
          content:'jumbotron',
          placement:'bottom',
        },
        location: {
          selector:'.jumbotron'
        },
        transition: {
          watch:'stuff',
          selector: '#test-stuff',
          afterValue : undefined,
          testValue: 'caca'
        },
        preFn:function() {
          console.log('pre');
        },
        postFn: function() {
          console.log('post');
        }
      },
      {
        tooltip: {
          content:'yop',
          template:'<div class="tlsc-tooltip"><div>{{content}} de la balle</div><button class="btn" ng-click="prevStep()">Back</button><button class="btn" ng-click="nextStep()">Next</button><button class="btn" ng-click="stop()">End</button></div>',
          placement: 'top'
        },
        location: {
          selector:'.thumbnail'
        },
        transition: {
          event:'click',
          selector:'#btn-tlsc-test'
        }
      }
    ];
    $scope.go = function() {
        $scope.startTlsc = true;
    }
  });
