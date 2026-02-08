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
      component: () => import('@/pages/today/TodayPage.vue'),
    },
    // { path: '/', redirect: '/today' },
    {
      path: '/schedule-setup',
      name: 'ScheduleSetupPage',
      component: () => import('@/pages/schedule-setup/ScheduleSetupPage.vue'),
    },
    {
      path: '/calendar',
      name: 'CalendarPage',
      component: () => import('@/pages/calendar/CalendarPage.vue'),
    },
    {
      path: '/today',
      name: 'TodayPageAlias',
      component: () => import('@/pages/today/TodayPage.vue'),
    },
    {
      path: '/appointments/new',
      name: 'AppointmentCreatePage',
      component: () => import('@/pages/appointment-form/AppointmentFormPage.vue'),
    },
    {
      path: '/appointments/:id',
      name: 'AppointmentEditPage',
      component: () => import('@/pages/appointment-form/AppointmentFormPage.vue'),
    },
    {
      path: '/clients',
      name: 'ClientsPage',
      component: () => import('@/pages/clients/ClientsPage.vue'),
    },
    {
      path: '/clients/:id',
      name: 'ClientProfilePage',
      component: () => import('@/pages/clients/ClientProfilePage.vue'),
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: () => import('@/pages/settings/SettingsPage.vue'),
    },
    {
      path: '/services',
      name: 'ServicesPage',
      component: () => import('@/pages/services/ServicesPage.vue'),
    },
    {
      path: '/statistics',
      name: 'StatisticsPage',
      component: () => import('@/pages/statistics/StatisticsPage.vue'),
    },
  ],
});

usePostHog();

export default router;
