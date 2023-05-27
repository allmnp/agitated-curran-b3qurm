import * as styles from "./SwapModal.css";
import { Success } from "../Icons/Success";
interface SuccessSwapProps {
  txID: string;
  output: string;
  value: string;
}

export function SuccessSwap({ txID, output, value }: SuccessSwapProps) {
  return (
    <>
      <div style={styles.message}>
        <Success />
        Succesfuly!
      </div>
      <div style={styles.block}>
        TX ID
        <h1>{txID}</h1>
      </div>
      <div style={styles.block}>
        <div style={styles.data}>
          Expected Output
          <div style={styles.value}>{parseFloat(output).toFixed(4)} MSTL</div>
        </div>
        <div style={styles.divider} />
        <div style={styles.data}>
          Transaction value
          <div style={styles.value}>{parseFloat(value).toFixed(4)} ETH</div>
        </div>
      </div>
      <a href={`https://etherscan.io/tx/${txID}`}>
        <button>View on EtherScan</button>
      </a>
    </>
  );
}
