export const messages = {
  en: {
    app: {
      consoleTitle: 'Barber Console'
    },
    nav: {
      today: 'Today',
      calendar: 'Calendar',
      clients: 'Clients',
      settings: 'Settings'
    },
    language: {
      label: 'Language',
      en: 'English',
      ru: 'Russian',
      uz: 'Uzbek'
    },
    theme: {
      label: 'Theme',
      light: 'Light',
      dark: 'Dark'
    },
    actions: {
      newBooking: 'New booking',
      loadSample: 'Load sample',
      backToCalendar: 'Back to calendar',
      saveBooking: 'Save booking',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      call: 'Call',
      profile: 'Profile',
      rebook: 'Rebook',
      editWeeklySchedule: 'Edit weekly schedule',
      configureRules: 'Configure rules',
      setReminder: 'Set reminder',
      updateProfile: 'Update profile',
      exportCsv: 'Export CSV',
      manageServices: 'Manage services',
      addService: 'Add service',
      viewStatistics: 'View statistics',
      signIn: 'Sign in',
      continueDashboard: 'Continue to the dashboard'
    },
    today: {
      label: 'Today',
      title: 'Run the day',
      subtitle: 'Tap to update status, call, or edit in seconds.',
      empty: "No bookings yet. Tap \"{action}\" to fill the day."
    },
    calendar: {
      goToday: 'Go to today',
      dayView: 'Day view',
      weekView: 'Week view',
      previous: 'Previous',
      next: 'Next',
      addBooking: 'Add booking'
    },
    appointment: {
      label: 'Booking',
      edit: 'Edit appointment',
      add: 'Add appointment',
      notFound: 'We could not find that appointment.',
      status: 'Status: {status}',
      conflict:
        'Conflict warning: this overlaps another booking. You can still save if you want to override.'
    },
    form: {
      clientName: 'Client name',
      phone: 'Phone',
      service: 'Service',
      duration: 'Duration',
      price: 'Price',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      placeholder: {
        name: 'Name',
        phone: 'Phone',
        price: 'Optional',
        notes: 'Notes'
      }
    },
    services: {
      haircut: 'Haircut',
      beard: 'Beard',
      haircutBeard: 'Haircut + Beard',
      kids: 'Kids'
    },
    validation: {
      title: 'Check appointment details',
      dateTimeRequired: 'Select a valid date and time.',
      nonWorkingDay: 'This day is not a working day.',
      outsideWorkingHours: 'Selected time is outside working hours.',
      duringBreak: 'Selected time overlaps the break.',
      conflict: 'Selected time is already booked.'
    },
    status: {
      booked: 'Booked',
      arrived: 'Arrived',
      cancelled: 'Cancelled',
      noShow: 'No-show'
    },
    time: {
      minutesShort: '{count} min',
      minutesLong: '{count} minutes',
      to: 'to',
      break: 'Break'
    },
    clients: {
      label: 'Clients',
      title: 'Client history',
      lastVisitSummary: 'Last visit {date} - {service}',
      empty: 'No clients yet. Start booking to build history.',
      profile: 'Client profile',
      fallbackName: 'Client',
      lastVisitLabel: 'Last visit',
      lastService: 'Last service',
      visits: 'Visits',
      appointmentHistory: 'Appointment history',
      noHistory: 'No appointment history yet.'
    },
    settings: {
      label: 'Settings',
      title: 'Barber preferences',
      services: 'Services',
      servicesText: 'Manage services and pricing for bookings.',
      statistics: 'Statistics',
      statisticsText: 'View customer and revenue performance.',
      faq: 'FAQ',
      faqCta: 'Open FAQ',
      bookingRules: 'Booking rules',
      bookingRulesText: 'Double booking warning is enabled.',
      reminders: 'Reminders',
      remindersText: 'Next appointment reminder for the barber.',
      account: 'Account',
      accountText: 'Single-user barber profile.',
      data: 'Data',
      dataText: 'Export or wipe local demo data.'
    },
    schedule: {
      weeklyTemplate: 'Weekly template',
      defaultHours: 'Set your default hours',
      autoCreated: 'Auto-created on first launch',
      bookingDefaults: 'Booking defaults',
      defaultServiceDuration: 'Default service duration',
      bookingRules: 'Booking rules',
      bookingRulesText: 'Double bookings are blocked, with override warning enabled.'
    },
    days: {
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun'
    },
    login: {
      welcomeBack: 'Welcome back',
      title: 'Log in to your chair.',
      subtitle: 'Keep your day tight with fast bookings and a clean plan.',
      phoneOrEmail: 'Phone or email',
      passcode: 'Passcode',
      whyTitle: 'Why barbers stick with Timetrack',
      bullet1: 'Set your weekly template once, tweak as needed.',
      bullet2: 'Book a client in under 10 seconds with defaults.',
      bullet3: 'Run the day from a clean Today list.',
      livePreview: 'Live preview',
      livePreviewText: '12:30 PM - Luis Carter - Beard - Arrived'
    },
    servicesPage: {
      label: 'Services',
      title: 'Service catalog',
      subtitle: 'Add, remove, and price the services you offer.',
      addTitle: 'Add new service',
      nameLabel: 'Service name',
      namePlaceholder: 'e.g. Haircut',
      priceLabel: 'Price',
      pricePlaceholder: 'e.g. 50',
      empty: 'No services yet. Add your first service to get started.'
    },
    statistics: {
      label: 'Dashboard',
      title: 'Statistics',
      subtitle: 'Track customers and revenue in the selected period.',
      none: 'No data yet',
      noRevenue: 'No revenue',
      period: {
        week: 'This week',
        month: 'This month'
      },
      kpi: {
        customers: 'Customers',
        revenue: 'Total revenue',
        avgRevenue: 'Avg revenue',
        perCustomer: 'per customer',
        topService: 'Top service'
      },
      charts: {
        customersPerDay: 'Customers per day',
        revenuePerDay: 'Revenue per day',
        revenueByService: 'Revenue by service',
        customersByService: 'Customers by service'
      },
      table: {
        title: 'Service performance',
        service: 'Service',
        customers: 'Customers',
        revenue: 'Revenue',
        avgTicket: 'Average ticket'
      }
    }
  },
  uz: {
    app: {
      consoleTitle: 'Sartarosh konsoli'
    },
    nav: {
      today: 'Bugun',
      calendar: 'Kalendar',
      clients: 'Mijozlar',
      settings: 'Sozlamalar'
    },
    language: {
      label: 'Til',
      en: 'Inglizcha',
      ru: 'Ruscha',
      uz: "O'zbekcha"
    },
    theme: {
      label: 'Mavzu',
      light: "Yorug'",
      dark: "Qorong'i"
    },
    actions: {
      newBooking: 'Yangi bron',
      loadSample: 'Namuna yuklash',
      backToCalendar: 'Kalendarga qaytish',
      saveBooking: 'Bronni saqlash',
      cancel: 'Bekor qilish',
      delete: "O'chirish",
      edit: 'Tahrirlash',
      call: "Qo'ng'iroq",
      profile: 'Profil',
      rebook: 'Qayta bron',
      editWeeklySchedule: 'Haftalik jadvalni tahrirlash',
      configureRules: 'Qoidalarni sozlash',
      setReminder: 'Eslatma sozlash',
      updateProfile: 'Profilni yangilash',
      exportCsv: 'CSV eksport',
      manageServices: 'Xizmatlarni boshqarish',
      addService: "Xizmat qo'shish",
      viewStatistics: "Statistikani ko'rish",
      signIn: 'Kirish',
      continueDashboard: "Boshqaruv paneliga o'tish"
    },
    today: {
      label: 'Bugun',
      title: 'Kunni boshqaring',
      subtitle: "Holatni yangilash, qo'ng'iroq qilish yoki tahrirlash uchun bosing.",
      empty: 'Hali bronlar yo\'q. Kunni to\'ldirish uchun "{action}"ni bosing.'
    },
    calendar: {
      goToday: "Bugun sanasiga o'tish",
      dayView: "Kun ko'rinishi",
      weekView: "Hafta ko'rinishi",
      previous: 'Oldingi',
      next: 'Keyingi',
      addBooking: "Bron qo'shish"
    },
    appointment: {
      label: 'Bron',
      edit: 'Uchrashuvni tahrirlash',
      add: "Uchrashuv qo'shish",
      notFound: 'Ushbu uchrashuv topilmadi.',
      status: 'Holat: {status}',
      conflict:
        "To'qnashuv ogohlantirishi: bu boshqa bron bilan ustma-ust keladi. Xohlasangiz baribir saqlashingiz mumkin."
    },
    form: {
      clientName: 'Mijoz ismi',
      phone: 'Telefon',
      service: 'Xizmat',
      duration: 'Davomiyligi',
      price: 'Narx',
      date: 'Sana',
      time: 'Vaqt',
      notes: 'Izohlar',
      placeholder: {
        name: 'Ism',
        phone: 'Telefon',
        price: 'Ixtiyoriy',
        notes: 'Izohlar'
      }
    },
    services: {
      haircut: 'Soch olish',
      beard: 'Soqol',
      haircutBeard: 'Soch olish + Soqol',
      kids: 'Bolalar'
    },
    validation: {
      title: 'Uchrashuv ma`lumotlarini tekshiring',
      dateTimeRequired: 'To`g`ri sana va vaqtni tanlang.',
      nonWorkingDay: 'Bu kun ish kuni emas.',
      outsideWorkingHours: 'Tanlangan vaqt ish soatlaridan tashqarida.',
      duringBreak: 'Tanlangan vaqt tanaffusga to`g`ri keladi.',
      conflict: 'Tanlangan vaqt band qilingan.'
    },
    status: {
      booked: 'Bron qilingan',
      arrived: 'Keldi',
      cancelled: 'Bekor qilindi',
      noShow: 'Kelmagan'
    },
    time: {
      minutesShort: '{count} daq.',
      minutesLong: '{count} daqiqa',
      to: 'gacha',
      break: 'Tanaffus'
    },
    clients: {
      label: 'Mijozlar',
      title: 'Mijozlar tarixi',
      lastVisitSummary: "So'nggi tashrif {date} - {service}",
      empty: "Hali mijozlar yo'q. Tarixni yaratish uchun bron qiling.",
      profile: 'Mijoz profili',
      fallbackName: 'Mijoz',
      lastVisitLabel: "So'nggi tashrif",
      lastService: "So'nggi xizmat",
      visits: 'Tashriflar',
      appointmentHistory: 'Uchrashuvlar tarixi',
      noHistory: "Hali uchrashuvlar tarixi yo'q."
    },
    settings: {
      label: 'Sozlamalar',
      title: 'Sartarosh sozlamalari',
      services: 'Xizmatlar',
      servicesText: 'Bron uchun xizmatlar va narxlarni boshqaring.',
      statistics: 'Statistika',
      statisticsText: "Mijozlar va daromad ko'rsatkichlarini ko'ring.",
      faq: 'FAQ',
      faqCta: 'Savol va murojatlar',
      bookingRules: 'Bron qoidalari',
      bookingRulesText: 'Ikki karra bron ogohlantirish yoqilgan.',
      reminders: 'Eslatmalar',
      remindersText: 'Sartarosh uchun keyingi uchrashuv eslatmasi.',
      account: 'Hisob',
      accountText: 'Yakka foydalanuvchi sartarosh profili.',
      data: "Ma'lumotlar",
      dataText: "Mahalliy demo ma'lumotlarini eksport qilish yoki tozalash."
    },
    schedule: {
      weeklyTemplate: 'Haftalik shablon',
      defaultHours: 'Standart ish soatlarini belgilang',
      autoCreated: 'Birinchi ishga tushishda avtomatik yaratiladi',
      bookingDefaults: "Bron bo'yicha standartlar",
      defaultServiceDuration: 'Standart xizmat davomiyligi',
      bookingRules: 'Bron qoidalari',
      bookingRulesText: 'Ikki karra bronlar bloklanadi, ogohlantirish bilan bekor qilish mumkin.'
    },
    days: {
      mon: 'Du',
      tue: 'Se',
      wed: 'Ch',
      thu: 'Pa',
      fri: 'Ju',
      sat: 'Sh',
      sun: 'Ya'
    },
    login: {
      welcomeBack: 'Xush kelibsiz',
      title: 'Ish joyingizga kiring.',
      subtitle: 'Tez bronlar va aniq reja bilan kunni boshqaring.',
      phoneOrEmail: 'Telefon yoki email',
      passcode: 'Parol kodi',
      whyTitle: 'Nega sartaroshlar Timetrackni tanlaydi',
      bullet1: "Haftalik shablonni bir marta sozlang, kerak bo'lsa o'zgartiring.",
      bullet2: 'Standartlar bilan mijozni 10 soniyadan kam vaqtda bron qiling.',
      bullet3: "Kunni toza Bugun ro'yxati orqali boshqaring.",
      livePreview: "Jonli ko'rinish",
      livePreviewText: '12:30 - Luis Carter - Soqol - Keldi'
    },
    servicesPage: {
      label: 'Xizmatlar',
      title: "Xizmatlar ro'yxati",
      subtitle: "Xizmatlarni qo'shing, o'chiring va narxini belgilang.",
      addTitle: "Yangi xizmat qo'shish",
      nameLabel: 'Xizmat nomi',
      namePlaceholder: 'Masalan: Soch olish',
      priceLabel: 'Narx',
      pricePlaceholder: 'Masalan: 50',
      empty: "Hali xizmatlar yo'q. Boshlash uchun birinchi xizmatni qo'shing."
    },
    statistics: {
      label: 'Dashboard',
      title: 'Statistika',
      subtitle: "Tanlangan davr bo'yicha mijozlar va daromadni kuzating.",
      none: "Hozircha ma'lumot yo'q",
      noRevenue: "Daromad yo'q",
      period: {
        week: 'Joriy hafta',
        month: 'Joriy oy'
      },
      kpi: {
        customers: 'Mijozlar',
        revenue: 'Jami daromad',
        avgRevenue: "O'rtacha daromad",
        perCustomer: 'har bir mijoz',
        topService: 'Eng top xizmat'
      },
      charts: {
        customersPerDay: 'Kunlik mijozlar',
        revenuePerDay: 'Kunlik daromad',
        revenueByService: "Xizmat bo'yicha daromad",
        customersByService: "Xizmat bo'yicha mijozlar"
      },
      table: {
        title: "Xizmat ko'rsatkichlari",
        service: 'Xizmat',
        customers: 'Mijozlar',
        revenue: 'Daromad',
        avgTicket: "O'rtacha chek"
      }
    }
  },
  ru: {
    app: {
      consoleTitle: 'Консоль барбера'
    },
    nav: {
      today: 'Сегодня',
      calendar: 'Календарь',
      clients: 'Клиенты',
      settings: 'Настройки'
    },
    language: {
      label: 'Язык',
      en: 'Английский',
      ru: 'Русский',
      uz: 'Узбекский'
    },
    theme: {
      label: 'Тема',
      light: 'Светлая',
      dark: 'Темная'
    },
    actions: {
      newBooking: 'Новая запись',
      loadSample: 'Загрузить пример',
      backToCalendar: 'Назад к календарю',
      saveBooking: 'Сохранить запись',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      call: 'Позвонить',
      profile: 'Профиль',
      rebook: 'Повторная запись',
      editWeeklySchedule: 'Редактировать недельный график',
      configureRules: 'Настроить правила',
      setReminder: 'Настроить напоминание',
      updateProfile: 'Обновить профиль',
      exportCsv: 'Экспорт CSV',
      manageServices: 'Управление услугами',
      addService: 'Добавить услугу',
      viewStatistics: 'Посмотреть статистику',
      signIn: 'Войти',
      continueDashboard: 'Перейти в панель'
    },
    today: {
      label: 'Сегодня',
      title: 'Управляйте днем',
      subtitle: 'Нажмите, чтобы обновить статус, позвонить или отредактировать за секунды.',
      empty: 'Пока нет записей. Нажмите "{action}", чтобы заполнить день.'
    },
    calendar: {
      goToday: 'Перейти к сегодняшнему дню',
      dayView: 'Дневной вид',
      weekView: 'Недельный вид',
      previous: 'Назад',
      next: 'Вперед',
      addBooking: 'Добавить запись'
    },
    appointment: {
      label: 'Запись',
      edit: 'Редактировать запись',
      add: 'Добавить запись',
      notFound: 'Не удалось найти эту запись.',
      status: 'Статус: {status}',
      conflict:
        'Предупреждение о конфликте: это пересекается с другой записью. Вы все равно можете сохранить, если хотите переопределить.'
    },
    form: {
      clientName: 'Имя клиента',
      phone: 'Телефон',
      service: 'Услуга',
      duration: 'Длительность',
      price: 'Цена',
      date: 'Дата',
      time: 'Время',
      notes: 'Заметки',
      placeholder: {
        name: 'Имя',
        phone: 'Телефон',
        price: 'Необязательно',
        notes: 'Заметки'
      }
    },
    services: {
      haircut: 'Стрижка',
      beard: 'Борода',
      haircutBeard: 'Стрижка + Борода',
      kids: 'Детская'
    },
    validation: {
      title: 'Проверьте детали записи',
      dateTimeRequired: 'Выберите корректную дату и время.',
      nonWorkingDay: 'Этот день не является рабочим.',
      outsideWorkingHours: 'Выбранное время вне рабочих часов.',
      duringBreak: 'Выбранное время попадает на перерыв.',
      conflict: 'Выбранное время уже занято.'
    },
    status: {
      booked: 'Записан',
      arrived: 'Пришел',
      cancelled: 'Отменен',
      noShow: 'Не пришел'
    },
    time: {
      minutesShort: '{count} мин',
      minutesLong: '{count} минут',
      to: 'до',
      break: 'Перерыв'
    },
    clients: {
      label: 'Клиенты',
      title: 'История клиентов',
      lastVisitSummary: 'Последний визит {date} - {service}',
      empty: 'Пока нет клиентов. Начните запись, чтобы создать историю.',
      profile: 'Профиль клиента',
      fallbackName: 'Клиент',
      lastVisitLabel: 'Последний визит',
      lastService: 'Последняя услуга',
      visits: 'Визиты',
      appointmentHistory: 'История записей',
      noHistory: 'Истории записей пока нет.'
    },
    settings: {
      label: 'Настройки',
      title: 'Настройки барбера',
      services: 'Услуги',
      servicesText: 'Управляйте услугами и ценами для записей.',
      statistics: 'Статистика',
      statisticsText: 'Смотрите показатели клиентов и дохода.',
      faq: 'FAQ',
      faqCta: 'Открыть FAQ',
      bookingRules: 'Правила записи',
      bookingRulesText: 'Предупреждение о двойной записи включено.',
      reminders: 'Напоминания',
      remindersText: 'Напоминание о следующей записи для барбера.',
      account: 'Аккаунт',
      accountText: 'Профиль барбера для одного пользователя.',
      data: 'Данные',
      dataText: 'Экспортировать или очистить локальные демо-данные.'
    },
    schedule: {
      weeklyTemplate: 'Недельный шаблон',
      defaultHours: 'Задайте стандартные часы',
      autoCreated: 'Автоматически создается при первом запуске',
      bookingDefaults: 'Настройки записи',
      defaultServiceDuration: 'Стандартная длительность услуги',
      bookingRules: 'Правила записи',
      bookingRulesText: 'Двойные записи блокируются, с предупреждением об исключении.'
    },
    days: {
      mon: 'Пн',
      tue: 'Вт',
      wed: 'Ср',
      thu: 'Чт',
      fri: 'Пт',
      sat: 'Сб',
      sun: 'Вс'
    },
    login: {
      welcomeBack: 'С возвращением',
      title: 'Войдите к своему креслу.',
      subtitle: 'Держите день в порядке с быстрыми записями и четким планом.',
      phoneOrEmail: 'Телефон или email',
      passcode: 'Код доступа',
      whyTitle: 'Почему барберы выбирают Timetrack',
      bullet1: 'Настройте недельный шаблон один раз, при необходимости корректируйте.',
      bullet2: 'Записывайте клиента меньше чем за 10 секунд с настройками по умолчанию.',
      bullet3: 'Управляйте днем через чистый список Сегодня.',
      livePreview: 'Живой пример',
      livePreviewText: '12:30 - Luis Carter - Борода - Пришел'
    },
    servicesPage: {
      label: 'Услуги',
      title: 'Каталог услуг',
      subtitle: 'Добавляйте, удаляйте и назначайте цены на услуги.',
      addTitle: 'Добавить услугу',
      nameLabel: 'Название услуги',
      namePlaceholder: 'например: Стрижка',
      priceLabel: 'Цена',
      pricePlaceholder: 'например: 50',
      empty: 'Услуг пока нет. Добавьте первую услугу, чтобы начать.'
    },
    statistics: {
      label: 'Панель',
      title: 'Статистика',
      subtitle: 'Отслеживайте клиентов и доход за выбранный период.',
      none: 'Нет данных',
      noRevenue: 'Нет дохода',
      period: {
        week: 'Эта неделя',
        month: 'Этот месяц'
      },
      kpi: {
        customers: 'Клиенты',
        revenue: 'Общий доход',
        avgRevenue: 'Средний доход',
        perCustomer: 'на клиента',
        topService: 'Топ-услуга'
      },
      charts: {
        customersPerDay: 'Клиенты по дням',
        revenuePerDay: 'Доход по дням',
        revenueByService: 'Доход по услугам',
        customersByService: 'Клиенты по услугам'
      },
      table: {
        title: 'Эффективность услуг',
        service: 'Услуга',
        customers: 'Клиенты',
        revenue: 'Доход',
        avgTicket: 'Средний чек'
      }
    }
  }

};
