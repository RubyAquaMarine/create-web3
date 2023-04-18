import { useEffect, useState, useCallback } from 'react';
import { useContract, useProvider } from 'wagmi';
import { ethers } from 'ethers';

import contracts from '../../contracts/hardhat_contracts.json';
import { NETWORK_ID } from '../../config';

export const DataFeed = () => {
  const chainId = Number(NETWORK_ID);
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const provider = useProvider();

  const allContracts = contracts;
  const greeterAddress = allContracts[chainId][0].contracts.DataFeed.address;
  const greeterABI = allContracts[chainId][0].contracts.DataFeed.abi;

  const greeterContract = useContract({
    address: greeterAddress,
    abi: greeterABI,
    signerOrProvider: provider,
  });

  const fetchData = useCallback(async () => {
    try {
      const greeter = await greeterContract.getResultFromID(1);
      const value = Number(greeter[0].toString());
      const power = Number(greeter[1].toString());
      const price = value * Math.pow(10, -power);

      console.log("Price:", typeof price, price, price.toString())

      setCurrentGreeter(price);
      setError('');
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
    <div style={{ margin: '20px' }}>
      <span>getResultFromID : {currentGreeter}</span>
      <button style={{ marginLeft: '20px' }} onClick={() => fetchData()}>
        refresh
      </button>
    </div>
  );
};

export const DataFeedV2 = () => {
  const chainId = Number(NETWORK_ID);
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const provider = useProvider();

  const allContracts = contracts;
  const greeterAddress = allContracts[chainId][0].contracts.DataFeed.address;
  const greeterABI = allContracts[chainId][0].contracts.DataFeed.abi;

  const greeterContract = useContract({
    address: greeterAddress,
    abi: greeterABI,
    signerOrProvider: provider,
  });

  const fetchData = useCallback(async () => {

    try {
      // aqua
      const eth = 'ETHUSD';//ethCollectionMedian not active
      let bytes = ethers.utils.toUtf8Bytes(eth);

      const priceCollectionName = ethers.utils.keccak256(bytes);

      console.log("keccak256:", priceCollectionName);

      const greeter = await greeterContract.getResult(priceCollectionName);

      console.log("Price: ", eth, typeof greeter, greeter, greeter.toString());

      const value = Number(greeter[0].toString());
      const power = Number(greeter[1].toString());
      const price = value * Math.pow(10, -power);

      setCurrentGreeter(price);
      setError('');
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
    <div style={{ margin: '20px' }}>
      <span>getResult : {currentGreeter}</span>
      <button style={{ marginLeft: '20px' }} onClick={() => fetchData()}>
        refresh
      </button>
    </div>
  );
};

export const DataFeedV3 = () => {
  const chainId = Number(NETWORK_ID);
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const provider = useProvider();

  const allContracts = contracts;
  const greeterAddress = allContracts[chainId][0].contracts.DataFeed.address;
  const greeterABI = allContracts[chainId][0].contracts.DataFeed.abi;

  const greeterContract = useContract({
    address: greeterAddress,
    abi: greeterABI,
    signerOrProvider: provider,
  });

  const fetchData = useCallback(async () => {

    try {
      // aqua
      const greeter = await greeterContract.getActiveCollections();

      console.log("ActiveCollections: ", typeof greeter, greeter, greeter.toString());

     

      setCurrentGreeter(greeter.toString());
      setError('');
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
    <div style={{ margin: '20px' }}>
      <span>Total DataFeeds : {currentGreeter}</span>
      <button style={{ marginLeft: '20px' }} onClick={() => fetchData()}>
        refresh
      </button>
    </div>
  );
};

//getActiveCollections
