'use strict';

angular.module('trulescent')
  .directive('panel', function ( ) {
    return {
      restrict:'EA',
      replace:'true',
      templateUrl:'/components/backdrop/panel/panel.html',
      link: function ( $scope, $element, $attrs ) {

        $scope.$watch( $attrs.coordinates , function() {

          _.each( $scope[$attrs.coordinates] , function ( coord, prop) {
            $element.css( prop, coord + 'px' );
          })

        },true);
      }
    }
  });
