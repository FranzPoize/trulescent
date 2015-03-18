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
          templateScope: {
            text: 'yop'
          },
          template:'<div class="tlsc-tooltip"><div>{{text}} de la balle</div><button class="btn" ng-click="prevStep()">Back</button><button class="btn" ng-click="nextStep()">Next</button><button class="btn" ng-click="stop()">End</button></div>',
          placement: 'top',
          offset: {
            left:20,
            top:0
          }
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
          templateScope: {
            text: 'yop'
          },
          template:'<div class="tlsc-tooltip"><div>{{text}} de la balle</div><button class="btn" ng-click="prevStep()">Back</button><button class="btn" ng-click="nextStep()">Next</button><button class="btn" ng-click="stop()">End</button></div>',
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

#### Steps array

The steps passed to the directive **MUST** be an array of object literals. Steps will be ordered in the tutorial following there order in the steps array.

#### Step object literal

Each step **MUST** contain a ```tooltip``` and a ```location``` properties at least. It **CAN** also contain the ```transition```,```preFn``` and ```postFn```.

#### Tooltip

Here is an example of a tooltip object:
``` javascript
{
  content:'text',
  templateScope: {
    text: 'yop'
  },
  template:'<div class="tlsc-tooltip"><div>{{text}} de la balle</div><button class="btn" ng-click="prevStep()">Back</button><button class="btn" ng-click="nextStep()">Next</button><button class="btn" ng-click="stop()">End</button></div>',
  placement: 'top',
  offset: {
    left:20,
    top:0
  }
}
```

|Name|Type|Default|Description|
|----|----|-------|-----------|
|content|string|none|Used in the basic template to provide text content to the tooltip|
|template|html|none|Define a specific template to be used for this step|
|templateScope|object|none|Scope used in the specific template|
|placement|string|none|Placement of the tooltip. Can be ```top```, ```left```, ```right``` or ```bottom```|
|offset|object|none|Define different offset for tooltip placement|

#### Location

Here is an example of a location object:
``` javascript
{
  selector:'.thumbnail',
  zIndexSelector:'.relativeZindexedParent'
}
```

|Name|Type|Default|Description|
|----|----|-------|-----------|
|selector|css selector|none|Specify the element the panel should show on this step|
|zIndexSelector|css selector|none|If your element is an absolutely positioned element inside a relatively positioned element which happen to have a z-index you will have to provide the selector to this parent|

#### Watch transition
Here is an example of a watch transition object:
``` javascript
{
  watch:'stuff',
  selector: '#test-stuff',
  afterValue : undefined,
  testValue: 'caca'
}
```

This transition will watch for the stuff properties the ```#test-stuff``` element's scope.

When this properties to ```testValue``` trulescent will go the next step.

The stuff properties will then be set to ```undefined```.

|Name|Type|Default|Description|
|----|----|-------|-----------|
|watch|string|none|Property to watch for in the scope provided|
|selector|css selector|none|The selector of an element with a angular scope linked to it|
|afterValue|anything|none|Value the property will be set after the testValue is met|
|testValue|anything|none|Value the watched property will tested against|

#### Event transition

Here is an example of an event transition object:
``` javascript
{
  event:'click',
  selector:'#btn-tlsc-test'
}
```

This transition will watch for an event on a specific element and when this event is trigger go to the next step.

|Name|Type|Default|Description|
|----|----|-------|-----------|
|event|event name|none|Name of the event to watch for on the specified element|
|selector|css selector|none|Selector of the element on which we want to watch for the event specified|
