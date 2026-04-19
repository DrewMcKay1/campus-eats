import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { supabase } from "./supabaseClient";

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,500;6..12,600;6..12,700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Nunito Sans',sans-serif;font-size:14px;line-height:1.55;background:#F0F2F5;color:#1A1F2E;-webkit-font-smoothing:antialiased;}
h1,h2,h3,h4{font-family:'Manrope',sans-serif;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px;}
::-webkit-scrollbar-track{background:transparent;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes modalIn{from{opacity:0;transform:translate(-50%,-50%) scale(.95)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}
.fade-up{animation:fadeUp .22s ease both}
button{font-family:'Nunito Sans',sans-serif;cursor:pointer;}
input,select,textarea{font-family:'Nunito Sans',sans-serif;font-size:13.5px;}
input:focus,select:focus,textarea:focus{outline:none;}
.pill{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;border:1.5px solid transparent;transition:all .13s;user-select:none;}
.pill.off{background:#F0F2F5;color:#64748B;border-color:#E2E8F0;}
.pill.off:hover{border-color:#94A3B8;color:#334155;}
.day-btn{width:100%;display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-radius:6px;border:none;background:transparent;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;transition:all .12s;cursor:pointer;font-family:'Nunito Sans',sans-serif;}
.day-btn:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.85);}
.day-btn.active{background:rgba(255,255,255,.13);color:#fff;}
.abtn{display:inline-flex;align-items:center;justify-content:center;gap:5px;padding:7px 13px;border-radius:6px;font-size:12.5px;font-weight:700;border:1.5px solid #E2E8F0;background:#fff;color:#475569;transition:all .14s;font-family:'Nunito Sans',sans-serif;cursor:pointer;}
.abtn:hover{background:#F8FAFC;border-color:#CBD5E1;}
.abtn:active{transform:scale(.97);}
.abtn.pri{background:#1B3A2D;border-color:#1B3A2D;color:#fff;}
.abtn.pri:hover{background:#243F32;}
.abtn.shop-on{background:#F0FDF4;border-color:#16A34A;color:#059669;}
.abtn.shop-on:hover{background:#DCFCE7;}
.icon-btn{border:none;background:transparent;padding:3px 5px;border-radius:5px;font-size:14px;cursor:pointer;transition:background .12s;line-height:1;}
.icon-btn:hover{background:#F0F2F5;}
.icon-btn.fav-on{color:#EF4444;}
.icon-btn.dis-on{color:#64748B;}
.check-box{width:17px;height:17px;border-radius:4px;border:2px solid #CBD5E1;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all .13s;}
.check-box.on{background:#1B3A2D;border-color:#1B3A2D;}
.meal-card{background:#fff;border:1.5px solid #E8EBF0;border-radius:10px;padding:18px 18px 16px 22px;display:flex;flex-direction:column;transition:box-shadow .16s,border-color .16s;position:relative;}
.meal-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.07);border-color:#CBD5E1;}
.meal-card.swap-pick{border-color:#16A34A;box-shadow:0 0 0 3px rgba(22,163,74,.15);cursor:pointer;}
.meal-card.swap-sel{border-color:#16A34A;background:#F0FDF4;box-shadow:0 0 0 3px rgba(22,163,74,.25);}
.rec-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:6px;cursor:pointer;transition:background .1s;}
.rec-row:hover{background:#F8FAFC;}
.rec-row.sel{background:#F0FDF4;}

/* ── MOBILE ── */
.m-header{position:fixed;top:0;left:0;right:0;height:56px;background:#1A1F2E;display:flex;align-items:center;justify-content:space-between;padding:0 16px;z-index:100;border-bottom:1px solid #252D3E;transition:transform .26s cubic-bezier(.4,0,.2,1);will-change:transform;}
.m-bottom-nav{position:fixed;bottom:0;left:0;right:0;height:68px;background:#1A1F2E;display:flex;align-items:center;border-top:1px solid #252D3E;z-index:100;padding-bottom:env(safe-area-inset-bottom,0);}
.m-tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:none;background:transparent;color:rgba(255,255,255,.4);font-family:'Nunito Sans',sans-serif;cursor:pointer;padding:6px 0;transition:color .12s,background .12s;-webkit-tap-highlight-color:transparent;border-radius:8px;}
.m-tab.active{color:#059669;background:rgba(255,255,255,.06);}
.m-tab-icon{font-size:20px;line-height:1;}
.m-tab-label{font-size:10px;font-weight:700;letter-spacing:.03em;}
.m-tab-plan{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:0;border:none;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;padding:0;margin:0;}
.m-tab-plan-circle{width:76px;height:76px;border-radius:50%;background:#252D3E;border:2px solid #0D1117;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;font-size:28px;margin-top:-34px;margin-bottom:-8px;transition:transform .12s,border-color .12s,background .12s;filter:none;}
.m-tab-plan-circle.active{border-color:#2A3850;background:#2E3A4E;}
.m-tab-plan:active .m-tab-plan-circle{transform:scale(.93);}
.m-tab-plan-emoji{font-size:28px;line-height:1;filter:brightness(0) invert(1);}
.m-tab-plan-label{font-size:9.5px;font-weight:700;letter-spacing:.04em;font-family:'Nunito Sans',sans-serif;color:rgba(255,255,255,.45);line-height:1;margin-top:1px;}
.m-tab-plan-label.active{color:#059669;}
.m-content{position:fixed;top:56px;bottom:68px;left:0;right:0;overflow-y:auto;-webkit-overflow-scrolling:touch;background:#F0F2F5;transition:top .26s cubic-bezier(.4,0,.2,1);}
.m-page{padding:16px 14px 20px;min-height:100%;}
.m-day-strip{background:#1A1F2E;padding:10px 16px 12px;position:sticky;top:0;z-index:10;}
.m-day-strip-sub{overflow:hidden;transition:max-height .25s ease,opacity .25s ease,padding .25s ease;}
.m-day-strip-sub.visible{max-height:80px;opacity:1;}
.m-day-strip-sub.hidden{max-height:0;opacity:0;padding-top:0;padding-bottom:0;}
.slide-panel{position:fixed;top:0;bottom:0;width:min(82vw,300px);background:#1A1F2E;z-index:200;transition:transform .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;overflow:hidden;}
.slide-panel.left{left:0;transform:translateX(-100%);}
.slide-panel.left.open{transform:translateX(0);}
.slide-panel.right{right:0;transform:translateX(100%);}
.slide-panel.right.open{transform:translateX(0);}
.slide-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:199;opacity:0;pointer-events:none;transition:opacity .28s ease;}
.slide-overlay.open{opacity:1;pointer-events:all;}
.m-day-arrow{width:34px;height:34px;border:1.5px solid rgba(255,255,255,.22);background:transparent;border-radius:50%;color:#fff;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;transition:background .12s;flex-shrink:0;}
.m-day-arrow:active{background:rgba(255,255,255,.15);}
.m-swap-banner{position:fixed;bottom:76px;left:12px;right:12px;background:#1A1F2E;border:1.5px solid rgba(234,179,8,.4);border-radius:10px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;gap:10px;z-index:90;box-shadow:0 4px 20px rgba(0,0,0,.25);}
@keyframes slideInLeft{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideInRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.slide-left{animation:slideInLeft .2s ease both}
.slide-right{animation:slideInRight .2s ease both}
`;
import { MEALS as R } from "./mealsData.js";


/* ─── CONSTANTS ─── */
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAYS_S = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MT = ["Breakfast","Lunch","Dinner"];
const CAT_ORDER = ["Produce","Meat & Fish","Dairy & Eggs","Grains & Bread","Canned & Jarred","Pantry & Spices"];
const CAT_ICON = {"Produce":"🥦","Meat & Fish":"🍗","Dairy & Eggs":"🥚","Grains & Bread":"🌾","Canned & Jarred":"🥫","Pantry & Spices":"🧂"};
const MT_COLOR = {Breakfast:"#D97706",Lunch:"#0284C7",Dinner:"#6D28D9"};
const MT_BG    = {Breakfast:"#FEF3C7",Lunch:"#E0F2FE",Dinner:"#EDE9FE"};
const DIETARY  = ["Vegetarian","Vegan","Dairy-Free","Gluten-Free","No Pork","No Shellfish","No Peanuts"];
const CUISINES = ["American","Italian","Mexican","Asian","Mediterranean"];
const BUDGETS  = [{v:1,l:"Budget",s:"< $3 / meal"},{v:2,l:"Moderate",s:"$3–5 / meal"},{v:3,l:"Flexible",s:"$5+ / meal"}];
const EFFORTS  = [{v:1,l:"Quick",s:"< 10 min"},{v:2,l:"Easy",s:"10–20 min"},{v:3,l:"Any",s:"up to 30 min"}];
const DEFAULT_PREFS = {dietary:[],cuisine:[],maxBudget:3,maxEffort:3,avoid:[],pantryPriority:false};

/* ─── HELPERS ─── */
function sh(str) { let h=0; for(let i=0;i<str.length;i++) h=(Math.imul(31,h)+str.charCodeAt(i))|0; return Math.abs(h); }
function pick(arr,s) { return arr.length ? arr[sh(s)%arr.length] : null; }
function dc(x) { return JSON.parse(JSON.stringify(x)); }

function matchRecipes(mealType, prefs, dislikes={}, customMeals=[]) {
  const allMeals = [...R, ...customMeals];
  return allMeals.filter(r => {
    if (r.type !== mealType) return false;
    if (dislikes[r.id]) return false;
    if (r.budget > prefs.maxBudget) return false;
    if (r.effort > prefs.maxEffort) return false;
    if (prefs.dietary.includes("Vegetarian") && !r.tags.includes("Vegetarian") && !r.tags.includes("Vegan")) return false;
    if (prefs.dietary.includes("Vegan") && !r.tags.includes("Vegan")) return false;
    if (prefs.dietary.includes("No Pork") && r.ings.some(i=>/sausage|bacon|pork|ham/i.test(i.item))) return false;
    if (prefs.dietary.includes("Dairy-Free") && r.ings.some(i=>/milk|cheese|butter|cream|yogurt/i.test(i.item))) return false;
    if (prefs.dietary.includes("Gluten-Free") && r.ings.some(i=>/bread|pasta|flour|noodle|ramen|bagel|pita|tortilla|crouton|breadcrumb|pancake/i.test(i.item))) return false;
    if (prefs.dietary.includes("No Shellfish") && r.ings.some(i=>/shrimp|crab|lobster|clam|oyster|mussel/i.test(i.item))) return false;
    if (prefs.dietary.includes("No Peanuts") && r.ings.some(i=>/peanut/i.test(i.item))) return false;
    if (prefs.cuisine.length > 0 && !prefs.cuisine.some(c=>r.tags.includes(c))) return false;
    if (prefs.avoid.some(av=>r.ings.some(i=>i.item.toLowerCase().includes(av.toLowerCase())))) return false;
    return true;
  });
}

function buildWeek(prefs, key="w", dislikes={}, owned={}, customMeals=[]) {
  const allMeals = [...R, ...customMeals];
  return DAYS.map((_, di) => {
    const obj = {};
    MT.forEach((mt, mi) => {
      let pool = matchRecipes(mt, prefs, dislikes, customMeals);
      const fallback = allMeals.filter(r=>r.type===mt&&!dislikes[r.id]);
      if (!pool.length) pool = fallback.length ? fallback : allMeals.filter(r=>r.type===mt);
      // Pantry priority: sort pool so meals with more owned ingredients come first
      if (prefs.pantryPriority && Object.keys(owned).some(k=>owned[k])) {
        pool = [...pool].sort((a,b)=>{
          const scoreA = a.ings.filter(i=>owned[i.item.toLowerCase()]).length / (a.ings.length||1);
          const scoreB = b.ings.filter(i=>owned[i.item.toLowerCase()]).length / (b.ings.length||1);
          return scoreB - scoreA;
        });
      }
      obj[mt] = pick(pool, `${key}-${di}-${mi}`);
    });
    return obj;
  });
}

function getMon(off=0) {
  const n=new Date(), d=n.getDay(), m=new Date(n);
  m.setDate(n.getDate()-(d===0?6:d-1)+off*7); m.setHours(0,0,0,0); return m;
}
function getWeekDates(off=0) {
  const m=getMon(off);
  return Array.from({length:7},(_,i)=>{ const d=new Date(m); d.setDate(m.getDate()+i); return d; });
}
function todayIdx() { const d=new Date().getDay(); return d===0?6:d-1; }
function sameDay(a,b) { return a.toDateString()===b.toDateString(); }
function fmt(d) { return d.toLocaleDateString("en-US",{month:"short",day:"numeric"}); }
function fmtM(d) { return d.toLocaleDateString("en-US",{month:"long",year:"numeric"}); }
function useCost(meal) { return (meal?.ings||[]).reduce((s,i)=>s+i.use,0); }
function initOwned() {
  const s = {};
  R.forEach(r=>r.ings.forEach(i=>{ if(i.owned) s[i.item.toLowerCase()]=true; }));
  return s;
}

/* ─── SMALL UI ─── */
function CBox({on,toggle,size=17}) {
  return (
    <div className={`check-box${on?" on":""}`} onClick={toggle}
      style={{width:size,height:size,borderRadius:Math.max(3,Math.floor(size/4))}}>
      {on && <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>}
    </div>
  );
}

function Pill({label,active,color="#059669",onClick}) {
  return (
    <span onClick={onClick} className={`pill${active?"":" off"}`}
      style={active?{background:color+"22",color,borderColor:color+"66"}:{}}>
      {label}
    </span>
  );
}

function MTag({type}) {
  return <span style={{display:"inline-block",padding:"2px 8px",borderRadius:20,background:MT_BG[type],color:MT_COLOR[type],fontSize:11,fontWeight:700,letterSpacing:".04em"}}>{type.toUpperCase()}</span>;
}

function Modal({onClose,children,width=560}) {
  return (
    <>
      <div className="fade-in" onClick={onClose||undefined}
        style={{position:"fixed",inset:0,background:"rgba(15,23,42,.5)",zIndex:800,cursor:onClose?"pointer":"default"}}/>
      <div style={{
        position:"fixed",
        /* On mobile: fill most of the screen so header+footer are always reachable */
        top:"max(16px, env(safe-area-inset-top, 16px))",
        left:"50%",transform:"translateX(-50%)",
        zIndex:801,
        width:`min(${width}px,94vw)`,
        /* Max height = viewport minus top offset minus some bottom padding */
        maxHeight:"calc(100dvh - max(32px, env(safe-area-inset-top,32px)) - 16px)",
        display:"flex",
        flexDirection:"column",
        background:"#fff",
        borderRadius:12,
        boxShadow:"0 24px 64px rgba(0,0,0,.22)",
        overflow:"hidden",
        animation:"modalIn .2s ease"
      }}>
        {children}
      </div>
    </>
  );
}

function MHead({title,sub,onClose}) {
  return (
    <div style={{padding:"20px 22px 14px",borderBottom:"1px solid #F0F2F5",flexShrink:0}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div style={{flex:1}}>
          <h3 style={{fontFamily:"'Manrope',sans-serif",fontSize:20,fontWeight:800,color:"#1A1F2E"}}>{title}</h3>
          {sub && <div style={{fontSize:13,color:"#64748B",marginTop:3}}>{sub}</div>}
        </div>
        {onClose && <button onClick={onClose}
          style={{border:"none",background:"#F0F2F5",borderRadius:6,width:30,height:30,fontSize:18,color:"#94A3B8",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginLeft:12}}>×</button>}
      </div>
    </div>
  );
}

/* ─── RECIPE MODAL ─── */
function RecipeModal({meal,type,owned,onClose}) {
  const total = useCost(meal);
  const pkgTotal = (meal.ings||[]).reduce((s,i)=>s+i.pkgCost,0);
  const isEst = meal.costEstimated;
  const firstBuy = meal.ings.filter(i=>!owned[i.item.toLowerCase()]).reduce((s,i)=>s+i.pkgCost,0);
  return (
    <Modal onClose={onClose} width={580}>
      <MHead title={meal.name} onClose={onClose}
        sub={<><MTag type={type}/>{meal.custom&&<span style={{marginLeft:6,fontSize:10,background:"#EDE9FE",color:"#6D28D9",padding:"1px 6px",borderRadius:20,fontWeight:700}}>CUSTOM</span>} &nbsp;⏱ {meal.prepTime} &nbsp;·&nbsp; {meal.ings.length} ingredients</>}/>
      <div style={{overflow:"auto",flex:1,padding:"16px 22px 24px"}}>
        {meal.desc&&<p style={{fontSize:13.5,color:"#475569",lineHeight:1.65,marginBottom:16}}>{meal.desc}</p>}
        {isEst&&<div style={{fontSize:12,color:"#92400E",background:"#FFFBEB",border:"1px solid #FEF3C7",borderRadius:6,padding:"8px 11px",marginBottom:14,lineHeight:1.55}}>
          ⚠ Some ingredients are missing <strong>servings per package</strong>, so per-serving cost can't be fully calculated. Full package costs are shown instead and this meal is excluded from your weekly budget total.
        </div>}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
          {[[isEst?"Est. pkg total":"Per serving",isEst?"~$"+pkgTotal.toFixed(2):"$"+total.toFixed(2),isEst?"Full package cost":"Portion cost",isEst?"#94A3B8":"#D97706"],
            ["New items to buy","$"+firstBuy.toFixed(2),"First-time purchase","#2563EB"],
            ["Already have",meal.ings.filter(i=>owned[i.item.toLowerCase()]).length+" of "+meal.ings.length,"In your pantry","#059669"]
          ].map(([l,v,s,c],i)=>(
            <div key={i} style={{background:"#F8FAFC",border:"1px solid #E8EBF0",borderRadius:8,padding:"10px 12px"}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".05em",color:"#94A3B8",marginBottom:3}}>{l.toUpperCase()}</div>
              <div style={{fontFamily:"'Manrope',sans-serif",fontSize:18,fontWeight:800,color:c}}>{v}</div>
              <div style={{fontSize:11,color:"#94A3B8",marginTop:1}}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>INGREDIENTS</div>
        {meal.ings.map((ing,i)=>{
          const have = owned[ing.item.toLowerCase()];
          return (
            <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
              padding:"9px 0",borderBottom:i<meal.ings.length-1?"1px solid #F8FAFC":"none",gap:12}}>
              <div style={{flex:1}}>
                <span style={{fontWeight:600,color:"#1A1F2E",fontSize:13.5}}>{ing.item}</span>
                <span style={{color:"#94A3B8",fontSize:12.5,marginLeft:7}}>{ing.qty}</span>
                {have && <span style={{marginLeft:8,fontSize:10.5,background:"#D1FAE5",color:"#065F46",
                  padding:"1px 6px",borderRadius:20,fontWeight:700}}>✓ HAVE IT</span>}
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontWeight:700,color:ing.costUnknown?"#94A3B8":"#D97706",fontSize:12.5}}>
                  {ing.costUnknown?"full pkg":"$"+ing.use.toFixed(2)+" used"}
                </div>
                <div style={{fontSize:11.5,color:have?"#94A3B8":"#2563EB",marginTop:1}}>
                  {ing.pkg} · <strong>${ing.pkgCost.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          );
        })}
        <div style={{height:1,background:"#E8EBF0",margin:"14px 0"}}/>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:10}}>HOW TO MAKE IT</div>
        {meal.steps.map((step,i)=>(
          <div key={i} style={{display:"flex",gap:11,marginBottom:11}}>
            <div style={{width:24,height:24,borderRadius:5,background:"#1A1F2E",color:"#fff",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,flexShrink:0,marginTop:2}}>{i+1}</div>
            <p style={{fontSize:13.5,color:"#334155",lineHeight:1.65,margin:0}}>{step}</p>
          </div>
        ))}
      </div>
    </Modal>
  );
}

/* ─── RECIPE PICKER ─── */
function RecipePicker({mealType,prefs,currentId,dislikes,customMeals,onSelect,onClose}) {
  const [search,setSearch] = useState("");
  const [lp,setLp] = useState(dc(prefs));
  const togD = d => setLp(p=>({...p,dietary:p.dietary.includes(d)?p.dietary.filter(x=>x!==d):[...p.dietary,d]}));
  const togC = c => setLp(p=>({...p,cuisine:p.cuisine.includes(c)?p.cuisine.filter(x=>x!==c):[...p.cuisine,c]}));
  const pool = useMemo(()=>{
    const customs=(customMeals||[]).filter(r=>r.type===mealType);
    let std=matchRecipes(mealType,lp,dislikes);
    if(search.trim()){
      const q=search.toLowerCase();
      const filt=r=>r.name.toLowerCase().includes(q)||r.tags.some(t=>t.toLowerCase().includes(q));
      return[...customs.filter(filt),...std.filter(filt)];
    }
    return[...customs,...std];
  },[mealType,lp,search,dislikes,customMeals]);

  return (
    <Modal onClose={onClose} width={560}>
      <MHead title={"Choose " + mealType} sub={pool.length+" recipes match"} onClose={onClose}/>
      <div style={{padding:"12px 16px",borderBottom:"1px solid #F0F2F5",flexShrink:0,background:"#FAFBFC"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or tag…"
          style={{width:"100%",padding:"9px 12px",border:"1.5px solid #E2E8F0",borderRadius:7,fontSize:13.5,marginBottom:10,display:"block",color:"#1A1F2E"}}/>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:7}}>
          <span style={{fontSize:11,fontWeight:700,color:"#94A3B8",alignSelf:"center",marginRight:2}}>DIET</span>
          {DIETARY.map(d=><Pill key={d} label={d} active={lp.dietary.includes(d)} color="#059669" onClick={()=>togD(d)}/>)}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:7}}>
          <span style={{fontSize:11,fontWeight:700,color:"#94A3B8",alignSelf:"center",marginRight:2}}>CUISINE</span>
          {CUISINES.map(c=><Pill key={c} label={c} active={lp.cuisine.includes(c)} color="#6D28D9" onClick={()=>togC(c)}/>)}
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:11,fontWeight:700,color:"#94A3B8",marginRight:2}}>BUDGET</span>
          {BUDGETS.map(b=><Pill key={b.v} label={b.l} active={lp.maxBudget===b.v} color="#D97706" onClick={()=>setLp(p=>({...p,maxBudget:b.v}))}/>)}
          <span style={{fontSize:11,fontWeight:700,color:"#94A3B8",marginLeft:4,marginRight:2}}>EFFORT</span>
          {EFFORTS.map(e=><Pill key={e.v} label={e.l} active={lp.maxEffort===e.v} color="#2563EB" onClick={()=>setLp(p=>({...p,maxEffort:e.v}))}/>)}
        </div>
      </div>
      <div style={{overflow:"auto",flex:1,padding:"6px 8px 12px"}}>
        {pool.length===0 && <p style={{textAlign:"center",padding:"28px 0",color:"#94A3B8",fontSize:14}}>No recipes match. Try relaxing your filters.</p>}
        {pool.map(r=>{
          const c = r.costEstimated?(r.ings||[]).reduce((s,i)=>s+i.pkgCost,0):useCost(r);
          const isCur = r.id===currentId;
          return (
            <div key={r.id} className={`rec-row${isCur?" sel":""}`} onClick={()=>{onSelect(r);onClose();}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
                  <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:700,fontSize:14,color:"#1A1F2E"}}>{r.name}</span>
                  {isCur && <span style={{fontSize:10,background:"#D1FAE5",color:"#065F46",padding:"1px 6px",borderRadius:20,fontWeight:700}}>CURRENT</span>}
                  {r.custom && <span style={{fontSize:10,background:"#EDE9FE",color:"#6D28D9",padding:"1px 6px",borderRadius:20,fontWeight:700}}>CUSTOM</span>}
                  {r.effort===1 && <span style={{fontSize:10,background:"#FEF3C7",color:"#92400E",padding:"1px 6px",borderRadius:20,fontWeight:700}}>QUICK</span>}
                </div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {(r.tags||[]).slice(0,3).map(t=><span key={t} style={{fontSize:11,color:"#64748B",background:"#F0F2F5",padding:"1px 6px",borderRadius:20}}>{t}</span>)}
                  <span style={{fontSize:11,color:"#94A3B8"}}>⏱ {r.prepTime}</span>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,fontSize:15,color:r.costEstimated?"#94A3B8":"#D97706"}}>
                  {r.costEstimated?"~":""}${c.toFixed(2)}
                </div>
                <div style={{fontSize:11,color:"#94A3B8"}}>{r.costEstimated?"est. pkg":"$".repeat(r.budget)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

/* ─── PREFS PANEL ─── */
function PrefsPanel({prefs,onSave,onClose,isFirstTime=false}) {
  const [p,setP] = useState(dc(prefs));
  const [avIn,setAvIn] = useState("");
  const togD = d => setP(prev=>({...prev,dietary:prev.dietary.includes(d)?prev.dietary.filter(x=>x!==d):[...prev.dietary,d]}));
  const togC = c => setP(prev=>({...prev,cuisine:prev.cuisine.includes(c)?prev.cuisine.filter(x=>x!==c):[...prev.cuisine,c]}));
  const addAv = () => { if(!avIn.trim()) return; setP(prev=>({...prev,avoid:[...prev.avoid,avIn.trim()]})); setAvIn(""); };
  const remAv = i => setP(prev=>({...prev,avoid:prev.avoid.filter((_,j)=>j!==i)}));

  return (
    <Modal onClose={isFirstTime?undefined:onClose} width={520}>
      <MHead
        title={isFirstTime?"Welcome to Campus Eats! 🍽":"Meal Preferences"}
        sub={isFirstTime?"Set your preferences so we can build a personalized meal plan just for you.":"Filters applied when building or browsing your meal plan"}
        onClose={isFirstTime?undefined:onClose}/>
      <div style={{overflow:"auto",flex:1,padding:"16px 22px"}}>

        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>DIETARY RESTRICTIONS</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {DIETARY.map(d=><Pill key={d} label={d} active={p.dietary.includes(d)} color="#059669" onClick={()=>togD(d)}/>)}
          </div>
        </div>

        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>PREFERRED CUISINE <span style={{fontWeight:400,color:"#CBD5E1"}}>(leave blank for any)</span></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
            {CUISINES.map(c=><Pill key={c} label={c} active={p.cuisine.includes(c)} color="#6D28D9" onClick={()=>togC(c)}/>)}
          </div>
        </div>

        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>PRICE LEVEL — show meals up to:</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {BUDGETS.map(b=>(
              <button key={b.v} onClick={()=>setP(prev=>({...prev,maxBudget:b.v}))}
                style={{padding:"12px 8px",borderRadius:8,border:`2px solid ${p.maxBudget===b.v?"#D97706":"#E2E8F0"}`,
                  background:p.maxBudget===b.v?"#FEF3C7":"#fff",cursor:"pointer",transition:"all .14s",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:"'Nunito Sans',sans-serif"}}>
                <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,color:p.maxBudget===b.v?"#B45309":"#334155"}}>{b.l}</span>
                <span style={{fontSize:11,color:"#94A3B8"}}>{b.s}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:18}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>MAX PREP TIME</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
            {EFFORTS.map(e=>(
              <button key={e.v} onClick={()=>setP(prev=>({...prev,maxEffort:e.v}))}
                style={{padding:"12px 8px",borderRadius:8,border:`2px solid ${p.maxEffort===e.v?"#2563EB":"#E2E8F0"}`,
                  background:p.maxEffort===e.v?"#EFF6FF":"#fff",cursor:"pointer",transition:"all .14s",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:"'Nunito Sans',sans-serif"}}>
                <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,color:p.maxEffort===e.v?"#1D4ED8":"#334155"}}>{e.l}</span>
                <span style={{fontSize:11,color:"#94A3B8"}}>{e.s}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:6}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>INGREDIENTS TO AVOID</div>
          <div style={{display:"flex",gap:7,marginBottom:8}}>
            <input value={avIn} onChange={e=>setAvIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addAv()}
              placeholder="e.g. mushrooms, shellfish, nuts…"
              style={{flex:1,border:"1.5px solid #E2E8F0",borderRadius:7,padding:"8px 11px",color:"#1A1F2E"}}/>
            <button className="abtn pri" onClick={addAv} style={{padding:"8px 14px",whiteSpace:"nowrap"}}>+ Add</button>
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {p.avoid.map((av,i)=>(
              <span key={i} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",
                borderRadius:20,background:"#FEE2E2",color:"#DC2626",fontSize:12,fontWeight:700}}>
                {av} <span onClick={()=>remAv(i)} style={{cursor:"pointer",opacity:.7,marginLeft:2}}>×</span>
              </span>
            ))}
          </div>
        </div>

        <div style={{marginBottom:6}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>PANTRY SMART PICK</div>
          <div onClick={()=>setP(prev=>({...prev,pantryPriority:!prev.pantryPriority}))}
            style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:8,
              border:`1.5px solid ${p.pantryPriority?"#059669":"#E2E8F0"}`,
              background:p.pantryPriority?"#F0FDF4":"#fff",cursor:"pointer",transition:"all .14s"}}>
            {/* Toggle switch */}
            <div style={{width:38,height:22,borderRadius:11,background:p.pantryPriority?"#059669":"#CBD5E1",
              position:"relative",flexShrink:0,transition:"background .18s"}}>
              <div style={{position:"absolute",top:3,left:p.pantryPriority?17:3,width:16,height:16,
                borderRadius:"50%",background:"#fff",transition:"left .18s",boxShadow:"0 1px 3px rgba(0,0,0,.2)"}}/>
            </div>
            <div>
              <div style={{fontSize:13.5,fontWeight:700,color:p.pantryPriority?"#065F46":"#334155"}}>Prioritize pantry ingredients</div>
              <div style={{fontSize:12,color:"#94A3B8",marginTop:2}}>When rebuilding your week, prefer meals that use ingredients you already have stocked.</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{padding:"14px 22px",borderTop:"1px solid #F0F2F5",flexShrink:0,display:"flex",gap:8}}>
        {!isFirstTime && <button className="abtn" onClick={onClose} style={{flex:1,justifyContent:"center",padding:"11px 0"}}>Cancel</button>}
        <button className="abtn pri" onClick={()=>{onSave(p);onClose();}} style={{flex:isFirstTime?1:2,justifyContent:"center",padding:"11px 0",fontSize:14}}>
          {isFirstTime?"🚀 Build My Meal Plan →":"✓ Save & Rebuild Week"}
        </button>
      </div>
    </Modal>
  );
}

/* ─── PANTRY VIEW ─── */
function PantryView({owned,onToggle,onSetAll}) {
  const [search,setSearch] = useState("");
  const allItems = useMemo(()=>{
    const m={};
    R.forEach(r=>r.ings.forEach(i=>{ if(!m[i.item]) m[i.item]={item:i.item,cat:i.cat,pkg:i.pkg,pkgCost:i.pkgCost}; }));
    return Object.values(m).sort((a,b)=>a.item.localeCompare(b.item));
  },[]);
  const filtered = allItems.filter(i=>!search||i.item.toLowerCase().includes(search.toLowerCase()));
  const grouped = {};
  filtered.forEach(i=>{if(!grouped[i.cat])grouped[i.cat]=[];grouped[i.cat].push(i);});
  const ownedCount = allItems.filter(i=>owned[i.item.toLowerCase()]).length;
  const allChecked = ownedCount === allItems.length;

  return (
    <div className="fade-up">
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div>
          <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:26,fontWeight:800,color:"#1A1F2E"}}>My Pantry</h2>
          <p style={{fontSize:13.5,color:"#64748B",marginTop:3}}>
            Mark what you already have — recipe and shopping costs update instantly.
            &nbsp;<strong style={{color:"#059669"}}>{ownedCount} of {allItems.length}</strong> items stocked.
          </p>
        </div>
        <button className="abtn" onClick={()=>onSetAll(!allChecked)} style={{fontSize:12.5}}>
          {allChecked?"Uncheck All":"Check All"}
        </button>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search ingredients…"
        style={{width:"100%",maxWidth:380,padding:"9px 13px",border:"1.5px solid #E2E8F0",borderRadius:8,fontSize:14,marginBottom:16,display:"block",color:"#1A1F2E"}}/>
      {CAT_ORDER.filter(c=>grouped[c]?.length).map(cat=>(
        <div key={cat} style={{marginBottom:18}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:8}}>
            <span style={{fontSize:15}}>{CAT_ICON[cat]}</span>
            <span style={{fontSize:11.5,fontWeight:700,letterSpacing:".07em",color:"#64748B"}}>{cat.toUpperCase()}</span>
          </div>
          <div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,overflow:"hidden"}}>
            {(grouped[cat]||[]).map((ing,i,arr)=>{
              const have = owned[ing.item.toLowerCase()];
              return (
                <div key={i} onClick={()=>onToggle(ing.item)}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"11px 15px",
                    borderBottom:i<arr.length-1?"1px solid #F5F7FA":"none",
                    cursor:"pointer",background:have?"#F0FDF4":"#fff",transition:"background .1s"}}>
                  <CBox on={have} toggle={()=>{}}/>
                  <span style={{flex:1,fontWeight:500,fontSize:13.5,color:"#1A1F2E"}}>{ing.item}</span>
                  <span style={{fontSize:12,color:"#94A3B8"}}>{ing.pkg}</span>
                  <span style={{fontSize:13,fontWeight:700,color:have?"#059669":"#94A3B8",minWidth:42,textAlign:"right"}}>${ing.pkgCost.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── SHOPPING LIST ─── */
function ShoppingList({meals,owned,onClearList,checked,setChecked,hideOwned,setHideOwned,
                       onAddToPantry,onNavToMeal,onOpenSource,onOpenAddPantry}) {

  // Build ingredient→meals map for source lookup
  const mealsByIng = useMemo(()=>{
    const m={};
    meals.forEach(meal=>{
      (meal?.ings||[]).forEach(ing=>{
        const k=ing.item.toLowerCase();
        if(!m[k]) m[k]=[];
        m[k].push(meal);
      });
    });
    return m;
  },[meals]);

  const groups = useMemo(()=>{
    const m={};
    meals.forEach(meal=>{
      (meal?.ings||[]).forEach(ing=>{
        const k=ing.item.toLowerCase();
        if(!m[k]) m[k]={...ing,count:0};
        m[k].count++;
      });
    });
    const g={};
    Object.values(m).forEach(v=>{if(!g[v.cat])g[v.cat]=[];g[v.cat].push(v);});
    return g;
  },[meals]);

  if (!meals.length) return (
    <div className="fade-up">
      <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:26,fontWeight:800,color:"#1A1F2E",marginBottom:8}}>Shopping List</h2>
      <div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,padding:"40px 24px",textAlign:"center"}}>
        <div style={{fontSize:36,marginBottom:12}}>🛒</div>
        <h3 style={{fontFamily:"'Manrope',sans-serif",fontWeight:700,fontSize:17,color:"#334155",marginBottom:6}}>Your list is empty</h3>
        <p style={{fontSize:13.5,color:"#94A3B8",lineHeight:1.65,maxWidth:340,margin:"0 auto"}}>
          Go to the <strong>Plan</strong> view and tap <strong>🛒 + List</strong> on any meal card to add its ingredients here.
        </p>
      </div>
    </div>
  );

  const allItems = Object.values(groups).flat();
  const showing = hideOwned ? allItems.filter(i=>!owned[i.item.toLowerCase()]) : allItems;
  const total = showing.filter(i=>!checked[i.item.toLowerCase()]).reduce((s,i)=>s+i.pkgCost,0);
  const chkN = showing.filter(i=>checked[i.item.toLowerCase()]).length;
  const checkedItems = allItems.filter(i=>checked[i.item.toLowerCase()]);

  return (
    <div className="fade-up">
      <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:10}}>
        <div>
          <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:26,fontWeight:800,color:"#1A1F2E"}}>Shopping List</h2>
          <p style={{fontSize:13.5,color:"#64748B",marginTop:3}}>{meals.length} added meals · {chkN}/{showing.length} items checked off</p>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <CBox on={!hideOwned} toggle={()=>setHideOwned(p=>!p)} size={17}/>
          <span style={{fontSize:13,color:"#475569",cursor:"pointer"}} onClick={()=>setHideOwned(p=>!p)}>Show pantry items</span>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
        {[["Grocery spend","$"+total.toFixed(2),"Unchecked packages","#2563EB"],
          ["Weekly portion cost","$"+allItems.reduce((s,i)=>s+i.use,0).toFixed(2),"What you consume","#D97706"],
          ["Pantry items",Object.keys(owned).filter(k=>owned[k]).length+" owned","Already stocked","#059669"]
        ].map(([l,v,s,c],i)=>(
          <div key={i} style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,padding:"12px 14px"}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:".06em",color:"#94A3B8",marginBottom:3}}>{l.toUpperCase()}</div>
            <div style={{fontFamily:"'Manrope',sans-serif",fontSize:20,fontWeight:800,color:c}}>{v}</div>
            <div style={{fontSize:11,color:"#94A3B8",marginTop:1}}>{s}</div>
          </div>
        ))}
      </div>

      {CAT_ORDER.filter(c=>groups[c]?.some(i=>!hideOwned||!owned[i.item.toLowerCase()])).map(cat=>{
        const items=(groups[cat]||[]).filter(i=>!hideOwned||!owned[i.item.toLowerCase()]);
        if(!items.length) return null;
        return (
          <div key={cat} style={{marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:7}}>
              <span>{CAT_ICON[cat]}</span>
              <span style={{fontSize:11.5,fontWeight:700,letterSpacing:".07em",color:"#64748B"}}>{cat.toUpperCase()}</span>
            </div>
            <div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,overflow:"hidden"}}>
              {items.map((ing,i,arr)=>{
                const k=ing.item.toLowerCase(), done=checked[k], have=owned[k];
                const sourceMeals = mealsByIng[k]||[];
                return (
                  <div key={i}
                    style={{display:"grid",gridTemplateColumns:"auto 1fr auto auto auto",alignItems:"center",gap:10,
                      padding:"11px 15px",borderBottom:i<arr.length-1?"1px solid #F5F7FA":"none",
                      background:done?"#F8FAFC":have?"#F0FDF4":"#fff",transition:"background .1s"}}>
                    <div onClick={()=>setChecked(p=>({...p,[k]:!p[k]}))}>
                      <CBox on={done} toggle={()=>{}} size={17}/>
                    </div>
                    <div onClick={()=>setChecked(p=>({...p,[k]:!p[k]}))} style={{cursor:"pointer"}}>
                      <span style={{fontWeight:600,fontSize:13.5,color:done?"#94A3B8":"#1A1F2E",textDecoration:done?"line-through":"none"}}>{ing.item}</span>
                      <span style={{fontSize:12,color:"#94A3B8",marginLeft:7}}>{ing.qty}{ing.count>1?` · ${ing.count} meals`:""}</span>
                      {have&&!done&&<span style={{marginLeft:7,fontSize:10.5,background:"#D1FAE5",color:"#065F46",padding:"1px 6px",borderRadius:20,fontWeight:700}}>IN PANTRY</span>}
                    </div>
                    <button onClick={()=>onOpenSource({item:ing.item,meals:sourceMeals})}
                      title="Which meals use this?"
                      style={{border:"1px solid #E2E8F0",background:"transparent",borderRadius:5,
                        width:24,height:24,fontSize:11,fontWeight:700,color:"#94A3B8",cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>?</button>
                    <div style={{fontSize:12,color:"#94A3B8",textAlign:"right",whiteSpace:"nowrap"}}>{ing.pkg}</div>
                    <div style={{fontFamily:"'Manrope',sans-serif",fontSize:15,fontWeight:800,
                      color:done?"#CBD5E1":"#2563EB",minWidth:46,textAlign:"right"}}>${ing.pkgCost.toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <p style={{fontSize:12.5,color:"#94A3B8",lineHeight:1.65,marginTop:6}}>
        💡 Tap <strong>?</strong> on any item to see which meals use it. Pantry items are highlighted green.
      </p>

      <div style={{marginTop:20,paddingTop:16,borderTop:"1px solid #E8EBF0"}}>
        {checkedItems.length>0 && (
          <div style={{background:"#F0FDF4",border:"1.5px solid #6EE7B7",borderRadius:8,padding:"12px 16px",marginBottom:14,
            display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:13.5,fontWeight:700,color:"#065F46"}}>Done shopping? Add {checkedItems.length} item{checkedItems.length!==1?"s":""} to pantry</div>
              <div style={{fontSize:12,color:"#059669",marginTop:2}}>Mark checked items as owned so the app knows what you have.</div>
            </div>
            <button onClick={()=>onOpenAddPantry(checkedItems)}
              style={{border:"none",background:"#059669",color:"#fff",borderRadius:6,padding:"8px 16px",
                fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif",whiteSpace:"nowrap",flexShrink:0}}>
              🧺 Add to Pantry
            </button>
          </div>
        )}
        <div style={{display:"flex",justifyContent:"center"}}>
          <button className="abtn" onClick={onClearList}
            style={{fontSize:12.5,color:"#DC2626",borderColor:"#FCA5A5",background:"#FFF1F1"}}>
            🗑 Empty List
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MEAL CARD ─── */
function MealCard({meal,type,dayIdx,weekOff,swapFirst,onView,onPick,onSwap,onToggleEaten,isEaten,canEat,
                   isFav,isDisliked,onToggleFav,onToggleDislike,isOnList,onToggleList}) {
  const cost = useCost(meal);
  const isSel = swapFirst?.dayIdx===dayIdx&&swapFirst?.weekOff===weekOff&&swapFirst?.type===type;
  const isSwap = !!swapFirst;
  return (
    <div className={`meal-card${isSwap&&!isSel?" swap-pick":""}${isSel?" swap-sel":""}`}
      onClick={isSwap?onSwap:undefined}
      style={{borderLeft:`3px solid ${MT_COLOR[type]}`}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <MTag type={type}/>
        <div style={{display:"flex",alignItems:"center",gap:4}}>
          <button className={`icon-btn${isFav?" fav-on":""}`} title={isFav?"Remove from favorites":"Add to favorites"}
            onClick={e=>{e.stopPropagation();onToggleFav();}} style={{fontSize:15}}>{isFav?"♥":"♡"}</button>
          <button className={`icon-btn${isDisliked?" dis-on":""}`} title={isDisliked?"Un-dislike":"Dislike this meal"}
            onClick={e=>{e.stopPropagation();onToggleDislike();}} style={{fontSize:13}}>{isDisliked?"✕":"–"}</button>
          {canEat && (
            <CBox on={isEaten} toggle={e=>{if(e&&e.stopPropagation)e.stopPropagation();onToggleEaten();}} size={16}/>
          )}
          <span style={{fontSize:12,color:"#94A3B8",fontWeight:500,marginLeft:4}}>⏱ {meal.prepTime}</span>
        </div>
      </div>
      {isDisliked && <div style={{fontSize:11,color:"#94A3B8",background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:5,padding:"4px 8px",marginBottom:8}}>
        Marked as disliked — won't be auto-picked. <span onClick={e=>{e.stopPropagation();onToggleDislike();}} style={{color:"#059669",cursor:"pointer",fontWeight:700}}>Undo</span>
      </div>}
      <h3 style={{fontFamily:"'Manrope',sans-serif",fontSize:16,fontWeight:800,color:"#1A1F2E",lineHeight:1.25,marginBottom:6}}>{meal.name}</h3>
      <p style={{fontSize:13,color:"#475569",lineHeight:1.6,marginBottom:13,flex:1}}>{meal.desc}</p>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:13,paddingTop:10,borderTop:"1px solid #F0F2F5"}}>
        <div style={{background:"#F8FAFC",border:"1px solid #E8EBF0",borderRadius:6,padding:"5px 10px",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <span style={{fontSize:9,fontWeight:700,letterSpacing:".06em",color:"#94A3B8"}}>{meal.costEstimated?"EST. PKG":"PER SERVING"}</span>
          <span style={{fontFamily:"'Manrope',sans-serif",fontSize:16,fontWeight:800,color:meal.costEstimated?"#94A3B8":"#D97706"}}>
            {meal.costEstimated?"~$"+(meal.ings||[]).reduce((s,i)=>s+i.pkgCost,0).toFixed(2):"$"+cost.toFixed(2)}
          </span>
        </div>
        <div style={{flex:1,display:"flex",gap:4,flexWrap:"wrap"}}>
          {meal.tags.slice(0,2).map(t=><span key={t} style={{fontSize:11,background:"#F0F2F5",color:"#64748B",padding:"2px 7px",borderRadius:20}}>{t}</span>)}
          <span style={{fontSize:11,background:"#F0F2F5",color:"#64748B",padding:"2px 7px",borderRadius:20}}>{"$".repeat(meal.budget)}</span>
        </div>
      </div>
      {!isSwap && (
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          <button className="abtn" onClick={e=>{e.stopPropagation();onView();}} style={{justifyContent:"center",fontSize:12,padding:"7px 0"}}>📖 Recipe</button>
          <button className="abtn" onClick={e=>{e.stopPropagation();onSwap();}} style={{justifyContent:"center",fontSize:12,padding:"7px 0"}}>↔ Swap</button>
          <button className="abtn pri" onClick={e=>{e.stopPropagation();onPick();}} style={{justifyContent:"center",fontSize:12,padding:"7px 0"}}>✎ Change</button>
          <button className={`abtn${isOnList?" shop-on":""}`} onClick={e=>{e.stopPropagation();onToggleList();}} style={{justifyContent:"center",fontSize:12,padding:"7px 0"}}>
            {isOnList?"✓ On List":"🛒 + List"}
          </button>
        </div>
      )}
      {isSel && <div style={{position:"absolute",top:10,right:10,background:"#16A34A",color:"#fff",borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:800}}>SELECTED</div>}
    </div>
  );
}

/* ─── CUSTOM MEAL FORM ─── */
function CustomMealForm({onSave,onClose,existing=null}) {
  const [name,setName] = useState(existing?.name||"");
  const [type,setType] = useState(existing?.type||"Dinner");
  const [prepTime,setPrepTime] = useState(existing?.prepTime||"");
  const [effort,setEffort] = useState(existing?.effort||2);
  const [desc,setDesc] = useState(existing?.desc||"");
  const [custTags,setCustTags] = useState(existing?.tags||[]);
  const [ings,setIngs] = useState(()=>{
    if(existing?.ings?.length) return existing.ings.map(i=>({
      item:i.item||"",qty:i.qty||"",pkg:i.pkg||"",
      pkgCost:i.pkgCost?String(i.pkgCost):"",
      servingsPer:i.servingsPer?String(i.servingsPer):"",
      cat:i.cat||"Grains & Bread"
    }));
    return [{item:"",qty:"",pkg:"",pkgCost:"",servingsPer:"",cat:"Grains & Bread"}];
  });
  const [steps,setSteps] = useState(existing?.steps?.length?[...existing.steps]:["",""]);
  const [nameErr,setNameErr] = useState(false);

  const ALL_TAGS = [...DIETARY,...CUISINES];
  const toggleTag = t=>setCustTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const upIng = (idx,f,v)=>setIngs(p=>p.map((x,i)=>i===idx?{...x,[f]:v}:x));
  const addIng = ()=>setIngs(p=>[...p,{item:"",qty:"",pkg:"",pkgCost:"",servingsPer:"",cat:"Grains & Bread"}]);
  const delIng = idx=>setIngs(p=>p.filter((_,i)=>i!==idx));
  const upStep = (idx,v)=>setSteps(p=>p.map((x,i)=>i===idx?v:x));
  const addStep = ()=>setSteps(p=>[...p,""]);
  const delStep = idx=>setSteps(p=>p.filter((_,i)=>i!==idx));

  function handleSave() {
    if(!name.trim()){setNameErr(true);return;}
    const processedIngs = ings.filter(i=>i.item.trim()).map(ing=>{
      const pkgC=parseFloat(ing.pkgCost)||0;
      const srvPer=parseFloat(ing.servingsPer);
      const use=(pkgC>0&&srvPer>0)?+(pkgC/srvPer).toFixed(2):0;
      return{item:ing.item.trim(),qty:ing.qty.trim()||"as needed",use,
        pkg:ing.pkg.trim()||"package",pkgCost:pkgC,
        servingsPer:srvPer||null,cat:ing.cat,costUnknown:!use&&pkgC>0};
    });
    const totalUse=processedIngs.reduce((s,i)=>s+i.use,0);
    const costEstimated=processedIngs.some(i=>i.costUnknown);
    const budget=costEstimated?1:(totalUse<3?1:totalUse<5?2:3);
    onSave({
      id:existing?.id||`custom-${Date.now()}`,
      type,name:name.trim(),budget,effort,
      prepTime:prepTime.trim()||"varies",
      tags:custTags,desc:desc.trim(),
      ings:processedIngs,
      steps:steps.filter(s=>s.trim()),
      custom:true,costEstimated
    });
    onClose();
  }

  const IS={width:"100%",border:"1.5px solid #E2E8F0",borderRadius:6,padding:"8px 11px",fontSize:13,color:"#1A1F2E",background:"#fff"};
  const LS={fontSize:11,fontWeight:700,letterSpacing:".07em",color:"#94A3B8",marginBottom:5,display:"block"};

  return(
    <Modal onClose={onClose} width={640}>
      <MHead title={existing?"Edit Custom Meal":"Create Custom Meal"} sub="Build your own recipe and add it to the planner" onClose={onClose}/>
      <div style={{overflow:"auto",flex:1,padding:"16px 22px 20px",display:"flex",flexDirection:"column",gap:14}}>

        {/* Name + Type */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 140px",gap:10}}>
          <div>
            <label style={LS}>MEAL NAME <span style={{color:"#DC2626"}}>*</span></label>
            <input value={name} onChange={e=>{setName(e.target.value);setNameErr(false);}} placeholder="e.g. Mom's Pasta Bake"
              style={{...IS,borderColor:nameErr?"#FCA5A5":undefined}}/>
            {nameErr&&<div style={{fontSize:11.5,color:"#DC2626",marginTop:3}}>Name is required</div>}
          </div>
          <div>
            <label style={LS}>MEAL TYPE</label>
            <select value={type} onChange={e=>setType(e.target.value)} style={IS}>
              {MT.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={LS}>DESCRIPTION</label>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={2}
            placeholder="What makes this meal great, what to expect..."
            style={{...IS,resize:"vertical",lineHeight:1.55}}/>
        </div>

        {/* Prep + Effort */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <div>
            <label style={LS}>PREP TIME</label>
            <input value={prepTime} onChange={e=>setPrepTime(e.target.value)} placeholder="e.g. 20 min" style={IS}/>
          </div>
          <div>
            <label style={LS}>EFFORT LEVEL</label>
            <div style={{display:"flex",gap:6}}>
              {EFFORTS.map(e=>(
                <button key={e.v} type="button" onClick={()=>setEffort(e.v)}
                  style={{flex:1,padding:"8px 4px",borderRadius:6,border:`2px solid ${effort===e.v?"#2563EB":"#E2E8F0"}`,
                    background:effort===e.v?"#EFF6FF":"#fff",cursor:"pointer",
                    fontFamily:"'Nunito Sans',sans-serif",fontSize:12,fontWeight:700,
                    color:effort===e.v?"#1D4ED8":"#64748B"}}>
                  {e.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label style={LS}>DIETARY &amp; CUISINE TAGS</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {ALL_TAGS.map(t=><Pill key={t} label={t} active={custTags.includes(t)} color="#059669" onClick={()=>toggleTag(t)}/>)}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label style={{...LS,marginBottom:0}}>INGREDIENTS</label>
            <button className="abtn" onClick={addIng} style={{fontSize:12,padding:"5px 11px"}}>+ Add Ingredient</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {ings.map((ing,idx)=>(
              <div key={idx} style={{background:"#F8FAFC",border:"1.5px solid #E8EBF0",borderRadius:8,padding:"10px 12px",position:"relative"}}>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8,marginBottom:7}}>
                  <div>
                    <label style={{...LS,fontSize:9.5,marginBottom:3}}>INGREDIENT NAME *</label>
                    <input value={ing.item} onChange={e=>upIng(idx,"item",e.target.value)}
                      placeholder="e.g. Chicken breast" style={{...IS,fontSize:13}}/>
                  </div>
                  <div>
                    <label style={{...LS,fontSize:9.5,marginBottom:3}}>AMOUNT USED <span style={{opacity:.55}}>(optional)</span></label>
                    <input value={ing.qty} onChange={e=>upIng(idx,"qty",e.target.value)}
                      placeholder="e.g. 6 oz" style={{...IS,fontSize:13}}/>
                  </div>
                  <div>
                    <label style={{...LS,fontSize:9.5,marginBottom:3}}>CATEGORY</label>
                    <select value={ing.cat} onChange={e=>upIng(idx,"cat",e.target.value)} style={{...IS,fontSize:12.5}}>
                      {CAT_ORDER.map(c=><option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:8}}>
                  <div>
                    <label style={{...LS,fontSize:9.5,marginBottom:3}}>PACKAGE NAME <span style={{opacity:.55}}>(optional)</span></label>
                    <input value={ing.pkg} onChange={e=>upIng(idx,"pkg",e.target.value)}
                      placeholder="e.g. 2 lb pack" style={{...IS,fontSize:13}}/>
                  </div>
                  <div>
                    <label style={{...LS,fontSize:9.5,marginBottom:3}}>PACKAGE PRICE *</label>
                    <input value={ing.pkgCost} onChange={e=>upIng(idx,"pkgCost",e.target.value)}
                      type="number" min="0" step="0.01" placeholder="$0.00"
                      style={{...IS,fontSize:13}}/>
                  </div>
                  <div>
                    <label style={{...LS,fontSize:9.5,marginBottom:3}}>SERVINGS / PKG <span style={{opacity:.55}}>(optional)</span></label>
                    <input value={ing.servingsPer} onChange={e=>upIng(idx,"servingsPer",e.target.value)}
                      type="number" min="0" step="0.5" placeholder="e.g. 8"
                      style={{...IS,fontSize:13}}/>
                    {ing.pkgCost&&ing.servingsPer&&parseFloat(ing.pkgCost)>0&&parseFloat(ing.servingsPer)>0&&(
                      <div style={{fontSize:11,color:"#059669",marginTop:3,fontWeight:600}}>
                        = ${(parseFloat(ing.pkgCost)/parseFloat(ing.servingsPer)).toFixed(2)}/serving
                      </div>
                    )}
                  </div>
                </div>
                {ings.length>1&&(
                  <button onClick={()=>delIng(idx)}
                    style={{position:"absolute",top:8,right:8,width:22,height:22,border:"none",
                      background:"#FEE2E2",color:"#DC2626",borderRadius:4,cursor:"pointer",
                      fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
                )}
              </div>
            ))}
          </div>
          <div style={{fontSize:11.5,color:"#92400E",marginTop:8,lineHeight:1.55,background:"#FFFBEB",border:"1px solid #FEF3C7",borderRadius:6,padding:"8px 11px"}}>
            💡 <strong>Servings per package</strong> lets the app calculate a per-serving cost. Without it, the ingredient's full package price is shown but not included in your weekly budget total.
          </div>
        </div>

        {/* Steps */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label style={{...LS,marginBottom:0}}>INSTRUCTIONS</label>
            <button className="abtn" onClick={addStep} style={{fontSize:12,padding:"5px 11px"}}>+ Step</button>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {steps.map((step,idx)=>(
              <div key={idx} style={{display:"flex",gap:8,alignItems:"center"}}>
                <div style={{width:24,height:24,borderRadius:5,background:"#1A1F2E",color:"#fff",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:11,fontWeight:800,flexShrink:0}}>{idx+1}</div>
                <input value={step} onChange={e=>upStep(idx,e.target.value)}
                  placeholder={`Step ${idx+1}…`} style={{...IS,flex:1}}/>
                {steps.length>1&&(
                  <button onClick={()=>delStep(idx)}
                    style={{width:24,height:24,border:"none",background:"#FEE2E2",color:"#DC2626",
                      borderRadius:4,cursor:"pointer",fontSize:14,display:"flex",
                      alignItems:"center",justifyContent:"center",flexShrink:0}}>×</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{padding:"14px 22px",borderTop:"1px solid #F0F2F5",flexShrink:0,display:"flex",gap:8}}>
        <button className="abtn" onClick={onClose} style={{flex:1,justifyContent:"center",padding:"11px 0"}}>Cancel</button>
        <button className="abtn pri" onClick={handleSave} style={{flex:2,justifyContent:"center",padding:"11px 0",fontSize:14}}>
          ✓ {existing?"Save Changes":"Add to My Meals"}
        </button>
      </div>
    </Modal>
  );
}

/* ─── FAVORITES VIEW ─── */
function FavoritesView({favorites,dislikes,owned,customMeals,onToggleFav,onToggleDislike,onViewRecipe,onCreateCustom,onEditCustom,onDeleteCustom}) {
  const favRecipes = [...R,...customMeals].filter(r=>favorites[r.id]);
  const dislikedRecipes = R.filter(r=>dislikes[r.id]);

  function MealRow({r,isFavSection,isCustomSection}) {
    const cost = useCost(r);
    const pkgTotal = r.costEstimated ? (r.ings||[]).reduce((s,i)=>s+i.pkgCost,0) : 0;
    return (
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderBottom:"1px solid #F5F7FA"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"4px 8px",background:MT_BG[r.type],borderRadius:6,flexShrink:0,minWidth:48}}>
          <span style={{fontSize:9,fontWeight:700,color:MT_COLOR[r.type],letterSpacing:".04em"}}>{r.type.toUpperCase().slice(0,3)}</span>
          <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,fontSize:13,color:r.costEstimated?"#94A3B8":MT_COLOR[r.type]}}>
            {r.costEstimated?`~$${pkgTotal.toFixed(2)}`:`$${cost.toFixed(2)}`}
          </span>
          {r.costEstimated&&<span style={{fontSize:8,color:"#94A3B8",marginTop:1}}>est.</span>}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:700,fontSize:14,color:"#1A1F2E"}}>{r.name}</span>
            {r.custom&&<span style={{fontSize:10,background:"#EDE9FE",color:"#6D28D9",padding:"1px 6px",borderRadius:20,fontWeight:700}}>CUSTOM</span>}
          </div>
          <div style={{display:"flex",gap:5,marginTop:3,flexWrap:"wrap"}}>
            {(r.tags||[]).slice(0,2).map(t=><span key={t} style={{fontSize:11,color:"#64748B",background:"#F0F2F5",padding:"1px 6px",borderRadius:20}}>{t}</span>)}
            <span style={{fontSize:11,color:"#94A3B8"}}>⏱ {r.prepTime}</span>
          </div>
        </div>
        <div style={{display:"flex",gap:5,flexShrink:0,flexWrap:"wrap",justifyContent:"flex-end"}}>
          <button className="abtn" onClick={()=>onViewRecipe(r)} style={{fontSize:11.5,padding:"5px 10px"}}>📖</button>
          {isCustomSection&&<button className="abtn" onClick={()=>onEditCustom(r)} style={{fontSize:11.5,padding:"5px 10px"}}>✏</button>}
          {isFavSection
            ?<button className="abtn" onClick={()=>onToggleFav(r.id)} style={{fontSize:11.5,padding:"5px 10px",color:"#EF4444",borderColor:"#FCA5A5"}}>♥ Remove</button>
            :isCustomSection
              ?<button className="abtn" onClick={()=>onDeleteCustom(r.id)} style={{fontSize:11.5,padding:"5px 10px",color:"#DC2626",borderColor:"#FCA5A5"}}>🗑</button>
              :<button className="abtn" onClick={()=>onToggleDislike(r.id)} style={{fontSize:11.5,padding:"5px 10px",color:"#059669",borderColor:"#6EE7B7"}}>↩ Un-dislike</button>
          }
        </div>
      </div>
    );
  }

  function EmptyState({icon,msg}) {
    return(
      <div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,padding:"24px",textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:28,marginBottom:8}}>{icon}</div>
        <p style={{fontSize:13.5,color:"#94A3B8"}}>{msg}</p>
      </div>
    );
  }

  return (
    <div className="fade-up">
      <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:26,fontWeight:800,color:"#1A1F2E",marginBottom:4}}>Favorites &amp; Custom Meals</h2>
      <p style={{fontSize:13.5,color:"#64748B",marginBottom:22}}>Save favorites, create your own meals, and manage dislikes all in one place.</p>

      {/* My Custom Meals */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8"}}>✦ MY CUSTOM MEALS ({customMeals.length})</div>
        <button className="abtn pri" onClick={onCreateCustom} style={{fontSize:12,padding:"6px 13px"}}>+ Create Meal</button>
      </div>
      {customMeals.length===0
        ?<EmptyState icon="🍳" msg="You haven't created any custom meals yet. Hit + Create Meal to add your own recipe."/>
        :<div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,overflow:"hidden",marginBottom:22}}>
          {customMeals.map(r=><MealRow key={r.id} r={r} isCustomSection={true}/>)}
        </div>
      }

      {/* Favorites */}
      <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>♥ FAVORITES ({favRecipes.length})</div>
      {favRecipes.length===0
        ?<EmptyState icon="♡" msg="No favorites yet — tap ♡ on any meal card to save it here."/>
        :<div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,overflow:"hidden",marginBottom:22}}>
          {favRecipes.map(r=><MealRow key={r.id} r={r} isFavSection={true}/>)}
        </div>
      }

      {/* Dislikes */}
      <div style={{fontSize:11,fontWeight:700,letterSpacing:".08em",color:"#94A3B8",marginBottom:8}}>✕ DISLIKES ({dislikedRecipes.length})</div>
      {dislikedRecipes.length===0
        ?<EmptyState icon="–" msg="No dislikes marked — tap – on a meal card to exclude it from auto-picks."/>
        :<div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,overflow:"hidden",marginBottom:20}}>
          {dislikedRecipes.map(r=><MealRow key={r.id} r={r} isFavSection={false}/>)}
        </div>
      }
    </div>
  );
}

/* ─── CALENDAR ─── */
function CalendarView({allPlans,eatenMeals,currentWeekOff,onNav}) {
  const [vDate,setVDate] = useState(()=>getMon(0));
  const today = new Date(); today.setHours(0,0,0,0);
  function getWOff(d) { const m=getMon(0); return Math.round((d-m)/(7*864e5)); }
  const first=new Date(vDate.getFullYear(),vDate.getMonth(),1);
  const sm=new Date(first); const dow=first.getDay(); sm.setDate(first.getDate()-(dow===0?6:dow-1));
  const cells=Array.from({length:42},(_,i)=>{ const d=new Date(sm); d.setDate(sm.getDate()+i); return d; });
  const weeks=[]; for(let i=0;i<42;i+=7) weeks.push(cells.slice(i,i+7));
  return (
    <div className="fade-up">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
        <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:26,fontWeight:800,color:"#1A1F2E"}}>Meal Calendar</h2>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <button className="abtn" onClick={()=>setVDate(d=>new Date(d.getFullYear(),d.getMonth()-1,1))}>←</button>
          <span style={{fontWeight:700,color:"#1A1F2E",fontSize:14,minWidth:130,textAlign:"center"}}>{fmtM(vDate)}</span>
          <button className="abtn" onClick={()=>setVDate(d=>new Date(d.getFullYear(),d.getMonth()+1,1))}>→</button>
        </div>
      </div>
      <div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:10,overflow:"hidden",marginBottom:14}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",background:"#F8FAFC",borderBottom:"1px solid #E8EBF0"}}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d=>(
            <div key={d} style={{padding:"10px 4px",textAlign:"center",fontSize:11.5,fontWeight:700,letterSpacing:".04em",color:"#64748B"}}>{d}</div>
          ))}
        </div>
        {weeks.map((week,wi)=>(
          <div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",borderBottom:wi<weeks.length-1?"1px solid #F0F2F5":"none"}}>
            {week.map((day,di)=>{
              const wOff=getWOff(day);
              const isToday=sameDay(day,today);
              const isCur=wOff===currentWeekOff;
              const inMonth=day.getMonth()===vDate.getMonth();
              const dayI=day.getDay()===0?6:day.getDay()-1;
              const hasPlan=!!(allPlans[wOff]);
              const eaten=MT.filter(mt=>eatenMeals[`${wOff}|${dayI}|${mt}`]).length;
              return (
                <div key={di} onClick={()=>onNav(wOff,dayI)}
                  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                    minHeight:52,padding:"5px 3px",cursor:"pointer",
                    background:isToday?"#1A1F2E":isCur?"#EFF6FF":hasPlan?"#F0FDF4":"transparent",
                    opacity:!inMonth?.3:1,transition:"background .1s"}}>
                  <span style={{fontSize:13,fontWeight:isToday?700:500,color:isToday?"#fff":"#1A1F2E"}}>{day.getDate()}</span>
                  {hasPlan && (
                    <div style={{display:"flex",gap:2,marginTop:3}}>
                      {MT.map(mt=><div key={mt} style={{width:5,height:5,borderRadius:"50%",
                        background:eatenMeals[`${wOff}|${dayI}|${mt}`]?"#16A34A":MT_COLOR[mt],opacity:.7}}/>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {[["#1A1F2E","Today"],["#EFF6FF","Current week"],["#F0FDF4","Has plan"],
          ...MT.map(mt=>[MT_COLOR[mt],mt])].map(([c,l],i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:5,fontSize:12.5,color:"#64748B"}}>
            <div style={{width:10,height:10,borderRadius:i<3?2:"50%",background:c,opacity:.85}}/>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function App({ session }) {
  useEffect(()=>{
    const s=document.createElement("style"); s.textContent=GLOBAL_CSS; document.head.prepend(s);
    return()=>document.head.removeChild(s);
  },[]);

  const tIdx = todayIdx();
  const [isMobile, setIsMobile] = useState(()=>window.innerWidth<768);
  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<768);
    window.addEventListener("resize",check);
    return()=>window.removeEventListener("resize",check);
  },[]);

  // ── Supabase persistence ───────────────────────────────────
  const [dataLoaded, setDataLoaded] = useState(false);
  const saveTimer = useRef(null);

  const [weekOff, setWeekOff] = useState(0);
  const [prefs, setPrefs] = useState(DEFAULT_PREFS);
  const [allPlans, setAllPlans] = useState(()=>({0:buildWeek(DEFAULT_PREFS,"w0",{},{},[])}));
  const [selDay, setSelDay] = useState(tIdx);
  const [view, setView] = useState(()=>sessionStorage.getItem("ce_view")||"plan");

  // Keep sessionStorage in sync whenever view changes
  useEffect(()=>{ sessionStorage.setItem("ce_view", view); }, [view]);
  const [owned, setOwned] = useState(initOwned);
  const [eaten, setEaten] = useState({});
  const [swapFirst, setSwapFirst] = useState(null);
  const [recModal, setRecModal] = useState(null);
  const [picker, setPicker] = useState(null);
  const [showPrefs, setShowPrefs] = useState(false);
  const [favorites, setFavorites] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [addedToList, setAddedToList] = useState({});
  const [customMeals, setCustomMeals] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [editingCustom, setEditingCustom] = useState(null);
  const [shopChecked, setShopChecked] = useState({});
  const [shopHideOwned, setShopHideOwned] = useState(false);
  const [shopSourcePopup, setShopSourcePopup] = useState(null);
  const [shopAddPantryItems, setShopAddPantryItems] = useState(null);
  const [mDayPanel, setMDayPanel] = useState(false);
  const [slideDir, setSlideDir] = useState("right");
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const [stripCollapsed, setStripCollapsed] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const mContentRef = useRef(null);
  const lastScrollY = useRef(0);

  // Reset header/strip when switching tabs
  useEffect(()=>{
    setStripCollapsed(false);
    if (mContentRef.current) mContentRef.current.scrollTop = 0;
    lastScrollY.current = 0;
  }, [view]);

  useEffect(()=>{
    const el = mContentRef.current;
    if (!el || !isMobile) return;
    const onScroll = () => {
      const y = el.scrollTop;
      if (y > lastScrollY.current && y > 40) setStripCollapsed(true);
      else if (y < lastScrollY.current) setStripCollapsed(false);
      lastScrollY.current = y;
    };
    el.addEventListener("scroll", onScroll, {passive:true});
    return ()=>el.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Load saved state from Supabase on mount
  useEffect(() => {
    if (!session?.user?.id) { setDataLoaded(true); return; }
    async function loadData() {
      const { data, error } = await supabase
        .from("user_state")
        .select("data")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (!error && data?.data) {
        const d = data.data;
        if (d.allPlans)       setAllPlans(d.allPlans);
        if (d.prefs)          setPrefs({...DEFAULT_PREFS,...d.prefs});
        if (d.owned)          setOwned(d.owned);
        if (d.eaten)          setEaten(d.eaten);
        if (d.favorites)      setFavorites(d.favorites);
        if (d.dislikes)       setDislikes(d.dislikes);
        if (d.addedToList)    setAddedToList(d.addedToList);
        if (d.customMeals)    setCustomMeals(d.customMeals);
        if (d.shopChecked)    setShopChecked(d.shopChecked);
        if (typeof d.shopHideOwned === "boolean") setShopHideOwned(d.shopHideOwned);
        if (typeof d.weekOff === "number") setWeekOff(d.weekOff);
        if (typeof d.selDay  === "number") setSelDay(d.selDay);
      } else if (!error && !data?.data) {
        // Brand-new account — show preferences onboarding before the plan
        setIsFirstTime(true);
      }
      setDataLoaded(true);
    }
    loadData();
  }, [session?.user?.id]);

  // Debounced save: writes to Supabase 2s after any state change
  const stateSnapshot = useMemo(()=>({
    allPlans, prefs, owned, eaten, favorites, dislikes,
    addedToList, customMeals, shopChecked, shopHideOwned, weekOff, selDay
  }),[allPlans,prefs,owned,eaten,favorites,dislikes,
      addedToList,customMeals,shopChecked,shopHideOwned,weekOff,selDay]);

  useEffect(() => {
    if (!dataLoaded || !session?.user?.id) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await supabase.from("user_state").upsert({
        user_id: session.user.id,
        data: stateSnapshot,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }, 2000);
    return () => clearTimeout(saveTimer.current);
  }, [stateSnapshot, dataLoaded, session?.user?.id]);

  // shoppingMeals MUST be declared here — before any conditional return —
  // to keep the hooks call order identical on every render (Rules of Hooks).
  const shoppingMeals = useMemo(()=>{
    const out=[];
    Object.entries(allPlans).forEach(([off,plan])=>{
      plan.forEach((day,di)=>{
        MT.forEach(mt=>{
          if(addedToList[listKey(off,di,mt)]&&day[mt]) out.push(day[mt]);
        });
      });
    });
    return out;
  },[allPlans,addedToList]);

  // Loading screen — shown as conditional rendering, NOT an early return,
  // so that no hooks are ever skipped between renders.
  if (!dataLoaded) {
    return (
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",
        height:"100dvh",background:"#1A1F2E",
        fontFamily:"'Nunito Sans',sans-serif",color:"rgba(255,255,255,.5)",fontSize:15,gap:12}}>
        <div style={{width:22,height:22,border:"3px solid rgba(255,255,255,.15)",
          borderTopColor:"#059669",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>
        Loading your meal plan…
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }
  // ── End persistence ────────────────────────────────────────

  function getPlan(off) {
    if (!allPlans[off]) {
      const p = buildWeek(prefs, `w${off}`, dislikes, owned, customMeals);
      setAllPlans(prev=>({...prev,[off]:p}));
      return p;
    }
    return allPlans[off];
  }

  const weekPlan = getPlan(weekOff);
  const weekDates = getWeekDates(weekOff);
  const today = new Date(); today.setHours(0,0,0,0);
  function dayCost(day) { return MT.reduce((s,mt)=>{ const m=day[mt]; return s+(m&&!m.costEstimated?useCost(m):0); },0); }
  const weekTotal = weekPlan.reduce((s,d)=>s+dayCost(d),0);

  function handleSwap(dayIdx,type) {
    if (!swapFirst) { setSwapFirst({dayIdx,type,weekOff}); return; }
    if (swapFirst.dayIdx===dayIdx&&swapFirst.type===type&&swapFirst.weekOff===weekOff) { setSwapFirst(null); return; }
    setAllPlans(prev=>{
      const u=dc(prev);
      if (!u[swapFirst.weekOff]) u[swapFirst.weekOff]=dc(getPlan(swapFirst.weekOff));
      const tmp=u[swapFirst.weekOff][swapFirst.dayIdx][swapFirst.type];
      u[swapFirst.weekOff][swapFirst.dayIdx][swapFirst.type]=u[weekOff][dayIdx][type];
      u[weekOff][dayIdx][type]=tmp;
      return u;
    });
    setSwapFirst(null);
  }

  function savePrefs(np) {
    setPrefs(np);
    const newPlan = buildWeek(np, `w${weekOff}-${Date.now()}`, dislikes, owned, customMeals);
    setAllPlans(prev=>({...prev,[weekOff]:newPlan}));
  }

  function toggleOwned(item, forceOn=false) {
    const k = item.toLowerCase();
    setOwned(prev=>({...prev,[k]:forceOn?true:!prev[k]}));
  }

  function setAllOwned(checkAll) {
    const allItems = [];
    R.forEach(r=>r.ings.forEach(i=>{ if(!allItems.find(x=>x===i.item)) allItems.push(i.item); }));
    if (checkAll) {
      const updates = {};
      allItems.forEach(item=>{ updates[item.toLowerCase()]=true; });
      setOwned(prev=>({...prev,...updates}));
    } else {
      setOwned(prev=>{
        const u={...prev};
        allItems.forEach(item=>{ delete u[item.toLowerCase()]; });
        return u;
      });
    }
  }

  function addToPantry(items) {
    const updates = {};
    items.forEach(item=>{ updates[item.toLowerCase()]=true; });
    setOwned(prev=>({...prev,...updates}));
  }

  function navToMeal(meal) {
    // Find the meal in allPlans and navigate to it
    for (const [offStr, plan] of Object.entries(allPlans)) {
      for (let di=0; di<plan.length; di++) {
        for (const mt of MT) {
          if (plan[di][mt]?.id === meal.id) {
            setWeekOff(parseInt(offStr));
            setSelDay(di);
            setView("plan");
            return;
          }
        }
      }
    }
    setView("plan");
  }

  function toggleFav(id) { setFavorites(p=>({...p,[id]:!p[id]})); }
  function toggleDislike(id) {
    setDislikes(p=>({...p,[id]:!p[id]}));
    // If just disliked something currently on screen, it stays — user has to manually change it
  }
  function listKey(off,di,mt) { return `${off}|${di}|${mt}`; }
  function toggleList(off,di,mt) {
    const k=listKey(off,di,mt);
    setAddedToList(p=>({...p,[k]:!p[k]}));
  }

  function saveCustomMeal(meal) {
    const isNew = !customMeals.find(m=>m.id===meal.id);
    setCustomMeals(prev=>{
      const exists=prev.find(m=>m.id===meal.id);
      return exists?prev.map(m=>m.id===meal.id?meal:m):[...prev,meal];
    });
    // Auto-add ingredients to pantry when a brand-new custom meal is created
    if (isNew && meal.ings?.length) {
      const updates = {};
      meal.ings.forEach(ing=>{ if(ing.item) updates[ing.item.toLowerCase()]=true; });
      setOwned(prev=>({...prev,...updates}));
    }
  }
  function deleteCustomMeal(id) { setCustomMeals(prev=>prev.filter(m=>m.id!==id)); }

  function addWeekToList() {
    const updates = {};
    weekPlan.forEach((_,di) => {
      MT.forEach(mt => { updates[listKey(weekOff,di,mt)] = true; });
    });
    setAddedToList(prev=>({...prev,...updates}));
  }

  function clearList() {
    setAddedToList({});
  }

  function isPastOrToday(di) { return sameDay(weekDates[di],today)||weekDates[di]<today; }
  function toggleEaten(di,type) { const k=`${weekOff}|${di}|${type}`; setEaten(p=>({...p,[k]:!p[k]})); }
  function navWeek(off,dayI) { setWeekOff(off); setSelDay(dayI); setView("plan"); }

  function goDay(delta) {
    setSlideDir(delta>0?"right":"left");
    if (delta>0) {
      if (selDay===6) { setWeekOff(w=>w+1); setSelDay(0); }
      else setSelDay(d=>d+1);
    } else {
      if (selDay===0) { setWeekOff(w=>w-1); setSelDay(6); }
      else setSelDay(d=>d-1);
    }
  }

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function onTouchEnd(e) {
    if (touchStartX.current===null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    touchStartX.current = null;
    if (Math.abs(dx) < 50 || dy > 80) return;
    goDay(dx < 0 ? 1 : -1);
  }

  const curDay = weekPlan[selDay];
  const wLabel = `${fmt(weekDates[0])} – ${fmt(weekDates[6])}`;
  const NAV_ITEMS = [
    {v:"plan",   icon:"📅", label:"Plan"},
    {v:"shopping",icon:"🛒",label:"Shop"},
    {v:"calendar",icon:"📆",label:"Calendar"},
    {v:"pantry", icon:"🧺", label:"Pantry"},
    {v:"favs",   icon:"⭐", label:"Favs"},
  ];
  const PAGE_TITLE = {plan:"Meal Plan",shopping:"Shopping List",calendar:"Calendar",pantry:"My Pantry",favs:"Favorites"};

  // Shared view content (used by both mobile and desktop)
  const viewContent = (
    <>
      {view==="shopping" && <ShoppingList meals={shoppingMeals} owned={owned} onClearList={clearList} checked={shopChecked} setChecked={setShopChecked} hideOwned={shopHideOwned} setHideOwned={setShopHideOwned} onOpenSource={setShopSourcePopup} onOpenAddPantry={setShopAddPantryItems}/>}
      {view==="calendar" && <CalendarView allPlans={allPlans} eatenMeals={eaten} currentWeekOff={weekOff} onNav={navWeek}/>}
      {view==="pantry" && <PantryView owned={owned} onToggle={toggleOwned} onSetAll={setAllOwned}/>}
      {view==="favs" && <FavoritesView favorites={favorites} dislikes={dislikes} owned={owned}
        customMeals={customMeals}
        onToggleFav={toggleFav} onToggleDislike={toggleDislike}
        onViewRecipe={r=>setRecModal({meal:r,type:r.type})}
        onCreateCustom={()=>{setEditingCustom(null);setShowCustomForm(true);}}
        onEditCustom={r=>{setEditingCustom(r);setShowCustomForm(true);}}
        onDeleteCustom={deleteCustomMeal}/>}
      {view==="plan" && (
        <div className="fade-up">
          <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:10}}>
            <div>
              <h2 style={{fontFamily:"'Manrope',sans-serif",fontSize:26,fontWeight:800,color:"#1A1F2E",lineHeight:1}}>{DAYS[selDay]}</h2>
              <p style={{fontSize:13.5,color:"#64748B",marginTop:3}}>
                {wLabel} &nbsp;·&nbsp; Daily total: <strong style={{color:"#D97706"}}>${dayCost(curDay).toFixed(2)}</strong>
              </p>
            </div>
            <div style={{display:"flex",gap:7}}>
              <button className="abtn" onClick={()=>setSelDay(i=>(i+6)%7)}>← Prev</button>
              <button className="abtn" onClick={()=>setSelDay(i=>(i+1)%7)}>Next →</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:14,marginBottom:14}}>
            {MT.map(mt=>(
              <MealCard key={mt} meal={curDay[mt]} type={mt} dayIdx={selDay} weekOff={weekOff}
                swapFirst={swapFirst} isEaten={!!eaten[`${weekOff}|${selDay}|${mt}`]}
                canEat={isPastOrToday(selDay)}
                isFav={!!favorites[curDay[mt]?.id]}
                isDisliked={!!dislikes[curDay[mt]?.id]}
                isOnList={!!addedToList[listKey(weekOff,selDay,mt)]}
                onView={()=>setRecModal({meal:curDay[mt],type:mt})}
                onSwap={()=>handleSwap(selDay,mt)}
                onPick={()=>setPicker({dayIdx:selDay,type:mt,curId:curDay[mt]?.id})}
                onToggleEaten={()=>toggleEaten(selDay,mt)}
                onToggleFav={()=>toggleFav(curDay[mt]?.id)}
                onToggleDislike={()=>toggleDislike(curDay[mt]?.id)}
                onToggleList={()=>toggleList(weekOff,selDay,mt)}/>
            ))}
          </div>
          <div style={{background:"#fff",border:"1.5px solid #E8EBF0",borderRadius:8,padding:"11px 15px",
            fontSize:13,color:"#64748B",display:"flex",gap:14,flexWrap:"wrap",lineHeight:1.6}}>
            <strong style={{color:"#334155",whiteSpace:"nowrap"}}>💡 Tips</strong>
            <span><strong>📖 Recipe</strong> — full ingredients, steps &amp; pricing</span>
            <span><strong>✎ Change</strong> — pick from the recipe bank</span>
            <span><strong>↔ Swap</strong> — trade meals between days</span>
            <span><strong>🛒 + List</strong> — add this meal's ingredients to Shop</span>
            <span><strong>♡ / –</strong> — favorite or dislike a meal</span>
          </div>
        </div>
      )}
    </>
  );

  // Shared modals
  const sharedModals = (
    <>
      {recModal && <RecipeModal meal={recModal.meal} type={recModal.type} owned={owned} onClose={()=>setRecModal(null)}/>}
      {picker && (
        <RecipePicker mealType={picker.type} prefs={prefs} currentId={picker.curId} dislikes={dislikes} customMeals={customMeals}
          onSelect={r=>{
            setAllPlans(prev=>{ const u=dc(prev); u[weekOff][picker.dayIdx][picker.type]=r; return u; });
            setPicker(null);
          }}
          onClose={()=>setPicker(null)}/>
      )}
      {isFirstTime && <PrefsPanel prefs={prefs} isFirstTime={true}
        onSave={p=>{savePrefs(p);}}
        onClose={()=>setIsFirstTime(false)}/>}
      {!isFirstTime && showPrefs && <PrefsPanel prefs={prefs} onSave={savePrefs} onClose={()=>setShowPrefs(false)}/>}
      {showCustomForm && <CustomMealForm
        existing={editingCustom}
        onSave={saveCustomMeal}
        onClose={()=>{setShowCustomForm(false);setEditingCustom(null);}}/>}

      {/* Shopping: ingredient source popup */}
      {shopSourcePopup && (
        <>
          <div onClick={()=>setShopSourcePopup(null)}
            style={{position:"fixed",inset:0,background:"rgba(15,23,42,.5)",zIndex:900}}/>
          <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
            zIndex:901,width:"min(420px,90vw)",maxHeight:"70vh",display:"flex",flexDirection:"column",
            background:"#fff",borderRadius:12,boxShadow:"0 24px 64px rgba(0,0,0,.3)",overflow:"hidden",animation:"modalIn .2s ease"}}>
            <div style={{padding:"16px 18px 12px",borderBottom:"1px solid #F0F2F5",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <h3 style={{fontFamily:"'Manrope',sans-serif",fontSize:16,fontWeight:800,color:"#1A1F2E"}}>{shopSourcePopup.item}</h3>
                <div style={{fontSize:12.5,color:"#94A3B8",marginTop:2}}>Used in {shopSourcePopup.meals.length} meal{shopSourcePopup.meals.length!==1?"s":""} on your list</div>
              </div>
              <button onClick={()=>setShopSourcePopup(null)}
                style={{border:"none",background:"#F0F2F5",borderRadius:6,width:28,height:28,fontSize:16,color:"#94A3B8",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
            </div>
            <div style={{overflow:"auto",padding:"10px 6px 14px"}}>
              {shopSourcePopup.meals.map((meal,i)=>(
                <div key={i} style={{padding:"10px 14px",borderRadius:7,margin:"0 6px 4px",background:"#F8FAFC",border:"1px solid #E8EBF0"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                    <span style={{display:"inline-block",padding:"1px 8px",borderRadius:20,background:MT_BG[meal.type],color:MT_COLOR[meal.type],fontSize:10,fontWeight:700}}>{meal.type.toUpperCase()}</span>
                    <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:700,fontSize:14,color:"#1A1F2E"}}>{meal.name}</span>
                  </div>
                  <div style={{fontSize:12,color:"#94A3B8",marginBottom:8}}>Tap below to go to this meal — you can change or remove it from there.</div>
                  <button onClick={()=>{navToMeal(meal);setShopSourcePopup(null);}}
                    style={{border:"1.5px solid #E2E8F0",background:"#fff",borderRadius:6,padding:"6px 12px",
                      fontSize:12,fontWeight:700,color:"#475569",cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif",
                      display:"flex",alignItems:"center",gap:5}}>
                    → Go to this meal
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Shopping: Add to Pantry confirm */}
      {shopAddPantryItems && (
        <>
          <div onClick={()=>setShopAddPantryItems(null)}
            style={{position:"fixed",inset:0,background:"rgba(15,23,42,.5)",zIndex:900}}/>
          <div style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",
            zIndex:901,width:"min(380px,88vw)",background:"#fff",borderRadius:12,
            boxShadow:"0 24px 64px rgba(0,0,0,.3)",padding:"22px 22px 18px",animation:"modalIn .2s ease"}}>
            <h3 style={{fontFamily:"'Manrope',sans-serif",fontSize:17,fontWeight:800,color:"#1A1F2E",marginBottom:8}}>Add to Pantry?</h3>
            <p style={{fontSize:13.5,color:"#475569",lineHeight:1.65,marginBottom:6}}>
              This will mark all <strong>{shopAddPantryItems.length} checked item{shopAddPantryItems.length!==1?"s":""}</strong> as owned in your pantry:
            </p>
            <div style={{maxHeight:160,overflow:"auto",background:"#F8FAFC",borderRadius:7,border:"1px solid #E8EBF0",padding:"8px 12px",marginBottom:16}}>
              {shopAddPantryItems.map((item,idx)=>(
                <div key={idx} style={{fontSize:13,color:"#334155",padding:"3px 0",borderBottom:idx<shopAddPantryItems.length-1?"1px solid #F0F2F5":"none"}}>{item.item}</div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="abtn" onClick={()=>setShopAddPantryItems(null)} style={{flex:1,justifyContent:"center",padding:"10px 0"}}>Cancel</button>
              <button className="abtn pri" onClick={()=>{addToPantry(shopAddPantryItems.map(i=>i.item));setShopAddPantryItems(null);}}
                style={{flex:2,justifyContent:"center",padding:"10px 0",fontSize:13.5}}>
                ✓ Add to Pantry
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  // ── MOBILE LAYOUT ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{fontFamily:"'Nunito Sans',sans-serif",background:"#F0F2F5",height:"100dvh",overflow:"hidden"}}>

        {/* Mobile Header */}
        <header className="m-header" style={{transform: (stripCollapsed && view==="plan") ? "translateY(-56px)" : "translateY(0)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,background:"#059669",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🍽</div>
            {view==="plan" ? (
              <div>
                <div style={{fontFamily:"'Manrope',sans-serif",fontSize:15,fontWeight:800,color:"#fff",lineHeight:1.1}}>{DAYS[selDay]}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{fmt(weekDates[0])} – {fmt(weekDates[6])}</div>
              </div>
            ) : (
              <div style={{fontFamily:"'Manrope',sans-serif",fontSize:16,fontWeight:800,color:"#fff"}}>{PAGE_TITLE[view]}</div>
            )}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {view==="plan" && (
              <span style={{fontSize:12,color:"#D97706",fontFamily:"'Manrope',sans-serif",fontWeight:700}}>${weekTotal.toFixed(2)}</span>
            )}
            {view==="calendar" && (
              <button onClick={()=>setMDayPanel(true)}
                style={{border:"none",background:"rgba(255,255,255,.1)",color:"#fff",borderRadius:7,width:36,height:36,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>
                ☰
              </button>
            )}
            <button onClick={()=>setShowPrefs(true)}
              style={{border:"none",background:"rgba(255,255,255,.1)",color:"rgba(255,255,255,.75)",borderRadius:7,
                width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,cursor:"pointer"}}>
              ⚙
            </button>
          </div>
        </header>

        {/* Mobile Content */}
        <div className="m-content" ref={mContentRef}
          style={{top: (stripCollapsed && view==="plan") ? 0 : 56}}
          onTouchStart={view==="plan"?onTouchStart:undefined}
          onTouchEnd={view==="plan"?onTouchEnd:undefined}>

          {/* Plan view: custom mobile layout with day nav */}
          {view==="plan" ? (
            <div>
              {/* Day strip — sticky below fixed header */}
              <div className="m-day-strip">
                {/* Day name — always visible */}
                <div style={{textAlign:"center",marginBottom:stripCollapsed?0:8}}>
                  <div style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,color:"#fff",fontSize:18,lineHeight:1}}>
                    {DAYS[selDay]}
                  </div>
                </div>

                {/* Collapsible sub-row: date + jump to today + dot nav */}
                <div className={`m-day-strip-sub${stripCollapsed?" hidden":" visible"}`}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:10,width:"100%",justifyContent:"center"}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>
                      {fmt(weekDates[selDay])}
                      {sameDay(weekDates[selDay],today)&&<span style={{marginLeft:6,fontSize:9,fontWeight:800,background:"#059669",color:"#fff",padding:"1px 5px",borderRadius:3}}>TODAY</span>}
                    </span>
                    {!sameDay(weekDates[selDay],today) && (
                      <button onClick={()=>{setWeekOff(0);setSelDay(tIdx);}}
                        style={{border:"none",background:"rgba(5,150,105,.2)",color:"#34D399",borderRadius:20,
                          padding:"2px 8px",fontSize:9.5,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif",lineHeight:1.4}}>
                        ↩ Today
                      </button>
                    )}
                  </div>

                  {/* Arrows sandwiching the MTWTFSS dots */}
                  <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14}}>
                    <button className="m-day-arrow" onClick={()=>goDay(-1)}>‹</button>
                    <div style={{display:"flex",gap:5}}>
                      {DAYS_S.map((d,i)=>(
                        <button key={i} onClick={()=>{setSlideDir(i>selDay?"right":"left");setSelDay(i);}}
                          style={{width:28,height:28,borderRadius:"50%",border:"none",cursor:"pointer",
                            background:i===selDay?"#059669":"rgba(255,255,255,.1)",
                            color:i===selDay?"#fff":"rgba(255,255,255,.5)",
                            fontSize:9,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",
                            transition:"all .12s",fontFamily:"'Nunito Sans',sans-serif"}}>
                          {d.slice(0,1)}
                        </button>
                      ))}
                    </div>
                    <button className="m-day-arrow" onClick={()=>goDay(1)}>›</button>
                  </div>
                </div>
              </div>

              {/* Day cost + meals */}
              <div className="m-page" style={{paddingTop:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <span style={{fontSize:12,color:"#64748B"}}>Daily total</span>
                  <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,fontSize:16,color:"#D97706"}}>${dayCost(curDay).toFixed(2)}</span>
                </div>
                <div key={`${weekOff}-${selDay}`} className={slideDir==="right"?"slide-right":"slide-left"}
                  style={{display:"flex",flexDirection:"column",gap:12}}>
                  {MT.map(mt=>(
                    <MealCard key={mt} meal={curDay[mt]} type={mt} dayIdx={selDay} weekOff={weekOff}
                      swapFirst={swapFirst} isEaten={!!eaten[`${weekOff}|${selDay}|${mt}`]}
                      canEat={isPastOrToday(selDay)}
                      isFav={!!favorites[curDay[mt]?.id]}
                      isDisliked={!!dislikes[curDay[mt]?.id]}
                      isOnList={!!addedToList[listKey(weekOff,selDay,mt)]}
                      onView={()=>setRecModal({meal:curDay[mt],type:mt})}
                      onSwap={()=>handleSwap(selDay,mt)}
                      onPick={()=>setPicker({dayIdx:selDay,type:mt,curId:curDay[mt]?.id})}
                      onToggleEaten={()=>toggleEaten(selDay,mt)}
                      onToggleFav={()=>toggleFav(curDay[mt]?.id)}
                      onToggleDislike={()=>toggleDislike(curDay[mt]?.id)}
                      onToggleList={()=>toggleList(weekOff,selDay,mt)}/>
                  ))}
                </div>
                <button className="abtn shop-on" onClick={addWeekToList}
                  style={{width:"100%",marginTop:14,padding:"11px 0",justifyContent:"center",fontSize:13,fontWeight:700}}>
                  🛒 Add Whole Week to List
                </button>
              </div>
            </div>
          ) : (
            <div className="m-page">
              {view==="shopping" && <ShoppingList meals={shoppingMeals} owned={owned} onClearList={clearList} checked={shopChecked} setChecked={setShopChecked} hideOwned={shopHideOwned} setHideOwned={setShopHideOwned} onOpenSource={setShopSourcePopup} onOpenAddPantry={setShopAddPantryItems}/>}
              {view==="calendar" && <CalendarView allPlans={allPlans} eatenMeals={eaten} currentWeekOff={weekOff} onNav={(off,dayI)=>{navWeek(off,dayI);setMDayPanel(false);}}/>}
              {view==="pantry" && <PantryView owned={owned} onToggle={toggleOwned} onSetAll={setAllOwned}/>}
              {view==="favs" && <FavoritesView favorites={favorites} dislikes={dislikes} owned={owned}
                customMeals={customMeals}
                onToggleFav={toggleFav} onToggleDislike={toggleDislike}
                onViewRecipe={r=>setRecModal({meal:r,type:r.type})}
                onCreateCustom={()=>{setEditingCustom(null);setShowCustomForm(true);}}
                onEditCustom={r=>{setEditingCustom(r);setShowCustomForm(true);}}
                onDeleteCustom={deleteCustomMeal}/>}
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="m-bottom-nav">
          {/* Shopping */}
          <button className={`m-tab${view==="shopping"?" active":""}`} onClick={()=>setView("shopping")}>
            <span className="m-tab-icon">🛒</span>
            <span className="m-tab-label">Shop</span>
          </button>
          {/* Calendar */}
          <button className={`m-tab${view==="calendar"?" active":""}`} onClick={()=>setView("calendar")}>
            <span className="m-tab-icon">📆</span>
            <span className="m-tab-label">Calendar</span>
          </button>
          {/* Plan — center raised circle */}
          <button className="m-tab-plan" onClick={()=>setView("plan")}>
            <div className={`m-tab-plan-circle${view==="plan"?" active":""}`}>
              <span className="m-tab-plan-emoji">🍽</span>
              <span className={`m-tab-plan-label${view==="plan"?" active":""}`}>Plan</span>
            </div>
          </button>
          {/* Pantry */}
          <button className={`m-tab${view==="pantry"?" active":""}`} onClick={()=>setView("pantry")}>
            <span className="m-tab-icon">🧺</span>
            <span className="m-tab-label">Pantry</span>
          </button>
          {/* Favs */}
          <button className={`m-tab${view==="favs"?" active":""}`} onClick={()=>setView("favs")}>
            <span className="m-tab-icon">⭐</span>
            <span className="m-tab-label">Favs</span>
          </button>
        </nav>

        {/* Swap mode banner */}
        {swapFirst && (
          <div className="m-swap-banner">
            <div>
              <div style={{fontSize:12,fontWeight:700,color:"#FCD34D"}}>SWAP MODE</div>
              <div style={{fontSize:11.5,color:"rgba(255,255,255,.55)"}}>Tap another meal to swap.</div>
            </div>
            <button onClick={()=>setSwapFirst(null)}
              style={{border:"1px solid rgba(234,179,8,.4)",background:"transparent",color:"#FCD34D",
                borderRadius:6,padding:"6px 12px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif"}}>
              ✕ Cancel
            </button>
          </div>
        )}

        {/* Slide-out panel: Day/Week list (Calendar page) */}
        <div className={`slide-overlay${mDayPanel?" open":""}`} onClick={()=>setMDayPanel(false)}/>
        <div className={`slide-panel left${mDayPanel?" open":""}`}>
          <div style={{padding:"16px 14px 10px",borderBottom:"1px solid #252D3E",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontFamily:"'Manrope',sans-serif",fontWeight:800,color:"#fff",fontSize:16}}>Weeks &amp; Days</div>
            <button onClick={()=>setMDayPanel(false)}
              style={{border:"none",background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.6)",
                borderRadius:6,width:30,height:30,fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          </div>
          {/* Week switcher */}
          <div style={{padding:"10px 12px 8px",borderBottom:"1px solid #252D3E"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:weekOff!==0?8:0}}>
              <button onClick={()=>setWeekOff(w=>w-1)}
                style={{border:"none",background:"transparent",color:"rgba(255,255,255,.5)",fontSize:18,cursor:"pointer",padding:"4px 8px",borderRadius:5}}>←</button>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:9.5,fontWeight:700,letterSpacing:".06em",color:"rgba(255,255,255,.28)"}}>WEEK OF</div>
                <div style={{fontSize:12,fontWeight:600,color:"rgba(255,255,255,.7)",marginTop:1}}>{fmt(weekDates[0])} – {fmt(weekDates[6])}</div>
              </div>
              <button onClick={()=>setWeekOff(w=>w+1)}
                style={{border:"none",background:"transparent",color:"rgba(255,255,255,.5)",fontSize:18,cursor:"pointer",padding:"4px 8px",borderRadius:5}}>→</button>
            </div>
            {weekOff!==0&&<button onClick={()=>{setWeekOff(0);setSelDay(tIdx);}}
              style={{width:"100%",padding:"5px 0",border:"none",background:"rgba(5,150,105,.2)",color:"#34D399",
                borderRadius:5,fontSize:11.5,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif"}}>
              ↩ Jump to Today
            </button>}
          </div>
          {/* Day list */}
          <div style={{flex:1,overflow:"auto",padding:"6px 8px"}}>
            {DAYS_S.map((d,i)=>{
              const date=weekDates[i], isToday=sameDay(date,today);
              const cost=dayCost(weekPlan[i]);
              const eatN=MT.filter(mt=>eaten[`${weekOff}|${i}|${mt}`]).length;
              return(
                <button key={i} className={`day-btn${selDay===i&&view==="plan"?" active":""}`}
                  onClick={()=>{setSelDay(i);setView("plan");setMDayPanel(false);}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span>{d}</span>
                    {isToday&&<span style={{fontSize:9,fontWeight:800,background:"#059669",color:"#fff",padding:"1px 5px",borderRadius:3}}>TODAY</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    {eatN>0&&<div style={{display:"flex",gap:2}}>{Array.from({length:eatN},(_,j)=><div key={j} style={{width:4,height:4,borderRadius:"50%",background:"#34D399"}}/>)}</div>}
                    <span style={{fontSize:11.5,fontWeight:700,color:"rgba(5,150,105,.85)"}}>${cost.toFixed(2)}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{padding:"8px 10px 12px",borderTop:"1px solid #252D3E"}}>
            <button onClick={()=>{addWeekToList();setMDayPanel(false);}}
              style={{width:"100%",padding:"9px 0",border:"none",background:"rgba(2,132,199,.18)",color:"#38BDF8",
                borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif"}}>
              🛒 Add Week to List
            </button>
          </div>
        </div>

        {sharedModals}
      </div>
    );
  }

  // ── DESKTOP LAYOUT ──────────────────────────────────────────
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#F0F2F5",overflow:"hidden"}}>
      {/* HEADER */}
      <header style={{background:"#1A1F2E",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 18px",flexShrink:0,zIndex:50}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:36,height:36,background:"#059669",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🍽</div>
          <div>
            <div style={{fontFamily:"'Manrope',sans-serif",fontSize:17,fontWeight:800,color:"#fff"}}>Campus Eats</div>
            <div style={{fontSize:10.5,color:"rgba(255,255,255,.35)",letterSpacing:".04em"}}>MEAL PLANNER</div>
          </div>
          <div style={{width:1,height:26,background:"rgba(255,255,255,.12)",margin:"0 6px"}}/>
          <div style={{display:"flex",gap:2}}>
            {NAV_ITEMS.map(({v,icon,label})=>(
              <button key={v} onClick={()=>setView(v)}
                style={{padding:"7px 12px",border:"none",background:view===v?"rgba(255,255,255,.12)":"transparent",
                  color:view===v?"#fff":"rgba(255,255,255,.45)",fontFamily:"'Nunito Sans',sans-serif",
                  fontSize:13,fontWeight:700,borderRadius:7,cursor:"pointer",transition:"all .12s"}}>
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:12.5,color:"rgba(255,255,255,.45)"}}>
            Week: <span style={{color:"#D97706",fontFamily:"'Manrope',sans-serif",fontWeight:800,fontSize:14}}>${weekTotal.toFixed(2)}</span>
          </span>
          <button className="abtn" onClick={()=>setShowPrefs(true)}
            style={{background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.15)",color:"#fff",fontSize:13}}>
            ⚙ Preferences
          </button>
          <button className="abtn" onClick={()=>supabase.auth.signOut()}
            style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",color:"rgba(255,255,255,.55)",fontSize:12}}>
            Sign Out
          </button>
        </div>
      </header>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* SIDEBAR */}
        <aside style={{width:200,background:"#1A1F2E",borderRight:"1px solid #252D3E",display:"flex",flexDirection:"column",flexShrink:0,overflow:"hidden"}}>
          <div style={{padding:"12px 10px 8px",borderBottom:"1px solid #252D3E"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:weekOff!==0?7:0}}>
              <button onClick={()=>setWeekOff(w=>w-1)}
                style={{border:"none",background:"transparent",color:"rgba(255,255,255,.4)",fontSize:16,cursor:"pointer",padding:"4px 8px",borderRadius:5}}>←</button>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:9.5,fontWeight:700,letterSpacing:".06em",color:"rgba(255,255,255,.28)"}}>WEEK OF</div>
                <div style={{fontSize:11.5,fontWeight:600,color:"rgba(255,255,255,.65)",marginTop:1}}>{fmt(weekDates[0])}</div>
              </div>
              <button onClick={()=>setWeekOff(w=>w+1)}
                style={{border:"none",background:"transparent",color:"rgba(255,255,255,.4)",fontSize:16,cursor:"pointer",padding:"4px 8px",borderRadius:5}}>→</button>
            </div>
            {weekOff!==0 && (
              <button onClick={()=>{setWeekOff(0);setSelDay(tIdx);}}
                style={{width:"100%",padding:"5px 0",border:"none",background:"rgba(5,150,105,.2)",color:"#34D399",
                  borderRadius:5,fontSize:11.5,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif"}}>
                ↩ Jump to Today
              </button>
            )}
          </div>
          <div style={{padding:"8px 8px",flex:1,overflow:"auto"}}>
            {DAYS_S.map((d,i)=>{
              const date=weekDates[i], isToday=sameDay(date,today);
              const cost=dayCost(weekPlan[i]);
              const eatN=MT.filter(mt=>eaten[`${weekOff}|${i}|${mt}`]).length;
              return (
                <button key={i} className={`day-btn${selDay===i&&view==="plan"?" active":""}`}
                  onClick={()=>{setSelDay(i);setView("plan");}}>
                  <div style={{display:"flex",alignItems:"center",gap:6}}>
                    <span>{d}</span>
                    {isToday && <span style={{fontSize:9,fontWeight:800,background:"#059669",color:"#fff",padding:"1px 5px",borderRadius:3}}>TODAY</span>}
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:5}}>
                    {eatN>0 && <div style={{display:"flex",gap:2}}>{Array.from({length:eatN},(_,j)=><div key={j} style={{width:4,height:4,borderRadius:"50%",background:"#34D399"}}/>)}</div>}
                    <span style={{fontSize:11.5,fontWeight:700,color:"rgba(5,150,105,.85)"}}>${cost.toFixed(2)}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{padding:"8px 10px 4px",borderTop:"1px solid #252D3E"}}>
            <button onClick={addWeekToList}
              style={{width:"100%",padding:"8px 0",border:"none",background:"rgba(2,132,199,.18)",color:"#38BDF8",
                borderRadius:5,fontSize:11.5,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif"}}>
              🛒 Add Week to List
            </button>
          </div>
          {swapFirst && (
            <div style={{margin:"0 10px 10px",padding:"10px 11px",background:"rgba(234,179,8,.1)",border:"1px solid rgba(234,179,8,.25)",borderRadius:7}}>
              <div style={{fontSize:11.5,fontWeight:700,color:"#FCD34D",marginBottom:4}}>SWAP MODE</div>
              <div style={{fontSize:11.5,color:"rgba(255,255,255,.45)",lineHeight:1.55}}>Click another meal to swap with it.</div>
              <button onClick={()=>setSwapFirst(null)}
                style={{marginTop:6,width:"100%",padding:"5px 0",border:"1px solid rgba(234,179,8,.3)",borderRadius:5,
                  background:"transparent",color:"#FCD34D",fontSize:11.5,fontWeight:700,cursor:"pointer",fontFamily:"'Nunito Sans',sans-serif"}}>
                ✕ Cancel
              </button>
            </div>
          )}
        </aside>

        {/* MAIN */}
        <main style={{flex:1,overflow:"auto",padding:"22px 22px 30px"}}>
          {viewContent}
        </main>
      </div>

      {sharedModals}
    </div>
  );
}