<template>
	<div id="app">
		<!-- view page shown here -->
		<router-view />

		<a
			href="https://konbraphat51.github.io/Waanger/"
			target="_blank"
			class="WaangerLink"
		>
			Konbraphat51 วางer
		</a>

		<br />

		<a
			href="https://github.com/konbraphat51/ChanwaangReviews"
			target="_blank"
			class="GithubLink"
		>
			GitHub Repository
		</a>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "App",
	components: {},
})
</script>
