<template>
	<div>
		<header-app></header-app>
		<div class="jumbotron"></div>
		<community></community>
		<footer-app></footer-app>
	</div>
</template>
<script>
	import HeaderApp from '../components/HeaderApp'
	import Community from './SectionCommunity'
	import FooterApp from './FooterApp'
	export default {
		components: {
			'header-app': HeaderApp,
			Community,
			FooterApp
		}
	}
</script>
<style>
	.jumbotron {
		position: relative;
		top: 50px;
		background: url(/static/images/bgfirebase.jpg) no-repeat center/cover;
	    height: 500px;
	    width: 100%;
	}
</style>