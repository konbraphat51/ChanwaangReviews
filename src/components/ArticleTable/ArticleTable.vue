<template>
	<div class="ArticleTableRoot">
		<div v-if="loading" class="ArticleTableLoading">
			{{ t("ArticleTable.Loading") }}
		</div>

		<Filter @UpdateFilter="Filter" />

		<div class="ArticleTableOptions">
			<label>
				<input type="checkbox" v-model="showTitle" />
				{{ t("ArticleTable.Title") }}
			</label>
			<label>
				<input type="checkbox" v-model="showShort" />
				{{ t("ArticleTable.Short") }}
			</label>
			<label>
				<input type="checkbox" v-model="showTags" />
				{{ t("ArticleTable.Tags") }}
			</label>
			<label>
				<input type="checkbox" v-model="showImportance" />
				{{ t("ArticleTable.Importance") }}
			</label>
			<label>
				<input type="checkbox" v-model="showMedia" />
				{{ t("ArticleTable.Media") }}
			</label>
			<label>
				<input type="checkbox" v-model="showHasPage" />
				{{ t("ArticleTable.HasPage") }}
			</label>
			<label>
				<input type="checkbox" v-model="showUpdatedAt" />
				{{ t("ArticleTable.UpdatedAt") }}
			</label>
			<label>
				<input type="checkbox" v-model="showCreatedAt" />
				{{ t("ArticleTable.CreatedAt") }}
			</label>
			<label>
				<input type="checkbox" v-model="showFilename" />
				{{ t("ArticleTable.Filename") }}
			</label>
			<label>
				<input type="checkbox" v-model="showEditButton" />
				{{ t("ArticleTable.Edit") }}
			</label>
		</div>

		<table class="ArticleTable">
			<thead>
				<tr>
					<th scope="col" v-if="showTitle">{{ t("ArticleTable.Title") }}</th>
					<th scope="col" v-if="showShort">{{ t("ArticleTable.Short") }}</th>
					<th scope="col" v-if="showTags">{{ t("ArticleTable.Tags") }}</th>
					<th scope="col" v-if="showImportance">
						{{ t("ArticleTable.Importance") }}
					</th>
					<th scope="col" v-if="showMedia">
						{{ t("ArticleTable.Media") }}
					</th>
					<th scope="col" v-if="showHasPage">
						{{ t("ArticleTable.HasPage") }}
					</th>
					<th scope="col" v-if="showUpdatedAt">
						{{ t("ArticleTable.UpdatedAt") }}
					</th>
					<th scope="col" v-if="showCreatedAt">
						{{ t("ArticleTable.CreatedAt") }}
					</th>
					<th scope="col" v-if="showFilename">
						{{ t("ArticleTable.Filename") }}
					</th>
					<th scope="col" v-if="showEditButton">
						{{ t("ArticleTable.Edit") }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="article in articles" :key="article.id">
					<td v-if="showTitle">
						<a :href="article.link" target="_blank">
							{{ article.title }}
						</a>
					</td>
					<td v-if="showShort">{{ article.short[$i18n.locale] }}</td>
					<td v-if="showTags">
						<span v-for="tag in article.tags" :key="tag">
							<Tag :value="tag" />
							&nbsp;
						</span>
					</td>
					<td v-if="showImportance">
						<Importance :value="article.importance" />
					</td>
					<td v-if="showMedia">{{ article.media }}</td>
					<td v-if="showHasPage">
						<button
							v-if="article.hasPage"
							@click="$emit('MarkdownClicked', article.filename)"
							class="MarkdownButton"
						>
							Open
						</button>
					</td>
					<td v-if="showUpdatedAt">{{ article.updatedAt }}</td>
					<td v-if="showCreatedAt">{{ article.createdAt }}</td>
					<td v-if="showFilename">
						<!-- TODO: Generalize -->
						<a
							:href="`https://github.com/konbraphat51/ChanwaangReviews/blob/main/src/data/articles/each/${article.filename}.md?plain=1`"
							target="_blank"
						>
							{{ article.filename }}
						</a>
					</td>
					<td v-if="showEditButton">
						<a
							:href="`https://konbraphat51.github.io/Waanger/#/?id=${article.filename}`"
							target="_blank"
						>
							{{ t("ArticleTable.Edit") }}
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "ArticleTable",
	components: {
		Filter: Vue.defineAsyncComponent(() =>
			loadModule("src/components/ArticleTable/Filter.vue", options),
		),
		Importance: Vue.defineAsyncComponent(() =>
			loadModule("src/components/ArticleTable/Importance.vue", options),
		),
		Tag: Vue.defineAsyncComponent(() =>
			loadModule("src/components/ArticleTable/Tag.vue", options),
		),
	},
	data() {
		return {
			showTitle: true,
			showShort: true,
			showTags: true,
			showImportance: true,
			showHasPage: true,
			showMedia: false,
			showUpdatedAt: false,
			showCreatedAt: false,
			showFilename: false,
			showEditButton: false,

			reader: new ArticleIndexReader(),

			loading: true,

			articles: [],
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
	mounted() {
		this.loading = true
		this.reader.ReadIndex().then(() => {
			this.loading = false

			this.articles = this.reader.SelectArticles()
		})
	},
	methods: {
		Filter(filter) {
			this.articles = this.reader.SelectArticles(
				filter.and,
				filter.title,
				filter.media,
				filter.tags,
				filter.short,
				[], //link
				filter.hasPage,
				filter.minImportance,
				filter.maxImportance,
				filter.minCreatedTime,
				filter.maxCreatedTime,
				filter.minUpdatedTime,
				filter.maxUpdatedTime,
			)
		},
	},
})
</script>

<i18n>
    {
        "en": {
            "ArticleTable": {
				"Loading": "Loading...",

				"And": "AND search",

				"Media": "Media",
                "Title": "Title",
                "Short": "Short",
                "Tags": "Tags",
                "Importance": "Importance",
                "HasPage": "Markdown",
                "UpdatedAt": "Updated At",
                "CreatedAt": "Created At",
                "Filename": "Filename",
				"Edit": "Edit"
            }
        },
        "ja": {
            "ArticleTable": {
				"Loading": "読み込み中...",

				"And": "AND検索",

				"Media": "媒体",
                "Title": "タイトル",
                "Short": "概略",
                "Tags": "タグ",
                "Importance": "重要度",
                "HasPage": "マークダウン",
                "UpdatedAt": "更新日時",
                "CreatedAt": "作成日時",
                "Filename": "ファイル名",
				"Edit": "編集ボタン"
            }
        }
    }
</i18n>

<style>
.ArticleTable th {
	resize: horizontal;
	overflow: hidden;

	background-color: #54b173;

	border-bottom: 3px solid #000;
}

.ArticleTable tbody tr:nth-child(odd) {
	background-color: #f0f0f0d4;
}

.ArticleTable tbody tr:nth-child(even) {
	background-color: #d8fad8d4;
}

.ArticleTable .importance img {
	width: 1em;
	height: 1em;
}

.ArticleTableOptions {
	display: flex;
	flex-wrap: wrap;

	background-color: #f1f8c8;
	border-radius: 3px;
	border-color: #000;
	border-width: 3px;
}
</style>
