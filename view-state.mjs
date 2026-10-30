import {validateDataset} from './core-fixture.mjs';
import {analyzeWatchlist,casePacket} from './core-analysis.mjs';
import {makeReceipt} from './core-receipt.mjs';
export async function createViewState(data,options={}){
  validateDataset(data);
  const state={data,view:'watchroom',poolId:data.defaultPool,tick:data.defaultTick,ticketSOL:data.defaultTicketSOL,...options};
  await refreshState(state);return state;
}
export async function refreshState(state){
  state.watch=analyzeWatchlist(state.data,state.tick,state.ticketSOL);
  state.focus=state.watch.find(a=>a.poolId===state.poolId);if(!state.focus)throw new Error('Unknown pool');
  state.packet=casePacket(state.focus);state.receipt=await makeReceipt(state.packet);return state;
}
