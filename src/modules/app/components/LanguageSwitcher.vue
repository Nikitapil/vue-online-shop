<script setup lang="ts">
import IconButton from '@/components/ui/IconButton.vue';
import { useI18n } from 'vue-i18n';
import { setLocaleToLocalStorage } from '@/helpers/localStorage-helpers';
import { EAvailableTextLocales } from '@/domain/i18n.domain';
import { ref } from 'vue';

const { locale, availableLocales } = useI18n<string, EAvailableTextLocales>();

const isOpened = ref(false);

const onClose = () => (isOpened.value = false);

const setLocale = (loc: EAvailableTextLocales) => {
  locale.value = loc;
  setLocaleToLocalStorage(loc);
  onClose();
};
</script>

<template>
  <div
    v-click-outside="onClose"
    class="relative"
  >
    <div class="flex gap-1 items-center">
      <p class="uppercase text-sm">{{ locale }}</p>
      <IconButton
        icon="material-symbols-light:language"
        @click="isOpened = !isOpened"
      />
    </div>
    <div
      v-if="isOpened"
      class="absolute w-full flex flex-col z-10 border border-black bg-slate-300 rounded-md overflow-hidden"
    >
      <button
        v-for="loc in availableLocales"
        :key="loc"
        class="uppercase hover:bg-slate-400"
        :class="{ 'bg-slate-500 text-white': locale === loc }"
        @click="setLocale(loc)"
      >
        {{ loc }}
      </button>
    </div>
  </div>
</template>
