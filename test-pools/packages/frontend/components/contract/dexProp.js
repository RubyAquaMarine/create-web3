import { useEffect, useState, useCallback } from 'react';
import { useContract, useProvider } from 'wagmi';
import { ethers } from 'ethers';

import contracts from '../../contracts/hardhat_contracts.json';
import { NETWORK_ID } from '../../config';

let MAX_POOLS;
let POOLS = [];

export const DexProp = () => {
  const chainId = Number(NETWORK_ID);
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const provider = useProvider();

  const allContracts = contracts;
  const greeterAddress = allContracts[chainId][0].contracts.DexProp.address;
  const greeterABI = allContracts[chainId][0].contracts.DexProp.abi;

  const greeterContract = useContract({
    address: greeterAddress,
    abi: greeterABI,
    signerOrProvider: provider,
  });

  console.log("aqua: address: ", greeterContract.address)

  const fetchData = useCallback(async () => {
    try {
      const greeter = await greeterContract.getPoolLength();
      const length = Number(greeter.toString())
      MAX_POOLS = length;
      console.log(" first: ", length)
      setCurrentGreeter(length);
      setError('');
    } catch (error) {
      setError("Contract couldn't be fetched.  Please check your network.", error);
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
    <div style={{ margin: '20px' }}>
      <span>DEX Pools : {currentGreeter}</span>
      <button style={{ marginLeft: '20px' }} onClick={() => fetchData()}>
        refresh
      </button>
    </div>
  );
};

export const DexPools = () => {
  const chainId = Number(NETWORK_ID);
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const provider = useProvider();

  const allContracts = contracts;
  const greeterAddress = allContracts[chainId][0].contracts.DexProp.address;
  const greeterABI = allContracts[chainId][0].contracts.DexProp.abi;

  const greeterContract = useContract({
    address: greeterAddress,
    abi: greeterABI,
    signerOrProvider: provider,
  });

  console.log("aqua: address: ", greeterContract.address)

  const fetchData = useCallback(async () => {
    setLoading(true);
    //loop , save , return 
    let data = [];
    if (typeof MAX_POOLS !== 'undefined') {
      for (let i = 0; i < MAX_POOLS; i++) {

        console.log(" index: ", i);
        let id = await greeterContract.getPool(i).then(res => {
          return res;
        }).catch(err => {
          return '';
        })

        console.log(" second: ", id);
        data.push(id);
      }
    }

    POOLS = data;
    setCurrentGreeter("Done");
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
    <div style={{ margin: '20px' }}>
      <span>DEX Pools:  </span>
      <button style={{ marginLeft: '20px' }} onClick={() => fetchData() }>
        refresh
      </button>
    </div>
  );
};

export const Pools = () => {
  
  function renderNames() {

    if (typeof POOLS !== 'undefined') {
      let names = POOLS;
      let test = Object.keys(names);
      let values = Object.values(names);
      return values
    }

    return ['-----', '--pools--'];
  };


  return (
    <div style={{ margin: '20px' }}>
      
      {renderNames().map(data => (
        <p>{data}</p>
      ))}

    </div>
  );
};

/*

  //loop , save , return 
      let data=[];
      for(let i = 0; i> length; i++){

        console.log(" index: ",i);
        let id =  await greeterContract.getPool(i);

        console.log(" second: ",id);
        data[i] = id;
      }

*/
