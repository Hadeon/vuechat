import firebase from 'firebase'
import {config} from './config'

firebase.initializeApp(config)

export default {
  database: firebase.database()
}
