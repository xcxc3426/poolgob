import {readFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {projectFiles} from './manifest.mjs';
import {VIEWS} from './view-screens.mjs';
import {validateDataset} from './core-fixture.mjs';
const root=fileURLToPath(new URL('./',import.meta.url)),files=await projectFiles(),names=new Set(files);let links=0;
assert.ok(files.every(name=>!name.includes('/')),'The upload edition must contain only root-level files.');
for(const name of files.filter(n=>n.endsWith('.md'))){const source=await readFile(root+name,'utf8');for(const match of source.matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)){const target=match[1].split('#')[0];if(!target||/^[a-z]+:/i.test(target))continue;const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(name),target));assert.ok(names.has(resolved),name+' links to missing '+resolved);links++;}for(const match of source.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)){assert.ok(names.has(path.posix.normalize(path.posix.join(path.posix.dirname(name),match[1]))));links++;}}
for(const [i,view] of VIEWS.entries()){const image=await readFile(root+String(i+1).padStart(2,'0')+'-'+view.id+'.png');assert.equal(image.subarray(1,4).toString(),'PNG');assert.equal(image.readUInt32BE(16),1600);assert.equal(image.readUInt32BE(20),1040);}
const cover=await readFile(root+'poolgob-cover.png');assert.equal(cover.readUInt32BE(16),1600);assert.equal(cover.readUInt32BE(20),800);
for(const file of files.filter(n=>n.endsWith('.mjs')))execFileSync(process.execPath,['--check',root+file],{stdio:'pipe'});
for(const file of files.filter(n=>n.endsWith('.json')))JSON.parse(await readFile(root+file,'utf8'));
validateDataset(JSON.parse(await readFile(root+'watchlist.json','utf8')));
const html=await readFile(root+'Poolgob.html','utf8');assert.ok(!/<script[^>]+src=/.test(html));assert.ok(!/<link[^>]+href="(?!data:)/.test(html));new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
const pack=JSON.parse(await readFile(root+'GROKBOT-pack.json','utf8'));for(const file of [pack.operatorFile,...pack.workflows])assert.ok(names.has(file));
const biggest=Math.max(...await Promise.all(files.map(async name=>(await stat(root+name)).size)));assert.ok(biggest<25*1024*1024);assert.ok(files.length+1<=100);
console.log(`Checked ${files.length+1} package files, ${links} local links, twelve figures, source syntax, JSON, offline embedding and upload sizes.`);
