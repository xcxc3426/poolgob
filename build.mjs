import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./',import.meta.url));
const modules=['core-random.mjs','core-amm.mjs','core-holders.mjs','core-fixture.mjs','core-analysis.mjs','core-receipt.mjs','view-state.mjs','view-primitives.mjs','view-charts.mjs','view-screens.mjs','view-app.mjs'];
let code='';for(const name of modules){code+='\n// '+name+'\n'+(await readFile(root+name,'utf8')).replace(/^import .*?;\s*$/gm,'').replace(/\bexport (?=(?:async )?(?:function|const|class)\b)/g,'');if(name==='view-primitives.mjs')code+='\nconst P=PALETTE;\n';}
const art='data:image/png;base64,'+(await readFile(root+'poolgob.png')).toString('base64'),data=JSON.parse(await readFile(root+'watchlist.json','utf8')),safe=s=>s.replace(/<\/script/gi,'<\\/script');
let html=await readFile(root+'index.html','utf8');html=html.replace('<link rel="stylesheet" href="view-style.css">','<style>'+await readFile(root+'view-style.css','utf8')+'</style>').replace('href="poolgob.png"','href="'+art+'"').replace('<script type="module" src="view-app.mjs"></script>','<script>globalThis.POOLGOB_EMBEDDED='+safe(JSON.stringify({art,data}))+';\n'+safe(code)+'</script>');
await writeFile(root+'Poolgob.html',html);console.log('Built self-contained Poolgob.html ('+(Buffer.byteLength(html)/1024/1024).toFixed(2)+' MiB).');
