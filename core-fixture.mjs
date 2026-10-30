import {randomStream,timeLabel} from './core-random.mjs';
import {quoteExit,validatePool} from './core-amm.mjs';

const SPECS=[['PLINK',320,12000000],['SPOOL',180,8300000],['MOP',640,23000000],['WISP',96,6200000],['TINK',420,15000000],['LOAM',240,11000000],['NIB',115,9500000],['BLOOP',850,27000000]];
function cohort(seed,index,tick,reserve){
  const rnd=randomStream(seed+index*701+tick*31),rows=Array.from({length:30},(_,i)=>({alias:'wallet-'+String(i+1).padStart(2,'0'),kind:'wallet',weight:Math.exp(-i/(10+index*4))*(.84+rnd()*.32)})),total=rows.reduce((s,a)=>s+a.weight,0);
  return [...rows.map(({weight,...rest})=>({...rest,amount:weight/total*10000000})),{alias:'pool-vault',kind:'pool-vault',amount:reserve},{alias:'custody-demo',kind:'custody',amount:1500000}];
}
export function generateDataset(seed=29){
  if(!Number.isInteger(seed)||seed<0||seed>0xffffffff)throw new Error('seed must be uint32');
  const pools=SPECS.map(([symbol,startY,startX],index)=>{
    const rnd=randomStream(seed+index*173),history=[];let x=startX,y=startY,lpIndex=1;
    for(let tick=0;tick<40;tick++){
      if(index===7&&tick>30)break;
      const events=[];let volumeSOL=0;
      if(tick){
        if((index===0&&[26,34].includes(tick))||(index===3&&tick===29)||(index===5&&tick===23)){
          const fraction=index===0?(tick===26?.42:.18):index===3?.30:.15,solRemoved=y*fraction;
          x*=1-fraction;y*=1-fraction;lpIndex*=1-fraction;events.push({type:'lp-remove',fraction,sol:solRemoved,note:'Tagged proportional liquidity removal'});
        }
        if(index===2&&tick===28){x*=1.22;y*=1.22;lpIndex*=1.22;events.push({type:'lp-add',fraction:.22,sol:y*.22/1.22,note:'Tagged proportional liquidity addition'});}
        const nominal=(.004+rnd()*.017)*y,buy=rnd()>.43;
        if(buy){const effective=nominal*.997,out=x*effective/(y+effective);x-=out;y+=nominal;events.push({type:'swap-buy',sol:nominal,note:'Simulated SOL input'});}
        else{const tokens=nominal/(y/x),q=quoteExit({model:'cpmm-demo-v1',x,y,feeBps:30},tokens);x=q.postX;y=q.postY;events.push({type:'swap-sell',sol:nominal,note:'Simulated token input, marked SOL notional'});}
        volumeSOL=nominal;
      }
      history.push({id:symbol.toLowerCase()+'-'+String(tick).padStart(3,'0'),tick,time:timeLabel(tick),model:'cpmm-demo-v1',x,y,feeBps:30,lpIndex,volumeSOL,events,holders:cohort(seed,index,tick,x),source:'procedural-fixture'});
    }
    return {id:'sim-'+symbol.toLowerCase()+'-sol',symbol,quote:'SOL',label:symbol+' / SOL',history};
  });
  return {schema:'poolgob/dataset/1',version:'0.1.0',origin:'synthetic-fixture',seed,tickMinutes:5,horizon:40,defaultTick:32,defaultPool:pools[0].id,defaultTicketSOL:8,pools};
}
export function validateDataset(data){
  if(!data||data.schema!=='poolgob/dataset/1'||data.origin!=='synthetic-fixture'||!Array.isArray(data.pools)||!data.pools.length)throw new Error('Unsupported dataset');
  const ids=new Set();
  for(const p of data.pools){if(!p.id||ids.has(p.id)||!Array.isArray(p.history)||!p.history.length)throw new Error('Invalid pool history');ids.add(p.id);let previous=-1;for(const f of p.history){if(!Number.isInteger(f.tick)||f.tick<=previous||!Number.isFinite(f.x)||!Number.isFinite(f.y)||f.x<=0||f.y<=0||f.source!=='procedural-fixture')throw new Error('Invalid snapshot');validatePool(f);previous=f.tick;}}
  return true;
}
