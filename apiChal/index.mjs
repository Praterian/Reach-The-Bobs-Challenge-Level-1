 'reach 0.1'
import{loadStdlib} from "@reach-sh/stdlib";
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

console.log("Creating a some balance");
const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
console.log('Welcome Alice and Bob(s).');

console.log('Starting...');
const ctcAlice = accAlice.contract(backend);

console.log('Backends starting...');


const users = [];

const startBobs = async()=>{
    const newBob = async(who)=>{
   const acc = await stdlib.newTestAccount(startingBalance);
   const ctc = acc.contract(backend, ctcAlice.getInfo());
   users.push(acc.getAddress());
};

await newBob('Bob1');
await newBob('Bob2');
await newBob('Bob3');


console.log(users);
};

await ctcAlice.p.Alice({
ready: ()=>{
    console.log('Alice is ready!');
    startBobs();
}
});

console.log('See you soon Alice and Bob(s)!');
