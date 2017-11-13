import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from '../plugins/Firebase.js'

Vue.use(Vuex)
Vue.use(Firebase)

export default new Vuex.Store({
  state: {
    config: {
      apiKey: "AIzaSyBioGhDn3yYhIBpAmD4EwneQbfqfbeniA0",
      authDomain: "fir-venezuela-org.firebaseapp.com",
      databaseURL: "https://fir-venezuela-org.firebaseio.com",
      projectId: "fir-venezuela-org",
      storageBucket: "fir-venezuela-org.appspot.com",
      messagingSenderId: "848451424957"
    },
    activeUser: null
  },
  mutations: {
  	initApp(state, fb){
      fb.init(state.config)
  		state.auth = fb.auth()
  		state.db   = fb.db()
  		state.storage   = fb.storage()
  	},
    setActiveUser(state, user){
      user
          ? state.activeUser = user
          : state.activeUser = null
    }
  }
})