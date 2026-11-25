'use strict';
// A shared calculation for the live estimate, review and downloaded project plan.
window.BoltzPricing = (() => {
  const rates=window.BOLTZ_CONFIG.pricing;
  const scalar=value=>new Intl.NumberFormat('en-US',{style:'currency',currency:rates.currency,minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
  const money=value=>Array.isArray(value)?(value[0]===value[1]?scalar(value[0]):scalar(value[0])+' to '+scalar(value[1])):scalar(value);
  const round=value=>Math.round(value*100)/100;
  function calculate(selection){
    const lines=[],reasons=[];
    const add=(label,price,quantity)=>{const [unitPrice,unitMax]=Array.isArray(price)?price:[price,price];if(unitMax>0)lines.push({label,unitPrice,quantity,amount:round(unitPrice*quantity),amountMax:round(unitMax*quantity)});};
    const count={'1 TV':1,'2 TVs':2,'3 TVs':3}[selection.tvCount];
    if(!selection.tvSize)return {lines,total:null,knownSubtotal:0,reasons:['Choose your TV size to start.'],state:'empty'};
    if(!Object.hasOwn(rates.tv,selection.tvSize))return {lines,total:null,knownSubtotal:0,reasons:['TV size needs confirmation.'],state:'custom'};
    if(!count)return {lines,total:null,knownSubtotal:0,reasons:['Four or more TVs need a project quote.'],state:'custom'};
    add('TV mounting · '+selection.tvSize,rates.tv[selection.tvSize],count);
    if(Object.hasOwn(rates.wall,selection.wall))add(selection.wall+' wall',rates.wall[selection.wall],count);
    else reasons.push('Wall construction needs assessment.');
    if(Object.hasOwn(rates.mount,selection.mount))add(selection.mount+' mount supply',rates.mount[selection.mount],count);
    else reasons.push('Mount supply and style need confirmation.');
    for(const extra of selection.extras||[]){
      if(extra==='Wire concealment'){
        if(Object.hasOwn(rates.cables,selection.cableMethod))add(selection.cableMethod,rates.cables[selection.cableMethod],count);
        else reasons.push('Cable routing needs assessment.');
      }else if(Object.hasOwn(rates.extras,extra))add(extra,rates.extras[extra],count);
    }
    if(selection.property&&selection.property!=='Home / apartment')reasons.push('Business and other properties need a project review.');
    const knownSubtotal=round(lines.reduce((sum,line)=>sum+line.amount,0));
    const knownSubtotalMax=round(lines.reduce((sum,line)=>sum+line.amountMax,0));
    return {lines,knownSubtotal,knownSubtotalMax,totalMax:reasons.length?null:knownSubtotalMax,total:reasons.length?null:knownSubtotal,reasons,state:reasons.length?'partial':'estimated'};
  }
  return {calculate,money};
})();
