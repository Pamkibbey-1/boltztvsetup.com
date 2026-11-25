import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
fs.mkdirSync('dist/assets',{recursive:true});
for(const name of ['index.html','app.js','config.js','pricing.js','styles.css'])fs.copyFileSync(name,'dist/'+name);
for(const name of fs.readdirSync('.').filter(n=>/\.(png|jpg|webp|svg)$/.test(n)))fs.copyFileSync(name,'dist/assets/'+name);
execFileSync(process.execPath,['build-pages.mjs'],{stdio:'inherit'});
const base=(process.env.SITE_BASE_PATH||'').replace(/\/$/,'');
const origin=(process.env.SITE_ORIGIN||'https://pamkibbey-1.github.io').replace(/\/$/,'');
for(const name of fs.readdirSync('dist',{recursive:true}).filter(n=>n.endsWith('.html'))){
 const file=path.join('dist',name);let html=fs.readFileSync(file,'utf8');
 html=html.replaceAll('https://boltz-tv-setup.gpiyush791.chatgpt.site',origin+base);
 html=html.replace(/((?:href|src|data-work-src)=")\/(?!\/)/g,'$1'+base+'/');
 if(name==='index.html')html=html.replace('</head>','<link rel="canonical" href="'+origin+base+'/">\n</head>');
 fs.writeFileSync(file,html);
}
let app=fs.readFileSync('dist/app.js','utf8');
app=app.replaceAll('href="/#planner"','href="'+base+'/#planner"');
app=app.replace('const activeSection=location.pathname.split("/")[1];','const activeSection=location.pathname.slice('+base.length+').split("/")[1];');
app=app.replace('==="/"+activeSection+"/"','==="'+base+'/"+activeSection+"/"');
fs.writeFileSync('dist/app.js',app);fs.writeFileSync('dist/.nojekyll','');
console.log('Built website for '+origin+base+'/');
