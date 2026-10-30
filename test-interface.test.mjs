import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';

// This is a DOM wiring harness, not a browser engine or visual browser test.
async function loadUI(){
  const nodes=new Map(),downloads=[],ctx=new Proxy({measureText:s=>({width:String(s).length*8})},{get:(o,k)=>k in o?o[k]:(()=>{})});
  const element=()=>({children:[],dataset:{},attributes:{},listeners:{},value:'',appendChild(n){this.children.push(n);},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,v){this.listeners[k]=v;},click(){if(this.download)downloads.push(this.download);this.listeners.click?.({});},getContext:()=>ctx,toBlob:cb=>cb(new Blob(['png']))});
  for(const id of ['screen','pool','ticket','tick','views','tick-label','view-title','caption','summary','status','apply','case','receipt','save','csv'])nodes.set(id,element());
  class FakeImage{constructor(){this.width=1254;this.height=1254;}set src(value){this.url=value;queueMicrotask(()=>this.onload());}}
  const sandbox={document:{getElementById:id=>nodes.get(id),createElement:()=>element()},Image:FakeImage,crypto:globalThis.crypto,TextEncoder,Blob,URL:{createObjectURL:()=> 'blob:local',revokeObjectURL:()=>{}},setTimeout:()=>{},queueMicrotask,console};
  const html=await readFile(new URL('./Poolgob.html',import.meta.url),'utf8'),context=vm.createContext(sandbox);new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]).runInContext(context);
  for(let i=0;i<100&&!context.POOLGOB_TEST;i++)await new Promise(resolve=>setImmediate(resolve));
  assert.ok(context.POOLGOB_TEST,'standalone app booted');return {nodes,downloads,context};
}
test('standalone boots with twelve views and an accessible caption',async()=>{const ui=await loadUI();assert.equal(ui.nodes.get('views').children.length,12);assert.ok(ui.nodes.get('caption').textContent.length>30);});
test('all twelve view buttons update the renderer and selected state',async()=>{const {nodes,context}=await loadUI();for(const b of nodes.get('views').children){b.click();assert.equal(b.attributes['aria-current'],'true');assert.equal(context.POOLGOB_TEST.state.view,b.dataset.view);}});
test('selecting the stale pool withholds its quote in the interface',async()=>{const {nodes,context}=await loadUI();nodes.get('pool').value='sim-bloop-sol';await context.POOLGOB_TEST.update();assert.equal(context.POOLGOB_TEST.state.focus.quote,null);assert.match(nodes.get('summary').textContent,/withheld/);});
test('invalid ticket input does not replace the previous study',async()=>{const {nodes,context}=await loadUI();nodes.get('ticket').value='0';await context.POOLGOB_TEST.update();assert.match(nodes.get('status').textContent,/ticket/);assert.equal(context.POOLGOB_TEST.state.ticketSOL,8);});
test('four local exports create downloads',async()=>{const {nodes,downloads}=await loadUI();for(const id of ['case','receipt','csv','save'])nodes.get(id).click();assert.equal(downloads.length,4);assert.ok(downloads.includes('poolgob-receipt.json'));assert.ok(downloads.includes('poolgob-watchlist.csv'));});
