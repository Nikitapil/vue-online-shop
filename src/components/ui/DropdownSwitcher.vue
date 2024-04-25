<script setup lang="ts">
import IconButton from '@/components/ui/IconButton.vue';

const isOpened = defineModel<boolean>('open');
const value = defineModel<string>();

const props = defineProps<{
  options: string[];
  icon: string;
}>();

const emit = defineEmits<{
  'select-option': [string];
}>();

const onClose = () => (isOpened.value = false);

const onSelect = (val: string) => {
  value.value = val;
  emit('select-option', val);
};
</script>

<template>
  <div
    v-click-outside="onClose"
    class="relative"
  >
    <div class="flex gap-1 items-center">
      <p class="uppercase text-sm">{{ value }}</p>
      <IconButton
        :icon="props.icon"
        @click="isOpened = !isOpened"
      />
    </div>
    <div
      v-if="isOpened"
      class="absolute w-full flex flex-col z-10 border border-black bg-slate-300 rounded-md overflow-hidden"
    >
      <button
        v-for="opt in props.options"
        :key="opt"
        class="uppercase hover:bg-slate-400"
        :class="{ 'bg-slate-500 text-white': value === opt }"
        @click="onSelect(opt)"
      >
        {{ opt }}
      </button>
    </div>
  </div>
</template>
