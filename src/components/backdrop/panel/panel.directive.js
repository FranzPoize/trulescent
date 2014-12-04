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
