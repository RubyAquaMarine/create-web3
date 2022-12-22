// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
// uniswap factory addresses 

  const args = ['0xc2f4C9B69448D94da2623787bD552F12B6a91278'];// fancy_rasalhague
  await deploy('DexProp', {
    args: args,
    from: deployer,
    log: true,
  });
 

};
module.exports.tags = [ 'dexProp'];
