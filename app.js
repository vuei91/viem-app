const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.listen(3000, () => {
  console.log("Connected 3000port");
});

/**
 * 1. 새로운 폴더 만들기 (viem-app) -> 폴더로 접근
 * 2. npm init -y
 * 3. npm i express
 * 4. npm i -D nodemon
 * 5. app.js 파일 만들기
 * 6. package.json -> "scripts" : {"start":"nodemon app.js"}
 * 7. app.js
 * 8. npm start (npm run start)
 * 9. http://localhost:3000 접근 시 HELLO WORLD가 출력되면 됨
 */

// web3js -> javascript 코드 -> react -> wagmi / ethers.js
// server web3js -> ethers -> viem
