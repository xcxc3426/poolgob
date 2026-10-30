import {quoteTicket,exitSurface} from './core-amm.mjs';
import {holderLens} from './core-holders.mjs';
export const RULES={maxAgeTicks:1,exitShortfall:.05,cohortTop10:.55,lpRemoval:.15,lookback:8};
export function analyzePool(pool,tick=32,ticketSOL=8){
  if(!Number.isInteger(tick)||tick<0||tick>39)throw new Error('tick must be 0..39');
  if(!Number.isFinite(ticketSOL)||ticketSOL<=0||ticketSOL>256)throw new Error('ticket must be in (0,256] SOL');
  const frames=pool.history.filter(f=>f.tick<=tick),snapshot=frames.at(-1);if(!snapshot)throw new Error('No observation before requested tick');
  const stale=tick-snapshot.tick>RULES.maxAgeTicks,holders=holderLens(snapshot.holders),window=frames.slice(-RULES.lookback),previous=frames.at(-2)??snapshot;
  const tagged=window.flatMap(f=>f.events.filter(e=>e.type==='lp-remove').map(e=>({...e,tick:f.tick,snapshotId:f.id}))),removedFraction=1-tagged.reduce((v,e)=>v*(1-e.fraction),1);
  const quote=stale?null:quoteTicket(snapshot,ticketSOL),flags=[];
  if(stale)flags.push({id:'stale-input',level:'review',reason:'Observation is older than the configured freshness budget.',value:tick-snapshot.tick,unit:'ticks',sourceRefs:[snapshot.id]});
  if(removedFraction>=RULES.lpRemoval)flags.push({id:'lp-removal',level:'review',reason:'Tagged liquidity removals exceed the lookback threshold.',value:removedFraction,unit:'fraction',sourceRefs:tagged.map(e=>e.snapshotId)});
  if(holders.top10>RULES.cohortTop10)flags.push({id:'cohort-concentration',level:'observe',reason:'Top ten wallets hold a large share of the modeled eligible cohort.',value:holders.top10,unit:'fraction',sourceRefs:[snapshot.id]});
  if(quote&&quote.allInShortfall>RULES.exitShortfall)flags.push({id:'exit-friction',level:'review',reason:'The modeled exit has an all-in shortfall above the study threshold.',value:quote.allInShortfall,unit:'fraction',sourceRefs:[snapshot.id]});
  return {poolId:pool.id,symbol:pool.symbol,label:pool.label,requestedTick:tick,snapshot,previous,frames,ticketSOL,stale,ageTicks:tick-snapshot.tick,holders,quote,surface:stale?[]:exitSurface(snapshot),taggedRemovals:tagged,removedFraction,flags,status:flags.some(f=>f.level==='review')?'review':flags.length?'observe':'quiet',deltaSOL:snapshot.y-previous.y,price:snapshot.y/snapshot.x};
}
export function analyzeWatchlist(data,tick=32,ticketSOL=8){return data.pools.map(p=>analyzePool(p,tick,ticketSOL));}
export function casePacket(analysis){
  return {schema:'poolgob/case/1',version:'0.1.0',origin:'synthetic-fixture',state:'prepared',poolId:analysis.poolId,symbol:analysis.symbol,requestedTick:analysis.requestedTick,observedTick:analysis.snapshot.tick,ticketSOL:analysis.ticketSOL,model:analysis.snapshot.model,quote:analysis.quote,findings:analysis.flags,holderScope:analysis.holders.scope,sourceIds:analysis.frames.map(f=>f.id),snapshot:analysis.snapshot,operator:{product:'Grok Bot',connection:'user-managed-file-handoff',instructionFile:'GROKBOT-OPERATOR.md'},scope:'local research packet; unsigned; no transaction execution'};
}
