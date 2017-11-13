<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    let commit = this.$store.commit
    
    commit('initApp', this.$firebase)

    this.$store.state.auth.onAuthStateChanged((user)=>{
        commit('setActiveUser', user)
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato');

body {
  background: #FAFAFA;
}

#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6, 
.mdl-layout__title, .mdl-layout-title,
.mdl-button {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
}
</style>
