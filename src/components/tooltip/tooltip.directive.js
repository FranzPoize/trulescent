'use strict';

angular.module('trulescent')
  .directive('tlscTooltip', function ( $timeout, tlscTools, $compile, $templateCache ) {
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
                bottom: (window.innerHeight - elAbsPosition.top + (offset.bottom || 0) + 10) + 'px',
                left: (elAbsPosition.left + (offset.left|| 0)) + 'px',
                top: 'auto',
                right: 'auto'
              }
              break;
            case 'right':
              cssValues = {
                top: (elAbsPosition.top + (offset.top|| 0)) + 'px',
                left: (elAbsPosition.left + targetElement.clientWidth + (offset.left || 0) + 10) + 'px',
                bottom: 'auto',
                right: 'auto'
              }
              break;
            case 'bottom' :
              cssValues = {
                top: (elAbsPosition.top + targetElement.clientHeight + (offset.top || 0) + 10) + 'px',
                left: (elAbsPosition.left + (offset.left|| 0)) + 'px',
                bottom: 'auto',
                right: 'auto'
              }
              break;
            case 'left' :
              cssValues = {
                top: (elAbsPosition.top + (offset.top|| 0)) + 'px',
                right: (window.innerWidth - elAbsPosition.left + (offset.right || 0) + 10) + 'px',
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
              var templateScope = angular.extend($scope.new(),newValue.tooltip.templateScope);
              $element.empty().append($compile(newValue.tooltip.template)(templateScope));
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
  });
