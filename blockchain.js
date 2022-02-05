const crypto = require("crypto");
const sha256 = (message) =>
    crypto.createHash("sha256").update(message).digest("hex");
class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    }
    getHash() {
        return sha256(
            this.prevHash + this.hash + JSON.stringify(this.data) + this.nonce
        );
    }
    mine(difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        }
        console.log(this.hash);
    }
}
class Blockchain {
    constructor() {
        this.chain = [];
        // Create our genesis block
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
        this.blockTime = 3000;
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }
    addNewBlock(block) {
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();

        block.mine(this.difficulty);
        //   making the object immutable by freezing it
        this.chain.push(Object.freeze(block));
        //  bitcoin increase block difficulty formula =>>  old difficulty * (2016 blocks * 10 minutes) / mining time for the previous 2016 blocks
        this.difficulty +=
            Date.now() - parseInt(this.getLastBlock().timestamp) <
            this.blockTime
                ? 1
                : -1;
    }

    isValid() {
        const blockchain = this;
        // Iterate over the chain, we need to set i to 1 because there are nothing before the genesis block, so we start at the second block.
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i - 1];
            //   check validation
            if (
                currentBlock.prevHash !== prevBlock.hash ||
                currentBlock.hash !== currentBlock.getHash()
            )
                return false;
        }
        return true;
    }
}

module.exports = { Block, Blockchain };
