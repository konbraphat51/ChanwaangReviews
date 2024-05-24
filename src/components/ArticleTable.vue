<template>
	<div class="ArticleTableRoot">
		<div v-if="loading" class="ArticleTableLoading">
			{{ t("ArticleTable.Loading") }}
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
				</tr>
			</thead>
			<tbody>
				<tr v-for="article in articles" :key="article.id">
					<td v-if="showTitle">{{ article.title }}</td>
					<td v-if="showShort">{{ article.short[$i18n.locale] }}</td>
					<td v-if="showTags">{{ article.tags.join(", ") }}</td>
					<td v-if="showImportance">{{ article.importance }}</td>
					<td v-if="showHasPage">{{ article.hasPage }}</td>
					<td v-if="showUpdatedAt">{{ article.updatedAt }}</td>
					<td v-if="showCreatedAt">{{ article.createdAt }}</td>
					<td v-if="showFilename">{{ article.filename }}</td>
				</tr>
			</tbody>
		</table>
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
		</div>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "ArticleTable",
	data() {
		return {
			showTitle: true,
			showShort: true,
			showTags: true,
			showImportance: true,
			showHasPage: true,
			showUpdatedAt: false,
			showCreatedAt: false,
			showFilename: false,

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
})
</script>

<i18n>
    {
        "en": {
            "ArticleTable": {
				"Loading": "Loading...",

                "Title": "Title",
                "Short": "Short",
                "Tags": "Tags",
                "Importance": "Importance",
                "HasPage": "Markdown",
                "UpdatedAt": "Updated At",
                "CreatedAt": "Created At",
                "Filename": "Filename"
            }
        },
        "ja": {
            "ArticleTable": {
				"Loading": "読み込み中...",

                "Title": "タイトル",
                "Short": "概略",
                "Tags": "タグ",
                "Importance": "重要度",
                "HasPage": "マークダウン",
                "UpdatedAt": "更新日時",
                "CreatedAt": "作成日時",
                "Filename": "ファイル名"
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
</style>
