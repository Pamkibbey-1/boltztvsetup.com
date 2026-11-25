import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const context=vm.createContext({window:{},Intl});
vm.runInContext(fs.readFileSync('dist/config.js','utf8'),context);
vm.runInContext(fs.readFileSync('dist/pricing.js','utf8'),context);
const calculate=context.window.BoltzPricing.calculate;
const standard={tvSize:'33 to 60 inches',tvCount:'1 TV',wall:'Drywall / wood studs',mount:'I already have a mount',extras:[],property:'Home / apartment'};
assert.equal(calculate(standard).total,109.99,'60-inch standard installation');
assert.equal(calculate({...standard,tvSize:'32 inches and smaller',extras:['Wire concealment','Soundbar installation'],cableMethod:'Surface cable cover'}).total,137.99,'small TV + surface cables + soundbar');
assert.equal(calculate({...standard,wall:'Brick or concrete',mount:'Full motion / swivel',extras:['Wire concealment'],cableMethod:'In-wall low-voltage routing'}).total,316.99,'masonry + full-motion hardware + in-wall cables');
assert.equal(calculate({...standard,extras:['Above fireplace','Frame / art TV']}).total,237.99,'fireplace and art TV upgrades are cumulative');
assert.equal(calculate({...standard,tvCount:'2 TVs',extras:['Soundbar installation']}).total,317.98,'per-TV extras multiply with the number of TVs');
assert.equal(calculate({...standard,tvCount:'4 or more TVs'}).state,'custom','four-plus TVs do not get an invented exact total');
assert.equal(calculate({...standard,tvSize:'Not sure yet'}).total,null,'unknown size requires review');
assert.equal(calculate({...standard,wall:'Metal studs'}).total,null,'metal studs require review');
assert.equal(calculate({...standard,wall:'Metal studs'}).knownSubtotal,109.99,'known base cost remains visible');
assert.equal(calculate({...standard,mount:'Help me choose'}).state,'partial','unselected mount is not priced as free');
assert.equal(calculate({...standard,extras:['Wire concealment'],cableMethod:'Help me choose'}).total,null,'unknown cable option requires review');
assert.equal(calculate({...standard,property:'Office / business'}).total,null,'business projects require review');
assert.equal(calculate({...standard,tvSize:''}).state,'empty','empty selection prompts for size');
console.log('13 pricing checks passed.');

assert.equal(calculate(standard).totalMax,149.99);
assert.equal(context.window.BoltzPricing.money([49.99,79.99]),'$49.99 to $79.99');

