'use strict';

angular.module('trulescent', []);

'use strict';

angular.module( 'trulescent' )
  .controller( 'BackdropCtrl', ["$scope", "tlscTools", function ( $scope,tlscTools ) {
    $scope.$on('tlsc.backdrop.move',function ( $event, selector ) {

      var targetElement = document.querySelector( selector ),
        $targetElement = angular.element( targetElement ),
        elAbsPosition = tlscTools.cumulativeOffset( targetElement ),
        width = targetElement.offsetWidth,
        height = targetElement.offsetHeight;

        $scope.placement = {
          top: elAbsPosition.top,
          left: elAbsPosition.left,
          width: targetElement.clientWidth,
          height: targetElement.clientHeight
        };
    })
  }]);

'use strict';

angular.module('trulescent')
  .service('tlscTools',function() {
    this.animationDurationMilli = 200;

    this.cumulativeOffset = function(element) {
        var top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent;
        } while(element);

        return {
            top: top,
            left: left
        };
      };
  });

'use strict';

angular.module('trulescent')
  .directive('tlscTooltip', ["$timeout", "tlscTools", "$compile", "$templateCache", function ( $timeout, tlscTools, $compile, $templateCache ) {
    return {
      restrict : 'EA',
      scope : {step:'='},
      templateUrl : 'components/tooltip/tooltip.html',
      link: function ( $scope, $element, $attrs ) {

        $scope.nextStep = function () {
          $scope.$emit('tlsc.next');
        };

        $scope.prevStep = function () {
          $scope.$emit('tlsc.prev');
        };

        $scope.stop = function () {
          $scope.$emit('tlsc.end');
        };

        function moveTooltip (newValue,selector,offset) {
          var cssValues,
            targetElement = document.querySelector(selector),
            elAbsPosition = tlscTools.cumulativeOffset(targetElement);

          switch( newValue ) {
            case 'top' :
              cssValues = {
                bottom: (window.innerHeight - elAbsPosition.top + (offset.bottom || 0)+ 10) + 'px',
                left: (elAbsPosition.left + (offset.left|| 0)) + 'px',
                top: 'auto',
                right: 'auto'
              }
              break;
            case 'right':
              cssValues = {
                top: (elAbsPosition.top + (offset.top|| 0)) + 'px',
                left: (elAbsPosition.left + targetElement.clientWidth + (offset.left || 0)- 10) + 'px',
                bottom: 'auto',
                right: 'auto'
              }
              break;
            case 'bottom' :
              cssValues = {
                top: (elAbsPosition.top + targetElement.clientHeight + (offset.top || 0)+ 10) + 'px',
                left: (elAbsPosition.left + (offset.left|| 0)) + 'px',
                bottom: 'auto',
                right: 'auto'
              }
              break;
            case 'left' :
              cssValues = {
                top: (elAbsPosition.top + (offset.top|| 0)) + 'px',
                right: (window.innerWidth - elAbsPosition.left + (offset.right || 0)+ 10) + 'px',
                bottom: 'auto',
                left: 'auto'
              }
              break;
          }
          $element.css(cssValues);
        }

        $scope.$watch( 'step' , function ( newValue, oldValue) {
          if ( angular.isDefined( newValue ) ) {

            if ( newValue.tooltip.template ) {
              $scope.content = newValue.tooltip.content;
              $element.empty().append($compile(newValue.tooltip.template)($scope));
            } else {
              $element.empty().append($compile($templateCache.get("components/tooltip/tooltip.html"))($scope));
            }

            $element.css('opacity',0);

            $timeout( function () {
              moveTooltip(newValue.tooltip.placement,newValue.location.selector,newValue.tooltip.offset || {top:0,left:0,right:0,bottom:0});
              $element.css('opacity', 1);
            }, tlscTools.animationDurationMilli);

          }
        });
      }
    }
  }]);

'use strict';

angular.module( 'trulescent' )
  .controller( 'trulescentCtrl', ["$scope", function ( $scope ) {
  }]);

'use strict';

angular.module('trulescent')
  .directive('trulescent', ["$timeout", "tlscTools", function ( $timeout, tlscTools ) {
    return {
      restrict : 'EA',
      scope:{ start: '=' , steps: '=' },
      templateUrl : 'components/trulescent/trulescent.html',
      controller :'trulescentCtrl',
      link: function ( $scope, $element, $attrs ) {
        var stepIndex = 0,
          animationDurationMilli = 200;

        function setUpTransition( step ) {
          if ( step.transition.event ) {

            var targetEl = angular.element( document.querySelector( step.transition.selector ) );

            targetEl.on( step.transition.event,
              function ( $event ) {

                targetEl.off( 'click' );
                goToStep( ++stepIndex, stepIndex - 1 );

                step.postFn();

                $scope.$apply();
              }
            );

          } else if (step.transition.watch) {

            var targetEl = angular.element( document.querySelector( step.transition.selector ) );
            if (targetEl.length) {
              var targetScope = targetEl.data('$scope');
              var transitionWatch = targetScope.$watch( step.transition.watch,
                function ( newValue, oldValue ) {
                  if ( angular.isDefined( newValue ) &&
                    ( step.transition.testValue ? newValue === step.transition.testValue : true ) ) {

                    transitionWatch();

                    targetScope[step.transition.watch] = step.transition.hasOwnProperty('afterValue') ?
                      step.transition.afterValue : targetScope[step.transition.watch];
                    step.postFn();

                    goToStep( ++stepIndex, stepIndex - 1 );
                  }
                }
              );
            }
          }
        }

        function goToStep( step, prevStep ) {
          $scope.step = $scope.steps[step];
          $scope.$broadcast( 'tlsc.backdrop.move', $scope.steps[step].location.selector );

          if(prevStep >= 0) {
            var selector = $scope.steps[prevStep].location.zIndexSelector || $scope.steps[prevStep].location.selector;
            angular.element(document.querySelector(selector)).removeClass('tlsc-element');
          }
          var selector = $scope.steps[step].location.zIndexSelector || $scope.steps[step].location.selector;
          angular.element(document.querySelector(selector)).addClass('tlsc-element');


          $scope.steps[step].preFn && $scope.steps[step].preFn();

          setUpTransition($scope.steps[step]);
        };

        $scope.$watch( 'start', function ( newValue, oldValue ) {
          if ( angular.isDefined( newValue ) && newValue) {
            goToStep(stepIndex)
          }
        });

        $scope.$on('tlsc.next',function($event) {
          goToStep(++stepIndex, stepIndex - 1);
        });

        $scope.$on('tlsc.prev',function($event) {
          goToStep(--stepIndex, stepIndex + 1);
        });

        $scope.$on('tlsc.end',function($event) {
          stepIndex = 0;
          angular.element(document.querySelector('.tlsc-element')).removeClass('tlsc-element');
          $scope.start = false;
        });
      }
    }
  }]);

'use strict';

angular.module('trulescent')
  .directive('tlscPanel', function ( ) {
    return {
      restrict:'EA',
      replace:'true',
      templateUrl:'components/backdrop/panel/panel.html',
      link: function ( $scope, $element, $attrs ) {

        $scope.$watch( 'placement' , function() {

          _.each( $scope.placement , function ( coord, prop) {
            $element.css( prop, coord + 'px' );
          })

        });
      }
    }
  });

(function(module) {
try {
  module = angular.module('trulescent');
} catch (e) {
  module = angular.module('trulescent', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/backdrop/backdrop.html',
    '<div class="tlsc-backdrop-container" ng-controller="BackdropCtrl"><div class="tlsc-backdrop"></div><div tlsc-panel="" class="tlsc-panel" placement="placement"></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('trulescent');
} catch (e) {
  module = angular.module('trulescent', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/tooltip/tooltip.html',
    '<div class="tlsc-tooltip"><div class="tlsc-content panel-body">{{step.tooltip.content}}</div><button class="btn" ng-click="prevStep()">Back</button> <button class="btn" ng-click="nextStep()">Next</button> <button class="btn" ng-click="stop()">End</button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('trulescent');
} catch (e) {
  module = angular.module('trulescent', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/trulescent/trulescent.html',
    '<div class="tlsc-main" ng-show="start"><div ng-include="\'components/backdrop/backdrop.html\'" ng-controller="BackdropCtrl"></div><div tlsc-tooltip="" class="tlsc-tooltip-container" step="step"></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('trulescent');
} catch (e) {
  module = angular.module('trulescent', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/backdrop/panel/panel.html',
    '<div class="tlsc-panel"></div>');
}]);
})();
