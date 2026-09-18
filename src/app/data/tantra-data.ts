import {
  FaqItem,
  MicroRitual,
  PillarItem,
  SessionService,
  StudioSpaceInfo,
  TherapistProfile,
  Workshop
} from '../models/tantra.models';

export const APP_CONFIG = {
  brandName: 'Tantra Para Parejas',
  location: 'Barcelona & Molins de Rei · Sesiones Online y Domicilio',
  tagline: 'Redescubrir la intimidad, la conexión y el placer consciente',
  heroSubtitle: 'Un espacio sobrio, contemporáneo y libre de dogmas para parejas de todo tipo. Clases grupales en Casa Lazar (Barcelona <M> Bogatell) y sesiones privadas online, en Molins de Rei o a domicilio.',
  whatsappNumber: '34680760473',
  contactEmail: 'melera.ado@gmail.com',
  studioLocation: 'Clases en Casa Lazar (Barcelona <M> Bogatell) · Sesiones: Molins de Rei, Online o Domicilio',
  classesLocation: 'Casa Lazar · C/ Pere IV, 29, 7º 4ª Ático, 08018 Barcelona (<M> Bogatell)',
  sessionsLocation: 'Online · En Molins de Rei · A domicilio',
  logoUrl: '/logo.png',
  images: {
    hero: '/images/couple_walking.jpg',
    somaticTouch: '/images/somatic_touch.jpg',
    homeRituals: '/images/home_rituals.jpg',
    workshop: '/images/workshop.jpg',
    forAll: '/images/for_all.jpg',
    privateSessions: '/images/private_sessions.jpg',
    therapist: '/images/ado_melera.jpg'
  }
};

export const PILLARS_DATA: PillarItem[] = [
  {
    number: '01',
    title: 'Regulación del Sistema Nervioso',
    description:
      'La prisa cotidiana y el estrés crónico mantienen el cuerpo en alerta simpática. Aprendemos a pausar, regular el eje vagal y transitar conscientemente al reposo parasimpático, donde el placer y la ternura florecen de forma natural.',
    icon: 'air',
    colorClass: 'secondary'
  },
  {
    number: '02',
    title: 'Comunicación Íntima Auténtica',
    description:
      'Herramientas verbales y somáticas para enunciar límites, deseos y silencios sin culpa ni miedo al rechazo. Aprender a decir un «no» compasivo es la única puerta para un «sí» genuino y entregado.',
    icon: 'record_voice_over',
    colorClass: 'primary'
  },
  {
    number: '03',
    title: 'Placer Somático sin Presión',
    description:
      'Desactivamos la tiranía del rendimiento, los moldes pornográficos y la obsesión por el orgasmo lineal como único objetivo. Cultivamos una sensualidad presente, distribuida por todo el mapa dérmico de la piel.',
    icon: 'spa',
    colorClass: 'tertiary'
  }
];

export const RELATIONS_DATA: PillarItem[] = [
  {
    number: '01',
    title: 'Todas las Edades & Madureces',
    description:
      'Desde la frescura de parejas jóvenes que buscan desarmar la prisa digital hasta la veteranía y sosiego de parejas maduras.',
    icon: 'people_size_increase',
    colorClass: 'secondary'
  },
  {
    number: '02',
    title: 'Cualquier Momento del Vínculo',
    description:
      'Parejas en sus primeros meses sembrando una complicidad consciente, o vínculos consolidados de muchos años renovando el tacto dormido.',
    icon: 'hourglass',
    colorClass: 'primary'
  },
  {
    number: '03',
    title: 'Plena Diversidad Afectiva & de Género',
    description:
      'Parejas de mujeres, parejas de hombres, vínculos heterosexuales, identidades no binarias y constelaciones relacionales diversas, en un espacio libre de heteronormatividad forzada.',
    icon: 'diversity_2',
    colorClass: 'tertiary'
  }
];

export const MICRO_RITUALS_DATA: MicroRitual[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'La Mirada Sincronizada',
    duration: '5 minutos',
    format: 'Sin palabras',
    description:
      'Sentaos cómodamente frente a frente, cruzando las piernas o en sillas, con las rodillas rozándose suavemente. Colocad la mano derecha sobre el esternón de la pareja y la izquierda sobre vuestra propia mano recibida.',
    instruction:
      'Sostened la mirada suave (sin parpadear con rigidez ni forzar la sonrisa). Respirad hondo tres veces y sentid la vibración torácica del otro.',
    themeColor: 'primary'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'El Toque sin Demanda',
    duration: '15 minutos',
    format: 'Claridad de roles',
    description:
      'Una persona es receptora exclusiva; la otra, dadora activa. La regla de oro es eliminar toda expectativa de interacción genital o reciprocidad inmediata.',
    instruction:
      'La persona que da acaricia brazos, cuello, espalda o sienes prestando total atención a la respiración de su pareja. Si algo molesta, la persona receptora puede decir con calma: «más suave», «aquí sí» o «pausa».',
    themeColor: 'secondary'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'El Check-in Somático',
    duration: '3 minutos',
    format: 'Antes del descanso',
    description:
      'Antes de apagar la luz o tras una conversación difícil, responder por turnos a tres frases breves sin interrumpirse ni dar consejos:',
    instruction: 'Escuchad con el corazón abierto y sin intentar solucionar nada.',
    bullets: [
      '«En mi cuerpo ahora mismo siento...»',
      '«Agradezco de nuestro día...»',
      '«Para descansar en paz necesito soltar...»'
    ],
    themeColor: 'tertiary'
  }
];

export const WORKSHOP_DATA: Workshop = {
  id: 'taller-mensual',
  title: 'Clases de Parejas: Intimidad Tántrica y Respiración Somática',
  subtitle: '3er Miércoles de cada mes (octubre a junio) · 19:00 a 21:00 en Casa Lazar (Barcelona)',
  price: 40,
  priceUnit: 'pareja',
  badge: '3er Miércoles de mes · 19:00h a 21:00h',
  duration: '2 horas presenciales (19:00 a 21:00)',
  schedule: '3er miércoles de cada mes, de octubre a junio (de 19:00 a 21:00)',
  description:
    'Un laboratorio inmersivo de dos horas diseñado para que salgáis con herramientas tangibles de presencia, tacto consciente y descompresión emocional en un entorno excepcional.',
  imageUrl: APP_CONFIG.images.workshop,
  features: [
    'Casa Lazar: Amplia sala de 80 m² con abundante luz natural y acondicionada acústicamente.',
    'Zona de recepción previa y terraza de 30 m² con vistas al mar para las transiciones.',
    'Exclusivo con tu pareja: Todo el trabajo experiencial se realiza únicamente con tu vínculo.',
    'Ropa cómoda: Sin exigencia de desnudez. Espacio 100% basado en el consentimiento.',
    'Excelente comunicación en Barcelona: A 2 min del metro Bogatell (<M> L4).'
  ],
  dates: [
    {
      id: 'd-2026-10-21',
      dateStr: '21 Oct de 2026',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2026-11-18',
      dateStr: '18 Nov de 2026',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2026-12-16',
      dateStr: '16 Dic de 2026',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2027-01-20',
      dateStr: '20 Ene de 2027',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2027-02-17',
      dateStr: '17 Feb de 2027',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2027-03-17',
      dateStr: '17 Mar de 2027',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2027-04-21',
      dateStr: '21 Abr de 2027',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2027-05-19',
      dateStr: '19 May de 2027',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    },
    {
      id: 'd-2027-06-16',
      dateStr: '16 Jun de 2027',
      timeStr: '19:00h - 21:00h',
      location: 'Casa Lazar (C/ Pere IV, 29 7º 4ª Ático, Barcelona · <M> Bogatell)',
      spotsLeft: 10,
      maxSpots: 10
    }
  ]
};

export const SESSIONS_DATA: SessionService[] = [
  {
    id: 'terapia-vinculo',
    title: 'Modalidad Pareja',
    modalidad: 'Terapia de Vínculo',
    categoryTag: 'Terapia de Vínculo',
    price: 90,
    durationMinutes: 90,
    locationNote: 'Online · En Molins de Rei · A domicilio',
    description:
      'Indicada para momentos de transición, discrepancia en el deseo erótico, estancamiento de la rutina o reconciliación tras crisis afectivas. Mediación somática y diálogo guiado online, en consulta en Molins de Rei o en vuestro domicilio.',
    suitableFor: [
      'Pérdida o asimetría del deseo erótico',
      'Monotonía y desconexión por ritmos laborales o crianza',
      'Dificultad para comunicar fantasías, límites y frenos',
      'Reconstrucción de la confianza tras una crisis'
    ],
    benefits: [
      'Desescalada de tensiones reactivas mediante regulación vagal',
      'Disponible online, presencial en Molins de Rei o a domicilio',
      'Protocolos concretos para continuar en casa'
    ],
    tagColor: 'secondary'
  },
  {
    id: 'sesion-individual',
    title: 'Exploración y Sensibilidad Personal',
    modalidad: 'Sesión Individual',
    categoryTag: 'Individual',
    price: 60,
    durationMinutes: 60,
    locationNote: 'Online · En Molins de Rei · A domicilio',
    description:
      'Reconexión con el propio mapa corporal, desprogramación de bloqueos emocionales, superación de la autoexigencia o integración de la consciencia tántrica. Disponible online, en consulta en Molins de Rei o a domicilio.',
    suitableFor: [
      'Autoexigencia, ansiedad por el rendimiento o desconexión física',
      'Integración de vivencias o cierres de etapas previas',
      'Exploración de la anatomía sutil y respiración consciente'
    ],
    benefits: [
      'Enfoque individualizado a tu propio ritmo somático',
      'Atención online, en consulta en Molins de Rei o a domicilio',
      'Comprensión del sistema nervioso autónomo'
    ],
    tagColor: 'tertiary'
  },
  {
    id: 'masaje-tantrico',
    title: 'Masaje Terapéutico Tántrico Somático',
    modalidad: 'Trabajo Corporal',
    categoryTag: 'Trabajo Corporal',
    price: 90,
    durationMinutes: 90,
    locationNote: 'En Molins de Rei · A domicilio',
    description:
      'Toque bioenergético sobre futón tradicional con aceites templados de sésamo. Orientado a relajar corazas musculares profundas en diafragma, psoas y pelvis. Disponible en Molins de Rei o a domicilio.',
    suitableFor: [
      'Tensión acumulada en la pelvis, lumbares o diafragma',
      'Sobrecarga mental crónica y necesidad de descanso profundo',
      'Apertura suave y respetuosa al placer no genital'
    ],
    benefits: [
      'Futón tradicional japonés y aceites orgánicos tibios',
      'Sesión en consulta en Molins de Rei o servicio a domicilio',
      'Consentimiento continuo y gradual en todo momento'
    ],
    tagColor: 'primary'
  }
];

export const THERAPIST_DATA: TherapistProfile = {
  name: 'Ado Melera',
  instagram: 'https://www.instagram.com/adomelera/',
  role: 'Terapeuta Corporal Integral · Barcelona & Molins de Rei',
  location: 'Barcelona & Molins de Rei',
  subtitle: 'Reconexión Sensorial & Intimidad Consciente',
  portraitUrl: APP_CONFIG.images.therapist,
  quote: '«Tu cuerpo no es un problema a resolver, sino un territorio a explorar con curiosidad y presencia.»',
  paragraphs: [
    'De matemático a terapeuta corporal, creo un espacio donde el respeto absoluto y la seguridad son innegociables. Mi aproximación combina la precisión analítica del estudio de sistemas con la calidez del toque somático consciente.',
    'Me formé en terapias psicocorporales, tantra contemporáneo y regulación del trauma bajo el modelo Somatic Experiencing®. Facilito clases regulares para parejas en Casa Lazar (Barcelona) y acompaño sesiones privadas de forma online, en consulta en Molins de Rei o a domicilio: sin dogmas esotéricos, con escucha atenta y técnicas prácticas aplicables en vuestro día a día.'
  ],
  credentials: [
    {
      icon: 'psychiatry',
      text: 'Sensibilidad al Trauma',
      color: 'secondary'
    },
    {
      icon: 'favorite',
      text: 'Espacio Afirmativo LGTBIQ+',
      color: 'primary'
    },
    {
      icon: 'analytics',
      text: 'Rigor Analítico & Somático',
      color: 'tertiary'
    }
  ]
};

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-location',
    question: '¿Dónde se realizan las clases y las sesiones privadas?',
    answer:
      'Las clases grupales de parejas (3er miércoles de mes, de 19:00 a 21:00) se realizan en Casa Lazar: C/ Pere IV, 29, 7º 4ª Ático (08018 Barcelona, metro Bogatell), un espacio de 80 m² con luz natural, equipo de sonido, acústica acondicionada, zona de recepción y terraza de 30 m² con vistas al mar. Las sesiones privadas individuales y de pareja se ofrecen en 3 modalidades flexibles: online por videollamada, presencial en Molins de Rei o directamente a domicilio.'
  },
  {
    id: 'faq-1',
    question: '¿Habrá interacción o intercambio con otras parejas?',
    answer:
      'No. En las clases grupales cada dinámica se ejecuta única y exclusivamente con tu propia pareja en vuestra propia esterilla. Nadie interactúa físicamente con otras personas ni se exponen testimonios obligatorios ante el grupo.'
  },
  {
    id: 'faq-2',
    question: '¿Hay desnudez en las clases de 2 horas?',
    answer:
      'En absoluto. Se asiste con ropa cómoda y elástica (algodón, lino o chándal). El foco de la clase está en la respiración compartida, la sintonización del pulso y el tacto consciente en manos, rostro y hombros.'
  },
  {
    id: 'faq-3',
    question: '¿Es apto si estamos pasando por un momento de desconexión?',
    answer:
      'Sí, es el contexto idóneo. La mayoría de parejas acuden precisamente porque el ritmo laboral o la crianza han enfriado el contacto. La clase no fuerza caricias no deseadas, sino que ofrece una tregua guiada para volver a sentirse.'
  },
  {
    id: 'faq-4',
    question: '¿Es bienvenido cualquier tipo de vínculo?',
    answer:
      'Absolutamente. Todas las parejas heterosexuales, homosexuales, no binarias, relaciones monógamas y no monógamas. La intimidad humana y el tacto consciente no entienden de etiquetas normativas.'
  }
];

export const STUDIO_DATA: StudioSpaceInfo = {
  name: 'Casa Lazar & Espacio Somático',
  location: 'Barcelona (<M> Bogatell) · Molins de Rei',
  neighborhood: 'Poblenou · Barcelona (<M> Bogatell)',
  description:
    'Sede de las clases de parejas: Casa Lazar cuenta con una amplia sala de 80 m² con abundante luz natural y equipo de sonido, acondicionada acústicamente, con zona de recepción y terraza de 30 m² con vistas al mar. Para las sesiones privadas, dispongo de consulta en Molins de Rei, sesiones online y atención a domicilio.',
  features: [
    {
      icon: 'wb_sunny',
      title: 'Sala de 80 m² con Luz Natural & Sonido',
      description: 'Espacio diáfano de 80 m² con luz natural y equipo de sonido, acondicionada acústicamente para una inmersión plena.'
    },
    {
      icon: 'deck',
      title: 'Terraza de 30 m² con Vistas al Mar & Recepción',
      description: 'Zona de recepción previa para bienvenida relajada y terraza de 30 m² con vistas panorámicas al mar Mediterráneo.'
    },
    {
      icon: 'volume_off',
      title: 'Acondicionamiento Acústico & Calma',
      description: 'Tratamiento sonoro óptimo para garantizar máxima intimidad acústica durante las respiraciones y prácticas.'
    },
    {
      icon: 'home_pin',
      title: 'Sesiones Online, en Molins de Rei o a Domicilio',
      description: 'Modalidades para sesiones privadas: consulta en Molins de Rei, sesión online por videollamada o servicio a domicilio.'
    }
  ],
  address: 'Casa Lazar · C/ Pere IV, 29, 7º 4ª Ático, 08018 Barcelona',
  metro: '<M> Bogatell (L4, a 2 min) · <M> Marina (L1)',
  image: APP_CONFIG.images.somaticTouch
};
