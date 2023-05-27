
import type { NextPage } from 'next';
import { Profile } from "./components/Profile/Profile";
import { Phase } from "./components/Phase/Phase";
import { Logo } from "./components/Icons/Logo";
import { isMobile } from "./utils/isMobile";
import { useAccount, useContractRead } from "wagmi";
import { address, abi } from "./utils/config";
import { ConnectButtonn } from "./components/Buttons/ConnectButton";
import { BG } from "./components/Icons/BG";

const contractConfig = { address, abi };

const Home: NextPage = () => {
  
  const { address } = useAccount();
  const { data: balanceData } = useContractRead({
    ...contractConfig,
    functionName: "balance",
    args: [address],
    watch: true
  });

  const { data: depositData } = useContractRead({
    ...contractConfig,
    functionName: "deposit",
    args: [address],
    watch: true
  });

  const { data: purchasedData } = useContractRead({
    ...contractConfig,
    functionName: "purchased",
    args: [address],
    watch: true
  });

  const { data: earnedData } = useContractRead({
    ...contractConfig,
    functionName: "earned",
    args: [address],
    watch: true
  });

  const { data: totalRaisedData } = useContractRead({
    ...contractConfig,
    functionName: "totalRaised",
    watch: true
  });

  const { data: totalSoldData } = useContractRead({
    ...contractConfig,
    functionName: "totalSold",
    watch: true
  });

  const { data: rateData } = useContractRead({
    ...contractConfig,
    functionName: "rate",
    watch: true
  });

  const { data: phaseData } = useContractRead({
    ...contractConfig,
    functionName: "phase",
    watch: true
  });

  const { data: capData } = useContractRead({
    ...contractConfig,
    functionName: "cap",
    watch: true
  });

  const { data: currentRaisedData } = useContractRead({
    ...contractConfig,
    functionName: "currentRaised",
    watch: true
  });

  const { data: currentSoldData } = useContractRead({
    ...contractConfig,
    functionName: "currentSold",
    watch: true
  });

  const { data: currentRemainData } = useContractRead({
    ...contractConfig,
    functionName: "currentRemain",
    watch: true
  });

  const mobile = isMobile();
  
  return (
    <div
      style={{
        width: "1",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        margin: "0px",
        padding: "0px",
        gap: "0px"
      }}
    >
      <div
        style={{
          width: "1",
          height: "fit-content",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: mobile ? "10px" : "20px",
          paddingBottom: mobile ? "10px" : "20px",
          paddingLeft: mobile ? "20px" : "60px",
          paddingRight: mobile ? "20px" : "60px"
        }}
      >
        <Logo />
        <ConnectButtonn />
      </div>

      <div
        style={{
          width: "1",
          height: "fit-content",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "center",
          padding: mobile ? "10px" : "40px",
          gap: "30px"
        }}
      >
        <div
          style={{
            width: mobile ? "100%" : "",
            position: "absolute",
            overflow: "hidden"
          }}
        >
          <BG />
        </div>
        <div
          style={{
            width: mobile ? "100%" : "580px",
            height: "fit-content",
            display: "flex",
            flexDirection: "column",
            gap: "30px"
          }}
        >
           <Profile
            balance={balanceData}
            deposit={depositData}
            purchased={purchasedData}
            earned={earnedData}
            rate={rateData}
          />
          <Phase
            totalRaised={totalRaisedData}
            totalSold={totalSoldData}
            rate={rateData}
            phase={phaseData}
            cap={capData}
            currentRaised={currentRaisedData}
            currentSold={currentSoldData}
            currentRemain={currentRemainData}
          />
         </div>
      </div>
    </div>
  );
};

export default Home;
