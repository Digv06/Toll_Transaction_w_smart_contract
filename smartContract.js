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
  // const ABI = [
  //   {
  //     inputs: [
  //       {
  //         internalType: "uint256",
  //         name: "amount",
  //         type: "uint256",
  //       },
  //     ],
  //     name: "changeFlower",
  //     outputs: [],
  //     stateMutability: "nonpayable",
  //     type: "function",
  //   },
  //   {
  //     inputs: [],
  //     name: "getFlower",
  //     outputs: [
  //       {
  //         internalType: "uint256",
  //         name: "",
  //         type: "uint256",
  //       },
  //     ],
  //     stateMutability: "view",
  //     type: "function",
  //   },
  // ];

  const ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "CheckAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAmount",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // const Address = "0xd6a50F5E924a39e1F2b63C921Dbbc7836d68c9eA";
  const Address = "0x4D1493A448CCF4f75Db7C9db4EC30905c3Ed05f7";
  window.web3 = await new Web3(window.ethereum);
  window.contract = await new window.web3.eth.Contract(ABI, Address);
  document.getElementById(
    "contractArea"
  ).innerHTML = `Successfully connected to smart contract address : ${Address}`;
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
