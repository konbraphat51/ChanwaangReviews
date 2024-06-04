<template>
	<span class="Tag">
		{{ value }}
	</span>
</template>

<script>
export default {
	name: "Tag",
	props: {
		value: {
			type: String,
			required: true,
		},
	},
	mounted() {
		this.UpdateColor(this.value)
	},

	methods: {
		UpdateColor(text) {
			//skip if not rendered yet
			if (!this.$el) return

			const color = this.GetColor(text)

			this.$el.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
		},

		GetColor(text) {
			const num = this.TextToNum(text)

			const random = new SeededRandom(num)

			const r = random.Get(120) + 135
			const g = random.Get(120) + 135
			const b = random.Get(120) + 135

			return [r, g, b]
		},

		TextToNum(text) {
			let num = 0
			for (let cnt = 0; cnt < text.length; cnt++) {
				num += text.charCodeAt(cnt)
			}

			return num
		},
	},

	watch: {
		value: {
			immediate: true,
			handler(newValue) {
				if (newValue != null) this.UpdateColor(newValue)
			},
		},
	},
}
</script>
