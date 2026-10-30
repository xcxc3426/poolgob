import {PALETTE as P,txt,line,rect,pct,num} from './view-primitives.mjs';
export function heatColor(value){return value<.02?'#2f5755':value<.05?'#46716b':value<.1?'#8b7958':value<.2?'#aa704e':value<.4?'#aa5558':'#794956';}
export function drawSurface(c,surface,x,y,w,h){
  if(!surface.length){txt(c,'Quote withheld: stale observation.',x,y+50,25,P.orange);return;}
  const cw=(w-123)/5,rh=(h-52)/surface.length;
  txt(c,'Ticket SOL',x,y,12,P.muted,'mono');surface[0].cells.forEach((q,j)=>txt(c,pct(q.remaining,0)+' depth',x+130+j*cw,y,12,P.muted,'mono'));
  surface.forEach((row,i)=>{const yy=y+40+i*rh;txt(c,num(row.size,2),x+1,yy+13,16,P.text,'mono');row.cells.forEach((q,j)=>{const xx=x+119+j*cw;rect(c,xx,yy,cw-7,rh-7,heatColor(q.allInShortfall));txt(c,pct(q.allInShortfall,2),xx+12,yy+13,18,P.text,'mono');});});
}
export function flowPlot(c,frames,x,y,w,h){
  const values=frames.map(f=>f.events.filter(e=>e.type.startsWith('lp-')).reduce((s,e)=>s+(e.type==='lp-add'?e.sol:-e.sol),0)),max=Math.max(1,...values.map(Math.abs)),gap=w/frames.length,zero=y+h/2;
  line(c,x,zero,x+w,zero,P.muted);values.forEach((v,i)=>{const bh=Math.abs(v)/max*h/2;rect(c,x+i*gap+1,v>0?zero-bh:zero,Math.max(2,gap-2),bh,v>0?P.cyan:P.orange);});
  txt(c,'+ LP add',x,y+5,10,P.cyan,'mono');txt(c,'- LP remove',x,y+h-16,10,P.orange,'mono');
}
export function holderRows(c,lens,x,y,w,count=12){
  lens.ranked.slice(0,count).forEach((a,i)=>{const yy=y+i*37;txt(c,a.alias,x,yy,12,P.muted,'mono');rect(c,x+126,yy+2,(w-223)*a.share/lens.top1,14,i<10?P.blue:P.cyan);txt(c,pct(a.share,2),x+w-83,yy-1,14,P.text,'mono');});
}
export function cohortMosaic(c,ranked,x,y,w,h){
  let cursor=x;const top=ranked.slice(0,8),rest=1-top.reduce((s,a)=>s+a.share,0),groups=[...top.map((a,i)=>({share:a.share,label:String(i+1),color:i<4?P.blue:P.cyan})),{share:rest,label:'rest',color:'#566475'}];
  for(const g of groups){const ww=g.share*w;rect(c,cursor,y,Math.max(1,ww-3),h,g.color);if(ww>32)txt(c,g.label,cursor+8,y+13,13,P.bg,'mono');cursor+=ww;}
}
export function eventRows(c,events,x,y,w,count=10){
  events.slice(0,count).forEach((event,i)=>{const yy=y+i*56;colorEvent(c,event,x,yy);txt(c,'T+'+String(event.tick*5).padStart(3,'0')+'m',x+23,yy-2,12,P.muted,'mono');txt(c,event.type,x+121,yy-2,13,P.text,'mono');txt(c,num(event.sol??0,2)+' SOL',x+w-135,yy-2,13,P.text,'mono');line(c,x,yy+34,x+w,yy+34);});
}
function colorEvent(c,event,x,y){rect(c,x,y,7,12,event.type==='lp-remove'?P.orange:event.type==='lp-add'?P.cyan:P.blue);}
