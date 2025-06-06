import "./HP.scss";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import type { defaultInputsState } from './inputs';

const HP_GLOBE_HEIGHT = 250; // from css

export const HP = ({
  inputs,
  hasOverleech,
  recoupOver,
  setLogs,
  setShouldAnimate
}:{
  inputs: typeof defaultInputsState;
  hasOverleech: boolean;
  recoupOver: number;
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setShouldAnimate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // constants from state
  const MAX_HP = parseInt(inputs.maxHp);
  const ATTACK_RATE = parseInt(inputs.attackRate);
  const SELF_HIT_DAMAGE = parseInt(inputs.selfHitDamage);
  const INSTANT_LEECH = parseInt(inputs.instantLeech);
  const LEECH_RATE = parseInt(inputs.leechRate);
  const LEECH_RATE_CAP = parseInt(inputs.leechRateCap);
  const LIFE_REGEN = parseInt(inputs.lifeRegen);
  const RECOUP = parseInt(inputs.recoup);
  const RAW_SELF_HIT_DAMAGE = parseInt(inputs.rawSelfHitDamage);
  const REGEN_MULTIPLIER = parseInt(inputs.regenMultiplier);
  const MS_PER_ATTACK = 1000 / ATTACK_RATE;

  // variables used in calculations
  const controls = useAnimation();
  const hpRef = useRef(MAX_HP);
  const leechPerSecondRef = useRef(0);
  const recoupPerSecondRef = useRef(0);
  const juggRegenPerSecondRef = useRef(0);
  
  // variables only used for display, not calculations
  const [currentHpText, setCurrentHpText] = useState(MAX_HP);
  const [isDead, setIsDead] = useState(false);

  useEffect(() => {
    let lastTime = performance.now();
    let accumulatedTime = 0;
    let totalTime = 0;

    // Set the starting height immediately to full HP
    controls.set({ height: HP_GLOBE_HEIGHT });  // full height

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      accumulatedTime += delta;
      totalTime += delta;

      // calculate damage
      if (accumulatedTime >= MS_PER_ATTACK) {
        if (leechPerSecondRef.current < LEECH_RATE_CAP) {
          leechPerSecondRef.current = Math.min(leechPerSecondRef.current + LEECH_RATE, LEECH_RATE_CAP);
        }
        if (totalTime < 4000) {
          recoupPerSecondRef.current += (SELF_HIT_DAMAGE * (RECOUP / 100)) / recoupOver;
        }
        if (totalTime < 10000) {
          juggRegenPerSecondRef.current += (RAW_SELF_HIT_DAMAGE - SELF_HIT_DAMAGE) * 0.015;
        }
        hpRef.current -= SELF_HIT_DAMAGE - INSTANT_LEECH;
        accumulatedTime -= MS_PER_ATTACK;
      }

      // calculate recovery
      // this expression is equivalent to (total leech per ms + net regen per ms) * (time elapsed since last visual update)
      hpRef.current += ((
        leechPerSecondRef.current
        + LIFE_REGEN * REGEN_MULTIPLIER
        + recoupPerSecondRef.current
        + juggRegenPerSecondRef.current * REGEN_MULTIPLIER
      ) / 1000) * delta;

      // clamp hp between 0 and MAX_HP
      hpRef.current = Math.max(0, Math.min(hpRef.current, MAX_HP));

      // remove life leech effect if full hp is reached
      if (!hasOverleech && hpRef.current === MAX_HP) {
        leechPerSecondRef.current = 0;
      }

      // perform visual update
      controls.start({ height: HP_GLOBE_HEIGHT * (hpRef.current / MAX_HP) });
      setCurrentHpText(Math.round(hpRef.current));

      // check for death
      if (hpRef.current <= 0 && !isDead) {
        setIsDead(true);
        controls.start({ height: 0 });
        setLogs(['You died! 😂']);
        setShouldAnimate(false);
        return;
      }

      requestAnimationFrame(tick);
    };


    requestAnimationFrame(tick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="globe_container">
      <motion.div
        className="hp_fill"
        animate={controls}
        transition={{ ease: "linear", duration: 0.2 }}
      />
      <div className="hp_text">
        {currentHpText} / {MAX_HP}
      </div>
    </div>
  );
};

export const PlaceholderHP = () => (
  <div className="globe_container">
    <div
      className="hp_fill"
    />
    <div className="hp_text">
      0 / 0
    </div>
  </div>
);
