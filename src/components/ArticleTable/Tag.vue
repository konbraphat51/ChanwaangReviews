<template>
	<span class="Tag"></span>
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

	methods: {
		GetColor(text) {
			const num = this.TextToNum(text)

			const random = new SeededRandom(num)

			const r = random.Get(0, 100)
			const g = random.Get(0, 100)
			const b = random.Get(0, 100)

			return [r, g, b]
		},

		TextToNum(text) {
			let num = 0
			for (let cnt = 0; cnt < text.length; cnt++) {
				num += text.charCodeAt(cnt)
			}
		},
	},
}
</script>
