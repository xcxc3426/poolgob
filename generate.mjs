import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {generateDataset} from './core-fixture.mjs';
import {analyzePool,casePacket} from './core-analysis.mjs';
import {makeReceipt} from './core-receipt.mjs';
const root=fileURLToPath(new URL('./',import.meta.url)),data=generateDataset(),analysis=analyzePool(data.pools[0],data.defaultTick,data.defaultTicketSOL),packet=casePacket(analysis);
const put=async(name,value)=>writeFile(root+name,JSON.stringify(value,null,2)+'\n');
await put('watchlist.json',data);await put('plink-case.json',packet);await put('plink-receipt.json',await makeReceipt(packet));await put('plink-surface.json',analysis.surface);
console.log('Generated eight fictional pool histories, a case packet, a receipt and an exit surface.');
