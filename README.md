# 정리

서버에서 활용하는 web3 기술

### 설정 (Setup) & 연결 (Connect)

```js
const account = privateKeyToAccount(
  "0xb0b6d8fcad7cc5c0cff6b09125de76e30a2c383943777afa89d7ff969a1f8fdb"
); // 비밀키

// Read 연관
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Write 연관
const walletClient = createWalletClient({
  account,
  chain: sepolia,
  transport: http(
    `https://sepolia.infura.io/v3/82013146fcde45569341bd065b6d945d`
  ),
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
```

#### 쓰기 (Write)

```js
const { request } = await publicClient.simulateContract({
  address: "0x4EA137C740d4B0BFB8426B6836d1Cc60D8A4aBfB",
  abi: TestABI,
  functionName: "store",
  args: [100],
  account, // contract마다 account 다르게 적용 할 경우 여기에 표시
});

const hash = await walletClient.writeContract(request);

console.log(hash);

/*****************************************************/

const contract = getContract({
  address: "0x4EA137C740d4B0BFB8426B6836d1Cc60D8A4aBfB",
  abi: TestABI,
  walletClient,
});
const hash = await contract.write.store([871]);
console.log(hash);
```

#### 로그 (Event)
