export function caseBytes(packet){return JSON.stringify(packet);}
export async function caseDigest(packet){
  if(!globalThis.crypto?.subtle)return null;
  const bytes=new TextEncoder().encode(caseBytes(packet)),digest=await globalThis.crypto.subtle.digest('SHA-256',bytes);
  return Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
}
export async function makeReceipt(packet){return {schema:'poolgob/receipt/1',algorithm:'SHA-256',encoding:'UTF-8 JSON.stringify(packet), no trailing newline',digest:await caseDigest(packet),packet,attestation:'local content digest; unsigned; not a chain anchor'};}
