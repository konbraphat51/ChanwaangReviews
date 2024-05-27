<template>
	<select v-model="$i18n.locale">
		<option value="en">English</option>
		<option value="ja">日本語</option>
	</select>
</template>

<script>
export default {
	name: "LanguageSelection",
}
</script>
