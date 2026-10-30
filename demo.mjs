import {readFile} from 'node:fs/promises';
import {analyzeWatchlist,casePacket} from './core-analysis.mjs';
const data=JSON.parse(await readFile(new URL('./watchlist.json',import.meta.url),'utf8'));
const analyses=analyzeWatchlist(data,data.defaultTick,data.defaultTicketSOL);
if(process.argv.includes('--json'))console.log(JSON.stringify(casePacket(analyses[0]),null,2));
else console.table(analyses.map(a=>({pool:a.label,observed:a.snapshot.time,SOL:a.snapshot.y.toFixed(2),ticket:a.ticketSOL,exitSOL:a.quote?.outputSOL.toFixed(4)??'stale',shortfall:a.quote?(a.quote.allInShortfall*100).toFixed(2)+'%':'withheld',status:a.status})));
