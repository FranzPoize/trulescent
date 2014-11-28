'use strict';

angular.module('trulescent')
  .directive('tlscTooltip', function ( ) {
    return {
      restrict : 'EA',
      scope: { content : '=',placement : '='},
      replace:'true',
      templateUrl : 'components/tooltip/tooltip.html',
      link: function ( $scope, $element, $attrs ) {

        $scope.nextStep = function() {
          $scope.$emit('tlsc.next');
        };

        $scope.$watch('placement',function(newValue,oldValue) {
          if ( angular.isDefined( newValue ) ) {
            var cssValues;
            switch( newValue ) {
              case 'top' :
                cssValues = {
                  bottom: (window.innerHeight- document.querySelector('#tlsc-top-panel').clientHeight + 10) + 'px',
                  left: (document.querySelector('#tlsc-left-panel').offsetWidth) + 'px',
                  top: 'auto',
                  right: 'auto'
                }
                break;
              case 'right':
                cssValues = {
                  top: (document.querySelector('#tlsc-top-panel').offsetHeight) + 'px',
                  left: (document.body.clientWidth - document.querySelector('#tlsc-left-panel').clientWidth - 10) + 'px',
                  bottom: 'auto',
                  right: 'auto'
                }
                break;
              case 'bottom' :
                cssValues = {
                  top: (window.innerHeight - document.querySelector('#tlsc-bottom-panel').clientHeight + 10) + 'px',
                  left: (document.querySelector('#tlsc-left-panel').offsetWidth) + 'px',
                  bottom: 'auto',
                  right: 'auto'
                }
                break;
              case 'left' :
                cssValues = {
                  top: (document.querySelector('#tlsc-top-panel').offsetHeight) + 'px',
                  right: (document.body.clientWidth - document.querySelector('#tlsc-left-panel') + 10) + 'px',
                  bottom: 'auto',
                  left: 'auto'
                }
                break;
            }

            $element.css(cssValues);
          }
        });
      }
    }
  });
