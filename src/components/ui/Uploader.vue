<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { computed, ref } from 'vue';

const value = defineModel<File | null>();

defineProps<{
  id: string;
  label: string;
}>();

const fileInput = ref<HTMLInputElement>();

const open = () => fileInput.value?.click();

const changeHandler = (event: Event) => {
  value.value = (event.target as HTMLInputElement)?.files?.[0] || null;
};

const imageUrl = computed(() => (value.value ? URL.createObjectURL(value.value) : ''));
</script>

<template>
  <div>
    <AppButton @click="open">
      {{ label }}
    </AppButton>
    <input
      :id="id"
      ref="fileInput"
      type="file"
      accept="image/*"
      hidden
      @change="changeHandler"
    />
    <div
      v-if="imageUrl"
      class="max-w-xs mt-3"
    >
      <img
        class="max-w-full"
        :src="imageUrl"
        alt="uploaded image"
      />
    </div>
  </div>
</template>
