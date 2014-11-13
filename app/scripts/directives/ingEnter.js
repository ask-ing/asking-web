angular.module('askingWebApp')
  .directive('ingFocus', function() {
    return {
      restrict: 'A',
      link: function ($scope, elem, attrs) {
        elem.focus();
        $(window).scrollTo(0, '100%');
      }
    };
  });
