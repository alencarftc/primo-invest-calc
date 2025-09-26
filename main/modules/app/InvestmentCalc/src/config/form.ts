export const FORM_CONFIG = {
  fields: {
    base: {
      min: 1,
      step: 1,
      max: 1000,
    },
    recurrent: {
      min: 1,
      step: 1,
      max: 1000,
    },
    period: {
      min: 1,
      step: 1,
      max: 24,
    },
  },
  initialValues: {
    base: 100,
    recurrent: 100,
    period: 12,
  },
}
