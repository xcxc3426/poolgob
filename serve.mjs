import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('./',import.meta.url)),port=Number(process.env.PORT??4173);
if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('PORT must be 1024..65535');
const types={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.md':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname),target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));if(!target.startsWith(root)||pathname.includes('\0')){res.writeHead(403);res.end();return;}if(!(await stat(target)).isFile())throw new Error('not a file');const body=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]??'application/octet-stream','Content-Length':body.length,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}});
server.listen(port,'127.0.0.1',()=>console.log('Poolgob: http://127.0.0.1:'+port+' (loopback only)'));
