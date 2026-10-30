import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('./',import.meta.url));
export async function projectFiles(dir=root,prefix=''){
  const files=[];for(const item of await readdir(dir,{withFileTypes:true})){if(['.git','node_modules'].includes(item.name))continue;const name=prefix+item.name;if(item.isDirectory())files.push(...await projectFiles(dir+item.name+'/',name+'/'));else if(item.isFile()&&name!=='MANIFEST.sha256')files.push(name);}return files.sort();
}
export async function manifestText(){return (await Promise.all((await projectFiles()).map(async name=>createHash('sha256').update(await readFile(root+name)).digest('hex')+'  '+name))).join('\n')+'\n';}
if(process.argv[1]===fileURLToPath(import.meta.url)){
  const expected=await manifestText();if(process.argv.includes('--verify')){if(await readFile(root+'MANIFEST.sha256','utf8')!==expected)throw new Error('Manifest mismatch: modified, missing or additional files.');console.log('All package files match the SHA-256 manifest.');}else{await writeFile(root+'MANIFEST.sha256',expected);console.log('Wrote MANIFEST.sha256.');}
}
