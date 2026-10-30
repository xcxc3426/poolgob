import {readFile} from 'node:fs/promises';
import {caseDigest} from './core-receipt.mjs';
const name=process.argv[2]??new URL('./plink-receipt.json',import.meta.url),raw=await readFile(name,'utf8');if(raw.length>5000000)throw new Error('Receipt exceeds 5 MB');
const receipt=JSON.parse(raw);if(receipt.schema!=='poolgob/receipt/1'||receipt.algorithm!=='SHA-256'||!receipt.digest)throw new Error('Unsupported or missing digest');if(await caseDigest(receipt.packet)!==receipt.digest)throw new Error('Case digest mismatch');console.log('Case bytes match the local receipt. This check is not author authentication.');
