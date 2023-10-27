import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from "viem";
import { mainnet, sepolia } from "viem/chains";
import TetherABI from "./abi/TetherABI.mjs";
import { privateKeyToAccount } from "viem/accounts";
import TestABI from "./abi/TestABI.mjs";
import VTokenABI from "./abi/VTokenABI.mjs";

const account = privateKeyToAccount(
  "0xb0b6d8fcad7cc5c0cff6b09125de76e30a2c383943777afa89d7ff969a1f8fdb"
); // 비밀키

// contract Read
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// contract Write
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(
    `https://sepolia.infura.io/v3/82013146fcde45569341bd065b6d945d`
  ),
});

const getBlockInformation = async () => {
  const balance = await publicClient.getBalance({
    address: "0xCBb6CFABaf5ce8c97696aAb06C2DC6d96eAcd2ab",
  });

  const transactionCount = await publicClient.getTransactionCount({
    address: "0xCBb6CFABaf5ce8c97696aAb06C2DC6d96eAcd2ab",
  });

  const block = await publicClient.getBlock();

  const blockNumber = await publicClient.getBlockNumber();

  const count = await publicClient.getBlockTransactionCount();

  const unwatchBlockNumber = publicClient.watchBlockNumber({
    onBlockNumber: (blockNumber) => console.log(blockNumber),
  });

  const unwatchBlocks = publicClient.watchBlocks({
    onBlock: (block) => console.log(block),
  });

  const chainId = await publicClient.getChainId();

  console.log("balance", balance);
  console.log("transactionCount", transactionCount);
  console.log("block", block);
  console.log("blockNumber", blockNumber);
  console.log("count", count);
  console.log("unwatchBlockNumber", unwatchBlockNumber());
  console.log("unwatchBlocks", unwatchBlocks());
  console.log("chainId", chainId);
};

const readContract = async () => {
  const contract = getContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: TetherABI,
    publicClient, // read
  });
  const totalSupply = await contract.read.totalSupply();
  const name = await contract.read.name();
  const symbol = await contract.read.symbol();
  const balanceOf = await contract.read.balanceOf([
    "0x750d349A93867Ab6EcD8a9000ae97Bb5022BB2e2",
  ]);
  console.log("totalSupply", totalSupply);
  console.log("name", name);
  console.log("symbol", symbol);
  console.log("balanceOf", balanceOf);
  /**********************************************/
  const balanceOf2 = await publicClient.readContract({
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: TetherABI,
    functionName: "balanceOf",
    args: ["0x750d349A93867Ab6EcD8a9000ae97Bb5022BB2e2"],
  });
  console.log("balanceOf2", balanceOf2);
};

const writeContract = async () => {
  const { request } = await publicClient.simulateContract({
    address: "0x4EA137C740d4B0BFB8426B6836d1Cc60D8A4aBfB",
    abi: TestABI,
    functionName: "store",
    args: [100],
  });

  const hash = await walletClient.writeContract(request);

  console.log(hash);
};

const writeContract2 = async () => {
  const contract = getContract({
    address: "0x4EA137C740d4B0BFB8426B6836d1Cc60D8A4aBfB",
    abi: TestABI,
    walletClient,
  });
  const hash = await contract.write.store([871]);
  console.log(hash);
};

const eventContract = async () => {
  console.log("eventContract");
  const blockNumber = await publicClient.getBlockNumber();
  const logs = await publicClient.getContractEvents({
    address: "0xFd59f3889524DbeEEB07233a9eDe612fFAE78cE9",
    abi: VTokenABI,
    eventName: "Transfer",
    fromBlock: blockNumber - 10000n,
    toBlock: "latest",
  });
  console.log(logs);
  const unwatch = publicClient.watchContractEvent({
    address: "0xFd59f3889524DbeEEB07233a9eDe612fFAE78cE9",
    abi: VTokenABI,
    onLogs: (logs) => console.log(logs),
  });
  unwatch(); // watch 종료 또는 listening 종료
};

const main = async () => {
  // readContract();
  // writeContract2();
  eventContract();
};

main();
