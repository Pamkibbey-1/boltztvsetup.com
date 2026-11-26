'use strict';
const icons = {
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  tv:'<rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M8 21h8m-4-4v4"/>',
  cable:'<path d="M7 3v4m4-4v4M5 7h8v3a4 4 0 0 1-4 4v3a4 4 0 0 0 8 0v-3m-2-3h4v3h-4z"/>',
  shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  sparkle:'<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Zm7 0v4m-2-2h4"/>',
  level:'<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M6 10v4m12-4v4"/><circle cx="12" cy="12" r="2"/>',
  soundbar:'<rect x="2" y="9" width="20" height="7" rx="3"/><circle cx="6" cy="12.5" r="1"/><circle cx="18" cy="12.5" r="1"/><path d="M10 12.5h4M7 5h10"/>',
  frame:'<rect x="3" y="3" width="18" height="17" rx="1"/><rect x="6" y="6" width="12" height="11" rx=".5"/><path d="m7 16 4-5 3 3 3-3"/>',
  fireplace:'<path d="M3 21V5h18v16M2 5h20M6 21v-9h12v9M8 8h8"/><path d="M12 21c-5-1-3-5-1-7 0 3 4 3 2 6"/>',
  building:'<path d="M3 21h18M6 21V3h12v18M9 6h1m4 0h1M9 9h1m4 0h1M9 12h1m4 0h1m-5 9v-5h4v5"/>',
  expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  sliders:'<path d="M4 7h8m4 0h4M4 17h3m4 0h9"/><circle cx="14" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  message:'<path d="M4 4h16v12H9l-5 4V4Z"/><path d="M8 8h8m-8 4h5"/>',
  play:'<rect x="3" y="4" width="18" height="15" rx="2"/><path d="m10 8 5 3.5-5 3.5V8Z"/>',
  clipboard:'<path d="M9 5H5v16h14V5h-4"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="m8 14 3 3 5-6"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.5"/>',
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>'
};
function hydrateIcons(root=document){root.querySelectorAll('[data-icon]').forEach(el=>{const name=el.dataset.icon;el.outerHTML='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+(icons[name]||icons.tv)+'</svg>';});}
hydrateIcons();
const escapeHtml=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const config=window.BOLTZ_CONFIG||{};
const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>1100)closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();

const dialog=document.querySelector('#detail-dialog');
const dialogContent=document.querySelector('#dialog-content');
let dialogTrigger=null;
function openDialog(html,trigger){dialogTrigger=trigger;dialogContent.innerHTML=html;const title=dialogContent.querySelector('h2');if(title){title.id='dialog-title';dialog.setAttribute('aria-labelledby','dialog-title');}hydrateIcons(dialogContent);dialog.showModal();}
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{if(dialogTrigger)dialogTrigger.focus({preventScroll:true});});
const serviceDetails={
  "TV wall mounting": {
    "intro": "We mount TVs at a height and angle that suit your room. We check the TV, bracket and wall before installation.",
    "items": [
      "Fixed mounts for a streamlined, close-to-wall appearance.",
      "Tilting mounts for angle adjustment and higher placements.",
      "Full-motion mounts for flexible viewing positions.",
      "Wall construction, TV weight and mount compatibility must be checked before installation."
    ],
    "note": "Have your TV model and size handy. If you own a mount, include its make and model in your project notes."
  },
  "Wire concealment": {
    "intro": "Cable covers and suitable in-wall routes keep wires out of the way. Available options depend on your wall and power outlets.",
    "items": [
      "Surface cable covers can keep cables organized without opening the wall.",
      "Suitable low-voltage cables may be routed inside compatible walls.",
      "Existing outlets, obstructions and wall construction affect available options.",
      "Any power work requires an appropriate code-compliant approach and may need a qualified electrician."
    ],
    "note": "Select “Hide the wires” in the planner. Note where your power outlet and media devices are located."
  },
  "Soundbar installation": {
    "intro": "Mount your soundbar near the TV and keep the connections organized. We check the bracket and connection options for your equipment.",
    "items": [
      "Consider wall mounting or a compatible TV-mounted bracket.",
      "Plan the spacing between screen, soundbar and furniture.",
      "Account for HDMI ARC/eARC, optical or other supported connections.",
      "Confirm soundbar dimensions, bracket compatibility and cable routes."
    ],
    "note": "Select “Add a soundbar” and include your soundbar model in the notes."
  },
  "Frame & art TVs": {
    "intro": "Frame and art TVs need careful placement and compatible mounting hardware. We plan the position and connections for your TV model.",
    "items": [
      "Use the mount designed or approved for your TV model.",
      "Consider the position of connection boxes and recessed accessories.",
      "Plan power and data routes before choosing the final height.",
      "Allow for manufacturer-specified ventilation and service access."
    ],
    "note": "Choose “Frame / art TV” and include the exact TV model. Different models have different mounting and connection requirements."
  },
  "Above-fireplace setups": {
    "intro": "Fireplace installations need a check of heat exposure, wall material and viewing height. We assess the setup before agreeing on the work.",
    "items": [
      "Check heat exposure and manufacturer clearance requirements.",
      "Identify the wall material and suitable fixing points.",
      "Consider viewing height and whether an adjustable mount is appropriate.",
      "Plan cable routes around masonry, mantels and existing services."
    ],
    "note": "Select “Above a fireplace” and describe the fireplace, wall material and existing outlets. Suitability needs assessment before installation."
  },
  "Multi-TV & business": {
    "intro": "Mount several TVs in your home or business with a consistent layout. Tell us about the screen locations, equipment and access.",
    "items": [
      "List the size and intended location of each TV.",
      "Specify residential, office, meeting-room or commercial use.",
      "Include access constraints and any existing brackets or equipment.",
      "Discuss project scope, timing and location before confirming service."
    ],
    "note": "Select the number of TVs, choose your project type and add the details for each screen in the project notes."
  }
};
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{const title=button.dataset.service,d=serviceDetails[title];openDialog('<p class="eyebrow green">FIND YOUR FIT</p><h2>'+title+'</h2><p>'+d.intro+'</p><ul>'+d.items.map(x=>'<li>'+x+'</li>').join('')+'</ul><p>'+d.note+'</p><button class="button" id="dialog-plan">Get a free estimate</button>',button);dialogContent.querySelector('#dialog-plan').addEventListener('click',()=>{const map={'Wire concealment':'Wire concealment','Soundbar installation':'Soundbar installation','Frame & art TVs':'Frame / art TV','Above-fireplace setups':'Above fireplace'};if(map[title])form.querySelector('[name="extras"][value="'+map[title]+'"]').checked=true;if(title==='Multi-TV & business')form.elements.tvCount.value='2 TVs';dialog.close();showStep(0,false);document.querySelector('#planner').scrollIntoView({behavior:'smooth'});});}));

const form=document.querySelector('#planner-form');
const estimateRequest=document.querySelector('#estimate-request');
if(estimateRequest&&config.email){
  estimateRequest.action='https://formsubmit.co/'+encodeURIComponent(config.email);
  estimateRequest.addEventListener('submit',event=>{
    if(currentStep!==2){event.preventDefault();return;}
    estimateRequest.elements.message.value=planEntries().map(([label,value])=>label+': '+value).join('\n');
  });
}
let currentStep=0;
function validStep(){for(const input of form.querySelector('[data-step="'+currentStep+'"]').querySelectorAll('input, select, textarea')){if(!input.checkValidity()){input.reportValidity();return false;}}return true;}
function showStep(step,focus=true){currentStep=step;form.querySelectorAll('[data-step]').forEach(el=>el.hidden=Number(el.dataset.step)!==step);document.querySelectorAll('[data-progress]').forEach(el=>el.classList.toggle('current',Number(el.dataset.progress)===step));updateEstimate();if(step===2)renderSummary();document.querySelector('#planner-status').textContent='';if(focus){const title=form.querySelector('[data-step="'+step+'"] h3');title.setAttribute('tabindex','-1');title.focus({preventScroll:true});document.querySelector('.planner-panel').scrollIntoView({behavior:'smooth',block:'start'});}}
form?.querySelectorAll('[data-next]').forEach(button=>button.addEventListener('click',()=>{if(validStep())showStep(Number(button.dataset.next));}));
form?.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>showStep(Number(button.dataset.back))));
form?.addEventListener('submit',event=>{event.preventDefault();if(currentStep<2&&validStep())showStep(currentStep+1);});
document.querySelector('#quick-form')?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);if(data.get('size'))form.elements.tvSize.value=data.get('size');form.elements.zip.value=data.get('zip');showStep(0,false);document.querySelector('#planner').scrollIntoView({behavior:'smooth'});});
function planEntries(){const data=new FormData(form),selection=readSelection(),estimate=window.BoltzPricing.calculate(selection);const rows=[['TV size',data.get('tvSize')],['TV count',data.get('tvCount')],['Wall material',data.get('wall')],['Mount style',data.get('mount')],['Extras',data.getAll('extras').join(', ')||'No extras selected']];if(selection.extras.includes('Wire concealment'))rows.push(['Cable method',selection.cableMethod]);return [...rows,['Estimated price',estimateAmount(estimate)],['ZIP code',data.get('zip')||'To be confirmed'],['Project type',data.get('property')],['Project notes',data.get('notes')?.trim()||'None added']];}
function renderSummary(){document.querySelector('#plan-summary').innerHTML=planEntries().map(([key,value])=>'<div><dt>'+escapeHtml(key)+'</dt><dd>'+escapeHtml(value)+'</dd></div>').join('');}
function planText(){const estimate=window.BoltzPricing.calculate(readSelection());return 'BOLTZ TV SETUP\nYour installation estimate\nboltztvsetup.com\n\n'+planEntries().map(([key,value])=>key+': '+value).join('\n')+'\n\nESTIMATED PRICE BREAKDOWN (USD)\n'+estimate.lines.map(line=>line.label+' x '+line.quantity+': '+window.BoltzPricing.money([line.amount,line.amountMax])).join('\n')+(estimate.reasons.length?'\nNeeds confirmation: '+estimate.reasons.join(' '):'')+'\n\nPrices are estimates, subject to project review. Excludes tax, travel, nonstandard materials and electrical work. This is not a binding quote or confirmed booking. It has not been sent to Boltz. Pricing, service area and availability must be confirmed separately.\n';}
let toastTimer;
function toast(text){const el=document.querySelector('.toast');el.textContent=text;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4000);}
document.querySelector('#download-plan')?.addEventListener('click',()=>{const blob=new Blob([planText()],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Boltz-TV-Setup-Estimate.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);document.querySelector('#planner-status').textContent='Your download is ready. This plan has not been submitted to Boltz.';});
document.querySelector('#copy-plan')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(planText());toast('Project details copied.');}catch{const text=document.createElement('textarea');text.value=planText();text.setAttribute('aria-label','Project plan to copy');text.rows=10;dialogContent.innerHTML='<h2>Copy your project plan</h2><p>Select the text below and copy it, or use the download button in your plan.</p>';dialogContent.appendChild(text);text.style.width='100%';dialog.showModal();text.select();}});
document.querySelector('#start-over')?.addEventListener('click',()=>{form.reset();estimateRequest?.reset();showStep(0);toast('Ready for a new setup.');});

const policies={
  privacy:{title:'Your privacy',body:'<p>The estimate calculator works in your browser. When you send a request, FormSubmit processes your name, email and project details and forwards them to Boltz TV Setup so we can respond. FormSubmit retains submissions for 30 days.</p><p>If you download or copy a plan, you control where you save or share it. No advertising or analytics scripts are included in this version.</p><p>This site uses Google Fonts, which may receive basic network information such as your IP address when fonts load. The hosting provider may process technical request logs as part of serving the website.</p><p>A business contact and an updated privacy notice will be added before online inquiry collection is enabled.</p>'},
  terms:{title:'Using this website',body:'<p>This website helps you explore installation options and prepare an estimate. The planner does not confirm a booking or collect payment.</p><p>Installation suitability, hardware, scope, final price and availability must be confirmed for your project before work begins.</p><p>Brand and product names belong to their respective owners. No manufacturer affiliation is implied.</p><p>Booking and service terms will be provided when your installation is confirmed.</p>'},
  accessibility:{title:'A better experience for everyone',body:'<p>This website includes keyboard navigation, labeled form controls, visible focus indicators, expandable FAQs and support for reduced motion settings. Text and layouts adapt to different screen sizes.</p><p>You can use Tab to move between controls, Enter or Space to activate buttons, and Escape to close a dialog. The setup planner can be completed without a mouse.</p><p>Contact details will be added when finalized so you can report an accessibility issue or request another way to plan your installation.</p>'},
  coverage:{title:'Service availability',body:'<p>'+escapeHtml(config.serviceArea||'The service area for Boltz TV Setup is being finalized. Coverage is not currently confirmed for any particular city or ZIP code.')+'</p><p>The setup planner allows you to include your ZIP code, but does not check live coverage or reserve an appointment. Confirm availability before making installation plans.</p><a class="button" href="/#planner" id="coverage-plan">Get a free estimate</a>'}
};
document.querySelectorAll('[data-policy]').forEach(button=>button.addEventListener('click',()=>{const p=policies[button.dataset.policy];openDialog('<p class="eyebrow green">BOLTZ TV SETUP</p><h2>'+p.title+'</h2>'+p.body,button);const link=dialogContent.querySelector('#coverage-plan');if(link)link.addEventListener('click',()=>dialog.close());}));
if(config.phone||config.email||config.hours){const el=document.querySelector('#contact-details');el.replaceChildren();const address=config.address;const locationLines=address?[address.streetAddress,address.city+', '+address.state+' '+address.postalCode]:[config.serviceArea];for(const text of [config.businessName,...locationLines]){if(text)el.append(document.createTextNode(text),document.createElement('br'));}if(config.phone){const a=document.createElement('a');a.href='tel:'+config.phone.replace(/[^+\d]/g,'');a.textContent=config.phone;el.append(a,document.createElement('br'));}if(config.email){const a=document.createElement('a');a.href='mailto:'+config.email;a.className='email-icon';a.setAttribute('aria-label','Email '+config.businessName);a.title='Email us';a.innerHTML='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+icons.mail+'</svg>';el.append(a,document.createElement('br'));}if(config.hours)el.append(document.createTextNode(config.hours));}
if(config.serviceArea&&document.querySelector('#area-answer'))document.querySelector('#area-answer').textContent='Serving '+config.serviceArea+'. Coverage for your address and appointment availability must be confirmed before booking.';
if(config.phone){const phoneHref='tel:'+config.phone.replace(/[^+\d]/g,'');document.querySelectorAll('[data-business-phone]').forEach(a=>{a.href=phoneHref;});const note=document.querySelector('#booking-note');if(note){note.replaceChildren(document.createTextNode('Plan your setup online, or '));const call=document.createElement('a');call.href=phoneHref;call.textContent='call '+(config.businessName||'Boltz TV Setup')+' at '+config.phone;note.append(call,document.createTextNode(' to confirm pricing and availability. The online planner does not reserve an appointment.'));}if(document.querySelector('#booking-answer'))document.querySelector('#booking-answer').textContent='Call '+(config.businessName||'Boltz TV Setup')+' at '+config.phone+' to request an installation'+(config.serviceArea?' in '+config.serviceArea:'')+'. Your appointment and final price must be confirmed directly. You can also send your estimate request online. An appointment is confirmed directly with Boltz TV Setup.';policies.privacy.body=policies.privacy.body.replace('<p>A business contact and an updated privacy notice will be added before online inquiry collection is enabled.</p>','<p>For privacy questions, contact '+escapeHtml(config.businessName||'Boltz TV Setup')+' at '+escapeHtml(config.phone)+'.</p>');policies.accessibility.body=policies.accessibility.body.replace('<p>Contact details will be added when finalized so you can report an accessibility issue or request another way to plan your installation.</p>','<p>For help using this site or planning an installation, call '+escapeHtml(config.businessName||'Boltz TV Setup')+' at '+escapeHtml(config.phone)+'.</p>');}
if(form&&config.bookingUrl&&/^https:\/\//.test(config.bookingUrl)){document.querySelector('#booking-note').textContent='Prepare your project plan, then visit our booking page to check live availability.';const a=document.createElement('a');a.href=config.bookingUrl;a.className='button';a.textContent='Check booking availability';document.querySelector('.summary-actions').appendChild(a);document.querySelector('#booking-answer').textContent='Use our booking page to check current availability and request your appointment. Your downloaded project plan is not a confirmed booking.';}

function readSelection(){const data=new FormData(form);return {tvSize:data.get('tvSize'),tvCount:data.get('tvCount'),wall:data.get('wall'),mount:data.get('mount'),extras:data.getAll('extras'),cableMethod:data.get('cableMethod'),property:data.get('property')};}
function estimateAmount(estimate){if(estimate.state==='empty')return 'Choose your TV size';if(estimate.state==='custom')return 'Custom quote';return (estimate.state==='partial'?'From ':'')+window.BoltzPricing.money([estimate.knownSubtotal,estimate.knownSubtotalMax]);}
function updateEstimate(){
  const selection=readSelection(),estimate=window.BoltzPricing.calculate(selection),money=window.BoltzPricing.money;
  document.querySelector('#cable-options').hidden=!selection.extras.includes('Wire concealment');
  document.querySelector('#estimate-amount').textContent=estimateAmount(estimate);
  document.querySelector('#estimate-reasons').textContent=estimate.reasons.join(' ')||(selection.tvCount==='1 TV'?'For 1 TV with your selected options.':'For '+selection.tvCount+' with the same options on every TV.');
  document.querySelector('#estimate-breakdown').hidden=!estimate.lines.length;
  document.querySelector('#estimate-lines').innerHTML=estimate.lines.map(line=>'<div><dt>'+escapeHtml(line.label)+(line.quantity>1?' × '+line.quantity:'')+'</dt><dd>'+money([line.amount,line.amountMax])+'</dd></div>').join('')+(estimate.lines.length?'<div class="estimate-subtotal"><dt>Known items subtotal</dt><dd>'+money([estimate.knownSubtotal,estimate.knownSubtotalMax])+'</dd></div>':'');
}
form?.addEventListener('change',updateEstimate);
document.querySelectorAll('[data-price-size]').forEach(button=>button.addEventListener('click',()=>{form.elements.tvSize.value=button.dataset.priceSize;showStep(0,false);document.querySelector('#planner').scrollIntoView({behavior:'smooth'});}));
document.querySelectorAll('[data-base-price]').forEach(el=>el.textContent=window.BoltzPricing.money(config.pricing.tv[el.dataset.basePrice]));
document.querySelectorAll('[data-rate-group]').forEach(el=>el.textContent='+'+window.BoltzPricing.money(config.pricing[el.dataset.rateGroup][el.dataset.rateKey]));
if(document.querySelector('#pricing-faq'))document.querySelector('#pricing-faq').textContent='TV mounting prices are '+Object.entries(config.pricing.tv).map(([size,rate])=>window.BoltzPricing.money(rate)+' for '+size.toLowerCase()).join(', ')+'. Use the planner to include your mount, wall and optional services. Confirm the final quote before booking. Tax, travel and nonstandard materials are separate.';
if(form)updateEstimate();

if(config.aboutContactName&&document.querySelector('#about-contact-name'))document.querySelector('#about-contact-name').textContent=config.aboutContactName;

if(config.email)document.querySelectorAll('[data-business-email]').forEach(a=>a.href='mailto:'+config.email);
if(form){const service=new URLSearchParams(location.search).get("service");const extras={"wire-concealment":"Wire concealment","soundbar-installation":"Soundbar installation","frame-tv-installation":"Frame / art TV","fireplace-tv-mounting":"Above fireplace"};if(extras[service])form.querySelector('[name="extras"][value="'+extras[service]+'"]').checked=true;if(service==="commercial-tv-installation"){form.elements.tvCount.value="2 TVs";form.elements.property.value="Office / business";}updateEstimate();}
const activeSection=location.pathname.split("/")[1];document.querySelectorAll("#navigation a").forEach(a=>{if(activeSection&&a.getAttribute("href")==="/"+activeSection+"/")a.setAttribute("aria-current","page");});

document.querySelectorAll("[data-work-src]").forEach(button=>button.addEventListener("click",()=>{openDialog('<div class="work-lightbox"><img src="'+escapeHtml(button.dataset.workSrc)+'" alt="'+escapeHtml(button.querySelector("img").alt)+'"><h2>'+escapeHtml(button.dataset.workTitle)+'</h2><p>'+escapeHtml(button.dataset.workDescription)+'</p></div>',button);}));
