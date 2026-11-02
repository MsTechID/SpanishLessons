/* ============================================================ TRIP APP: render, search, tabs ============================================================ */
const norm = s => String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[¿?¡!.,…"'’“”()]/g," ").replace(/\s+/g," ").trim();
const store = {
  get(k,d){ try{ const v=localStorage.getItem("viaje."+k); return v===null?d:JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem("viaje."+k, JSON.stringify(v)); }catch(e){} }
};
let RATE = store.get("rate", 40);
let SHOW_USD = store.get("usd", false);
const usd = n => { const v=n/RATE; return v<10 ? v.toFixed(1).replace(/\.0$/,"") : Math.round(v); };
const fmtPeso = n => "$" + n.toLocaleString("es-UY");

const ICON = {
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg>',
  car:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 16V11l2-5h10l2 5v5" stroke-linejoin="round"/><path d="M3 16h18v3H3z" stroke-linejoin="round"/><circle cx="7.5" cy="19" r="1.4" fill="currentColor"/><circle cx="16.5" cy="19" r="1.4" fill="currentColor"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-6-5.6-6-11a6 6 0 0 1 12 0c0 5.4-6 11-6 11z"/><circle cx="12" cy="10" r="2.2"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

/* ---------- generic blocks ---------- */
function rowHTML(o, extra=""){
  const note=o.note?`<span class="note">${esc(o.note)}</span>`:"";
  const tag=o.tag==="fam"?` <span class="tag" title="Familiar, safe pick">safe pick</span>`:"";
  return `<div class="row">${sayButton(o)}<div class="en quizzable"><span class="en-content">${esc(o.en)}${tag}${note}${extra}</span><button type="button" class="reveal">Show answer</button></div></div>`;
}
function renderRowsOpt(b){
  const head=b.h?`<div class="block-head"><h2>${esc(b.h)}</h2><span class="en">${esc(b.en||"")}</span></div>`:"";
  return `<section class="block">${head}<div class="rows">${b.items.map(o=>rowHTML(o)).join("")}</div>${b.note?`<p class="pron-note">${esc(b.note)}</p>`:""}</section>`;
}
function renderConverter(){
  return `<section class="block"><div class="conv" data-conv>
    <div class="conv-title">¿Cuánto es en dólares? <span>Peso → dollar</span></div>
    <div class="conv-row">
      <label class="conv-in"><span>$</span><input type="number" inputmode="decimal" min="0" placeholder="pesos" data-conv-pesos aria-label="Price in pesos"></label>
      <span class="conv-eq">≈</span>
      <output class="conv-out" data-conv-out>US$ —</output>
    </div>
    <div class="conv-rate">Rate: <input type="number" inputmode="decimal" min="1" step="0.5" value="${RATE}" data-conv-rate aria-label="Pesos per dollar"> pesos per US$ <span class="conv-hint">· check the real rate when you land</span></div>
  </div></section>`;
}
function renderBlock(b){
  if(b.type==="aside") return renderAside(b);
  if(b.type==="nums") return renderNums(b);
  if(b.type==="converter") return renderConverter();
  return renderRowsOpt(b);
}
function miniSay(es,en){
  return `<button class="say say-mini" type="button" data-slug="${slugify(es)}" data-say="${esc(es)}" data-es="${esc(es)}" data-en="${esc(en)}" data-ph="" aria-label="Escuchar “${esc(es)}”">${SPK}</button>`;
}
function catHead(es,en,id){
  return `<div class="cat-head" ${id?`id="${id}"`:""}><h2>${esc(es)}${miniSay(es,en)}</h2><p>${esc(en)}</p></div>`;
}

/* ---------- FRASES ---------- */
function renderFrases(){
  const chips=`<div class="chiprow" role="toolbar" aria-label="Categories">
    <button class="chip" data-cat="all" aria-pressed="true">Todo</button>
    ${CATS.map(c=>`<button class="chip" data-cat="${c.id}" aria-pressed="false">${esc(c.es)}</button>`).join("")}
  </div>`;
  const cats=CATS.map(c=>`<div class="cat" data-catid="${c.id}">${catHead(c.es,c.en,"cat-"+c.id)}${c.blocks.map(renderBlock).join("")}</div>`).join("");
  return `<div class="lesson-head"><div class="lesson-kicker">Frases</div><h1>Frases para el viaje</h1><p>Tap a category, or type anything in the search box. Tap any Spanish to hear it.</p></div>${chips}<div class="cats">${cats}</div>`;
}

/* ---------- MENÚ ---------- */
function priceHTML(n,unit){
  if(n==null) return "";
  const u=unit?` <span class="unit">${esc(unit)}</span>`:"";
  return `<span class="price" data-uyu="${n}">${fmtPeso(n)}<span class="usd"> · ≈US$${usd(n)}</span></span>${u}`;
}
const GLOSS_INDEX = {};
MENU_GLOSS.forEach(s=>s.items.forEach(o=>{ GLOSS_INDEX[norm(o.es)]=o; }));
function glossFor(es){
  // best-effort English for a sample-menu line: exact match, else the longest glossary term it contains
  const n=norm(es);
  if(GLOSS_INDEX[n]) return GLOSS_INDEX[n].en;
  let best=null;
  Object.keys(GLOSS_INDEX).forEach(k=>{ const kk=k.replace(/^(el|la|los|las|un|una) /,""); if(n.includes(kk) && (!best||kk.length>best.k.length)) best={k:kk,en:GLOSS_INDEX[k].en}; });
  return best?best.en:"";
}
const MENU_EN = {
  "la morcilla dulce":"sweet blood sausage with nuts & orange peel",
  "la empanada de carne":"beef empanada","la empanada de pescado":"fish empanada","la empanada de camarones":"shrimp empanada",
  "la empanada de siri":"crab empanada","la empanada de jamón y queso":"ham & cheese empanada","la empanada de pollo":"chicken empanada",
  "el pollo deshuesado":"boneless grilled chicken","la parrillada para dos":"mixed grill for two",
  "la milanesa a la napolitana con fritas":"napolitana milanesa with fries",
  "el flan con dulce de leche":"caramel custard with dulce de leche",
  "la merluza a la romana con fritas":"battered hake with fries","la brótola a la plancha con puré":"grilled brótola with mashed potatoes",
  "la corvina a la parrilla":"grilled croaker","el sándwich de milanesa de pescado":"breaded fish sandwich",
  "la torta de la casa":"house cake","el tostado de jamón y queso":"grilled ham & cheese sandwich",
  "el desayuno completo":"full breakfast","el jugo de naranja":"orange juice","el licuado de frutilla":"strawberry smoothie",
  "la muzzarella entera":"whole cheese pizza","la porción de muzzarella":"slice of cheese pizza",
  "la pizza napolitana":"pizza with tomato slices & garlic","el chivito canadiense":"chivito with Canadian bacon",
  "la docena de empanadas":"a dozen empanadas","el cucurucho chico":"small cone","el cucurucho grande":"large cone",
  "el cubierto":"cover charge",
};
function menuItemHTML([es,price,unit]){
  const en=MENU_EN[es]||glossFor(es);
  return `<div class="mi"><div class="mi-line">${sayButton({es,en})}<span class="mi-dots" aria-hidden="true"></span>${priceHTML(price,unit)}</div>${en?`<div class="mi-en quizzable"><span class="en-content">${esc(en)}</span><button type="button" class="reveal">Show answer</button></div>`:""}</div>`;
}
function renderCarta(m){
  const secs=m.sections.map(s=>`<div class="carta-sec"><h4>${esc(s.h)}</h4>${s.items.map(menuItemHTML).join("")}</div>`).join("");
  const foot=m.footer?`<div class="carta-foot">${m.footer.map(menuItemHTML).join("")}</div>`:"";
  return `<article class="carta" id="carta-${m.id}">
    <header class="carta-head"><div class="carta-kicker">Menú de ejemplo</div><h3>${esc(m.es)}${miniSay(m.es,m.en)}</h3><p>${esc(m.en)}</p></header>
    <div class="carta-body">${secs}</div>${foot}
    <p class="carta-note">${esc(m.note)}</p>
  </article>`;
}
function renderMenu(){
  const nav=`<div class="chiprow" role="toolbar" aria-label="Sample menus">
    ${SAMPLE_MENUS.map(m=>`<a class="chip" href="#carta-${m.id}" data-jump="carta-${m.id}">${esc(m.es)}</a>`).join("")}
    <a class="chip" href="#menu-gloss" data-jump="menu-gloss">Decoder A–Z</a>
  </div>`;
  const howto=renderAside({cls:"warm", h:"Cómo leer la carta — reading the menu", body:[
    "<b>$</b> = pesos. <b>Cubierto</b> = per-person cover charge. <b>Propina</b> (tip) ≈ 10%, often in cash.",
    "At a <b>parrilla</b>, meat usually comes alone: order <b>guarniciones</b> (sides) separately. Portions are big, so sharing is normal: say <b>“para compartir.”</b>",
    "<b>Al plato</b> = on a plate (not in a sandwich). <b>Al pan</b> = in bread. <b>Completo/a</b> = with everything."
  ], chips:[P("el cubierto","cover charge"),P("la propina","the tip"),P("las guarniciones","sides"),P("Para compartir","To share")]});
  const toggle=`<div class="usd-toggle"><label><input type="checkbox" id="usdToggle" ${SHOW_USD?"checked":""}> Show ≈US$ next to prices</label></div>`;
  const cartas=SAMPLE_MENUS.map(renderCarta).join("");
  const gloss=MENU_GLOSS.map(s=>renderRowsOpt(s)).join("");
  return `<div class="lesson-head"><div class="lesson-kicker">Menú</div><h1>La carta</h1><p>Five sample menus modeled on the kinds of places around Piriápolis, plus a decoder for menu words. Prices are rough 2026 examples, so expect real menus to vary.</p></div>
    ${nav}${renderConverter()}${howto}${toggle}
    <div class="cartas">${cartas}</div>
    <div id="menu-gloss">${catHead("Diccionario de la carta","Menu decoder — tap a word to hear it")}${gloss}</div>`;
}

/* ---------- PASEOS ---------- */
function excCard(x){
  const done=store.get("done",{})[x.id];
  const tags=x.tags.map(t=>`<span class="xtag">${esc(t)}</span>`).join("");
  const tips=x.tips.map(t=>`<li>${esc(t)}</li>`).join("");
  const links=x.links.map(([t,u])=>{
    const internal=u.startsWith("#");
    return `<a class="lnk" href="${esc(u)}" ${internal?`data-jump="${esc(u.slice(1))}"`:'target="_blank" rel="noopener"'}>${esc(t)}${internal?"":ICON.ext}</a>`;
  }).join("");
  const map=`<a class="lnk map" href="${GMAP(x.map)}" target="_blank" rel="noopener">${ICON.pin}Mapa</a>`;
  const say=x.say.map(sayButton).join("");
  return `<article class="exc${done?" is-done":""}" id="exc-${x.id}" data-size="${x.size}" data-tags="${esc(x.tags.join("|"))}">
    <div class="exc-top"><span class="size s-${x.size}">${SIZE_LABEL[x.size].es}</span>${tags}
      <label class="done"><input type="checkbox" data-done="${x.id}" ${done?"checked":""}> Hecho</label></div>
    <h3>${esc(x.name)}</h3>
    <div class="exc-es">${sayButton({es:x.es,en:x.name})}</div>
    <div class="exc-meta"><span>${ICON.clock}${esc(x.time)}</span><span>${ICON.car}${esc(x.dist)}</span></div>
    <p class="exc-blurb">${esc(x.blurb)}</p>
    <ul class="exc-tips">${tips}</ul>
    <div class="exc-say"><span class="exc-say-lab">Handy here</span><div class="chips">${say}</div></div>
    <div class="exc-links">${links}${map}</div>
  </article>`;
}
function renderPaseos(){
  const filters=[["all","Todo"],["grande","Grande"],["mediano","Mediano"],["pequeno","Pequeño"],["Rain OK","Rain OK"],["Sunset","Sunset"],["undone","Not done yet"]];
  const chips=`<div class="chiprow" role="toolbar" aria-label="Filter outings">${filters.map(([k,l],i)=>`<button class="chip" data-xf="${esc(k)}" aria-pressed="${i===0}">${esc(l)}</button>`).join("")}</div>`;
  const groups=["grande","mediano","pequeno"].map(sz=>{
    const cards=EXC.filter(x=>x.size===sz).map(excCard).join("");
    return `<section class="xgroup" data-group="${sz}">${catHead(SIZE_LABEL[sz].es,SIZE_LABEL[sz].en)}<div class="xgrid">${cards}</div></section>`;
  }).join("");
  const tip=renderAside({h:"Cómo elegir — how to pick", body:[
    "Ordered from biggest to smallest. A good rhythm: one <b>Grande</b> day, then a <b>Mediano</b> or <b>Pequeño</b> day to recover. Tick <b>Hecho</b> when you’ve done one (it’s saved on this phone).",
    "Hours and prices change with the season. Check before you drive, and ask the Piriápolis tourist office (next to the Argentino Hotel) about events."
  ]});
  return `<div class="lesson-head"><div class="lesson-kicker">Paseos</div><h1>¿Qué hacemos hoy?</h1><p>Outings around Piriápolis, biggest to smallest. Pick and choose on any given day.</p></div>${tip}${chips}${groups}`;
}

/* ---------- mount ---------- */
document.getElementById("p-frases").innerHTML=renderFrases();
document.getElementById("p-menu").innerHTML=renderMenu();
document.getElementById("p-paseos").innerHTML=renderPaseos();
document.body.classList.toggle("show-usd",SHOW_USD);

/* ---------- tabs ---------- */
const TABS=[...document.querySelectorAll(".tab")];
const PANELS={frases:document.getElementById("p-frases"),menu:document.getElementById("p-menu"),paseos:document.getElementById("p-paseos")};
function showTab(id,opts={}){
  TABS.forEach(t=>t.setAttribute("aria-selected",t.dataset.tab===id?"true":"false"));
  Object.entries(PANELS).forEach(([k,p])=>p.hidden=(k!==id));
  document.body.dataset.tab=id;
  if(!opts.keepSearch) clearSearch();
  closePlayer();
  if(!opts.noScroll) window.scrollTo({top:0});
  store.set("tab",id);
}
TABS.forEach(t=>t.addEventListener("click",()=>showTab(t.dataset.tab)));
function jumpTo(id){
  const el=document.getElementById(id); if(!el) return;
  const panel=el.closest(".sheet"); const tabId=Object.keys(PANELS).find(k=>PANELS[k]===panel);
  if(tabId) showTab(tabId,{noScroll:true});
  if(tabId==="frases") setCat("all");
  if(tabId==="paseos") setXF("all");
  requestAnimationFrame(()=>{ el.scrollIntoView({behavior:"smooth",block:"start"}); el.classList.add("flash"); setTimeout(()=>el.classList.remove("flash"),1600); });
}

/* ---------- category filter (Frases) ---------- */
function setCat(id){
  document.querySelectorAll('#p-frases .chip').forEach(c=>c.setAttribute("aria-pressed",c.dataset.cat===id?"true":"false"));
  document.querySelectorAll('#p-frases .cat').forEach(c=>c.hidden=!(id==="all"||c.dataset.catid===id));
}
/* ---------- outing filter (Paseos) ---------- */
function setXF(k){
  const done=store.get("done",{});
  document.querySelectorAll('#p-paseos .chip').forEach(c=>c.setAttribute("aria-pressed",c.dataset.xf===k?"true":"false"));
  document.querySelectorAll('#p-paseos .exc').forEach(card=>{
    const tags=card.dataset.tags.split("|");
    let show = k==="all" || card.dataset.size===k || tags.includes(k) || (k==="undone" && !done[card.id.replace(/^exc-/,"")]);
    card.hidden=!show;
  });
  document.querySelectorAll('#p-paseos .xgroup').forEach(g=>g.hidden=![...g.querySelectorAll(".exc")].some(c=>!c.hidden));
}

/* ---------- converter + USD ---------- */
function refreshPrices(){
  document.querySelectorAll(".price").forEach(p=>{ const u=p.querySelector(".usd"); if(u) u.textContent=" · ≈US$"+usd(+p.dataset.uyu); });
  document.querySelectorAll("[data-conv]").forEach(c=>{
    const v=parseFloat(c.querySelector("[data-conv-pesos]").value);
    c.querySelector("[data-conv-out]").textContent = isFinite(v)&&v>0 ? "US$"+(v/RATE).toFixed(2) : "US$ —";
    const r=c.querySelector("[data-conv-rate]"); if(document.activeElement!==r) r.value=RATE;
  });
}
document.addEventListener("input",e=>{
  if(e.target.matches("[data-conv-pesos]")){ refreshPrices(); return; }
  if(e.target.matches("[data-conv-rate]")){ const v=parseFloat(e.target.value); if(isFinite(v)&&v>0){ RATE=v; store.set("rate",RATE); refreshPrices(); } return; }
});
document.addEventListener("change",e=>{
  if(e.target.id==="usdToggle"){ SHOW_USD=e.target.checked; store.set("usd",SHOW_USD); document.body.classList.toggle("show-usd",SHOW_USD); return; }
  if(e.target.matches("[data-done]")){
    const d=store.get("done",{}); const id=e.target.dataset.done;
    if(e.target.checked) d[id]=1; else delete d[id];
    store.set("done",d); e.target.closest(".exc").classList.toggle("is-done",e.target.checked);
    const pressed=document.querySelector('#p-paseos .chip[aria-pressed="true"]'); if(pressed&&pressed.dataset.xf==="undone") setXF("undone");
  }
});

/* ---------- search ---------- */
const SEARCH=[];
(function buildIndex(){
  const seen=new Set();
  const add=(kind,o,label,extra={})=>{ const key=kind+"|"+norm(o.es); if(seen.has(key)) return; seen.add(key); SEARCH.push({kind,o,label,hay:norm(o.es+" "+o.en+" "+(o.note||"")+" "+(extra.more||"")),es:norm(o.es),en:norm(o.en),...extra}); };
  CATS.forEach(c=>c.blocks.forEach(b=>{
    if(b.items && b.type!=="nums") b.items.forEach(o=>add("frase",o,c.es,{cat:c.id}));
    if(b.type==="nums") b.items.forEach(n=>add("frase",{es:n.w,en:n.v},c.es,{cat:c.id}));
    if(b.chips) b.chips.forEach(o=>add("frase",o,c.es,{cat:c.id}));
  }));
  MENU_GLOSS.forEach(s=>s.items.forEach(o=>add("menu",o,"Menú · "+s.h)));
  SAMPLE_MENUS.forEach(m=>m.sections.forEach(s=>s.items.forEach(([es])=>add("menu",{es,en:MENU_EN[es]||glossFor(es)},"Menú · "+m.es))));
  EXC.forEach(x=>SEARCH.push({kind:"paseo",x,hay:norm([x.name,x.es,x.blurb,x.tags.join(" "),x.tips.join(" "),SIZE_LABEL[x.size].es].join(" ")),es:norm(x.es),en:norm(x.name)}));
})();
const qEl=document.getElementById("q"), qClear=document.getElementById("qClear"), results=document.getElementById("results");
const SYN={bathroom:["bano","restroom","toilet"],toilet:["bano","bathroom","restroom"],restroom:["bano","bathroom"],bano:["bathroom","restroom"],
  check:["cuenta"],bill:["cuenta","check"],atm:["cajero"],cash:["efectivo"],money:["plata"],gas:["nafta","gasoline"],gasoline:["nafta"],petrol:["nafta"],
  pay:["pagar","pago"],card:["tarjeta"],credit:["credito","tarjeta"],water:["agua"],coffee:["cafe"],icecream:["helado"],help:["ayuda"],doctor:["medico"],
  steak:["bife","entrecot"],beef:["carne","asado","bife"],fish:["pescado","merluza"],chicken:["pollo"],shrimp:["camarones"],sunscreen:["protector"],
  wifi:["wifi","clave"],password:["clave"],ticket:["entrada"],tickets:["entrada","entradas"],price:["cuanto","sale"],cost:["cuanto","sale"],"how much":["cuanto"]};
function score(item,terms,full){
  let s=0;
  for(const t of terms){ if(item.hay.includes(t)){ s+=1; continue; } const alt=SYN[t]; if(alt&&alt.some(a=>item.hay.includes(a))){ s+=.8; continue; } return 0; }
  if(item.es===full||item.en===full) s+=10;
  if(item.es.startsWith(full)||item.en.startsWith(full)) s+=4;
  if(item.es.includes(full)||item.en.includes(full)) s+=2;
  if(item.kind==="frase") s+=.5;
  return s;
}
function runSearch(){
  const raw=qEl.value; const full=norm(raw);
  qClear.hidden=!raw;
  if(full.length<2){ results.hidden=true; document.body.classList.remove("searching"); return; }
  const terms=full.split(" ").filter(Boolean);
  const hits=SEARCH.map(it=>({it,s:score(it,terms,full)})).filter(h=>h.s>0).sort((a,b)=>b.s-a.s);
  const fr=hits.filter(h=>h.it.kind==="frase").slice(0,40), mn=hits.filter(h=>h.it.kind==="menu").slice(0,30), px=hits.filter(h=>h.it.kind==="paseo").slice(0,8);
  const sec=(title,en,body,n)=>n?`<section class="block"><div class="block-head"><h2>${title}</h2><span class="en">${en} · ${n}</span></div>${body}</section>`:"";
  const rows=list=>`<div class="rows">${list.map(h=>rowHTML(h.it.o,`<span class="where">${esc(h.it.label)}</span>`)).join("")}</div>`;
  const pcards=`<div class="xlite">${px.map(h=>`<button type="button" class="xl" data-jump="exc-${h.it.x.id}"><span class="size s-${h.it.x.size}">${SIZE_LABEL[h.it.x.size].es}</span><b>${esc(h.it.x.name)}</b><span>${esc(h.it.x.time)} · ${esc(h.it.x.dist)}</span></button>`).join("")}</div>`;
  const body = sec("Frases","Phrases",rows(fr),fr.length)+sec("Menú","Menu words",rows(mn),mn.length)+sec("Paseos","Outings",pcards,px.length);
  results.innerHTML=`<div class="lesson-head"><div class="lesson-kicker">Buscar</div><h1>“${esc(raw.trim())}”</h1><p>${hits.length?`${fr.length+mn.length+px.length} matches`:"No matches."}</p></div>`+
    (body||`<div class="aside warm"><h3>Nada todavía</h3><p>Try a simpler word in English or Spanish (accents don’t matter), like <b>bathroom</b>, <b>pago</b>, <b>chicken</b> or <b>castle</b>. Or ask someone: <b>¿Cómo se dice…?</b></p><div class="chips">${sayButton(P("¿Cómo se dice?","How do you say…?"))}${sayButton(P("¿Me lo podés escribir?","Can you write it down for me?"))}</div></div>`);
  results.hidden=false; document.body.classList.add("searching");
}
function clearSearch(){ if(!qEl.value&&results.hidden) return; qEl.value=""; runSearch(); }
qEl.addEventListener("input",()=>{ closePlayer(); runSearch(); });
qEl.addEventListener("keydown",e=>{ if(e.key==="Escape"){ clearSearch(); qEl.blur(); } if(e.key==="Enter") qEl.blur(); });
qClear.addEventListener("click",()=>{ clearSearch(); qEl.focus(); });

/* ---------- show-it-big overlay ---------- */
const big=document.getElementById("bigshow");
const showBtn=document.createElement("button");
showBtn.type="button"; showBtn.className="pl-show"; showBtn.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke-linecap="round"/></svg>Mostrar en grande <span>show it</span>';
player.appendChild(showBtn);
showBtn.addEventListener("click",e=>{
  e.stopPropagation();
  if(!currentBtn) return;
  document.getElementById("bigEs").textContent=currentBtn.dataset.es;
  document.getElementById("bigEn").textContent=currentBtn.dataset.en||"";
  big.hidden=false; document.body.classList.add("big-open");
});
big.addEventListener("click",()=>{ big.hidden=true; document.body.classList.remove("big-open"); });

/* ---------- clicks for chips/jumps (capture so the player logic doesn't swallow them) ---------- */
document.addEventListener("click",e=>{
  const cat=e.target.closest("#p-frases .chip[data-cat]");
  if(cat){ setCat(cat.dataset.cat); if(cat.dataset.cat!=="all"){ const t=document.getElementById("cat-"+cat.dataset.cat); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}); } return; }
  const xf=e.target.closest("#p-paseos .chip[data-xf]");
  if(xf){ setXF(xf.dataset.xf); return; }
  const j=e.target.closest("[data-jump]");
  if(j){ e.preventDefault(); clearSearch(); jumpTo(j.dataset.jump); return; }
},true);
document.addEventListener("keydown",e=>{ if(e.key==="Escape"&&!big.hidden){ big.hidden=true; document.body.classList.remove("big-open"); } });

showTab(store.get("tab","frases"),{noScroll:true});
setCat("all"); setXF("all"); refreshPrices();
