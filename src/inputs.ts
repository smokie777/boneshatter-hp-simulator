export const defaultInputsState = {
  maxHp: "4311",
  attackRate: "4.55",
  selfHitDamage: "467",
  instantLeech: "162.3",
  leechRate: "278.2",
  leechRateCap: "2179.4",
  lifeRegen: "-201.6",
  regenMultiplier: "1.07",
  recoup: "25",
  rawSelfHitDamage: "0",
};

interface InputInfo {
  label: string;
  placeholder: string;
}
export const inputsInfo:{[key:string]:InputInfo} = {
  maxHp: {
    label: 'Max HP',
    placeholder: "e.g. 4427",
  },
  attackRate: {
    label: 'Attack Rate',
    placeholder: "e.g. 4.37",
  },
  selfHitDamage: {
    label: 'Self Hit Damage',
    placeholder: "e.g. 447",
  },
  instantLeech: {
    label: 'Instant Leech',
    placeholder: "e.g. 166.4",
  },
  leechRate: {
    label: 'Leech Rate',
    placeholder: "e.g. 247.2",
  },
  leechRateCap: {
    label: 'Leech Rate Cap',
    placeholder: "e.g. 2233.9",
  },
  lifeRegen: {
    label: 'Life Regen',
    placeholder: "e.g. -186.2",
  },
  regenMultiplier: {
    label: 'Life Regen Multiplier',
    placeholder: 'e.g. 1.5'
  },
  recoup: {
    label: 'Recoup %',
    placeholder: "e.g. 40",
  },
  rawSelfHitDamage: {
    label: 'Raw Self Hit Damage (Jugg)',
    placeholder: 'e.g. "5077.13'
  },
};
