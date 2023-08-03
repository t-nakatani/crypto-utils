const { ethers } = require('ethers');
const IUniswapV2PairABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [
            {
                "internalType": "uint112",
                "name": "reserve0",
                "type": "uint112"
            },
            {
                "internalType": "uint112",
                "name": "reserve1",
                "type": "uint112"
            },
            {
                "internalType": "uint32",
                "name": "blockTimestampLast",
                "type": "uint32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

async function getReserves(provider, contractAddress) {
    if (!ethers.utils.isAddress(contractAddress)) {
        throw new Error("Invalid address provided");
    }
    const contract = new ethers.Contract(contractAddress, IUniswapV2PairABI, provider);
    
    const reserves = await contract.getReserves();

    return {
        r0: reserves.reserve0.toString(),
        r1: reserves.reserve1.toString()
    };
}

module.exports = { getReserves };
