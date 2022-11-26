export const mixinModel = {
  computed: {
		modelValue: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('setValue', +value)
			}
		}
	}
}