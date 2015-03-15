# Trulescent

## Installation

You can add this repository to your bower file like so
``` sh
bower install --save https://github.com/FranzPoize/trulescent.git#~0.0.7
```
Or download one of the different release here https://github.com/FranzPoize/trulescent/releases.

And then add these lines to your html
``` html
<script type="application/javascript" src="path_to_trulescent/dist/trulescent.js"></script>
```
``` html
<link rel="stylesheet" href="path_to_trulescent/dist/trulescent.css">
```

You will then have to add the ```trulescent``` module to your module dependency
``` javascript
angular.module('yourModule',['trulescent']);
```

## Usage

You will have to add the trulescent directive in the ```<body>``` element of your ```index.html``` like so.

``` html
<div trulescent steps="steps" start="startTlsc"></div>
```

The step attributes will be used to configure the different steps of the trulescent tutorial. The start attributes will launch the trulescent tutorial when it is equal to true.

### Steps config
``` javascript
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
```
