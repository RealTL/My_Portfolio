/** Note: () => is the same as function ().  It's simply declaring a function in javascript */
// import ethers.js
const { expect } = require ('chai');
const { ethers } = require('hardhat'); 

const tokens = (supply) => {
    return ethers.utils.parseUnits(supply.toString(), 'ether');
}

describe("Token", ()=> {
    // Tests go inside here...
    let token;

    beforeEach( async () => {
        const Token = await ethers.getContractFactory('Token');
        token = await Token.deploy('Dapp University', 'DAPP', '1000000');
    })

    describe("Deployment", () => {
        const name = 'Dapp University';
        const symbol = 'DAPP';
        const decimals = 18;
        const totalSupply = '1000000';


        it("Confirm the contract name is correct", async () => {
            // Import the deployed instance of the contract to test and assign it
            // into the Token variable so that javascript can use it
            // const Token = await ethers.getContractFactory('Token');
            // Fetch the token from the Token contract instance
            // let token = await Token.deploy();
            // = await ethers.getContractAt("Token", "0x5fbdb2315678afecb367f032d93f642f64180aa3");
            // Read token name
            // const name = await token.name();
            // Check that the name is retrieved and is correct
            expect(await token.name()).to.equal(name);
    
        })
    
        it("Checking symbol", async () => {
            expect(await token.symbol()).to.equal(symbol);
        })
    
        it("Checking decimals", async () => {
            expect(await token.decimals()).to.equal(decimals);
        })
    
        it("Checking totalSupply", async () => {
            expect(await token.totalSupply()).to.equal(tokens(totalSupply));
        })
    })



})