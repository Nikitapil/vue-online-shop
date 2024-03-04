<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js';
const value = defineModel<number>();

const props = withDefaults(
  defineProps<{
    count?: number;
    name: string;
  }>(),
  {
    count: 5
  }
);
</script>

<template>
  <div class="flex gap-2">
    <template
      v-for="radio in count"
      :key="radio"
    >
      <label
        class="star"
        :for="`${props.name}_${radio}`"
      >
        <Icon
          class="w-7 h-7"
          icon="ion:star-outline"
          color="#e4d828"
        />
      </label>
      <input
        :id="`${props.name}_${radio}`"
        v-model="value"
        :name="props.name"
        :value="radio"
        type="radio"
        hidden
      />
    </template>
  </div>
</template>

<style scoped>
/* TODO add this as snippet */
.star {
  cursor: pointer;
}
.star:hover ::v-deep(path),
.star:has(~ .star:hover) ::v-deep(path),
.star:has(~ input:checked) ::v-deep(path) {
  fill: #e4d828;
}
</style>
