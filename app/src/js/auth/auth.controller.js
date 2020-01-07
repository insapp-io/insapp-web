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
        this._$state.go('app.postlist')
      },
      err => {
        const error = err.data.error

        if (error.includes("unknown user")) {
          this.errors.push("Cette adresse n'est reliée à aucun compte.")
        } else if (error.includes("wrong password")) {
          this.errors.push("Le mot de passe est incorrect.")
        } else {
          this.errors.push(error)
        }
        
        this.isSubmitting = false
      }
    )
  }
}
  
export default AuthController