import * as styles from "./Phase.css";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";

interface PhaseProps {
  totalRaised: BigNumber;
  totalSold: BigNumber;
  rate: BigNumber;
  phase: BigNumber;
  currentRaised: BigNumber;
  cap: BigNumber;
  currentSold: BigNumber;
  currentRemain: BigNumber;
}

export function Phase({
  totalRaised,
  totalSold,
  rate,
  phase,
  cap,
  currentRaised,
  currentSold,
  currentRemain
}: PhaseProps) {
  const [TOTALRAISED, setTOTALRAISED] = useState<string>();
  const [TOTALSOLD, setTOTALSOLD] = useState<string>();
  const [RATE, setRATE] = useState<string>();
  const [PHASE, setPHASE] = useState<string>();
  const [CAP, setCAP] = useState<string>();
  const [CURRENTRAISED, setCURRENTRAISED] = useState<string>();
  const [CURRENTSOLD, setCURRENTSOLD] = useState<string>();
  const [CURRENTREMAIN, setCURRENTREMAIN] = useState<string>();
  const [STATUS, setSTATUS] = useState<string>();

  useEffect(() => {
    if (totalRaised) {
      setTOTALRAISED(parseFloat(formatEther(totalRaised)).toFixed(2));
    }
  }, [totalRaised]);

  useEffect(() => {
    if (totalSold) {
      setTOTALSOLD(parseFloat(formatEther(totalSold)).toFixed(2));
    }
  }, [totalSold]);

  useEffect(() => {
    if (rate) {
      setRATE(parseFloat(formatEther(rate)).toFixed(3));
    }
  }, [rate]);

  useEffect(() => {
    if (phase) {
      setPHASE(BigNumber.from(phase).toString());
    }
  }, [phase]);

  useEffect(() => {
    if (cap) {
      setCAP(parseFloat(formatEther(cap)).toFixed(2));
    }
  }, [cap]);

  useEffect(() => {
    if (currentRaised) {
      setCURRENTRAISED(parseFloat(formatEther(currentRaised)).toFixed(2));
    }
  }, [currentRaised]);

  useEffect(() => {
    if (currentSold) {
      setCURRENTSOLD(parseFloat(formatEther(currentSold)).toFixed(4));
    }
  }, [currentSold]);

  useEffect(() => {
    if (currentRemain) {
      setCURRENTREMAIN(parseFloat(formatEther(currentRemain)).toFixed(4));
    }
  }, [currentRemain]);

  /*useEffect(() => {
    setSTATUS(parseFloat((currentRaised / cap) * 100).toFixed(2) + "%");
  }, [currentRaised, cap]);*/

  return (
    <div style={styles.block}>
      <div style={styles.contentColumn}>
        <div style={styles.badge}>Total Raised</div>${TOTALRAISED}
      </div>
      <div style={styles.status}>
        <div
          style={{
            width: STATUS,
            height: "100%",
            backgroundColor: "#5f98f5",
            borderRadius: "30px"
          }}
        ></div>
      </div>
      <div style={styles.contentRow}>
        <div style={styles.valueBlock}>
          Total Sold
          <div style={styles.value}>{TOTALSOLD} MSTL</div>
        </div>
        <div style={styles.valueBlock}>
          Current Price
          <div style={styles.value}>1 MSTL ≈ ${RATE}</div>
        </div>
      </div>
      <div style={styles.phaseBlock}>
        <div style={styles.phase}>
          PHASE {PHASE}
          <div style={styles.phaseData}>
            {CURRENTRAISED} / ${CAP}
          </div>
        </div>
        <div style={styles.dataBlock}>
          Sold Amount
          <div style={styles.phaseData}>{CURRENTSOLD} MSTL</div>
        </div>
        <div style={styles.divider} />
        <div style={styles.dataBlock}>
          Remain Amount
          <div style={styles.phaseData}>{CURRENTREMAIN} MSTL</div>
        </div>
      </div>
    </div>
  );
}