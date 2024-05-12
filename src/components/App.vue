<template>
	<div id="app">
		{{ t("example.explain") }}

		<!-- view page shown here -->
		<router-view />
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "App",
	components: {
		// LanguageSelection: Vue.defineAsyncComponent(() =>
		// 	loadModule("src/components/LanguageSelection.vue", options),
		// ),
	},
})
</script>
