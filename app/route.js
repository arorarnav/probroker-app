export const dynamic = "force-static";

// The landing page is a fully custom HTML/CSS/JS file (built outside React),
// so instead of converting 800+ lines of custom design into JSX, this route
// serves the raw file directly as the homepage.
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ProBroker.ai — Proprietary AI listing intelligence</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<style>
  :root{
    --bg:#F7F8F5;
    --ink:#12140F;
    --ink-soft:#585F55;
    --line: rgba(18,20,15,0.09);

    --dark:#0A0C0A;
    --dark-2:#12160F;
    --dark-3:#1A2117;
    --on-dark:#F3F5EF;
    --on-dark-dim: rgba(243,245,239,0.64);
    --dark-line: rgba(243,245,239,0.10);

    --accent:#0E9C69;
    --accent-bright:#22D48A;
    --accent-deep:#0A7550;
    --gold:#D8A94B;
    --gold-bright:#EFC768;
    --signal:#C2410C;
  }
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;overflow-x:hidden;}
  body{
    margin:0;background:var(--bg);color:var(--ink);
    font-family:'Plus Jakarta Sans', sans-serif;font-size:17px;line-height:1.62;
    -webkit-font-smoothing:antialiased;overflow-x:hidden;
  }
  h1,h2,h3,h4{font-family:'Bricolage Grotesque', sans-serif;font-weight:700;margin:0;letter-spacing:-0.02em;}
  .mono{font-family:'IBM Plex Mono', monospace;}
  a{color:inherit;}
  .wrap{max-width:1180px;margin:0 auto;padding:0 32px;}
  @media (max-width:640px){.wrap{padding:0 20px;} body{font-size:16px;}}

  @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
  @keyframes drift{0%,100%{transform:translate(0,0);}50%{transform:translate(-18px,14px);}}
  @keyframes scanSweep{0%{top:-10%;}100%{top:110%;}}
  @keyframes pulseRing{0%{box-shadow:0 0 0 0 rgba(34,212,138,0.45);}100%{box-shadow:0 0 0 14px rgba(34,212,138,0);}}
  @media (prefers-reduced-motion: reduce){*{animation:none !important;transition:none !important;}}

  /* ---------- NAV ---------- */
  nav{position:sticky;top:0;z-index:50;background:rgba(10,12,16,0.82);backdrop-filter:blur(14px);border-bottom:1px solid var(--dark-line);}
  nav .wrap{display:flex;align-items:center;justify-content:space-between;height:74px;}
  .brand{font-family:'Bricolage Grotesque',sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.01em;color:var(--on-dark);display:flex;align-items:center;gap:9px;}
  .brand-mark{width:22px;height:22px;border-radius:6px;background:linear-gradient(135deg, var(--accent-bright), #D8A94B);flex-shrink:0;box-shadow:0 0 16px rgba(34,212,138,0.5);}
  .brand .dot{background:linear-gradient(135deg, var(--accent-bright), var(--gold-bright));-webkit-background-clip:text;background-clip:text;color:transparent;}
  .nav-cta{background:var(--accent);color:#fff;padding:11px 22px;border-radius:7px;font-size:14.5px;font-weight:600;text-decoration:none;transition:background .18s ease, transform .18s ease;}
  .nav-cta:hover{background:var(--accent-bright);transform:translateY(-1px);}

  /* ---------- HERO (dark) ---------- */
  .hero{background:var(--dark);color:var(--on-dark);padding:96px 0 110px;position:relative;overflow:hidden;}
  .glow{position:absolute;border-radius:50%;filter:blur(90px);opacity:0.35;pointer-events:none;}
  .glow-1{width:520px;height:520px;background:var(--accent);top:-180px;right:-140px;animation:drift 12s ease-in-out infinite;}
  .glow-2{width:380px;height:380px;background:#D8A94B;bottom:-160px;left:-100px;opacity:0.22;animation:drift 15s ease-in-out infinite reverse;}
  .grid-overlay{position:absolute;inset:0;background-image:linear-gradient(rgba(243,244,246,0.035) 1px, transparent 1px),linear-gradient(90deg, rgba(243,244,246,0.035) 1px, transparent 1px);background-size:44px 44px;pointer-events:none;mask-image:radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent);}

  .hero-grid{display:grid;grid-template-columns:1.05fr 0.95fr;gap:64px;align-items:center;position:relative;z-index:1;}
  @media (max-width:960px){.hero-grid{grid-template-columns:1fr;}}

  .eyebrow{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent-bright);margin-bottom:22px;display:flex;align-items:center;gap:10px;font-weight:700;opacity:0;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) .1s forwards;}
  .eyebrow::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--accent-bright);animation:pulseRing 2.2s ease-out infinite;}

  h1.headline{font-size:clamp(34px,4.6vw,54px);line-height:1.1;margin-bottom:22px;opacity:0;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) .22s forwards;}
  h1.headline .accent-text{color:var(--accent-bright);}

  .sub{font-size:18px;color:var(--on-dark-dim);max-width:50ch;margin-bottom:38px;opacity:0;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) .38s forwards;}
  .sub b{color:var(--on-dark);font-weight:700;}

  .hero-ctas{display:flex;gap:16px;flex-wrap:wrap;align-items:center;opacity:0;animation:fadeUp .7s cubic-bezier(.16,1,.3,1) .52s forwards;}
  .btn-primary{background:var(--accent);color:#fff;padding:16px 30px;border-radius:8px;font-weight:700;font-size:16.5px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;transition:transform .18s ease, background .18s ease, box-shadow .18s ease;box-shadow:0 8px 24px -8px rgba(14,156,105,0.55);}
  .btn-primary:hover{background:var(--accent-bright);transform:translateY(-2px);box-shadow:0 12px 32px -8px rgba(34,212,138,0.6);}
  .btn-ghost{color:var(--on-dark-dim);font-size:15.5px;text-decoration:underline;text-underline-offset:4px;text-decoration-color:rgba(243,244,246,0.3);}

  /* ---------- AI PROCESSING VISUAL ---------- */
  .proc-wrap{opacity:0;animation:fadeUp .8s cubic-bezier(.16,1,.3,1) .45s forwards;}
  .proc-box{position:relative;height:440px;border-radius:14px;overflow:hidden;background:var(--dark-2);border:1px solid var(--dark-line);box-shadow:0 40px 80px -30px rgba(0,0,0,0.7);}
  .proc-label{position:absolute;top:14px;left:16px;z-index:3;font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-bright);background:rgba(14,156,105,0.14);border:1px solid rgba(34,212,138,0.35);padding:5px 10px;border-radius:5px;}
  .proc-inner{display:grid;grid-template-columns:1fr 1fr;height:100%;}
  .raw-col{position:relative;overflow:hidden;padding:56px 16px 20px;border-right:1px solid var(--dark-line);-webkit-mask-image:linear-gradient(to bottom, transparent, black 16%, black 88%, transparent);mask-image:linear-gradient(to bottom, transparent, black 16%, black 88%, transparent);}
  .raw-track{display:flex;flex-direction:column;gap:8px;animation:scrollUp 18s linear infinite;}
  @keyframes scrollUp{from{transform:translateY(0);}to{transform:translateY(-50%);}}
  .bubble{background:var(--dark-3);border-radius:8px;padding:9px 11px;font-size:11.5px;color:var(--on-dark-dim);max-width:94%;border:1px solid var(--dark-line);}
  .bubble b{color:var(--on-dark);font-weight:600;}
  .bubble .num{font-family:'IBM Plex Mono',monospace;color:var(--accent-bright);}
  .scan-line{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg, transparent, var(--accent-bright), transparent);box-shadow:0 0 14px 2px rgba(34,212,138,0.7);animation:scanSweep 3.4s ease-in-out infinite;}

  .out-col{padding:56px 16px 20px;display:flex;flex-direction:column;gap:8px;background:var(--dark-3);}
  .out-head{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:var(--on-dark-dim);display:grid;grid-template-columns:1.1fr 0.7fr 0.6fr;gap:6px;padding:0 8px 7px;border-bottom:1px solid var(--dark-line);}
  .out-row{display:grid;grid-template-columns:1.1fr 0.7fr 0.6fr;gap:6px;background:rgba(14,156,105,0.08);border:1px solid rgba(34,212,138,0.18);border-radius:6px;padding:10px 8px;font-size:11.5px;color:var(--on-dark);opacity:0;transform:translateY(6px);animation:rowIn .5s ease forwards;}
  .out-row .tag{font-family:'IBM Plex Mono',monospace;font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:3px;display:inline-block;letter-spacing:.03em;}
  .tag.supply{background:rgba(34,212,138,0.22);color:var(--accent-bright);}
  .tag.demand{background:rgba(255,107,74,0.18);color:var(--signal);}
  .out-row .price{font-family:'IBM Plex Mono',monospace;}
  @keyframes rowIn{to{opacity:1;transform:translateY(0);}}

  /* ---------- SECTIONS ---------- */
  section{padding:100px 0;}
  .section-light{background:var(--bg);color:var(--ink);}
  .section-dark{background:var(--dark);color:var(--on-dark);position:relative;overflow:hidden;}
  .section-title{font-size:clamp(30px,3.6vw,42px);font-weight:700;letter-spacing:-0.025em;line-height:1.15;max-width:22ch;margin-bottom:16px;}
  .section-lede{font-size:17.5px;max-width:54ch;}
  .eyebrow-light{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:0.14em;text-transform:uppercase;color:var(--accent-deep);margin-bottom:18px;display:flex;align-items:center;gap:10px;font-weight:700;}
  .eyebrow-light::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--accent-deep);}

  .reveal{opacity:0;transform:perspective(1000px) rotateX(9deg) translateY(28px);transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);transform-origin:top center;}
  .reveal.in{opacity:1;transform:perspective(1000px) rotateX(0deg) translateY(0);}

  /* ---------- COMPARE ---------- */
  .compare{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:52px;}
  @media (max-width:860px){.compare{grid-template-columns:1fr;}}
  .compare-col{border-radius:14px;padding:34px;background:#fff;border:1.5px solid var(--line);}
  .compare-col.deal{border-color:rgba(14,156,105,0.35);background:linear-gradient(180deg, rgba(14,156,105,0.05), rgba(14,156,105,0.015));}
  .compare-label{font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;margin-bottom:24px;font-weight:700;color:var(--ink-soft);}
  .compare-col.deal .compare-label{color:var(--accent-deep);}
  .compare-item{display:flex;gap:16px;align-items:flex-start;padding:15px 0;}
  .compare-item:not(:last-child){border-bottom:1px solid var(--line);}
  .icon-circle{flex-shrink:0;width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:rgba(14,17,22,0.05);}
  .deal .icon-circle{background:rgba(14,156,105,0.12);}
  .compare-item p{margin:0;font-size:16px;color:var(--ink);}

  /* ---------- STEPS ---------- */
  .steps{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:52px;}
  @media (max-width:860px){.steps{grid-template-columns:1fr;}}
  .step{background:var(--dark-2);border:1px solid var(--dark-line);border-radius:12px;padding:34px 28px;transition:transform .3s cubic-bezier(.16,1,.3,1), border-color .3s ease;}
  .step:hover{transform:translateY(-6px);border-color:rgba(34,212,138,0.4);}
  .step-num{font-family:'Bricolage Grotesque',sans-serif;color:var(--accent-bright);font-size:15px;font-weight:700;margin-bottom:16px;letter-spacing:.04em;}
  .step h3{font-size:20px;margin-bottom:10px;color:var(--on-dark);}
  .step p{color:var(--on-dark-dim);font-size:15.5px;margin:0;}

  /* ---------- PREVIEW ---------- */
  .preview-card{background:#fff;border-radius:14px;padding:0;margin-top:52px;box-shadow:0 40px 80px -30px rgba(14,17,22,0.18);border:1px solid var(--line);overflow:hidden;}
  .preview-bar{display:flex;gap:7px;padding:14px 16px;background:#F1F2F4;}
  .preview-bar span{width:11px;height:11px;border-radius:50%;background:rgba(14,17,22,0.15);}
  .preview-table{width:100%;border-collapse:collapse;font-size:14px;}
  .preview-table th{background:var(--dark);color:var(--on-dark);font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.05em;text-align:left;padding:13px 16px;}
  .preview-table td{padding:13px 16px;color:var(--ink);border-bottom:1px solid var(--line);}
  .preview-table tr:nth-child(even){background:rgba(14,17,22,0.02);}
  .preview-match{background:rgba(14,156,105,0.06);border-top:1px dashed rgba(14,156,105,0.35);padding:16px 18px;font-size:14.5px;color:var(--ink);display:flex;gap:10px;align-items:flex-start;}
  .preview-match .badge{font-family:'IBM Plex Mono',monospace;font-size:10.5px;font-weight:700;color:#fff;background:var(--accent);padding:3px 8px;border-radius:4px;flex-shrink:0;margin-top:2px;}

  /* ---------- TRUST ---------- */
  .trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:48px;}
  @media (max-width:860px){.trust-grid{grid-template-columns:1fr;}}
  .trust-item{padding:30px;border-radius:12px;background:#fff;border:1px solid var(--line);}
  .trust-item h3{font-size:18.5px;margin-bottom:10px;color:var(--ink);}
  .trust-item p{margin:0;font-size:15px;color:var(--ink-soft);}

  /* ---------- OFFER ---------- */
  .offer{background:linear-gradient(150deg, var(--dark-3), var(--dark-2));border:1px solid rgba(34,212,138,0.3);border-radius:16px;padding:56px 46px;display:grid;grid-template-columns:1.3fr 1fr;gap:42px;align-items:center;}
  @media (max-width:860px){.offer{grid-template-columns:1fr;padding:36px 26px;}}
  .offer h2{font-size:clamp(26px,3vw,34px);margin-bottom:16px;color:var(--on-dark);}
  .offer p{color:var(--on-dark-dim);font-size:16.5px;max-width:46ch;}
  .offer-badge{font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-bright);border:1px solid rgba(34,212,138,0.4);display:inline-block;padding:6px 12px;border-radius:6px;margin-bottom:18px;}
  .offer-panel{background:#fff;border-radius:12px;padding:32px;color:var(--ink);}
  .offer-panel .big{font-family:'Bricolage Grotesque',sans-serif;font-size:42px;font-weight:700;}
  .offer-panel .old{text-decoration:line-through;color:var(--ink-soft);font-size:18px;margin-left:10px;}
  .offer-panel ul{list-style:none;padding:0;margin:22px 0 26px;font-size:15px;}
  .offer-panel li{padding:8px 0;display:flex;gap:9px;}
  .offer-panel li::before{content:"✓";color:var(--accent);font-weight:700;}

  footer{background:var(--dark);border-top:1px solid var(--dark-line);padding:44px 0;}
  footer .wrap{display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;font-size:14px;color:var(--on-dark-dim);}
  footer a{text-decoration:underline;text-underline-offset:3px;}
  /* ---------- DELIVERABLE CARDS ---------- */
  .deliverables{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:44px;}
  @media (max-width:860px){.deliverables{grid-template-columns:1fr;}}
  .deliverable-card{background:#fff;border:1.5px solid var(--line);border-radius:14px;padding:28px;}
  .deliverable-card.gold{border-color:rgba(216,169,75,0.4);background:linear-gradient(180deg, rgba(216,169,75,0.06), rgba(216,169,75,0.015));}
  .deliverable-num{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-deep);font-weight:700;margin-bottom:12px;}
  .deliverable-card.gold .deliverable-num{color:#8A6A10;}
  .deliverable-card h3{font-size:21px;margin-bottom:10px;color:var(--ink);}
  .deliverable-card p{margin:0;font-size:15px;color:var(--ink-soft);}

  /* ---------- FILTER CHIPS ---------- */
  .filter-chips{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0 8px;}
  .chip{background:#fff;border:1px solid var(--line);border-radius:20px;padding:9px 16px;font-size:14px;font-weight:600;color:var(--ink);}

  /* ---------- PRICE ANCHOR SECTION ---------- */
  .anchor-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:52px;}
  @media (max-width:900px){.anchor-grid{grid-template-columns:1fr;}}
  .anchor-example{font-size:16px;color:var(--ink-soft);margin-top:6px;}
  .anchor-card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:26px;box-shadow:0 30px 60px -30px rgba(14,17,22,0.15);}
  .anchor-card-title{font-family:'IBM Plex Mono',monospace;font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);margin-bottom:18px;}
  .anchor-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--line);}
  .anchor-row:last-child{border-bottom:none;}
  .anchor-date{font-family:'IBM Plex Mono',monospace;font-size:12.5px;color:var(--ink-soft);width:70px;flex-shrink:0;}
  .anchor-loc{flex:1;font-size:14.5px;color:var(--ink);}
  .anchor-rate{font-family:'IBM Plex Mono',monospace;font-size:14.5px;font-weight:700;color:var(--accent-deep);}
  .anchor-tag{display:inline-block;margin-top:14px;background:rgba(14,156,105,0.08);border:1px dashed rgba(14,156,105,0.3);border-radius:8px;padding:11px 14px;font-size:13.5px;color:var(--ink);}

  /* ---------- WHATSAPP EXPORT WALKTHROUGH ---------- */
  .walkthrough{display:grid;grid-template-columns:0.85fr 1.15fr;gap:48px;align-items:center;margin-bottom:56px;}
  @media (max-width:900px){.walkthrough{grid-template-columns:1fr;}}
  .phone{width:260px;margin:0 auto;background:#000;border-radius:34px;padding:10px;box-shadow:0 40px 70px -25px rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.08);}
  .phone-screen{position:relative;background:#0B141A;border-radius:24px;height:440px;overflow:hidden;}
  .wa-header{background:#1F2C34;padding:14px 16px 12px;display:flex;align-items:center;gap:10px;}
  .wa-avatar{width:34px;height:34px;border-radius:50%;background:#3A4A54;flex-shrink:0;}
  .wa-title{font-size:13px;color:#E9EDEF;font-weight:600;}
  .wa-sub{font-size:10.5px;color:#8696A0;}
  .wa-dots{margin-left:auto;color:#AEBAC1;font-size:18px;letter-spacing:2px;position:relative;}
  .wa-body{padding:14px 12px;display:flex;flex-direction:column;gap:8px;}
  .wa-bubble{background:#1F2C34;color:#E9EDEF;font-size:11px;border-radius:8px;padding:8px 10px;max-width:80%;align-self:flex-start;}
  .wa-bubble.me{background:#005C4B;align-self:flex-end;}

  .wa-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.55);opacity:0;transition:opacity .4s ease;pointer-events:none;}
  .wa-overlay.show{opacity:1;}
  .wa-menu{position:absolute;top:56px;right:12px;background:#233138;border-radius:10px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.5);min-width:150px;transform:translateY(-8px);opacity:0;transition:all .35s ease;}
  .wa-menu.show{transform:translateY(0);opacity:1;}
  .wa-menu-item{padding:11px 16px;font-size:12px;color:#E9EDEF;border-bottom:1px solid rgba(255,255,255,0.06);}
  .wa-menu-item.hl{background:rgba(34,212,138,0.28);color:#fff;font-weight:600;}

  .wa-sheet{position:absolute;left:0;right:0;bottom:0;background:#233138;border-radius:16px 16px 0 0;padding:18px 16px 22px;transform:translateY(100%);transition:transform .4s cubic-bezier(.16,1,.3,1);}
  .wa-sheet.show{transform:translateY(0);}
  .wa-sheet-title{font-size:13px;color:#E9EDEF;font-weight:700;margin-bottom:12px;}
  .wa-sheet-opt{padding:12px 14px;border-radius:8px;font-size:12px;color:#E9EDEF;margin-bottom:8px;border:1px solid rgba(255,255,255,0.08);}
  .wa-sheet-opt.hl{background:rgba(34,212,138,0.28);border-color:var(--accent-bright);font-weight:600;}

  .wa-success{position:absolute;inset:0;background:rgba(11,20,26,0.94);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;opacity:0;transition:opacity .4s ease;}
  .wa-success.show{opacity:1;}
  .wa-check{width:52px;height:52px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;}
  .wa-success-text{color:#E9EDEF;font-size:13px;font-weight:600;}

  .tap-dot{position:absolute;width:36px;height:36px;border-radius:50%;background:rgba(34,212,138,0.5);opacity:0;pointer-events:none;transition:all .4s ease;}
  .tap-dot.show{animation:tapPulse 1.1s ease-out infinite;}
  @keyframes tapPulse{0%{opacity:0.7;transform:scale(0.5);}70%{opacity:0;transform:scale(1.6);}100%{opacity:0;}}

  .wt-steps{display:flex;flex-direction:column;gap:4px;}
  .wt-step{display:flex;gap:16px;align-items:flex-start;padding:16px 18px;opacity:0.6;transition:opacity .3s ease, background .3s ease, transform .3s ease;border-radius:10px;border-left:3px solid transparent;}
  .wt-step.active{opacity:1;background:rgba(34,212,138,0.09);border-left-color:var(--accent-bright);transform:translateX(4px);}
  .wt-num{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:17px;color:var(--accent-bright);flex-shrink:0;width:28px;}
  .wt-step h4{font-size:18px;font-weight:700;margin:0 0 5px;color:var(--on-dark);}
  .wt-step p{margin:0;font-size:14.5px;color:var(--on-dark-dim);}
  /* ---------- 3D SCENE CANVAS ---------- */
  #heroCanvas{position:absolute;inset:0;z-index:0;opacity:0.85;pointer-events:none;}

  /* ---------- CURSOR SPOTLIGHT (dark sections) ---------- */
  .spotlight{position:absolute;inset:0;pointer-events:none;z-index:1;
    background:radial-gradient(circle 420px at var(--sx,50%) var(--sy,50%), rgba(34,212,138,0.14), transparent 70%);
    transition:opacity .3s ease;opacity:0;}
  .spotlight.on{opacity:1;}

  /* ---------- MAGNETIC BUTTON WRAP ---------- */
  .magnetic{display:inline-block;will-change:transform;transition:transform .25s cubic-bezier(.16,1,.3,1);}
  /* ---------- INTRO POPUP ---------- */
  #introOverlay{
    position:fixed;inset:0;z-index:1000;background:var(--dark);
    display:flex;align-items:center;justify-content:center;
    opacity:1;transition:opacity .6s cubic-bezier(.16,1,.3,1), visibility .6s;
  }
  #introOverlay.hidden{opacity:0;visibility:hidden;pointer-events:none;}
  #introOverlay .glow{position:absolute;border-radius:50%;filter:blur(100px);opacity:0.3;pointer-events:none;}
  #introOverlay .glow-a{width:460px;height:460px;background:var(--accent);top:-120px;left:-100px;animation:drift 10s ease-in-out infinite;}
  #introOverlay .glow-b{width:380px;height:380px;background:var(--gold);bottom:-140px;right:-100px;opacity:0.2;animation:drift 13s ease-in-out infinite reverse;}
  .intro-skip{
    position:absolute;top:28px;right:32px;font-family:'IBM Plex Mono',monospace;font-size:13px;
    color:var(--on-dark-dim);background:none;border:1px solid var(--dark-line);border-radius:6px;
    padding:8px 16px;cursor:pointer;transition:all .2s ease;z-index:2;
  }
  .intro-skip:hover{color:var(--on-dark);border-color:var(--accent-bright);}
  .intro-inner{max-width:720px;padding:0 32px;text-align:center;position:relative;z-index:1;}
  .intro-line{
    font-family:'Bricolage Grotesque',sans-serif;font-weight:700;letter-spacing:-0.02em;color:var(--on-dark);
    font-size:clamp(24px,4vw,40px);line-height:1.3;opacity:0;
    transform:translate(-50%,-50%) translateY(20px) scale(0.97);
    transition:opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1);
    position:absolute;left:50%;top:50%;width:100%;pointer-events:none;
  }
  .intro-line.show{opacity:1;transform:translate(-50%,-50%) translateY(0) scale(1);pointer-events:auto;}
  .intro-line .hl{color:var(--accent-bright);}
  .intro-stage{position:relative;min-height:220px;}
  .intro-dots{display:flex;gap:8px;justify-content:center;margin-top:28px;}
  .intro-dots span{width:7px;height:7px;border-radius:50%;background:var(--dark-line);transition:background .3s ease, transform .3s ease;}
  .intro-dots span.on{background:var(--accent-bright);transform:scale(1.3);}
  .intro-actions{margin-top:34px;display:flex;justify-content:center;}

  /* ---------- HOVER TILT ON CARDS ---------- */
  .tilt{transition:transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease;transform-style:preserve-3d;will-change:transform;}
  /* ---------- MOBILE OPTIMIZATION ---------- */
  @media (max-width:640px){
    .intro-stage{min-height:260px;}
    .hero{padding:56px 0 64px;}
    section{padding:64px 0;}
    .nav-cta{padding:9px 14px;font-size:13px;}
    .brand{font-size:20px;}
    .proc-box{height:320px;}
    .phone{width:220px;}
    .phone-screen{height:380px;}
    .offer{padding:28px 20px;}
    .offer-panel{padding:22px;}
    .preview-table{font-size:12.5px;}
    .preview-table th, .preview-table td{padding:10px 10px;white-space:nowrap;}
    .step, .trust-item, .deliverable-card, .compare-col, .anchor-card{padding:22px 20px;}
    h1.headline{font-size:clamp(28px,7vw,40px);}
    .walkthrough{grid-template-columns:1fr;}
    .compare, .steps, .deliverables, .trust-grid, .anchor-grid{grid-template-columns:1fr;}
    .offer{grid-template-columns:1fr;}
  }
</style>
</head>
<body>

<div id="introOverlay">
  <div class="glow glow-a"></div>
  <div class="glow glow-b"></div>
  <button class="intro-skip" id="introSkip">Skip →</button>
  <div class="intro-inner">
    <div class="intro-stage" id="introStage">
      <div class="intro-line" data-i="0">Are you a broker juggling <span class="hl">multiple WhatsApp groups?</span></div>
      <div class="intro-line" data-i="1">Hundreds of listings pass by. <span class="hl">Can you track them all?</span></div>
      <div class="intro-line" data-i="2">A match is sitting in your chat <span class="hl">right now.</span></div>
      <div class="intro-line" data-i="3">ProBroker.ai finds it — so <span class="hl">no value is left on the table.</span></div>
    </div>
    <div class="intro-dots" id="introDots"></div>
    <div class="intro-actions">
      <a class="btn-primary" id="introNext" style="cursor:pointer;">Next →</a>
    </div>
  </div>
</div>

<nav>
  <div class="wrap">
    <div class="brand"><span class="brand-mark"></span>ProBroker<span class="dot">.ai</span></div>
    <a class="nav-cta" href="/signup">Get Started</a>
  </div>
</nav>

<section class="hero">
  <canvas id="heroCanvas"></canvas>
  <div class="glow glow-1"></div>
  <div class="glow glow-2"></div>
  <div class="grid-overlay"></div>
  <div class="spotlight" data-spot></div>
  <div class="wrap hero-grid">
    <div>
      <div class="eyebrow">Pay only for what you need</div>
      <h1 class="headline">Every deal in your group.<br>Found <span class="accent-text">automatically.</span></h1>
      <p class="sub">Our proprietary machine learning software reads your entire WhatsApp group,
        extracts <b>every listing, every requirement, every phone number</b>, and matches
        buyers to sellers on its own — so no value is ever left on the table.</p>
      <div class="hero-ctas">
        <a class="btn-primary" href="/signup">Get Started →</a>
        <a class="btn-ghost" href="#how">See how it works</a>
      </div>
    </div>

    <div class="proc-wrap">
      <div class="proc-box">
        <div class="proc-label">● Live extraction</div>
        <div class="proc-inner">
          <div class="raw-col">
            <div class="scan-line"></div>
            <div class="raw-track" id="chaosTrack"></div>
          </div>
          <div class="out-col">
            <div class="out-head"><span>Location</span><span>Type</span><span>Price</span></div>
            <div id="ledgerRows"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-light">
  <div class="wrap">
    <div class="reveal">
      <div class="eyebrow-light">The problem</div>
      <h2 class="section-title">This is what's happening in your group right now.</h2>
    </div>

    <div class="compare">
      <div class="compare-col reveal">
        <div class="compare-label">Without ProBroker</div>
        <div class="compare-item"><div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 5h16M4 12h16M4 19h10" stroke="#565D6B" stroke-width="2.2" stroke-linecap="round"/></svg></div><p>Hundreds of new messages arrive every single day.</p></div>
        <div class="compare-item"><div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="10" r="6.5" stroke="#565D6B" stroke-width="2.2"/><path d="M8 8L12 12M12 8L8 12" stroke="#565D6B" stroke-width="1.8" stroke-linecap="round"/></svg></div><p>No way to search back through old messages.</p></div>
        <div class="compare-item"><div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" stroke="#565D6B" stroke-width="2" stroke-linecap="round"/></svg></div><p>A matching buyer and seller sit unnoticed, indefinitely.</p></div>
      </div>

      <div class="compare-col deal reveal">
        <div class="compare-label">With ProBroker</div>
        <div class="compare-item"><div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#0E9C69" stroke-width="2"/><path d="M8 9h8M8 13h8M8 17h5" stroke="#0E9C69" stroke-width="2" stroke-linecap="round"/></svg></div><p>Every listing extracted and organized automatically.</p></div>
        <div class="compare-item"><div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="10" r="6.5" stroke="#0E9C69" stroke-width="2.2"/><path d="M7.5 10l1.8 1.8L13 8" stroke="#0E9C69" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><p>Search any listing instantly, no matter how old.</p></div>
        <div class="compare-item"><div class="icon-circle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 12l3 3 9-9" stroke="#0E9C69" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div><p>Our AI surfaces matches the moment they exist.</p></div>
      </div>
    </div>
  </div>
</section>

<section id="how" class="section-dark">
  <div class="spotlight" data-spot></div>
  <div class="wrap">
    <div class="reveal" style="max-width:56ch;">
      <div class="eyebrow">How it works</div>
      <h2 class="section-title" style="color:var(--on-dark);">Three steps. Fully automated.</h2>
    </div>

    <div class="walkthrough reveal">
      <div class="phone">
        <div class="phone-screen">
          <div class="wa-header">
            <div class="wa-avatar"></div>
            <div>
              <div class="wa-title">Best Property Brother's</div>
              <div class="wa-sub">247 members</div>
            </div>
            <div class="wa-dots">
              ⋮
              <div class="tap-dot" id="tapDot"></div>
            </div>
          </div>
          <div class="wa-body">
            <div class="wa-bubble">Gomti Nagar Ext, 1650 sqft plot...</div>
            <div class="wa-bubble me">Rate kya chal raha hai?</div>
            <div class="wa-bubble">13,000/sqft, direct party</div>
          </div>

          <div class="wa-menu" id="waMenu">
            <div class="wa-menu-item">View contact</div>
            <div class="wa-menu-item">Search</div>
            <div class="wa-menu-item hl" id="menuMore">More</div>
          </div>

          <div class="wa-sheet" id="waSheet">
            <div class="wa-sheet-title">Export chat</div>
            <div class="wa-sheet-opt" id="optMedia">Include Media</div>
            <div class="wa-sheet-opt hl" id="optNoMedia">Without Media</div>
          </div>

          <div class="wa-success" id="waSuccess">
            <div class="wa-check">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div class="wa-success-text">Chat exported — ready to send</div>
          </div>
        </div>
      </div>

      <div class="wt-steps">
        <div class="wt-step" id="wts-0">
          <div class="wt-num">1</div>
          <div><h4>Open your group, tap the menu</h4><p>Tap the three dots in the top right of any WhatsApp chat or group.</p></div>
        </div>
        <div class="wt-step" id="wts-1">
          <div class="wt-num">2</div>
          <div><h4>Tap "More", then "Export chat"</h4><p>A small menu appears — this is where the export option lives.</p></div>
        </div>
        <div class="wt-step" id="wts-2">
          <div class="wt-num">3</div>
          <div><h4>Choose "Without Media"</h4><p>You don't need photos or videos — just the text. This makes a smaller, faster file.</p></div>
        </div>
        <div class="wt-step" id="wts-3">
          <div class="wt-num">4</div>
          <div><h4>Send us the file</h4><p>WhatsApp gives you a file — send it straight to us and you're done.</p></div>
        </div>
      </div>
    </div>
    <div class="steps">
      <div class="step reveal">
        <div class="step-num">01 — UPLOAD</div>
        <h3>Send your chat export</h3>
        <p>Export your WhatsApp group as a file and send it in. Takes under a minute, nothing to install.</p>
      </div>
      <div class="step reveal">
        <div class="step-num">02 — ANALYZE</div>
        <h3>Our AI extracts everything</h3>
        <p>Our proprietary machine learning software processes the entire chat — every listing, requirement, and contact — and matches them against each other.</p>
      </div>
      <div class="step reveal">
        <div class="step-num">03 — RECEIVE</div>
        <h3>Get your report</h3>
        <p>One Excel file, delivered the same day — organized listings, plus every match our AI found for you.</p>
      </div>
    </div>
  </div>
</section>

<section class="section-light">
  <div class="wrap">
    <div class="reveal">
      <div class="eyebrow-light">What you actually receive</div>
      <h2 class="section-title">Not a promise. An actual file.</h2>
      <p class="section-lede" style="color:var(--ink-soft);">Every report is one Excel file with two sheets inside it — built to actually be used, not just looked at once.</p>
    </div>

    <div class="deliverables reveal">
      <div class="deliverable-card">
        <div class="deliverable-num">Sheet 1</div>
        <h3>Full Listings</h3>
        <p>Every single listing extracted from your group — fully sortable and filterable by locality, price range, size, listing type, and date. Find anything in seconds, no matter how old it is.</p>
      </div>
      <div class="deliverable-card gold">
        <div class="deliverable-num">Sheet 2</div>
        <h3>Matches</h3>
        <p>Every demand and supply pairing our AI found within your own group — buyers and sellers who fit each other, flagged automatically so you never have to go looking for them yourself.</p>
      </div>
    </div>

    <div class="filter-chips reveal">
      <span class="chip">📍 Filter by locality</span>
      <span class="chip">💰 Filter by price range</span>
      <span class="chip">📐 Filter by size</span>
      <span class="chip">📅 Filter by date</span>
      <span class="chip">🏷️ Filter by listing type</span>
    </div>

    <div class="preview-card reveal">
      <div class="preview-bar"><span></span><span></span><span></span></div>
      <div style="overflow-x:auto;">
      <table class="preview-table">
        <thead><tr><th>Date</th><th>Location</th><th>Type</th><th>Price</th><th>Contact</th></tr></thead>
        <tbody>
          <tr><td>12 Jul</td><td>Gomti Nagar Ext.</td><td>Supply</td><td>₹13,000/sqft</td><td>98XX XXX210</td></tr>
          <tr><td>10 Jul</td><td>Indira Nagar</td><td>Demand</td><td>₹90 lakh budget</td><td>—</td></tr>
          <tr><td>08 Jul</td><td>Aliganj, Sector G</td><td>Supply</td><td>₹1.4 Cr</td><td>96XX XXX480</td></tr>
        </tbody>
      </table>
      </div>
      <div class="preview-match">
        <span class="badge">MATCH</span>
        <span>The Indira Nagar buyer from 10 Jul fits the Aliganj listing posted 08 Jul — same budget range, same area. Flagged automatically.</span>
      </div>
    </div>
  </div>
</section>

<section class="section-light" style="padding-top:0;">
  <div class="wrap">
    <div class="anchor-grid">
      <div class="reveal">
        <div class="eyebrow-light">A second use, beyond finding matches</div>
        <h2 class="section-title">Know the going rate, before you quote it.</h2>
        <p class="anchor-example">Wondering what a locality is actually trading at right now? Every past listing
          in your report is timestamped — so you can look at what similar properties were priced at
          4-5 months ago in the same area, and use that as a real reference point when you're quoting
          a client today.</p>
      </div>
      <div class="anchor-card reveal">
        <div class="anchor-card-title">Gomti Nagar Extension — Asking Rate Over Time</div>
        <div class="anchor-row"><span class="anchor-date">Mar '26</span><span class="anchor-loc">Sector 4 plot, 1650 sqft</span><span class="anchor-rate">₹11,500/sqft</span></div>
        <div class="anchor-row"><span class="anchor-date">May '26</span><span class="anchor-loc">Sector 6 plot, 1237 sqft</span><span class="anchor-rate">₹12,800/sqft</span></div>
        <div class="anchor-row"><span class="anchor-date">Jul '26</span><span class="anchor-loc">Sector 1 plot, 1360 sqft</span><span class="anchor-rate">₹13,000/sqft</span></div>
        <div class="anchor-tag">📌 Reference: rates in this pocket have moved from ~₹11.5K to ~₹13K/sqft over 4 months.</div>
      </div>
    </div>
  </div>
</section>

<section class="section-dark">
  <div class="spotlight" data-spot></div>
  <div class="wrap">
    <div class="reveal" style="max-width:56ch;">
      <div class="eyebrow">Why it works</div>
      <h2 class="section-title" style="color:var(--on-dark);">Built for accuracy, not guesswork.</h2>
    </div>
    <div class="trust-grid">
      <div class="trust-item reveal">
        <h3>Proprietary matching software</h3>
        <p style="color:var(--ink-soft);">Our models are tuned specifically for real-estate listings — location, size, and price compared automatically, not by keyword search.</p>
      </div>
      <div class="trust-item reveal">
        <h3>Nothing kept longer than needed</h3>
        <p style="color:var(--ink-soft);">Your chat is processed to build your report, then deleted from our systems. Nothing is stored beyond what's necessary.</p>
      </div>
      <div class="trust-item reveal">
        <h3>Simple, upfront pricing</h3>
        <p style="color:var(--ink-soft);">No subscription, no hidden fees — pay once for the report you need, based on how far back you want listings pulled from.</p>
      </div>
    </div>
  </div>
</section>

<section id="offer" class="section-light">
  <div class="wrap">
    <div class="offer reveal">
      <div>
        <div class="offer-badge">Simple, pay-per-report pricing</div>
        <h2>Choose how far back you need.</h2>
        <p>No subscription, no lock-in — pay once for the listing window you need,
          get your full report back the same day.</p>
      </div>
      <div class="offer-panel">
        <ul>
          <li>Last 3 months — ₹299</li>
          <li>Last 6 months — ₹349</li>
          <li>Last 12 months — ₹449</li>
          <li>Last 60 months — ₹619</li>
        </ul>
        <a class="btn-primary" style="width:100%;justify-content:center;" href="/signup">Get Started →</a>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap">
    <span>ProBroker.ai — AI-powered listing intelligence for real estate brokers.</span>
    <span><a href="/signup">Get started</a></span>
  </div>
</footer>

<script>
  // ---------- Intro popup sequence (runs first, isolated, can't be blocked by later errors) ----------
  (function initIntro(){
    const overlay = document.getElementById('introOverlay');
    if (!overlay) return;

    let alreadyShown = false;
    try { alreadyShown = !!sessionStorage.getItem('introShown'); } catch (e) { /* storage blocked -- just show it every time */ }

    if (alreadyShown) {
      overlay.classList.add('hidden');
      return;
    }
    document.body.style.overflow = 'hidden';

    const lines = Array.from(document.querySelectorAll('.intro-line'));
    const dotsWrap = document.getElementById('introDots');
    lines.forEach((_, i) => {
      const d = document.createElement('span');
      if (i === 0) d.classList.add('on');
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);

    function closeIntro(){
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
      try { sessionStorage.setItem('introShown', '1'); } catch (e) { /* ignore */ }
    }

    document.getElementById('introSkip').addEventListener('click', closeIntro);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeIntro(); });

    let idx = 0;
    const nextBtn = document.getElementById('introNext');

    function showLine(i){
      lines.forEach((l, li) => l.classList.toggle('show', li === i));
      dots.forEach((d, di) => d.classList.toggle('on', di === i));
      nextBtn.textContent = (i === lines.length - 1) ? 'Show Me How →' : 'Next →';
    }
    showLine(0);

    nextBtn.addEventListener('click', () => {
      if (idx < lines.length - 1) {
        idx++;
        showLine(idx);
      } else {
        closeIntro();
      }
    });
  })();

  const chaosMsgs = [
    '<b>Sitaram:</b> Kanpur road pe 55 bigha, rate <span class="num">13L/bigha</span>...',
    '<b>Ajay:</b> 🙏 Suprabhat sabko',
    '<b>Pankaj:</b> Chahiye — Unnao me 20 bigha, urgent, direct party',
    '<b>Sagar:</b> Video omitted',
    '<b>Vikash:</b> Gomti Nagar Ext, 1650 sqft plot, <span class="num">13,000/sqft</span>',
    '<b>Group:</b> [Forwarded] Jai Shree Ram 🚩🚩',
    '<b>Waseem:</b> 2BHK Indira Nagar, semi furnished, contact <span class="num">98XXXXXX10</span>',
    '<b>Rahul:</b> Chinhat me 3 bigha chahiye, direct owner se baat karni hai',
    '<b>Deepak:</b> Kurshi road 10000 sqft corner, rate <span class="num">4000/</span>',
    '<b>Group:</b> +91 added',
    '<b>Manoj:</b> Aliganj sector G house available, 90 lakh',
    '<b>Group:</b> Missed voice call',
  ];
  const track = document.getElementById('chaosTrack');
  track.innerHTML = [...chaosMsgs, ...chaosMsgs].map(m => \`<div class="bubble">\${m}</div>\`).join('');

  const ledgerData = [
    {loc:'Gomti Nagar Ext', type:'supply', price:'13,000/sqft'},
    {loc:'Unnao', type:'demand', price:'—'},
    {loc:'Indira Nagar', type:'supply', price:'90 lakh'},
    {loc:'Chinhat', type:'demand', price:'—'},
    {loc:'Kanpur Road', type:'supply', price:'13L/bigha'},
    {loc:'Aliganj Sec G', type:'supply', price:'90 lakh'},
  ];
  const ledgerEl = document.getElementById('ledgerRows');
  let li = 0;
  function addRow(){
    const d = ledgerData[li % ledgerData.length];
    const row = document.createElement('div');
    row.className = 'out-row';
    row.innerHTML = \`<span>\${d.loc}</span><span class="tag \${d.type}">\${d.type}</span><span class="price">\${d.price}</span>\`;
    ledgerEl.appendChild(row);
    if (ledgerEl.children.length > 6) ledgerEl.removeChild(ledgerEl.firstChild);
    li++;
  }
  addRow();
  setInterval(addRow, 1900);

  // ---------- WhatsApp export walkthrough animation ----------
  const waMenu = document.getElementById('waMenu');
  const waSheet = document.getElementById('waSheet');
  const waSuccess = document.getElementById('waSuccess');
  const tapDot = document.getElementById('tapDot');
  const wtSteps = [0,1,2,3].map(i => document.getElementById('wts-'+i));

  function setActiveStep(i){
    wtSteps.forEach((el, idx) => el.classList.toggle('active', idx === i));
  }

  function resetPhone(){
    waMenu.classList.remove('show');
    waSheet.classList.remove('show');
    waSuccess.classList.remove('show');
    tapDot.classList.remove('show');
  }

  const walkthroughStages = [
    () => { resetPhone(); tapDot.classList.add('show'); setActiveStep(0); },
    () => { resetPhone(); waMenu.classList.add('show'); setActiveStep(1); },
    () => { resetPhone(); waSheet.classList.add('show'); setActiveStep(2); },
    () => { resetPhone(); waSuccess.classList.add('show'); setActiveStep(3); },
  ];
  let wStage = 0;
  function runWalkthrough(){
    walkthroughStages[wStage]();
    wStage = (wStage + 1) % walkthroughStages.length;
  }
  runWalkthrough();
  setInterval(runWalkthrough, 2600);

  // ---------- 3D hero scene (Three.js) ----------
  (function initHeroScene(){
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || !window.THREE) return;
    const heroEl = canvas.closest('.hero');
    let w = heroEl.clientWidth, h = heroEl.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);

    // Soft ambient + point light so the core reads as a lit object, not flat lines
    scene.add(new THREE.AmbientLight(0x334, 1.2));
    const pointLight = new THREE.PointLight(0x22D48A, 2.2, 20);
    pointLight.position.set(3, 2, 5);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    // Additive "bloom" glow sprite behind the core -- cheap fake bloom, no postprocessing needed
    function makeGlowTexture(hex){
      const c = document.createElement('canvas'); c.width = c.height = 256;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(128,128,0,128,128,128);
      g.addColorStop(0, hex + 'CC'); g.addColorStop(0.4, hex + '55'); g.addColorStop(1, hex + '00');
      ctx.fillStyle = g; ctx.fillRect(0,0,256,256);
      return new THREE.CanvasTexture(c);
    }
    const glowSprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture('#22D48A'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.9
    }));
    glowSprite.scale.set(9, 9, 1);
    group.add(glowSprite);

    // Outer wireframe core -- lit, faceted, not flat
    const coreGeo = new THREE.IcosahedronGeometry(2.3, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0E9C69, emissive: 0x0A7550, emissiveIntensity: 0.6, wireframe: true, transparent: true, opacity: 0.7, roughness: 0.4
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Inner counter-rotating shape -- adds depth and complexity, violet accent for richness
    const innerGeo = new THREE.IcosahedronGeometry(1.15, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xD8A94B, emissive: 0x8A6A10, emissiveIntensity: 0.8, wireframe: true, transparent: true, opacity: 0.6
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // Particle field -- mixed blue/violet vertex colors for richness instead of flat single color
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color(0x8FE3C0), colorB = new THREE.Color(0xE8C77A);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.4 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[i*3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i*3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i*3 + 2] = r * Math.cos(phi);
      const mixed = colorA.clone().lerp(colorB, Math.random());
      colors[i*3] = mixed.r; colors[i*3+1] = mixed.g; colors[i*3+2] = mixed.b;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05, transparent: true, opacity: 0.85, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    let mouseX = 0, mouseY = 0, targetRotX = 0, targetRotY = 0;
    heroEl.addEventListener('mousemove', (e) => {
      const rect = heroEl.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotY = mouseX * 0.35;
      targetRotX = mouseY * 0.2;
    });

    let t = 0;
    function animate(){
      requestAnimationFrame(animate);
      t += 0.016;
      core.rotation.y += 0.0022;
      core.rotation.x += 0.0009;
      inner.rotation.y -= 0.004;
      inner.rotation.x -= 0.0016;
      particles.rotation.y -= 0.0011;
      const breathe = 1 + Math.sin(t * 0.6) * 0.035;
      core.scale.setScalar(breathe);
      group.rotation.y += (targetRotY - group.rotation.y) * 0.04;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.04;
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      w = heroEl.clientWidth; h = heroEl.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  })();

  // ---------- Cursor spotlight on dark sections ----------
  document.querySelectorAll('[data-spot]').forEach(spot => {
    const parent = spot.parentElement;
    parent.addEventListener('mousemove', (e) => {
      const rect = parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      spot.style.setProperty('--sx', x + '%');
      spot.style.setProperty('--sy', y + '%');
      spot.classList.add('on');
    });
    parent.addEventListener('mouseleave', () => spot.classList.remove('on'));
  });

  // ---------- Magnetic buttons ----------
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = \`translate(\${x * 0.18}px, \${y * 0.35}px)\`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // ---------- Hover tilt on cards ----------
  function attachTilt(selector){
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('tilt');
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = \`perspective(800px) rotateY(\${px * 6}deg) rotateX(\${-py * 6}deg) translateY(-4px)\`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }
  attachTilt('.compare-col, .step, .trust-item, .anchor-card, .preview-card');
</script>

</body>
</html>
`;

export async function GET() {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
