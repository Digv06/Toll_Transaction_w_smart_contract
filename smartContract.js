// Connect Metamask
let acc;
const connectMetamask = async () => {
  if (window.ethereum !== "undefined") {
    const accs = await ethereum.request({
      method: "eth_requestAccounts",
    });
    acc = accs[0];
    document.getElementById(
      "accountArea"
    ).innerHTML = `Account Address is ${acc}`;
  }
};

//   Connect to smart contract
const connectContract = async () => {
  const ABI = ["PASTE YOUR ABI"];

  const Address = "ENTER_YOUR_DEPLOYED_SMART_CONTRACT_ADDRESS";
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  document.getElementById(
    "contractArea"
  ).innerHTML = `Connection successful and address: ${Address}`;
};

// Read the data from smart contract
const readContract = async () => {
  const data = await window.contract.methods.getAmount().call();
  document.getElementById("dataArea").innerHTML = data;
};

// Read the data from smart contract
const writeContract = async () => {
  const EnteredAmnt = document.getElementById("inputArea").value;
  await window.contract.methods.CheckAmount(EnteredAmnt).send({ from: acc });
};
