<template>
	<div>
		<Card />
		<Sale />
		<Observe />
	</div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'
import Observe from './Observe'
export default {
	name: 'Home',
	components: { Card, Sale, Observe }
}
</script>

<style lang="scss" scoped>
</style>
