import firebase from 'firebase';

var FirebasePlugin = {
	init: function(config) {
		if(firebase.apps.length===0)
			firebase.initializeApp(config);

		return firebase;
	},
	db: function() {
		let fb = firebase;
		return fb.database();
	},
	auth: function(){
		let fb = firebase;
		return fb.auth();
	},
	storage: function(){
		let fb = firebase;
		return fb.storage();
	},
	providers: {
		google: new firebase.auth.GoogleAuthProvider(),
		facebook: new firebase.auth.FacebookAuthProvider()
	}
}

export default function(Vue) {
	Vue.firebase = FirebasePlugin;

	Object.defineProperties(Vue.prototype, {
		$firebase: {
			get: function() {
				return Vue.firebase;
			}
		}
	})
}
