<template>
	<span class="importance">
		<span class="filled" v-for="index in value" :key="index">
			<img src="src/imgs/star_filled.svg" />
		</span>

		<span class="empty" v-for="index in 5 - value" :key="index">
			<img src="src/imgs/star_empty.svg" />
		</span>
	</span>
</template>

<script>
export default {
	name: "Importance",
	props: {
		value: {
			type: Number,
			required: true,
		},
	},
}
</script>
