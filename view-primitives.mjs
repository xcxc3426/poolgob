export const PALETTE={bg:'#12171d',panel:'#1a222b',panel2:'#202b36',line:'#354252',text:'#e6ebee',muted:'#93a0ad',orange:'#e19a64',cyan:'#6dc9c5',blue:'#829ee0',red:'#dc7a85',gold:'#d4bd75',green:'#91b59a',paper:'#ece8de',ink:'#26333d'};
export function txt(c,value,x,y,size=16,color=PALETTE.text,face='sans'){
  c.font=`${size}px ${face==='mono'?'"DejaVu Sans Mono", monospace':face==='bold'?'"Pool Sans Bold", Arial, sans-serif':'"DejaVu Sans", Arial, sans-serif'}`;
  c.textAlign='left';c.textBaseline='top';c.fillStyle=color;c.fillText(String(value),x,y);
}
export function para(c,value,x,y,w,size=17,color=PALETTE.muted,leading=27,maxLines=30){
  c.font=`${size}px "DejaVu Sans", Arial, sans-serif`;let row='',yy=y,count=0;
  for(const word of String(value).split(/\s+/)){const next=row?row+' '+word:word;if(row&&c.measureText(next).width>w){txt(c,row,x,yy,size,color);yy+=leading;row=word;if(++count>=maxLines)return yy;}else row=next;}
  if(row)txt(c,row,x,yy,size,color);return yy+leading;
}
export function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h);}
export function line(c,x,y,x2,y2,color=PALETTE.line,width=1){c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
export function dot(c,x,y,r,color){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();}
export function panel(c,x,y,w,h,title,sub=''){
  rect(c,x,y,w,h,PALETTE.panel);c.strokeStyle=PALETTE.line;c.lineWidth=1;c.strokeRect(x+.5,y+.5,w-1,h-1);txt(c,title,x+19,y+17,14,PALETTE.text,'mono');if(sub)txt(c,sub,x+19,y+43,11,PALETTE.muted,'mono');
}
export const num=(v,d=2)=>Number(v).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
export const pct=(v,d=1)=>(v*100).toFixed(d)+'%';
export function statusColor(value){return value==='review'?PALETTE.orange:value==='observe'?PALETTE.gold:PALETTE.cyan;}
export function metric(c,label,value,x,y,color=PALETTE.text,sub=''){
  txt(c,label,x,y,12,PALETTE.muted,'mono');txt(c,value,x,y+30,35,color,'bold');if(sub)txt(c,sub,x,y+77,11,PALETTE.muted);
}
export function imageFit(c,image,x,y,w,h){if(!image)return;const s=Math.min(w/image.width,h/image.height);c.imageSmoothingEnabled=false;c.drawImage(image,x+(w-image.width*s)/2,y+(h-image.height*s)/2,image.width*s,image.height*s);}
export function plot(c,values,x,y,w,h,color=PALETTE.cyan,{lo,hi,axis=true,width=2.6}={}){
  lo??=Math.min(...values);hi??=Math.max(...values);if(hi===lo){hi+=1;lo-=1;}
  if(axis){for(let i=0;i<4;i++){const yy=y+i*h/3;line(c,x,yy,x+w,yy,PALETTE.line);txt(c,num(hi-(hi-lo)*i/3,2),x+6,yy+5,10,PALETTE.muted,'mono');}}
  c.beginPath();values.forEach((v,i)=>{const xx=x+i*w/Math.max(1,values.length-1),yy=y+h-(v-lo)/(hi-lo)*h;i?c.lineTo(xx,yy):c.moveTo(xx,yy);});c.strokeStyle=color;c.lineWidth=width;c.stroke();return {lo,hi};
}
export function bars(c,values,x,y,w,h,color=PALETTE.blue,{max=Math.max(...values),labels=false}={}){
  const gap=w/values.length;values.forEach((v,i)=>{const bh=(max?v/max:0)*h;rect(c,x+i*gap+2,y+h-bh,Math.max(1,gap-4),bh,typeof color==='function'?color(i):color);if(labels)txt(c,String(i+1),x+i*gap+2,y+h+8,9,PALETTE.muted,'mono');});
}
