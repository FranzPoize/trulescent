'use strict';

angular.module( 'trulescent' )
  .controller( 'BackdropCtrl', function ( $scope,tlscTools ) {
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
  });
