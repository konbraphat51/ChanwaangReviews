<template>
	<div id="Home">
		<ArticleTable @MarkdownClicked="OpenMarkdown" />
		<Viewer :markdown="markdown" />
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "Home",
	data() {
		return {
			markdown: "",
		}
	},
	components: {
		ArticleTable: Vue.defineAsyncComponent(() =>
			loadModule("src/components/ArticleTable/ArticleTable.vue", options),
		),
		Viewer: Vue.defineAsyncComponent(() =>
			loadModule("src/components/Viewer/Viewer.vue", options),
		),
	},
	methods: {
		OpenMarkdown(filename) {
			return fetch(`src/data/articles/each/${filename}.md`)
				.then((res) => res.text())
				.then((text) => {
					this.markdown = text
				})
		},
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
})
</script>

<i18n>
    {
        "en": {
            "example": {
                "explain": "This is how you use i18n"
            }
        },
        "ja": {
            "example": {
                "explain": "こうやってi18nを使います"
            }
        }
    }
</i18n>
