<template>
  <div class="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
    <section class="card p-6 sm:p-8">
      <p class="label">{{ t('login.welcomeBack') }}</p>
      <h2 class="font-display text-3xl text-ink">{{ t('login.title') }}</h2>
      <p class="mt-2 text-sm text-slate-600">
        {{ t('login.subtitle') }}
      </p>
      <form class="mt-6 space-y-4">
        <div class="space-y-2">
          <label class="label">{{ t('login.phoneOrEmail') }}</label>
          <input class="input" placeholder="you@shop.com" />
        </div>
        <div class="space-y-2">
          <label class="label">{{ t('login.passcode') }}</label>
          <input class="input" type="password" placeholder="******" />
        </div>
        <button type="button" class="btn-primary w-full">{{ t('actions.signIn') }}</button>
      </form>
      <RouterLink to="/" class="mt-4 inline-flex text-sm font-semibold text-ember">
        {{ t('actions.continueDashboard') }}
      </RouterLink>
    </section>

    <section class="card-muted p-6 sm:p-8">
      <h3 class="font-display text-xl">{{ t('login.whyTitle') }}</h3>
      <ul class="mt-4 space-y-3 text-sm text-slate-600">
        <li>{{ t('login.bullet1') }}</li>
        <li>{{ t('login.bullet2') }}</li>
        <li>{{ t('login.bullet3') }}</li>
      </ul>
      <div class="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">{{ t('login.livePreview') }}</p>
        <p class="mt-2 text-sm text-slate-700">
          {{ t('login.livePreviewText') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
