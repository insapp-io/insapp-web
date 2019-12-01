function ShowAdmin(User) {
    'ngInject'
  
    return {
      restrict: 'A',
      link: (scope, element, attrs) => {
        scope.User = User
  
        scope.$watch('User.current', val => {
          // If user detected
          if (val && val.master === true) {
            if (attrs.showAdmin === 'true') {
              element.css({ display: 'inherit'})
            } else {
              element.css({ display: 'none'})
            }
          } else {
            if (attrs.showAdmin === 'true') {
              element.css({ display: 'none'})
            } else {
              element.css({ display: 'inherit'})
            }
          }
        })
      }
    }
  }
    
  export default ShowAdmin