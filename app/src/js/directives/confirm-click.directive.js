function ConfirmClick() {
  'ngInject'

  return {
    link: (scope, element, attrs) => {
      const msg = attrs.confirmClick || "Êtes-vous sûr de vouloir supprimer cet élément ?"

      const clickAction = attrs.confirmedClick
      element.on('click', event => {
        if (window.confirm(msg)) {
          scope.$eval(clickAction)
        }
      })
    }
  }
}
  
export default ConfirmClick