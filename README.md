# 정리

서버에서 활용하는 web3 기술

### 설정 (Setup) & 연결 (Connect)

```js
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
```

### 블록체인 정보 (Block Information)

```js
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
```

### 스마트 컨트랙트 (Smart Contract)

#### 읽기 (Read)

```js
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
```

#### 쓰기 (Write)

#### 로그 (Event)
