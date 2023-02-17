const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("artedys");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  const domainName = "UVSQ-SAT";
  
  let rawPrice = await domainContract.price(domainName);
  let price = (parseInt(rawPrice, 10) / 10 ** 18).toString();
  
  
  let txn = await domainContract.register(domainName, { value: hre.ethers.utils.parseEther(price) });
  await txn.wait();
  console.log(`Minted domain ${domainName}.artedys`);

  txn = await domainContract.setRecord(domainName, "Am I a UVSQ-SAT or an artedys ??");
  await txn.wait();
  console.log("Set record for UVSQ-SAT.artedys");

  const address = await domainContract.getAddress(domainName);
  console.log(`Owner of domain ${domainName}:`, address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
      await main();
      process.exit(0);
  } catch (error) {
      console.log(error);
      process.exit(1);
  }
};

runMain();
