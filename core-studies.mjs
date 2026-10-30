import {analyzePool} from './core-analysis.mjs';
import {quoteTicket,scaleLiquidity} from './core-amm.mjs';
import {holderLens} from './core-holders.mjs';
export function runStudy(data,config){
  const pool=data.pools.find(p=>p.id===config.poolId);if(!pool)throw new Error('Unknown study pool');
  if(config.study==='depth'){
    const a=analyzePool(pool,config.tick,config.ticketSOL);if(a.stale)throw new Error('Depth study requires a fresh observation');
    return {study:'depth',origin:data.origin,poolId:pool.id,tick:config.tick,ticketSOL:config.ticketSOL,rows:config.remaining.map(remaining=>({remaining,...quoteTicket(scaleLiquidity(a.snapshot,remaining),config.ticketSOL)}))};
  }
  if(config.study==='freshness')return {study:'freshness',origin:data.origin,poolId:pool.id,rows:config.ticks.map(tick=>{const a=analyzePool(pool,tick,config.ticketSOL);return {requestedTick:tick,observedTick:a.snapshot.tick,ageTicks:a.ageTicks,withheld:a.stale,outputSOL:a.quote?.outputSOL??null};})};
  if(config.study==='cohort'){
    const a=analyzePool(pool,config.tick,8),rows=structuredClone(a.snapshot.holders),target=rows.find(r=>r.alias===config.alias);if(!target||config.newKind!=='unknown')throw new Error('Unsupported classification change');target.kind=config.newKind;
    const before=a.holders,after=holderLens(rows),summary=h=>({count:h.count,total:h.total,top10:h.top10,hhi:h.hhi,excluded:h.excluded.map(r=>r.alias)});
    return {study:'cohort',origin:data.origin,scope:'declared what-if classification, not an ownership finding',poolId:pool.id,tick:config.tick,changedAlias:config.alias,before:summary(before),after:summary(after)};
  }
  throw new Error('Unknown study');
}
