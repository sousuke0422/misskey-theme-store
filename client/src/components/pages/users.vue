<template>
<div class="users-page">
	<p>user list</p>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: { } })
export default class extends Vue {
	@Prop() query!: string;
}
</script>

<style lang="scss" scoped>
.users-page {
	margin: 1.5rem;
}
</style>
