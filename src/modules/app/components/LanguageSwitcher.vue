<script setup lang="ts">
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';
import { setLocaleToLocalStorage } from '@/helpers/localStorage-helpers';

import { EAvailableTextLocales } from '@/domain/i18n.domain';

import DropdownSwitcher from '@/components/ui/DropdownSwitcher.vue';

const { locale, availableLocales } = useI18n<string, EAvailableTextLocales>();

const isOpened = ref(false);

const setLocale = () => {
  setLocaleToLocalStorage(locale.value);
  isOpened.value = false;
};
</script>

<template>
  <DropdownSwitcher
    v-model="locale"
    v-model:open="isOpened"
    :options="availableLocales"
    icon="material-symbols-light:language"
    @select-option="setLocale"
  />
</template>
