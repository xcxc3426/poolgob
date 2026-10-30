import test from 'node:test';
import assert from 'node:assert/strict';
import {holderLens} from './core-holders.mjs';
const rows=[{alias:'wallet-a',kind:'wallet',amount:60},{alias:'wallet-b',kind:'wallet',amount:40},{alias:'pool',kind:'pool-vault',amount:900}];
test('concentration excludes the modeled pool vault',()=>{const h=holderLens(rows);assert.equal(h.total,100);assert.equal(h.top1,.6);assert.equal(h.top10,1);assert.equal(h.excluded.length,1);assert.equal(h.scope,'modeled eligible wallet cohort');});
test('HHI uses individual eligible shares',()=>assert.ok(Math.abs(holderLens(rows).hhi-.52)<1e-12));
test('unknown classifications stay outside the eligible cohort',()=>{const h=holderLens([...rows,{alias:'unknown',kind:'unknown',amount:500}]);assert.equal(h.total,100);assert.equal(h.excluded.length,2);});
test('invalid balances, duplicates and an empty cohort are rejected',()=>{assert.throws(()=>holderLens([{...rows[0],amount:-1}]));assert.throws(()=>holderLens([rows[0],rows[0]]));assert.throws(()=>holderLens([rows[2]]));});
