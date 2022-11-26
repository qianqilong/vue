<template>
	<div>
		{{sum}}--{{sumString}}
		<button @click="add(1)">+1</button>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
	computed: {
		sum() {
			return this.$store.state.countOptions.sum
		},
		sumString() {
			return this.$store.getters['countOptions/sumString']
		},
	},
	methods: {
		add() {
			this.$store.dispatch('countOptions/add', 1)
		},
		...mapActions('countOptions',['add']),
		...mapActions('countOptions',{add:'add'})
	}
}
</script>

<style>
button {
	margin-left: 5px;
}
</style>