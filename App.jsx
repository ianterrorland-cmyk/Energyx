import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowRight, Bell, BriefcaseBusiness, Check,
  ChevronDown, CircleHelp, FileText, Fuel, Gauge, LayoutDashboard, Lightbulb,
  LockKeyhole, Menu, Plus, Search, ShieldCheck, Smartphone, Sparkles,
  TrendingDown, UploadCloud, Wallet, X, Zap
} from "lucide-react";
import { supabase } from "./lib/supabase";

const categories = [
  { name: "Electricidad", icon: Zap, detail: "Luz y potencia contratada" },
  { name: "Gas", icon: Gauge, detail: "Gas natural y otros suministros" },
  { name: "Telecomunicaciones", icon: Smartphone, detail: "Internet, móvil y telefonía" },
  { name: "Seguros", icon: ShieldCheck, detail: "Pólizas personales y de empresa" },
  { name: "Combustible", icon: Fuel, detail: "Gasolina, diésel y flotas" }
];

const money = (n) => new Intl.NumberFormat("es-ES", {
  style: "currency", currency: "EUR", maximumFractionDigits: 0
}).format(n);

export default function App() {
  const [active, setActive] = useState("Resumen");
  const [accountType, setAccountType] = useState("Empresa");
  const [annualSpend, setAnnualSpend] = useState("12000");
  const [savingRate, setSavingRate] = useState(12);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const spend = Math.max(0, Number(annualSpend) || 0);
  const estimatedSaving = useMemo(() => spend * savingRate / 100, [spend, savingRate]);
  const fee = estimatedSaving * 0.25;
  const customerKeeps = estimatedSaving - fee;

  const nav = [
    ["Resumen", LayoutDashboard], ["Mis facturas", FileText],
    ["Oportunidades", Lightbulb], ["Mi ahorro", TrendingDown]
  ];

  async function handleUpload() {
    if (!selectedFile) return;
    if (!supabase) {
      setNotice("La conexión con Supabase está pendiente. Configura las variables de entorno para guardar documentos.");
      return;
    }
    setNotice("Supabase está conectado. El siguiente paso es configurar el almacenamiento privado de facturas.");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><span>e</span></div>
          <div><strong>energyx</strong><small>AHORRO INTELIGENTE</small></div>
          <button className="icon-button close-menu" onClick={() => setMobileMenu(false)}><X size={18}/></button>
        </div>
        <div className="workspace-label">ESPACIO DE TRABAJO</div>
        <button className="workspace-switch">
          <span className="workspace-avatar">E</span>
          <span><b>Mi espacio</b><small>{accountType}</small></span>
          <ChevronDown size={16}/>
        </button>
        <div className="nav-label">MENÚ PRINCIPAL</div>
        <nav>
          {nav.map(([label, Icon]) => (
            <button key={label} className={`nav-item ${active === label ? "active" : ""}`}
              onClick={() => { setActive(label); setMobileMenu(false); }}>
              <Icon size={18}/><span>{label}</span>
              {label === "Mis facturas" && <span className="nav-count">0</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon"><CircleHelp size={18}/></div>
            <b>¿Necesitas ayuda?</b>
            <p>Estamos aquí para ayudarte a ahorrar.</p>
            <button onClick={() => setNotice("Próximamente: centro de ayuda de Energyx.")}>Contactar con soporte <ArrowRight size={14}/></button>
          </div>
          <div className="profile">
            <div className="profile-avatar">U</div>
            <div><b>Mi cuenta</b><small>Usuario de Energyx</small></div>
            <button className="icon-button"><ChevronDown size={16}/></button>
          </div>
        </div>
      </aside>

      {mobileMenu && <button className="mobile-scrim" onClick={() => setMobileMenu(false)} aria-label="Cerrar menú"/>}

      <main className="main">
        <header className="topbar">
          <button className="icon-button mobile-menu-button" onClick={() => setMobileMenu(true)}><Menu size={20}/></button>
          <div className="breadcrumb">Mi espacio <span>/</span> <b>{active}</b></div>
          <div className="top-actions">
            <span className={`connection ${supabase ? "connected" : ""}`}><i/> {supabase ? "Conectado" : "Modo demostración"}</span>
            <button className="icon-button notification-button" aria-label="Notificaciones"><Bell size={19}/><i/></button>
            <div className="top-avatar">U</div>
          </div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={14}/> TU PLATAFORMA DE AHORRO</div>
              <h1>{active === "Resumen" ? "Que tus gastos no te cuesten de más." : active}</h1>
              <p className="subtitle">Analizamos tus gastos fijos para encontrar oportunidades de ahorro.</p>
            </div>
            <button className="primary-button" onClick={() => setShowUpload(true)}><Plus size={17}/> Añadir factura</button>
          </section>

          {notice && <div className="notice"><span>{notice}</span><button onClick={() => setNotice("")}><X size={16}/></button></div>}

          <section className="hero-card">
            <div className="hero-copy">
              <div className="hero-pill"><span/> TU AHORRO EMPIEZA AQUÍ</div>
              <h2>Menos gastos.<br/><em>Más posibilidades.</em></h2>
              <p>Sube tus facturas y deja que Energyx encuentre formas de reducir tus costes. Solo cobramos si conseguimos un ahorro real.</p>
              <button className="hero-button" onClick={() => setShowUpload(true)}>Analizar mis facturas <ArrowRight size={17}/></button>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one"/><div className="orbit orbit-two"/>
              <div className="energy-symbol"><Zap size={54} fill="currentColor"/></div>
              <div className="float-card float-card-top"><span className="float-icon"><TrendingDown size={16}/></span><span><small>Gastos optimizados</small><b>En busca de ahorro</b></span></div>
              <div className="float-card float-card-bottom"><span className="float-check"><Check size={16}/></span><span><small>Modelo transparente</small><b>Pagas si ahorras</b></span></div>
            </div>
            <div className="hero-decoration">ENERGYX</div>
          </section>

          <section className="metrics-grid">
            <Metric icon={Wallet} label="Ahorro verificado" value="0 €" note="Todavía no hay ahorros confirmados" />
            <Metric icon={FileText} label="Facturas analizadas" value="0" note="Añade tu primera factura" />
            <Metric icon={Lightbulb} label="Oportunidades" value="0" note="Pendientes de analizar" />
            <Metric icon={Activity} label="Gastos registrados" value="0 €" note="Coste anual registrado" />
          </section>

          <div className="section-grid">
            <section className="panel categories-panel">
              <div className="panel-heading"><div><h3>Controla tus gastos</h3><p>Selecciona una categoría para empezar.</p></div><button className="text-button" onClick={() => setActive("Oportunidades")}>Ver todas <ArrowRight size={15}/></button></div>
              <div className="category-list">
                {categories.map(({name, icon: Icon, detail}) => (
                  <button className="category-row" key={name} onClick={() => { setActive("Oportunidades"); setNotice(`Has seleccionado ${name}. Añade una factura para iniciar el análisis.`); }}>
                    <span className="category-icon"><Icon size={19}/></span>
                    <span className="category-text"><b>{name}</b><small>{detail}</small></span>
                    <ArrowRight size={17} className="category-arrow"/>
                  </button>
                ))}
              </div>
            </section>

            <section className="panel calculator-panel">
              <div className="panel-heading"><div><h3>Calcula tu ahorro potencial</h3><p>Una primera estimación orientativa.</p></div><span className="calculator-badge">SIMULADOR</span></div>
              <label className="field-label" htmlFor="spend">Gasto anual aproximado (€)</label>
              <div className="amount-input"><span>€</span><input id="spend" type="number" min="0" value={annualSpend} onChange={e => setAnnualSpend(e.target.value)}/></div>
              <div className="slider-heading"><label className="field-label" htmlFor="rate">Ahorro hipotético</label><b>{savingRate}%</b></div>
              <input className="range" id="rate" type="range" min="1" max="25" value={savingRate} onChange={e => setSavingRate(Number(e.target.value))}/>
              <div className="range-labels"><span>1%</span><span>25%</span></div>
              <div className="estimate-box">
                <div><small>Ahorro potencial anual</small><strong>{money(estimatedSaving)}</strong></div>
                <div className="estimate-divider"/>
                <div><small>Tu ahorro tras comisión ilustrativa del 25%</small><strong className="green">{money(customerKeeps)}</strong></div>
              </div>
              <p className="disclaimer">Estimación hipotética, no constituye una oferta ni garantiza un ahorro. La comisión solo se calcularía sobre ahorro real verificado.</p>
            </section>
          </div>

          <section className="bottom-banner">
            <div className="bottom-icon"><LockKeyhole size={20}/></div>
            <div><b>Tus facturas, protegidas.</b><p>Tu documentación se tratará de forma privada y con acceso restringido.</p></div>
            <ShieldCheck size={23} className="bottom-shield"/>
          </section>
          <footer><span>© 2026 Energyx. Todos los derechos reservados.</span><span>Transparencia · Seguridad · Ahorro</span></footer>
        </div>
      </main>

      {showUpload && <div className="modal-backdrop" onClick={() => setShowUpload(false)}>
        <section className="upload-modal" onClick={e => e.stopPropagation()}>
          <div className="modal-heading"><div><span className="modal-kicker">ANÁLISIS DE GASTOS</span><h2>Añadir una factura</h2><p>Empieza subiendo una factura para preparar su análisis.</p></div><button className="icon-button" onClick={() => setShowUpload(false)}><X size={19}/></button></div>
          <label className="field-label" htmlFor="category">Categoría</label>
          <select id="category"><option>Electricidad</option><option>Gas</option><option>Telecomunicaciones</option><option>Seguros</option><option>Combustible</option></select>
          <label className="field-label" htmlFor="invoice-file">Documento (PDF, JPG o PNG)</label>
          <label className="dropzone" htmlFor="invoice-file"><UploadCloud size={30}/><b>{selectedFile ? selectedFile.name : "Arrastra tu factura o selecciónala"}</b><span>Máximo recomendado: 10 MB</span><input id="invoice-file" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setSelectedFile(e.target.files?.[0] || null)}/></label>
          <div className="privacy-note"><LockKeyhole size={15}/> La factura se debe guardar en un espacio privado, nunca público.</div>
          <div className="modal-actions"><button className="secondary-button" onClick={() => setShowUpload(false)}>Cancelar</button><button className="primary-button" disabled={!selectedFile} onClick={handleUpload}>Continuar <ArrowRight size={16}/></button></div>
        </section>
      </div>}
    </div>
  );
}

function Metric({icon: Icon, label, value, note}) {
  return <article className="metric-card"><div className="metric-top"><span className="metric-icon"><Icon size={19}/></span><span className="metric-trend"><ArrowDownRight size={14}/></span></div><div className="metric-value">{value}</div><div className="metric-label">{label}</div><div className="metric-note">{note}</div></article>;
}