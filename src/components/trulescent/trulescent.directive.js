'use strict';

angular.module('trulescent')
  .directive('trulescent', function ( $timeout, tlscTools ) {
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

          var offset = tlscTools.cumulativeOffset(document.querySelector(selector));

          if (!step.noScroll) {
            angular.element(document.querySelector('body')).animate({
              scrollTop: offset.top
            }, tlscTools.animationDurationMilli);
          }

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
  });
