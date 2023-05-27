import * as styles from "./Profile.css";
import { useState, useEffect } from "react";
import { PurchaseButton } from "../Buttons/PurchaseButton";
import { BigNumber } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";

interface ProfileProps {
  balance: BigNumber;
  deposit: BigNumber;
  purchased: BigNumber;
  earned: BigNumber;
  rate: BigNumber;
}

export function Profile({
  balance,
  deposit,
  purchased,
  earned,
  rate
}: ProfileProps) {
  const [BALANCE, setBALANCE] = useState<string>();
  const [VALUE, setVALUE] = useState<string>();
  const [DEPOSIT, setDEPOSIT] = useState<string>();
  const [PURCHASED, setPURCHASED] = useState<string>();
  const [EARNED, setEARNED] = useState<string>();

  useEffect(() => {
    if (balance == null) {
      setBALANCE("0.00");
    } else {
      setBALANCE(parseFloat(formatEther(balance)).toFixed(2));
    }
  }, [balance]);

  /*useEffect(() => {
    if (balance == null) {
      setVALUE("0.00");
    } else {
      setVALUE(parseFloat(formatUnits(rate.mul(balance), 36)).toFixed(2));
    }
  }, [balance, rate]);*/

  useEffect(() => {
    if (deposit == null) {
      setDEPOSIT("0.00");
    } else {
      setDEPOSIT(parseFloat(formatEther(deposit)).toFixed(2));
    }
  }, [deposit]);

  useEffect(() => {
    if (purchased == null) {
      setPURCHASED("0.00");
    } else {
      setPURCHASED(parseFloat(formatEther(purchased)).toFixed(2));
    }
  }, [purchased]);

  useEffect(() => {
    if (earned == null) {
      setEARNED("0.00");
    } else {
      setEARNED(parseFloat(formatEther(earned)).toFixed(2));
    }
  }, [earned]);

  return (
    <div style={styles.block}>
      <div style={styles.contentColumn}>
        <div style={styles.badge}>{BALANCE} MSTL</div>${VALUE}
      </div>
      <div style={styles.contentRow}>
        <div style={styles.valueBlock}>
          Deposit
          <div style={styles.value}>${DEPOSIT}</div>
        </div>
        <div style={styles.valueBlock}>
          Purchased Amount
          <div style={styles.value}>{PURCHASED} MSTL</div>
        </div>
      </div>
      <div style={styles.contentRow}>
        <div style={styles.valueBlock}>
          Earned Referral Amount
          <div style={styles.value}>{EARNED} MSTL</div>
        </div>
      </div>
      <PurchaseButton />
    </div>
  );
}