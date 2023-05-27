import * as styles from "./SwapModal.css";
import React, { useState, useEffect } from "react";
import {
  useAccount,
  useBalance,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractRead
} from "wagmi";
import { address, abi } from "../../utils/config";
import { Modal } from "../Modal/Modal";
import { SuccessSwap } from "./Success";
import { Swap } from "../Icons/Swap";
import { ETH } from "../Icons/ETH";
import { MSTL } from "../Icons/MSTL";
import { Price } from "../Icons/Price";
import { formatEther, parseEther } from "ethers/lib/utils";

const contractConfig = { address, abi };

interface SwapModalProps {
  open: boolean;
  onClose: () => void;
}

export function SwapModal({ open, onClose }: SwapModalProps) {
  const { address } = useAccount();
  const { data: balanceETH } = useBalance({ address: address });
  const { data: balanceMSTL } = useContractRead({
    ...contractConfig,
    functionName: "balance",
    args: [address],
    watch: true
  });
  const { data: price } = useContractRead({
    ...contractConfig,
    functionName: "price",
    watch: true
  });
  const { data: rate } = useContractRead({
    ...contractConfig,
    functionName: "rate",
    watch: true
  });
  const { data: contribution } = useContractRead({
    ...contractConfig,
    functionName: "contribution",
    watch: true
  });

  const [BALANCEETH, setBALANCEETH] = useState<string>();
  const [BALANCEMSTL, setBALANCEMSTL] = useState<string>();
  const [PRICE, setPRICE] = useState<string>();
  const [RATE, setRATE] = useState<string>();
  const [CONTRIBUTION, setCONTRIBUTION] = useState<string>();
  const [ETHPRICE, setETHPRICE] = useState<string>();
  const [OUTPUT, setOUTPUT] = useState<string>();
  const [value, setValue] = useState<string>("0");
  const [referrer, setReferrer] = useState<typeof address>();
  const [multiValue, setMultivalue] = useState();
  const [multiReferrer, setMultiReferrer] = useState<typeof address>();

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

  useEffect(() => {
    if (price) {
      setPRICE(parseFloat(formatEther(price)).toFixed(2));
    }
  }, [price]);

  useEffect(() => {
    if (rate) {
      setRATE(parseFloat(formatEther(rate)).toFixed(3));
    }
  }, [rate]);

  useEffect(() => {
    if (contribution) {
      setCONTRIBUTION(parseFloat(formatEther(contribution)).toFixed(4));
    }
  }, [contribution]);

  useEffect(() => {
    if (price) {
      setETHPRICE(parseFloat(rate / price).toFixed(9));
    }
  }, [price, rate]);

  useEffect(() => {
    if (value == null || value == "" || value < 0.01) {
      setOUTPUT(parseFloat(1e16 / ETHPRICE).toFixed(2));
    } else {
      setOUTPUT(parseFloat(value / ETHPRICE).toFixed(2));
    }
  }, [value, CONTRIBUTION, ETHPRICE]);

  useEffect(() => {
    if (multiValue == null || multiValue == "" || multiValue < 0.01) {
      setValue("0.01");
    } else {
      setValue(parseFloat(multiValue).toFixed(18));
    }
  }, [CONTRIBUTION, multiValue]);

  useEffect(() => {
    if (multiReferrer == null || multiReferrer == "") {
      setReferrer("0x0000000000000000000000000000000000000000");
    } else {
      setReferrer(multiReferrer);
    }
  }, [multiReferrer]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "purchase",
    overrides: {
      from: address,
      value: parseEther(value)
    },
    args: [referrer]
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <Modal modalTitle="Swap" open={open} onClose={onClose}>
      {isSuccess ? (
        <SuccessSwap txID={`${data?.hash}`} output={OUTPUT} value={value} />
      ) : (
        <form
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          onSubmit={(e) => {
            e.preventDefault();
            write?.();
          }}
        >
          <div style={styles.swap}>
            <div style={styles.swapicon}>
              <Swap />
            </div>
            <div style={styles.top}>
              <div style={styles.left}>
                <input
                  style={styles.input}
                  placeholder="0.00"
                  type="number"
                  step="0.0001"
                  value={multiValue}
                  onChange={(e) => setMultivalue(e.target.value)}
                />
                <div style={styles.row}>
                  Balance:
                  <div style={styles.balance}>{BALANCEETH}</div>
                </div>
              </div>
              <div style={styles.right}>
                <div style={styles.label}>
                  <ETH /> ETH
                </div>
              </div>
            </div>
            <div style={styles.bottom}>
              <div style={styles.left}>
                <input style={styles.input} placeholder="0.00" value={OUTPUT} />
                <div style={styles.row}>
                  Balance:
                  <div style={styles.balance}>{BALANCEMSTL}</div>
                </div>
              </div>
              <div style={styles.right}>
                <div style={styles.label}>
                  <MSTL />
                  MSTL
                </div>
              </div>
            </div>
          </div>
          <div style={styles.price}>
            <div style={styles.priceRow}>
              1 MSTL = {ETHPRICE} ETH
              <div style={styles.priceData}>(${PRICE})</div>
            </div>
            <div style={styles.priceRow}>
              <Price />${RATE}
            </div>
          </div>
          <div style={styles.block}>
            Referral Address (Optional)
            <input
              style={styles.value}
              placeholder="|"
              value={multiReferrer}
              onChange={(e) => setMultiReferrer(e.target.value)}
            />
          </div>
          <div style={styles.block}>
            <div style={styles.data}>
              Price Impact
              <div style={styles.value}>1%</div>
            </div>
            <div style={styles.divider} />
            <div style={styles.data}>
              Exchange Fee
              <div style={styles.value}>Free</div>
            </div>
          </div>
          {(isPrepareError || isError) && (
            <div style={styles.erorr}>
              Error: {(prepareError || error)?.message}
            </div>
          )}
          <button disabled={!write || isLoading}>
            {isLoading ? "Pending" : "Swap"}
          </button>
        </form>
      )}
    </Modal>
  );
}