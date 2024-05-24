<template>
	<div class="ArticleFilter">
		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Title") }}
			</label>
			<input type="text" @input="UpdateFilter('title', $event.target.value)" />
		</div>

		<div class="FilterUnit">
			{{ t("ArticleTable.Media") }}
			<div v-for="medium in media" class="MediumButton">
				<label>{{ medium }}</label>

				<input
					type="checkbox"
					:value="medium"
					@input="filter.media.push(medium)"
				/>
			</div>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Tags") }}
			</label>
			<input type="text" @input="UpdateFilter('tags', $event.target.value)" />
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Short") }}
			</label>
			<input type="text" @input="UpdateFilter('short', $event.target.value)" />
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.HasPage") }}
			</label>
			<input
				type="text"
				@input="UpdateFilter('hasPage', $event.target.value)"
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Importance") }}
			</label>
			<input
				type="range"
				min="0"
				max="5"
				@input="UpdateFilter('minImportance', $event.target.value)"
			/>
			-<input
				type="range"
				min="0"
				max="5"
				@input="UpdateFilter('maxImportance', $event.target.value)"
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.CreatedAt") }}
			</label>
			<input
				type="range"
				min="0"
				max="100000000000000"
				@input="UpdateFilter('minCreatedTime', $event.target.value)"
			/>
			-<input
				type="range"
				min="0"
				max="100000000000000"
				@input="UpdateFilter('maxCreatedTime', $event.target.value)"
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.UpdatedAt") }}
			</label>
			<input
				type="range"
				min="0"
				max="100000000000000"
				@input="UpdateFilter('minUpdatedTime', $event.target.value)"
			/>
			-<input
				type="range"
				min="0"
				max="100000000000000"
				@input="UpdateFilter('maxUpdatedTime', $event.target.value)"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "Filter",
	data() {
		return {
			media: ["netpage", "book", "academic", "repository"],

			filter: {
				title: [],
				media: [],
				tags: [],
				short: [],
				hasPage: [],
				minImportance: 0,
				maxImportance: 5,
				minCreatedTime: 0,
				maxCreatedTime: 100000000000000,
				minUpdatedTime: 0,
				maxUpdatedTime: 100000000000000,
			},
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
	methods: {
		UpdateFilter(key, input) {
			input = this.Fractionize(input)
			this.filter[key] = input
			this.$emit("UpdateFilter", this.filter)
		},
		Fractionize(input) {
			let splited = this._SplitList([input], " ")
			splited = this._SplitList(splited, ",")
			splited = this._SplitList(splited, "/")

			return splited
		},
		_SplitList(list, splitter) {
			const result = []
			for (const item of list) {
				result.push(...item.split(splitter))
			}
			return result
		},
	},
}
</script>
