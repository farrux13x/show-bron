<template>
  <div class="rounded-2xl border border-fog bg-white px-4 py-4">
    <div class="flex flex-col gap-3">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-slate-400">
          {{ client.phone }}
        </p>
        <h3 class="font-display text-lg text-ink">{{ client.name }}</h3>
        <p class="text-sm text-slate-600">
          {{
            t('clients.lastVisitSummary', {
              date: formatDate(new Date(client.lastVisit)),
              service: translateService(client.lastService, t),
            })
          }}
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <!-- <AppButton variant="ghost" :to="`/clients/${client.id}`">
          {{ t('actions.profile') }}
        </AppButton> -->
        <AppButton
          :to="{
            path: '/appointments/new',
            query: {
              clientName: client.name,
              phone: client.phone,
              service: client.lastService,
            },
          }"
        >
          {{ t('actions.rebook') }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { ClientSummary } from '@/entities/client/model/clients';
import { formatDate } from '@/shared/lib/date';
import { translateService } from '@/shared/i18n/labels';
import AppButton from '@/shared/ui/AppButton.vue';

defineProps<{
  client: ClientSummary;
}>();

const { t } = useI18n();
</script>
