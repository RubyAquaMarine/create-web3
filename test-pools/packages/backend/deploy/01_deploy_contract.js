// deploy/00_deploy_contract

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = ['Hello Two'];
  await deploy('Greeter2', {
    args: args,
    from: deployer,
    log: true,
  });
 

};
module.exports.tags = [ 'greeter2'];
