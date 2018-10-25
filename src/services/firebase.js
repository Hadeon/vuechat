import firebase from 'firebase'
const config = require('./config.json')

firebase.initializeApp(config.firebase)

export default {
  database: firebase.database()
}
