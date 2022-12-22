// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = ['Hello One'];
  await deploy('Greeter', {
    args: args,
    from: deployer,
    log: true,
  });
 

};
module.exports.tags = [ 'greeter'];
