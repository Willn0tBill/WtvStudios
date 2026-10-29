import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {join,dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const pages=['index.html','about.html','games.html','products.html'];
const get=p=>readFileSync(join(root,p),'utf8');
test('all pages use Wtv Innovations as public studio identity',()=>{
 for(const page of pages){
  const text=get(page);
  assert.match(text,/Wtv Innovations/,page);
  assert.ok(!/Whatever Studios|Wtv Studios|\bWtvS\b/.test(text),page+' should not display old brand');
  assert.match(text,/<title>[^<]*Wtv Innovations[^<]*<\/title>/,page);
  assert.ok(text.includes('css/wtvi.css'),page+' uses updated studio style');
 }
});
test('all local href and src assets are still present after rebrand',()=>{
 for(const page of pages){
  const source=get(page);
  for(const m of source.matchAll(/(?:href|src)="([^"]+)"/g)){
   const href=m[1].split('?')[0];
   if(!href||/^(?:https?:|data:|mailto:|#|sms:)/i.test(href))continue;
   if(href.endsWith('/'))continue;
   const target=resolve(root,dirname(page),href);
   assert.ok(target.startsWith(root),page+' escapes website root: '+href);
   assert.ok(existsSync(target),page+' missing '+href);
  }
 }
});
test('portfolio includes game, software, web and project identity',()=>{
 const home=get('index.html'),products=get('products.html'),games=get('games.html');
 assert.ok(home.includes('More than a'));
 assert.ok(home.includes('Digital Products'));
 assert.ok(products.includes('ClientHub'));
 assert.ok(products.includes('SwiftSupply Ops'));
 assert.ok(products.includes('ProfitLands'));
 assert.ok(products.includes('Nation Wars'));
 assert.ok(games.includes('Nation Wars')&&games.includes('ProfitLands'));
});
test('studio package metadata and URLs preserve compatibility',()=>{
 const p=JSON.parse(get('package.json'));
 assert.equal(p.name,'wtv-innovations');
 assert.match(p.description,/Wtv Innovations/);
 assert.ok(get('index.html').includes('href="products.html"'));
 assert.ok(get('products.html').includes('https://willn0tbill.github.io/ProfitLands/play/'));
});
