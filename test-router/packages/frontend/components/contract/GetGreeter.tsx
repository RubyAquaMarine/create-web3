import { useEffect, useState, useCallback } from "react";
import { useContract, useProvider } from "wagmi";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

export const GetGreeter = () => {
  const chainId = Number(NETWORK_ID);
  const [currentGreeter, setCurrentGreeter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const provider = useProvider();

  const allContracts = contracts as any;

  console.log("contracts", allContracts);

  const greeterAddress = allContracts[chainId][0].contracts.Greeter.address;
  const greeterABI = allContracts[chainId][0].contracts.Greeter.abi;

  const greeterContract = useContract({
    address: greeterAddress,
    abi: greeterABI,
    signerOrProvider: provider,
  });

  console.log(" contract Found: ", greeterContract);

  const fetchData = useCallback(async () => {
    try {
      console.log(" contract Call get Amounts Out: ");
      const greeter = await greeterContract?.getAmountOutMin(
        0x83b38f79cffb47cf74f7ec8a5f8d7dd69349fbf7,
        0x76A3Ef01506eB19D6B34C4bDcF3cDcdE14F6B11E,
        100000000000000000
      );

      console.log(" contract Call: ", greeter);

      //  setCurrentGreeter(greeter);
      setError("");
    } catch (error) {
      setError("Contract couldn't be fetched.  Please check your network.");
    }
    setLoading(false);
  }, [greeterContract]);

  useEffect(() => {
    if (provider) {
      fetchData();
    }
  }, [provider, greeterContract, fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ margin: "20px" }}>
      <span>current greeting : {currentGreeter}</span>
      <button style={{ marginLeft: "20px" }} onClick={() => fetchData()}>
        refresh
      </button>
    </div>
  );
};
