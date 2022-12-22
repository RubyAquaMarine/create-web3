// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

 
  await deploy('DataFeed', {
   
    from: deployer,
    log: true,
  });
 

};
module.exports.tags = [ 'dexPrice'];
