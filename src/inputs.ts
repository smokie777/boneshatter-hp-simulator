export const defaultInputsState = {
  maxHp: "4427",
  attackRate: "4.37",
  selfHitDamage: "447",
  instantLeech: "166.4",
  leechRate: "247.2",
  leechRateCap: "2233.9",
  lifeRegen: "-186.2",
  recoup: "0",
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
  recoup: {
    label: 'Recoup %',
    placeholder: "e.g. 40",
  }
};
