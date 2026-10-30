import {createViewState} from './view-state.mjs';
import {renderScreen,VIEWS} from './view-screens.mjs';
import {timeLabel} from './core-random.mjs';

async function boot(){
  const $=id=>document.getElementById(id),canvas=$('screen'),context=canvas.getContext('2d'),embedded=globalThis.POOLGOB_EMBEDDED;
  const loadImage=src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error('Logo could not load. Open Poolgob.html or run npm start.'));image.src=src;});
  const [data,art]=await Promise.all([embedded?Promise.resolve(embedded.data):fetch('watchlist.json').then(r=>{if(!r.ok)throw new Error('Watchlist data missing. Run npm run data.');return r.json();}),loadImage(embedded?.art??'poolgob.png')]);
  let state=await createViewState(data),view='watchroom',generation=0;
  for(const pool of data.pools){const option=document.createElement('option');option.value=pool.id;option.textContent=pool.label;$('pool').appendChild(option);}
  $('pool').value=state.poolId;$('ticket').value=state.ticketSOL;$('tick').value=state.tick;
  for(const [i,item] of VIEWS.entries()){
    const button=document.createElement('button');button.type='button';button.textContent=String(i+1).padStart(2,'0')+' '+item.name;button.dataset.view=item.id;button.addEventListener('click',()=>{view=item.id;draw();});$('views').appendChild(button);
  }
  function draw(){
    state.view=view;renderScreen(context,state,art);const item=VIEWS.find(v=>v.id===view),a=state.focus;
    for(const button of $('views').children)button.setAttribute('aria-current',String(button.dataset.view===view));
    $('view-title').textContent=item.title;$('caption').textContent=item.caption;$('tick-label').textContent=timeLabel(state.tick);
    $('summary').textContent=`${a.label}: ${a.snapshot.y.toFixed(2)} SOL reserve; ${a.flags.length} findings; ${a.quote?a.quote.outputSOL.toFixed(4)+' SOL modeled output':'quote withheld due to stale data'}.`;
    $('status').textContent=`Snapshot ${a.snapshot.id} / synthetic replay / ${a.status} / local digest ${state.receipt.digest?'available':'unavailable'}`;
    canvas.setAttribute('aria-label',item.title+'. '+item.caption+' '+$('summary').textContent);
  }
  async function update(){
    const token=++generation;
    try{const next=await createViewState(data,{poolId:$('pool').value,tick:Number($('tick').value),ticketSOL:Number($('ticket').value)});if(token!==generation)return;state=next;draw();}
    catch(error){if(token===generation)$('status').textContent=error.message;}
  }
  $('apply').addEventListener('click',update);$('pool').addEventListener('change',update);$('tick').addEventListener('input',update);
  function save(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}
  const saveJSON=(data,name)=>save(new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'}),name);
  $('case').addEventListener('click',()=>saveJSON(state.packet,'poolgob-case.json'));
  $('receipt').addEventListener('click',()=>saveJSON(state.receipt,'poolgob-receipt.json'));
  $('save').addEventListener('click',()=>canvas.toBlob(blob=>{if(blob)save(blob,'poolgob-'+view+'.png');},'image/png'));
  $('csv').addEventListener('click',()=>{const rows=[['pool','requested_tick','observed_tick','reserve_SOL','ticket_SOL','output_SOL','all_in_shortfall','status'],...state.watch.map(a=>[a.symbol,a.requestedTick,a.snapshot.tick,a.snapshot.y,a.ticketSOL,a.quote?.outputSOL??'',a.quote?.allInShortfall??'',a.status])];save(new Blob([rows.map(r=>r.join(',')).join('\n')+'\n'],{type:'text/csv'}),'poolgob-watchlist.csv');});
  canvas.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();const index=VIEWS.findIndex(v=>v.id===view);view=VIEWS[(index+(event.key==='ArrowRight'?1:-1)+VIEWS.length)%VIEWS.length].id;draw();});
  globalThis.POOLGOB_TEST={get state(){return state;},draw,update};draw();
}
boot().catch(error=>{document.getElementById('status').textContent=error.message;console.error(error);});
