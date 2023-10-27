import { createPublicClient, getContract, http } from "viem";
import { mainnet } from "viem/chains";
import TetherABI from "./abi/TetherABI.mjs";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const main = async () => {
  readContract();
  writeContract();
  eventContract();
};

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
    publicClient,
  });
  const totalSupply = await contract.read.totalSupply();
  const name = await contract.read.name();
  const symbol = await contract.read.symbol();
  console.log("totalSupply", totalSupply);
  console.log("name", name);
  console.log("symbol", symbol);
};

const writeContract = async () => {};
const eventContract = async () => {};

main();
