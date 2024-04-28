/** Note: () => is the same as function ().  It's simply declaring a function in javascript */
// import ethers.js
const { expect } = require ('chai');
const { ethers } = require('hardhat'); 

const tokens = (supply) => {
    return ethers.utils.parseUnits(supply.toString(), 'ether');
}

describe("Token", () => {
    // Tests go inside here...
    let token, accounts, deployer, receiver;

    beforeEach( async () => {
        const Token = await ethers.getContractFactory('Token');
        token = await Token.deploy('Dapp University', 'DAPP', '1000000');
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        receiver = accounts[1];
    })

    describe("Deployment", () => {
        const name = 'Dapp University';
        const symbol = 'DAPP';
        const decimals = 18;
        const totalSupply = '1000000';


        it("Checking contract name", async () => {
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

        it("Checking balanceOf contract owner", async () => {
            // let bal = await token.balanceOf(deployer.address);
            // console.log(ethers.utils.formatUnits(bal.toString(), 'ether'));
            expect(await token.balanceOf(deployer.address)).to.equal(tokens(totalSupply));
        })



    })

    describe("Transfer tokens", () => {
        let amountToTransfer = tokens(100), transaction, result;

        describe('Success', () => {
            beforeEach( async () => {
                transaction = await token.connect(deployer).transfer(receiver.address, amountToTransfer);
                result = await transaction.wait();
            });
    
            it("Checking token transfers", async () => {
                let dBalancePreTransfer = await token.balanceOf(deployer.address);
                let rBalancePreTransfer = await token.balanceOf(receiver.address); 
                //console.log('Deployer and Receiver balances before transfer: ', dBalancePreTransfer, rBalancePreTransfer);
    
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999900));
                expect(await token.balanceOf(receiver.address)).to.equal(amountToTransfer);
                // expect(result).to.equal(true);
    
                // let dBalancePostTransfer = await token.balanceOf(deployer.address);
                // let rBalancePostTransfer = await token.balanceOf(receiver.address); 
                // or you could initiate a transfer this way:
                // await token.transfer(receiver.address, 1);
                // console.log('Deployer and Receiver balances after transfer: ', dBalancePostTransfer, rBalancePostTransfer);
                
                // expect(result.success).to.equal(true);
                // expect(await token.balanceOf(deployer.address)).to.equal();
                // expect(await token.balanceOf(receiver.address)).to.equal(amountToTransfer);
            });
    
            it("Checking for transfer event", async () => {
                const eventLog = await result.events[0];
                expect(eventLog.event).to.equal('Transfer');
                // console.log(eventLog);
                const eventArgs = eventLog.args;
                expect(eventArgs._from).to.equal(deployer.address);
                expect(eventArgs._to).to.equal(receiver.address);
                expect(eventArgs._value).to.equal(amountToTransfer);
            });
        });

        describe('Failure', () => {
            it("Checking insufficient balance rejection", async () => {
                const invalidAmount = tokens(100000000);
                await expect(token.connect(deployer).transfer(receiver.address, invalidAmount)).to.be.reverted;
            });

            it("Checking invalid recipient rejection", async () => {
                const invalidAddress = '0x0000000000000000000000000000000000000000';
                await expect(token.connect(deployer).transfer(invalidAddress, amountToTransfer)).to.be.reverted;
            });
        });

    })

})
