function positive(value,name){if(!Number.isFinite(value)||value<=0)throw new Error(name+' must be finite and positive');}
export function validatePool(pool){
  if(!pool||pool.model!=='cpmm-demo-v1')throw new Error('Unsupported pool model');
  positive(pool.x,'token reserve');positive(pool.y,'SOL reserve');
  if(!Number.isFinite(pool.feeBps)||pool.feeBps<0||pool.feeBps>1000)throw new Error('feeBps outside supported range');
  return true;
}
/** Single idealized token -> SOL swap; fee remains in the input reserve. */
export function quoteExit(pool,tokenAmount){
  validatePool(pool);
  if(!Number.isFinite(tokenAmount)||tokenAmount<0)throw new Error('token amount must be finite and nonnegative');
  const feeTokens=tokenAmount*pool.feeBps/10000,effective=tokenAmount-feeTokens,mid=pool.y/pool.x;
  const outputSOL=pool.y*effective/(pool.x+effective),nominalSOL=tokenAmount*mid;
  const curveImpact=effective?effective/(pool.x+effective):0;
  return {tokenAmount,feeTokens,mid,nominalSOL,outputSOL,curveImpact,allInShortfall:nominalSOL?1-outputSOL/nominalSOL:0,averagePrice:tokenAmount?outputSOL/tokenAmount:mid,postX:pool.x+tokenAmount,postY:pool.y-outputSOL};
}
export function quoteTicket(pool,nominalSOL){positive(nominalSOL,'ticket SOL');return quoteExit(pool,nominalSOL/(pool.y/pool.x));}
export function scaleLiquidity(pool,fraction){validatePool(pool);if(!Number.isFinite(fraction)||fraction<=0||fraction>1)throw new Error('remaining fraction must be in (0,1]');return {...pool,x:pool.x*fraction,y:pool.y*fraction};}
export function exitSurface(pool,sizes=[.25,.5,1,2,4,8,16,32,64],remaining=[1,.75,.5,.25,.1]){
  validatePool(pool);return sizes.map(size=>({size,cells:remaining.map(fraction=>({remaining:fraction,...quoteTicket(scaleLiquidity(pool,fraction),size)}))}));
}
