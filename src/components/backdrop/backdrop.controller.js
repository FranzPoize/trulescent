'use strict';

angular.module( 'trulescent' )
  .controller( 'BackdropCtrl', function ( $scope ) {
    $scope.$on('tlsc.backdrop.move',function ( $event, selector ) {

      //TODO(franz): do something about this
      var cumulativeOffset = function(element) {
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

      var targetElement = document.querySelector( selector ),
        elAbsPosition = cumulativeOffset( targetElement ),
        width = targetElement.offsetWidth,
        height = targetElement.offsetHeight;

      $scope.topCoord =     {
                              height : elAbsPosition.top,
                              bottom : 'auto',
                              right: document.body.clientWidth - (elAbsPosition.left + width),
                              left: elAbsPosition.left
                            };

      $scope.rightCoord =   {
                              left: elAbsPosition.left + width
                            };

      $scope.bottomCoord =  {
                              top: elAbsPosition.top + height,
                              right: document.body.clientWidth - (elAbsPosition.left + width),
                              left: elAbsPosition.left
                            };
      $scope.leftCoord =    {
                              right: document.body.clientWidth - elAbsPosition.left
                            };
    })
  });
