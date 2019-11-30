class AuthController {
  constructor(User, $state) {
    'ngInject'

    this._User = User
    this._$state = $state

    this.title = $state.current.title
  }

  submitForm() {
    this.isSubmitting = true
    this.errors = []

    this._User.attemptAuth(this.formData).then(
      res => {
        this._$state.go('app.post')
      },
      err => {
        this.isSubmitting = false
        this.errors.push(err.data.error)
      }
    )
  }
}
  
export default AuthController