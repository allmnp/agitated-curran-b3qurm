import * as styles from "./AccountModal.css";
import {
  useAccount,
  useBalance,
  useContractRead,
  useDisconnect,
  useNetwork
} from "wagmi";
import { address, abi } from "../../utils/config";
import { formatEther } from "ethers/lib/utils";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";

const contractConfig = { address, abi };
interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ open, onClose }: AccountModalProps) {
  const { address } = useAccount();
  const { data: balanceETH } = useBalance({ address: address });
  const { data: balanceMSTL } = useContractRead({
    ...contractConfig,
    functionName: "balance",
    args: [address],
    watch: true
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const [BALANCEETH, setBALANCEETH] = useState<string>();
  const [BALANCEMSTL, setBALANCEMSTL] = useState<string>();

  useEffect(() => {
    if (balanceETH) {
      setBALANCEETH(parseFloat(formatEther(balanceETH.value)).toFixed(4));
    }
  }, [balanceETH]);

  useEffect(() => {
    if (balanceMSTL) {
      setBALANCEMSTL(parseFloat(formatEther(balanceMSTL)).toFixed(4));
    }
  }, [balanceMSTL]);

  return (
    <Modal modalTitle="Profile" open={open} onClose={onClose}>
      <>
        <div style={styles.dataBlock}>
          <div style={styles.dataColumn}>
            Chain
            <div style={styles.data}>{chain.name}</div>
          </div>
        </div>
        <div style={styles.dataBlock}>
          <div style={styles.dataColumn}>
            Address
            <div style={styles.data}>{address}</div>
          </div>
        </div>
        <div style={styles.dataBlock}>
          <div style={styles.dataRow}>
            Balance
            <div style={styles.data}>{BALANCEETH} ETH</div>
          </div>
          <div style={styles.divider} />
          <div style={styles.dataRow}>
            Claimable Amount
            <div style={styles.data}>{BALANCEMSTL} MSTL</div>
          </div>
        </div>
        <button style={styles.disconnect} onClick={() => disconnect()}>
          Disconnect
        </button>
      </>
    </Modal>
  );
}