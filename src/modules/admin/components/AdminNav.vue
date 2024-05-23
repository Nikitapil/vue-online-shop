<script setup lang="ts">
import { ERoutesName } from '@/router';

import LinkWithIcon from '@/components/ui/LinkWithIcon.vue';
</script>

<template>
  <div class="border-r border-r-black">
    <LinkWithIcon
      icon="arcticons:home-finance"
      :label="$t('finance_settings')"
      class="px-4 py-2 hover:bg-slate-200"
      active-class-name="bg-slate-100"
      :to="{ name: ERoutesName.FINANCE_SETTINGS }"
    />
  </div>
</template>
