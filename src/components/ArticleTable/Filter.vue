<template></template>

<script>
export default {
	name: "Filter",
	data() {
		return {
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
