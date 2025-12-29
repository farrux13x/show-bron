import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/pages/login/LoginPage.vue';
import ScheduleSetupPage from '@/pages/schedule-setup/ScheduleSetupPage.vue';
import CalendarPage from '@/pages/calendar/CalendarPage.vue';
import TodayPage from '@/pages/today/TodayPage.vue';
import AppointmentFormPage from '@/pages/appointment-form/AppointmentFormPage.vue';
import ClientsPage from '@/pages/clients/ClientsPage.vue';
import ClientProfilePage from '@/pages/clients/ClientProfilePage.vue';
import SettingsPage from '@/pages/settings/SettingsPage.vue';
import { usePostHog } from '@/composables/usePostHog';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: TodayPage },
    // { path: '/', redirect: '/today' },
    { path: '/login', component: LoginPage },
    { path: '/schedule-setup', component: ScheduleSetupPage },
    { path: '/calendar', component: CalendarPage },
    { path: '/today', component: TodayPage },
    { path: '/appointments/new', component: AppointmentFormPage },
    { path: '/appointments/:id', component: AppointmentFormPage },
    { path: '/clients', component: ClientsPage },
    { path: '/clients/:id', component: ClientProfilePage },
    { path: '/settings', component: SettingsPage }
  ]
});

usePostHog();

export default router;
