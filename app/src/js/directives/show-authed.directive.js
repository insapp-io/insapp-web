function ShowAuthed(User) {
  'ngInject'

  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      scope.User = User

      scope.$watch('User.current', val => {
        // If user detected
        if (val) {
          if (attrs.showAuthed !== 'true') {
            element.css({ display: 'none'})
          }
        } else {
          if (attrs.showAuthed === 'true') {
            element.css({ display: 'none'})
          }
        }
      })
    }
  }
}
  
export default ShowAuthed