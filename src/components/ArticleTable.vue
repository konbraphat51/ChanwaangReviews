<template>
	<div class="ArticleTableRoot">
		<table class="ArticleTable">
			<thead>
				<tr>
					<th scope="col">{{ t("ArticleTable.Title") }}</th>
					<th scope="col">{{ t("ArticleTable.Short") }}</th>
					<th scope="col">{{ t("ArticleTable.Tags") }}</th>
					<th scope="col">{{ t("ArticleTable.Importance") }}</th>
					<th scope="col">{{ t("ArticleTable.HasPage") }}</th>
					<th scope="col">{{ t("ArticleTable.UpdatedAt") }}</th>
					<th scope="col">{{ t("ArticleTable.CreatedAt") }}</th>
					<th scope="col">{{ t("ArticleTable.Filename") }}</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</template>

<script>
export default Vue.defineComponent({
	name: "ArticleTable",
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
            "ArticleTable": {
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
