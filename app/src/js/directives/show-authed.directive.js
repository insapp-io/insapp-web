function ShowAuthed(User) {
  'ngInject'

  return {
    restrict: 'A',
    link: (scope, element, attrs) => {
      scope.User = User

      scope.$watch('User.current', val => {
        // If user detected
        if (val) {
          if (attrs.showAuthed === 'false') {
            element.css({ display: 'none'})
          } else {
            element.css({ display: 'flex'})
          }
        } else {
          if (attrs.showAuthed === 'true') {
            element.css({ display: 'none'})
          } else {
            element.css({ display: 'flex'})
          }
        }
      })
    }
  }
}
  
export default ShowAuthed