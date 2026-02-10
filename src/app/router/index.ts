import { createRouter, createWebHistory } from 'vue-router';
import { usePostHog } from '@/composables/usePostHog';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'TodayPage',
      meta: { hideMobileFooter: false },
      component: () => import('@/pages/today/TodayPage.vue'),
    },
    // { path: '/', redirect: '/today' },
    {
      path: '/schedule-setup',
      name: 'ScheduleSetupPage',
      meta: { hideMobileFooter: true },
      component: () => import('@/pages/schedule-setup/ScheduleSetupPage.vue'),
    },
    {
      path: '/calendar',
      name: 'CalendarPage',
      meta: { hideMobileFooter: false },
      component: () => import('@/pages/calendar/CalendarPage.vue'),
    },
    {
      path: '/appointments/new',
      name: 'AppointmentCreatePage',
      meta: { hideMobileFooter: true },
      component: () => import('@/pages/appointment-form/AppointmentFormPage.vue'),
    },
    {
      path: '/appointments/:id',
      name: 'AppointmentEditPage',
      meta: { hideMobileFooter: true },
      component: () => import('@/pages/appointment-form/AppointmentFormPage.vue'),
    },
    {
      path: '/clients',
      name: 'ClientsPage',
      meta: { hideMobileFooter: false },
      component: () => import('@/pages/clients/ClientsPage.vue'),
    },
    {
      path: '/clients/:id',
      name: 'ClientProfilePage',
      meta: { hideMobileFooter: true },
      component: () => import('@/pages/clients/ClientProfilePage.vue'),
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      meta: { hideMobileFooter: false },
      component: () => import('@/pages/settings/SettingsPage.vue'),
    },
    {
      path: '/services',
      name: 'ServicesPage',
      meta: { hideMobileFooter: true },
      component: () => import('@/pages/services/ServicesPage.vue'),
    },
    {
      path: '/statistics',
      name: 'StatisticsPage',
      meta: { hideMobileFooter: true },
      component: () => import('@/pages/statistics/StatisticsPage.vue'),
    },
    {
      path: '/catalog',
      name: 'StylesCatalogPage',
      meta: { hideMobileFooter: true },
      component: () => import('@/pages/catalog/StylesCatalogPage.vue'),
    },
  ],
});

router.afterEach((to) => {
  const tg = window.Telegram?.WebApp;
  if (!tg) return;

  if (to.meta.hideMobileFooter) {
    tg.BackButton.show();
  } else {
    tg.BackButton.hide();
  }
});

usePostHog();

export default router;
