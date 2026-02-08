# FSD Next Steps

Selected direction: **1. Pages ? Features/Widgets ajratishni davom ettirish**

## Takliflar ro‘yxati (to‘liq)

1. **Pages ? Features/Widgets ajratishni davom ettirish**
   - `SettingsPage.vue` (sections: language/theme/services/statistics/faq)
   - `ServicesPage.vue` (services list + add form feature)
   - `CalendarPage.vue` (calendar grid widget + day details feature)

2. **Use-case composable’larni joyiga ko‘chirish**
   - Page-level `useXPage` qisqargan bo‘lsa, to‘g‘ridan-to‘g‘ri page’da ishlatish yoki feature-levelga ko‘chirish.

3. **Entities ? UI/Model/Lib qatlamini ajratish**
   - `entities/client` uchun `ui/ClientBadge.vue`, `ui/ClientName.vue` kabi presentational bo‘limlar.

4. **Shared UI konsolidatsiya**
   - `AppButton` o‘rniga shadcn `Button`ga o‘tish bosqichma-bosqich.
   - `label`, `input`, `textarea`, `select` komponentlarining standart stili.

5. **Widgets**
   - AppShell, AppHeader, Sidebar/Navigation kabi doimiy bloklarni `widgets/`ga yig‘ish.
