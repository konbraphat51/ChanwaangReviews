<template>
	<div class="ArticleFilter">
		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.And") }}
			</label>
			<input
				type="checkbox"
				@input="UpdateFilter('and', $event.target.value)"
				checked
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Title") }}
			</label>
			<input
				type="text"
				@input="UpdateFilter('title', Fractionize($event.target.value))"
			/>
		</div>

		<div class="FilterUnit">
			{{ t("ArticleTable.Media") }}
			<div v-for="medium in media" class="MediumButton">
				<label>{{ medium }}</label>

				<input
					type="checkbox"
					:value="medium"
					@change="UpdateMediaList(medium, $event.target.checked)"
				/>
			</div>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Tags") }}
			</label>
			<input
				type="text"
				@input="UpdateFilter('tags', Fractionize($event.target.value))"
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Short") }}
			</label>
			<input
				type="text"
				@input="UpdateFilter('short', Fractionize($event.target.value))"
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.HasPage") }}
			</label>
			<input
				type="checkbox"
				@input="UpdateFilter('hasPage', [$event.target.checked])"
				:disabled="pageAny"
			/>

			<label> Any </label>
			<input
				type="checkbox"
				@change="MarkdownAnyButtonPushed($event.target.checked)"
				v-model="pageAny"
				checked
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.Importance") }}
			</label>
			<input
				type="range"
				min="1"
				max="5"
				value="1"
				@input="UpdateFilter('minImportance', $event.target.value)"
			/>
			-<input
				type="range"
				min="1"
				max="5"
				value="5"
				@input="UpdateFilter('maxImportance', $event.target.value)"
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.CreatedAt") }}
			</label>
			<input
				type="number"
				min="1704067200"
				max="1798761600"
				value="1704067200"
				@input="UpdateFilter('minCreatedTime', $event.target.value)"
			/>
			-<input
				type="number"
				min="1704067200"
				max="1798761600"
				value="1798761600"
				@input="UpdateFilter('maxCreatedTime', $event.target.value)"
			/>
		</div>

		<div class="FilterUnit">
			<label>
				{{ t("ArticleTable.UpdatedAt") }}
			</label>
			<input
				type="number"
				min="1704067200"
				max="1798761600"
				value="1704067200"
				@input="UpdateFilter('minUpdatedTime', $event.target.value)"
			/>
			-<input
				type="number"
				min="1704067200"
				max="1798761600"
				value="1798761600"
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
				and: false,
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

			pageAny: true,
		}
	},
	setup() {
		//set up i18n
		const {t} = VueI18n.useI18n()
		return {t}
	},
	methods: {
		UpdateFilter(key, input) {
			this.filter[key] = input
			this.$emit("UpdateFilter", this.filter)
		},
		UpdateMediaList(medium, toggle) {
			if (toggle) {
				//add
				this.filter.media.push(medium)
			} else {
				//remove
				this.filter.media = this.filter.media.filter((m) => m !== medium)
			}
			this.$emit("UpdateFilter", this.filter)
		},
		MarkdownAnyButtonPushed(value) {
			this.pageAny = value
			this.UpdateFilter("hasPage", [])
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
