

const { ethers, Contract } = require('ethers');

const rpcURL = 'https://cloudflare-eth.com/';
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

const SEAPORT_ABI = require('./abis/seaportAbi.json');
const SEAPORT_ADDRESS = '0x00000000006c3852cbEf3e08E8dF289169EdE581'; // openSea Seaport v1.1
const ENS_TOKEN_CONTRACT = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85'; 



let seaportContract = new Contract(SEAPORT_ADDRESS, SEAPORT_ABI, provider);



const main = async () => {
  
  console.log(`Monitoring ENS at Seaport v1.1`);
  seaportContract.on('OrderFulfilled', (orderHash, offerer,  zone, recipient, offer, consideration) => {
  let currentTime = new Date;

    try{
      if(offer[0].token == ENS_TOKEN_CONTRACT){
        console.log(`${recipient} has made a new purchase @ ENS (${ENS_TOKEN_CONTRACT}). Item type: ${offer[0].itemType}. `)

        if (consideration[0].token == "0x0000000000000000000000000000000000000000"){
          console.log(currentTime.toUTCString() + " " + `${offerer} has received ${parseInt(consideration[0][3]._hex, 16)} gwei to it's claim balances.\n`);
        } else {
          console.log(currentTime.toUTCString() + " " + `${offerer} has received ${parseInt(consideration[0][3]._hex, 16)} units of the token ${consideration[0].token} to it's claim balances\n`);
        }
      }
    }

    catch(e){
      
      console.log(e);

    }

  })

}

main()
