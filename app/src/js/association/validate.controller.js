class AssociationValidateController {
  constructor(Association) {
    'ngInject'

    this._Association = Association

    this.runQuery()
  }

  runQuery() {
    this.loading = true

    this._Association
      .query()
      .then(
        (res) => {
          this.list = res
          this.loading = false
        }
      )
  }
}

export default AssociationValidateController
