export type Translate = (key: string, values?: Record<string, unknown>) => string;

const SERVICE_KEYS: Record<string, string> = {
  Haircut: 'services.haircut',
  Beard: 'services.beard',
  'Haircut + Beard': 'services.haircutBeard',
  Kids: 'services.kids'
};

const STATUS_KEYS: Record<string, string> = {
  booked: 'status.booked',
  arrived: 'status.arrived',
  cancelled: 'status.cancelled',
  'no-show': 'status.noShow'
};

export const translateService = (value: string, t: Translate): string =>
  SERVICE_KEYS[value] ? t(SERVICE_KEYS[value]) : value;

export const translateStatus = (value: string, t: Translate): string =>
  STATUS_KEYS[value] ? t(STATUS_KEYS[value]) : value;
