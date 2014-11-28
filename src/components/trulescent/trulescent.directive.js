'use strict';

angular.module('trulescent')
  .directive('trulescent', function ($timeout ) {
    return {
      restrict : 'EA',
      scope:{ start: '=' , steps: '=' },
      templateUrl : 'components/trulescent/trulescent.html',
      controller :'trulescentCtrl',
      link: function ( $scope, $element, $attrs ) {
        var stepIndex = 0;

        function goToStep( step ) {
          $scope.content = $scope.steps[step].content;

          //TODO(franz): better than that
          $timeout(function() {
            $scope.placement = $scope.steps[step].placement;
          },250);

          $scope.$broadcast( 'tlsc.backdrop.move', $scope.steps[step].location.selector );
        };

        $scope.$watch( 'start', function ( newValue, oldValue ) {
          if ( angular.isDefined( newValue ) && newValue) {
            goToStep(stepIndex)
          }
        });

        $scope.$on('tlsc.next',function($event) {
          goToStep(++stepIndex);
        })
      }
    }
  });
