/** Cohort shares, not total token-supply shares or inferred human identities. */
export function holderLens(accounts){
  if(!Array.isArray(accounts)||!accounts.length)throw new Error('Missing holder cohort');
  const ids=new Set();
  for(const a of accounts){if(!a||typeof a.alias!=='string'||ids.has(a.alias)||!['wallet','pool-vault','custody','unknown'].includes(a.kind)||!Number.isFinite(a.amount)||a.amount<0)throw new Error('Invalid holder row');ids.add(a.alias);}
  const excluded=accounts.filter(a=>a.kind!=='wallet'),eligible=accounts.filter(a=>a.kind==='wallet'),total=eligible.reduce((s,a)=>s+a.amount,0);
  if(total<=0)throw new Error('Empty eligible holder balance');
  const ranked=eligible.map(a=>({...a,share:a.amount/total})).sort((a,b)=>b.share-a.share);
  return {scope:'modeled eligible wallet cohort',ranked,excluded,total,count:ranked.length,top1:ranked[0].share,top10:ranked.slice(0,10).reduce((s,a)=>s+a.share,0),hhi:ranked.reduce((s,a)=>s+a.share*a.share,0)};
}
