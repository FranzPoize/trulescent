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

    $scope.stepsPlacement = [
      {
        tooltip: {
          content:'0',
          placement: 'top'
        },
        location: {
          selector:'.thumbnail'
        },
      },
      {
        tooltip: {
          content:'0',
          placement: 'right'
        },
        location: {
          selector:'.thumbnail'
        },
      },
      {
        tooltip: {
          content:'0',
          placement: 'bottom'
        },
        location: {
          selector:'.thumbnail'
        },
      },
      {
        tooltip: {
          content:'1',
          placement:'left',
        },
        location: {
          selector:'.thumbnail'
        }
      }
    ];

    $scope.steps = [
      {
        tooltip: {
          content:'0',
          placement: 'top'
        },
        scrollOffset: -100,
        location: {
          selector:'.thumbnail'
        },
      },
      {
        tooltip: {
          content:'1',
          placement:'bottom',
        },
        location: {
          selector:'.jumbotron'
        }
      }
    ];
    $scope.go = function() {
        $scope.startTlsc = true;
    }
  });
