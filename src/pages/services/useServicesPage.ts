import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useServicesStore } from '@/entities/service/model/services.store';
import { translateService } from '@/shared/i18n/labels';

export function useServicesPage() {
  const { t } = useI18n();
  const servicesStore = useServicesStore();

  const newName = ref('');
  const newPrice = ref<number | null>(null);

  const handleAdd = () => {
    const name = newName.value.trim();
    const price = newPrice.value ?? 0;

    if (!name || Number.isNaN(price) || price < 0) {
      return;
    }

    const existing = servicesStore.byName(name);
    if (existing) {
      servicesStore.updateService(existing.id, { name, price });
    } else {
      servicesStore.addService({ name, price });
    }

    newName.value = '';
    newPrice.value = null;
  };

  const formatPrice = (value: number) => {
    const formatted = new Intl.NumberFormat('ru-RU', {
      maximumFractionDigits: 0
    })
      .format(value)
      .replace(/\u00A0/g, ' ');
    return `${formatted} so'm`;
  };

  return {
    formatPrice,
    handleAdd,
    newName,
    newPrice,
    servicesStore,
    t,
    translateService
  };
}
