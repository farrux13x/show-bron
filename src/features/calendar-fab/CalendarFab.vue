<template>
  <RouterLink
    to="/appointments/new"
    class="calendar-fab"
    :aria-label="t('calendar.addBooking')"
  >
    +
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.calendar-fab {
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 54px;
  border-radius: 999px;
  background: #f97316;
  color: #ffffff;
  font-size: 28px;
  box-shadow: 0 12px 28px -12px rgba(15, 23, 42, 0.35);
}
</style>
