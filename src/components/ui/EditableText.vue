<script setup lang="ts">
import IconButton from './IconButton.vue';
import { ref } from 'vue';
import AppInput from './AppInput/AppInput.vue';

const isEditMode = defineModel<boolean>();

const props = defineProps<{
  id: string;
  name: string;
  initialValue: string;
  label?: string;
}>();

const value = ref<string>(props.initialValue);

const openEditMode = () => (isEditMode.value = true);
const closeEditMode = () => (isEditMode.value = false);
</script>

<template>
  <div class="flex gap-2 items-center">
    <h3
      v-if="label"
      class="font-bold text-xl"
    >
      {{ label }}
    </h3>
    <form
      v-if="isEditMode"
      class="flex gap-2"
    >
      <AppInput
        :id="props.id"
        v-model="value"
        :name="props.name"
      />
      <IconButton icon="line-md:circle-to-confirm-circle-transition" />
      <IconButton
        icon="carbon:close-outline"
        @click="closeEditMode"
      />
    </form>
    <div
      v-else
      class="flex gap-2 text-xl"
    >
      <p>{{ value }}</p>
      <IconButton
        icon="ic:outline-edit"
        @click="openEditMode"
      />
    </div>
  </div>
</template>
