<script setup lang="ts">
import AppTextarea from '../../../components/ui/AppInput/AppTextarea.vue';
import AppInput from '../../../components/ui/AppInput/AppInput.vue';
import Modal from '../../../components/ui/Modal.vue';
import AppButton from '@/components/ui/AppButton.vue';

const isOpened = defineModel<boolean>();
</script>

<template>
  <Modal
    v-model="isOpened"
    size="md"
  >
    <form class="flex flex-col gap-3">
      <h1 class="text-center text-2xl font-bold">Order creation</h1>
      <AppInput
        id="address"
        name="address"
        label="Delivery address"
        placeholder="Enter delivery address"
        rules="required"
      />
      <AppInput
        id="phone"
        name="phone"
        label="Your contact phone"
        placeholder="Enter contact phone"
        rules="required"
      />
      <AppTextarea
        id="commet"
        label="Comment"
        placeholder="Enter comment for order"
      />
      <div class="flex gap-3 justify-end">
        <AppButton @click="isOpened = false">Cancel</AppButton>
        <AppButton appearance="success">Create</AppButton>
      </div>
    </form>
  </Modal>
</template>
