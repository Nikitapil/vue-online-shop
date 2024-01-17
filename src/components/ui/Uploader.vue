<script setup lang="ts">
import AppButton from '@/components/ui/AppButton.vue';
import { computed, type MaybeRef, ref } from 'vue';
import { type RuleExpression, useField } from 'vee-validate';
import IconButton from '@/components/ui/IconButton.vue';

const value = defineModel<File | null>();

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    name: string;
    rules: MaybeRef<RuleExpression<any>>;
    disabled?: boolean;
  }>(),
  {
    rules: '',
    disabled: false
  }
);

const fileInput = ref<HTMLInputElement>();

const { errorMessage } = useField<string>(props.name, props.rules, {
  //@ts-ignore todo check that type
  syncVModel: value
});

const imageUrl = computed(() => (value.value ? URL.createObjectURL(value.value) : ''));

const open = () => fileInput.value?.click();

const changeHandler = (event: Event) => {
  value.value = (event.target as HTMLInputElement)?.files?.[0] || null;
};

const deleteImage = () => (value.value = null);
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <AppButton
        :disabled="disabled"
        @click="open"
      >
        {{ label }}
      </AppButton>
      <IconButton
        v-if="value"
        icon="fa6-solid:xmark"
        :disabled="disabled"
        @click="deleteImage"
      />
    </div>
    <p
      v-if="errorMessage"
      class="text-sm text-red-500"
    >
      {{ errorMessage }}
    </p>
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
