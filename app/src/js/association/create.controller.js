class AssociationCreateController {
  constructor(AppConstants, User, Association, $window, $state) {
    'ngInject'

    this._AppConstants = AppConstants
    this._User = User
    this._Association = Association
    this._window = $window
    this._state = $state

    this.association = {
      owner: this._User.current.association,
      master : false,
      username : "",
      password : "",
      name : "",
      association : "",
    }
  }

  monitorLength(field, maxLength) {
    if (this.association[field] && this.association[field].length && this.association[field].length > maxLength) {
      this.association[field] = this.association[field].substring(0, maxLength)
    }
  }
  
  createAssociation() {
    this._Association.save(this.association).then(association => {
      this._state.go('app.postlist')
    })
  }
}

export default AssociationCreateController
