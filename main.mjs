import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const main = async () => {};

const getBlockInformation = async () => {
  const balance = await publicClient.getBalance({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });

  const transactionCount = await publicClient.getTransactionCount({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
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
  console.log("unwatchBlockNumber", unwatchBlockNumber);
  console.log("unwatchBlocks", unwatchBlocks);
  console.log("chainId", chainId);
};

main();
