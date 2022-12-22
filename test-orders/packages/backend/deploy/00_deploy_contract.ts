import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const main: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Fees', {
    from: deployer,
    log: true,
  });

  
  const args = [];
  
  await deploy('LibAccess', {
   args: args,
    from: deployer,
    log: true,
  });

  await deploy('LibConfig', {
    args: args,
     from: deployer,
     log: true,
   });

   await deploy('LibStorage', {
    args: args,
     from: deployer,
     log: true,
   });

    await deploy('BaseAccess', {
    args: args,
     from: deployer,
     log: true,
   });

    await deploy('BaseConfig', {
    args: args,
     from: deployer,
     log: true,
   });

    let libraries = {};
  let all = await deployments.all();
  Object.keys(all).forEach((k) => {
    let dep = all[k];
    libraries[k] = dep.address;
  });

  console.log("what is this ", libraries);

  let impl = await deploy("Settlement", {
    from: deployer,
    libraries,
    log: true,
  });

  console.log(
    " Deployed at:",
    impl.address,
    impl.receipt.contractAddress,
    impl.transactionHash
  );

  // then iDexRouter, 

    libraries = {};
    all = await deployments.all();
   Object.keys(all).forEach((k) => {
     let dep = all[k];
     libraries[k] = dep.address;
   });
 
   console.log("what is this ", libraries);
 
    impl = await deploy("ZrxRouter", {
     from: deployer,
     libraries,
     log: true,
   });

   console.log(
    " Deployed at:",
    impl.address,
    impl.receipt.contractAddress,
    impl.transactionHash
  );

};

export default main;

export const tags = ["all"];
