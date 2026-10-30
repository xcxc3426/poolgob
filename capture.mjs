import {createRequire} from 'node:module';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createViewState} from './view-state.mjs';
import {renderScreen,VIEWS} from './view-screens.mjs';
import {PALETTE as P,txt,line,imageFit,rect} from './view-primitives.mjs';
const require=createRequire(import.meta.url);let canvasModule;
try{canvasModule=require(process.env.POOLGOB_CANVAS_MODULE??'@napi-rs/canvas');}catch{throw new Error('Optional capture renderer missing: npm install --no-save --package-lock=false @napi-rs/canvas');}
const {createCanvas,loadImage,GlobalFonts}=canvasModule,fonts=process.env.POOLGOB_FONT_DIR??'/usr/share/fonts/truetype/dejavu';
for(const [file,name] of [['DejaVuSans.ttf','DejaVu Sans'],['DejaVuSansMono.ttf','DejaVu Sans Mono'],['DejaVuSans-Bold.ttf','Pool Sans Bold']])GlobalFonts.registerFromPath(fonts+'/'+file,name);
const root=fileURLToPath(new URL('./',import.meta.url)),data=JSON.parse(await readFile(root+'watchlist.json','utf8')),state=await createViewState(data),art=await loadImage(root+'poolgob.png');
const canvas=createCanvas(1600,1040),ctx=canvas.getContext('2d');
const tracked=new Proxy(ctx,{get(target,key){if(key==='fillText')return (text,x,y)=>{if(x<0||y<0||x+target.measureText(String(text)).width>1602||y+parseFloat(target.font)*1.12>1040)throw new Error('Text outside '+state.view+': '+text);return target.fillText(text,x,y);};const value=Reflect.get(target,key,target);return typeof value==='function'?value.bind(target):value;},set(target,key,value){return Reflect.set(target,key,value,target);}});
for(const [i,view] of VIEWS.entries()){state.view=view.id;renderScreen(tracked,state,art);await writeFile(root+String(i+1).padStart(2,'0')+'-'+view.id+'.png',canvas.toBuffer('image/png'));}
const cover=createCanvas(1600,800),c=cover.getContext('2d');rect(c,0,0,1600,800,P.bg);txt(c,'POOLGOB',78,142,111,P.text,'bold');line(c,85,310,733,310,P.orange,3);txt(c,'Liquidity leaves',82,365,56,P.text);txt(c,'a trail.',82,437,56,P.text);txt(c,'SMALL POOLS / SOLANA / EVIDENCE FIRST',85,623,17,P.orange,'mono');txt(c,'A Grok Bot operator pack + replayable research desk',85,680,20,P.muted);imageFit(c,art,895,49,650,700);await writeFile(root+'poolgob-cover.png',cover.toBuffer('image/png'));
console.log('Rendered twelve 1600 x 1040 research views and a 1600 x 800 cover.');
