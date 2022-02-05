const { Block, Blockchain } = require("./blockchain.js");
const AnmolChain = new Blockchain();
AnmolChain.addNewBlock(
    new Block(Date.now().toString(), [
        { from: "John", to: "Bob", amount: 100 },
        { from: "John", to: "Bob", amount: 100 },
    ])
);

AnmolChain.addNewBlock(
    new Block(Date.now().toString(), {
        from: "anmol",
        to: "kru",
        amount: 200,
    })
);
AnmolChain.addNewBlock(
    new Block(Date.now().toString(), {
        from: "amol",
        to: "karu",
        amount: 200,
    })
);
AnmolChain.addNewBlock(
    new Block(Date.now().toString(), {
        from: "anol",
        to: "karu",
        amount: 200,
    })
);
AnmolChain.addNewBlock(
    new Block(Date.now().toString(), {
        from: "anol",
        to: "karu",
        amount: 200,
    })
);
console.log(AnmolChain.chain);
