export function randomStream(seed) {
  let state=seed>>>0;
  return ()=>{state=(state+0x6D2B79F5)>>>0;let t=state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
export const sum=values=>values.reduce((a,b)=>a+b,0);
export const percent=value=>(value*100).toFixed(2)+'%';
export const timeLabel=tick=>'T+'+String(Math.floor(tick*5/60)).padStart(2,'0')+':'+String(tick*5%60).padStart(2,'0');
