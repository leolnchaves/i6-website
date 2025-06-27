
export const getProcessSteps = (t: (key: string) => string) => [
  {
    key: "discovery",
    title: t('solutions.process.discovery.title'),
    subtitle: t('solutions.process.discovery.subtitle'),
    description: t('solutions.process.discovery.description'),
    color: "from-slate-400 to-slate-500"
  },
  {
    key: "data",
    title: t('solutions.process.data.title'),
    subtitle: t('solutions.process.data.subtitle'),
    description: t('solutions.process.data.description'),
    color: "from-slate-400 to-slate-500"
  },
  {
    key: "training",
    title: t('solutions.process.training.title'),
    subtitle: t('solutions.process.training.subtitle'),
    description: t('solutions.process.training.description'),
    color: "from-slate-400 to-slate-500"
  },
  {
    key: "testing",
    title: t('solutions.process.testing.title'),
    subtitle: t('solutions.process.testing.subtitle'),
    description: t('solutions.process.testing.description'),
    color: "from-slate-400 to-slate-500"
  },
  {
    key: "integration",
    title: t('solutions.process.integration.title'),
    subtitle: t('solutions.process.integration.subtitle'),
    description: t('solutions.process.integration.description'),
    color: "from-amber-600 to-amber-700"
  }
];
