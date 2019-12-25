class EventValidateController {
  constructor(Event, Association) {
    'ngInject'

    this._Event = Event
    this._Association = Association

    this.runQuery()
  }

  runQuery() {
    this.loading = true

    this._Event
      .query({
        count: 100
      })
      .then(
        (res) => {
          this.list = res

          let allPastEvents = []
          let allEvents = []

          for (const event of this.list) {
            this._Association.get(event.association).then(association => {
              event.associationName = association.name
            })

            if (new Date(event.dateEnd).getTime() >= new Date().getTime()) {
              allEvents.push(event)
            } else {
              allPastEvents.push(event)
            }

            allEvents.sort((a, b) => {
              return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
            })
            allPastEvents.sort((a, b) => {
              return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
            })
          }

          this.events = allEvents
          this.pastEvents = allPastEvents

          this.loading = false
        }
      )
  }
}

export default EventValidateController
