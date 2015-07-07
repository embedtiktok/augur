/** 
 * constants for augur.js unit tests
 */

"use strict";

var MODULAR = typeof module !== "undefined";

var constants = {};

constants.max_test_accounts = 4;
constants.timeout = 240000;

/********************
 * Ethereum testnet *
 ********************/

constants.accounts = {
    loopy: "0xaff9cb4dcb19d13b84761c040c91d21dc6c991ec",
    loopy2: "0x02e8994f51cc6d9d9e8d3cdccf7488759994b706",
    loopy_old: "0x00e3f8de3ed9d428dc235ce0c25bc1136073be8b",
    jack_new: "0xa18e10a46a36d59cb2ef1fe8ec18a0a5c78a7fbf",
    jack: "0x63524e3fe4791aefce1e932bbfb3fdf375bfad89",
    jack2: "0x0da70d5a92d6cfcd4c12e2a83950676fdf4c95f9",
    tinybike: "0xac601fc0bd8928374f1648afad8e64e5a954f66b",
    tinybike2: "0x6258d68ce4fd64e7a3a68bbf6e78314dec801b4d",
    jack_eth: "0x32a34974787b46a62dbecc491c8a030185eaeb9d",
    heavy: "0x816e547d69e20e918340e7ff766c9ea841fe577a",
    lifespan: "0x74dcba4a17d257486785f1811604c8fba5373eb4",
    lifespan_eth: "0x8c9c88015d33c5b40d26ba87f1425dcc6cc98ff2",
    simulator2: "0x78829d3d1fd441aee8eff7a1263c11ed2f3adba7",
    toast: "0xb76a02724d44c89c20e41882f729a092f14d3eaf",
    joeykrug: "0x1c11aa45c792e202e9ffdc2f12f99d0d209bef70",
    chris: "0xa369ca3e80c8e8e5fdc3e2fc7ee7764c519de70f",
    chris_old: "0x9b7e6cd69f45d93336606b0f70dac77b5b6e9fb0",
    scottzer0: "0x6fc0a64e2dce367e35417bfd1568fa35af9f3e4b",
    niran: "0xff5938864b2a6414aaa7ab6783c2ea0fb5e3b39f",
    bassguitarman: "0xa381f37f23cb99ca036997008403ba1366fd8259"
};
constants.enodes = {
    ChrisCalderon: "enode://2c3bf2515ab634f66cea590f1ee8c7d9a5750681b6cb60cd8d24aa28719ac7d8c7f05f68680726331ae7dd55719382ce89ad203ba0f3841693a9d20129053f04@76.14.85.30:30303",
    joeykrug: "enode://cc3130681a43a4e8b1237ddc70f71e7f7344719a2c2d8d786501ff272ed100c0390fa8db1c14dca3bea5fcf964bb8bcc5ff47d7c6873b826aa7677efb9efed50@76.14.85.30:30303",
    niran: "enode://6edaa293d1b91bdc818bac348b5dee2b245481d9eb7a465df0d113683579d5a5f0f2a905b83daebcaa641d8024ddf1ca139cb316627cbf7857e35f7e13874ce3@[::]:30303",
    scottzer0: "enode://b8092b9c390c40463f152bfb5e16837b435255db0780594bc473811e31c05ea0994c4cb435f2ce93eef59786477d445a558b2d8519e6afb614918ae0924ff727@24.4.140.216:30303",
    tinybike: "enode://2bd88c5e9d27eb06b299c6895b2417ef926707860862040569fb8833fe10ff6c719c84d5c26d63b8f988c0798f74d3803cdbe37480f5854390e26ebcdb9293a0@[::]:30303"
};
constants.examples = {
    ten: "0x3caf506cf3d5bb16ba2c8f89a6591c5160d69cf3",
    mul2: "0x5204f18c652d1c31c6a5968cb65e011915285a50",
    multiplier: "0x8a7529b95f769cd0197cd7022cab5f4ef0874b31",
    arraydouble: "0x86c62f40cd49b3a42fad6104f38b3f68aa9871f8"
};

/******************
 * Private chains *
 ******************/

constants.chain1010101 = {
    accounts: {
        loopy: "0xd65cfee2ee985c0ac5d314aa4991ca2ebf482186",
        tinybike: "0x4a0cf714e2c1b785ff2d650320acf63be9eb25c6",
        demo: "0x5baaabf5213c7189d2f97c8580cb933494454b3b",
        miner: "0x59d1ef766feea4420d03f8d702b1123ca50f0b70"
    },
    enodes: {
        demo: "enode://035b7845dfa0c0980112abdfdf4dc11087f56b77e10d2831f186ca12bc00f5b9327c427d03d9cd8106db01488905fb2200b5706f9e41c5d75885057691d9997c@[::]:30303",
        tinybike: "enode://4014c7fa323dafbb1ada241b74ce16099efde03f994728a55b9ff09a9a80664920045993978de85cb7f6c2ac7e9218694554433f586c1290a8b8faa186ce072c@[::]:30303",
        joeykrug: "enode://12bcaeb91de58d9c48a0383cc77f7c01decf30c7da6967408f31dc793e08b14e2b470536ebe501a4f527e98e84c7f5431755eae5e0f4ba2556539ab9faa77318@[::]:30303",
        miner: "enode://587aa127c580e61a26a74ab101bb15d03e121a720401f77647d41045eae88709b01136e30aba56d1feddff757d4a333f68b9a749acd6852f20ba16ef6e19855a@[::]:30303",
        chris_desktop: "enode://f5fc10dafe8c44702748c7ead4f30d7b3fe35450d2e66158231a9bf9b1838f93d06b25908b8447c85b2429bdaeff45709f17e67083791053e0bac6e282c969fe@[::]:30303"
    }
};
constants.chain10101 = {
    accounts: {
        loopy: "0xdde34adac615ca68a11a1f9a5015b75c2a92521a",
        tinybike: "0x639b41c4d3d399894f2a57894278e1653e7cd24c",
        tinybike_new: "0x05ae1d0ca6206c6168b42efcd1fbe0ed144e821b"
    }
};

if (MODULAR) module.exports = constants;
