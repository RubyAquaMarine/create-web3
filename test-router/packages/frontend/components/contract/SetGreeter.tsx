import { useEffect, useState, FormEvent } from "react";
import { useContract, useSigner } from "wagmi";

import contracts from "@/contracts/hardhat_contracts.json";
import { NETWORK_ID } from "@/config";

export const SetGreeter = () => {
  const chainId = Number(NETWORK_ID);
  const [newGreeter, setNewGreeter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { data: signerData } = useSigner();

  const allContracts = contracts as any;
  const greeterAddress = allContracts[chainId][0].contracts.Greeter.address;
  const greeterABI = allContracts[chainId][0].contracts.Greeter.abi;

  const greeterContract = useContract({
    address: greeterAddress,
    abi: greeterABI,
    signerOrProvider: signerData,
  });

  console.log(" contract Found: ", greeterContract);

  useEffect(() => {
    if (signerData) {
      setError("");
      setLoading(false);
    } else {
      setLoading(false);
      setError("please connect your wallet");
    }
  }, [signerData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

    
      //   const tx = await greeterContract?.setGreeting(newGreeter);
      const tx = await greeterContract
        ?.swap(
          0x83b38f79cffb47cf74f7ec8a5f8d7dd69349fbf7,
          0x76A3Ef01506eB19D6B34C4bDcF3cDcdE14F6B11E,
          100000000000000000,
          1,
          0xfd6d3ab833f312b3ce7344d234832574ad94b8e8
        )
        .then((ok) => {
          console.log("SWAP PASSED",ok);
        }).catch(err=>{
          console.log("SWAP ERROR:",err);
        })

      await tx.wait();

      console.log("swap", tx);
      setNewGreeter("");
      setLoading(false);
    } catch (error) {
      setError("txn failed, check contract");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ margin: "20px" }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          value={newGreeter}
          placeholder="new greeter"
          onChange={(e) => setNewGreeter(e.target.value)}
        />
        <button style={{ marginLeft: "20px" }} type="submit">
          submit
        </button>
      </form>
    </div>
  );
};
