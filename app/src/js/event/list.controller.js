class EventListController {
    constructor(Association, Events) {
      'ngInject'
  
      this._Association = Association
      this._Events = Events
  
      this.isAllSetUp = (this._Association.current.profile && this._Association.current.profile != '')
  
      this.runQuery()
    }
    
    runQuery() {
      this.loading = true
  
      this._Events
        .query({
          association: this._Association.current.ID
        })
        .then(
          (res) => {
            this.loading = false
            this.list = res
          }
        )
    }
  }
  
  export default EventListController
  