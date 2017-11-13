<template>
  <div>
	<!-- Always shows a header, even in smaller screens. -->
	<div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
	  <header class="mdl-layout__header">
	    <div class="mdl-layout__header-row">
	      <!-- Title -->
	      <span class="mdl-layout-title">
	      	<img src="../assets/logo.png" alt="FirebaseVE" class="brand-icon">
	        {{ title_app }}
	      </span>
	      <!-- Add spacer, to align navigation to the right -->
	      <div class="mdl-layout-spacer"></div>
	      <!-- Navigation. We hide it in small screens. -->
	      <nav class="mdl-navigation mdl-layout--large-screen-only">
	        <a v-if="activeUser!=null" class="mdl-navigation__link" href="javascript:void(0)">Hola, {{ activeUser.displayName ? activeUser.displayName : usernameLogin }}</a>
	        <a v-if="activeUser==null" class="mdl-navigation__link" @click.prevent="openModal(dialog,'Inicio de Sesión', true)">
	        	<i class="material-icons">person</i> 
	        	Ingresar
	        </a>
	        <a v-show="activeUser==null" class="mdl-navigation__link" @click.prevent="openModal(dialog, 'Registrarme', false)">
	        	<i class="material-icons">group_add</i> 
	        	Registrarme
	        </a>
	        <!-- Right aligned menu below button -->
			<button id="demo-menu-lower-right"
			        class="mdl-button mdl-js-button mdl-button--icon">
			  <i class="material-icons">more_vert</i>
			</button>
			<ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
			    for="demo-menu-lower-right">
			  <li v-if="activeUser!=null" class="mdl-menu__item" @click.prevent="$store.state.auth.signOut()">Salir</li>
			  <li class="mdl-menu__item">Twitter</li>
			  <li class="mdl-menu__item">Telegram</li>
			  <li class="mdl-menu__item">Github</li>
			</ul>
	      </nav>
	    </div>
	  </header>
	  <div class="mdl-layout__drawer">
	    <span class="mdl-layout-title">
	      <img src="../assets/logo.png" alt="FirebaseVE" class="brand-icon-menu">
	      {{ title_app }}
	    </span>
	    <nav class="mdl-navigation">
		    <a v-if="activeUser==null" class="mdl-navigation__link" @click.prevent="openModal(dialog,'Inicio de Sesión', true)">
	        	<i class="material-icons">person</i> 
	        	Ingresar
	        </a>
	        <a v-if="activeUser==null" class="mdl-navigation__link" @click.prevent="openModal(dialog, 'Registrarme', false)">
	        	<i class="material-icons">group_add</i> 
	        	Registrarme
	        </a>
	    </nav>
	  </div>
	  <main class="mdl-layout__content">
	    <div class="page-content"><!-- Your content goes here --></div>
	  </main>
	</div>
	<dialog class="mdl-dialog">
	    <h5 class="mdl-dialog__title">{{ auth.title }}</h5>
	    <div class="mdl-dialog__content">
	      	<form action="#" v-show="auth.isLogin" @submit.prevent="logIn(dialog)">
			  <div class="mdl-textfield mdl-js-textfield">
			    <input v-model="auth.useremail" class="mdl-textfield__input" type="email" id="emailInput">
			    <label class="mdl-textfield__label" for="emailInput">E-mail...</label>
			  </div>
			  <div class="mdl-textfield mdl-js-textfield">
			    <input v-model="auth.password" class="mdl-textfield__input" type="password" id="emailInput">
			    <label class="mdl-textfield__label" for="emailInput">Contraseña...</label>
			  </div>
			  <button type="submit" v-show="false">Enviar</button>
			</form>
			<form action="#" v-show="!auth.isLogin" @submit.prevent="signUp(dialog)">
			  <div class="mdl-textfield mdl-js-textfield">
			    <input v-model="auth.username" class="mdl-textfield__input" type="text" id="nameInput">
			    <label class="mdl-textfield__label" for="nameInput">Nombre y Apellido</label>
			  </div>
			  <div class="mdl-textfield mdl-js-textfield">
			    <input v-model="auth.useremail" class="mdl-textfield__input" type="email" id="emailInput">
			    <label class="mdl-textfield__label" for="emailInput">E-mail...</label>
			  </div>
			  <div class="mdl-textfield mdl-js-textfield">
			    <input v-model="auth.password" class="mdl-textfield__input" type="password" id="emailInput">
			    <label class="mdl-textfield__label" for="emailInput">Contraseña...</label>
			  </div>
			  <div class="mdl-textfield mdl-js-textfield">
			    <input v-model="auth.passwordconfirm" class="mdl-textfield__input" type="password" id="emailInput">
			    <label class="mdl-textfield__label" for="emailInput">Confirmar contraseña...</label>
			  </div>
			  <button type="submit" v-show="false">Enviar</button>
			</form>
	    </div>
	    <div class="mdl-dialog__actions">
	      <button 
	        v-show="!auth.isLogin"
	        type="button" 
	        class="mdl-button  mdl-button--accent" 
	        @click.prevent="signUp(dialog)">
	        Registrar
	      </button>
	      <button 
	        v-show="auth.isLogin"
	        type="button" 
	        class="mdl-button  mdl-button--accent" 
	        @click.prevent="logIn(dialog)">
	        Ingresar
	      </button>
	      <button 
	        type="button" 
	        class="mdl-button close" 
	        @click.prevent="closeModal(dialog)">
	        Cancelar
	      </button>
	    </div>
	 </dialog>
	 <div id="demo-toast-example" class="mdl-js-snackbar mdl-snackbar">
	  <div class="mdl-snackbar__text"></div>
	  <button class="mdl-snackbar__action" type="button"></button>
	</div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        title_app: 'FirebaseVE',
        dialog: null,
        auth: {
        	title: null,
        	isLogin: true,
        	username: '',
        	useremail: '',
        	password: '',
        	passwordconfirm: ''
        },
        usernameLogin: ''
      }
    },
    computed: {
    	activeUser() {
    		return this.$store.state.activeUser
    	}
    },
    created() {
      this.$nextTick(()=>{
	      var dialog = this.dialog = document.querySelector('dialog');
	      if (! dialog.showModal)
	        dialogPolyfill.registerDialog(dialog);
      })
    },
    methods: {
    	openModal(dialog, title, isLogin){
    	  this.auth = {
          title: title,
        	isLogin: isLogin,
        	username: '',
        	useremail: '',
        	password: '',
        	passwordconfirm: ''
        }

        dialog.showModal();
    	},
    	closeModal(dialog){
        dialog.close();
    	},
    	logIn(dialog){
        let db = this.$store.state.db;
		    let auth = this.$store.state.auth;

    	  var snackbarContainer = document.querySelector('#demo-toast-example');

        auth.signInWithEmailAndPassword(this.auth.useremail, this.auth.password)
		    .then((userFb)=>{
          snackbarContainer.MaterialSnackbar.showSnackbar({message:'Bienvenido de nuevo a FirebaseVE'});
        })
		    .catch(function(error) {
		      var errorCode = error.code;
			    var errorMessage = error.message;
			    if (errorMessage === 'The email address is already in use by another account.')
			      errorMessage = 'Esta dirección de correo esta en uso por otro usuario. Selecccione otra cuenta'
			    if (errorMessage === 'The password is invalid or the user does not have a password.')
			      errorMessage = 'La contraseña es invalida o el usuario no tiene esa contraseña.'
			    if (errorMessage === 'There is no user record corresponding to this identifier. The user may have been deleted.')
			      errorMessage = 'Este usuario no se encuentra registrado en nuestro sistema. Verifique el mail suministrado'
			    if (errorMessage === "The email address is badly formatted.")
			      errorMessage = 'Este correo electronico no tiene formato'
			      snackbarContainer.MaterialSnackbar.showSnackbar({message:errorMessage})
        });

    	  this.closeModal(dialog)
    	},
    	signUp(dialog){
    	  var snackbarContainer = document.querySelector('#demo-toast-example');

    	  let db = this.$store.state.db;
		    let auth = this.$store.state.auth;
		    let vm = this
		    let snackbar = snackbarContainer.MaterialSnackbar.showSnackbar

		    if (this.auth.username.length === 0) {
		      snackbar('Favor, suministre su nombre completo')
			    return
	      }
		  
		    auth.createUserWithEmailAndPassword(this.auth.useremail, this.auth.password)
		    .then(()=>{
		      auth.currentUser.updateProfile({
		      displayName: vm.auth.username
		    }).then(()=>{
		      vm.usernameLogin = vm.auth.username
          snackbarContainer.MaterialSnackbar.showSnackbar({message: 'Bienvenido a FirebaseVE'})
		    })
		  })
		  .catch((error)=>{
		    // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  if (errorMessage === 'The email address is already in use by another account.')
			    errorMessage = 'Esta dirección de correo esta en uso por otro usuario. Selecccione otra cuenta'
			  if (errorMessage === 'The email address is badly formatted.')
			    errorMessage = 'La dirección de correo suministrada no tiene formato.'
			  if (errorMessage === 'The password must be 6 characters long or more.')
			    errorMessage = 'La contraseña debe ser minimo de 6 caracteres o mas'
			    snackbarContainer.MaterialSnackbar.showSnackbar({message: errorMessage});
		    })

    	  this.closeModal(dialog)
    	}
    }
  }
</script>
<style>
	.mdl-dialog__title {
		font-size: 1.5em
	}
	.brand-icon {
		height: 42px;
		width: 42px;
	}
	.brand-icon-menu {
		height: 36px;
		width: 36px;
	}
</style>