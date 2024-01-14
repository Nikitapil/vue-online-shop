import type { MaskOptions } from 'maska';

const numberMask: MaskOptions = {
  mask: '0.99',
  tokens: {
    0: { pattern: /[0-9]/, multiple: true },
    9: { pattern: /[0-9]/, optional: true, multiple: true }
  }
};

export const masks = {
  numberMask,
  noMask: {}
};

export type TMasks = keyof typeof masks;
