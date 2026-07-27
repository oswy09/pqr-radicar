import { useState } from 'react';
import { Search, ChevronDown, X, User, Shield, Paperclip, CheckCircle, Phone, MapPin, AlertCircle, ClipboardList } from 'lucide-react';

const BLUE = '#00008F';
const BLUE_SEC = '#4976BA';

type Step = 1 | 2 | 3 | 4;

type FormData = {
  tipo: string;
  producto: string;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  telefono: string;
  ciudad: string;
  numeropoliza: string;
  descripcion: string;
  anonima: boolean;
  archivo: File | null;
};

const tiposMap: Record<string, { label: string; desc: string; icon: string; color: string }> = {
  peticion: {
    label: 'Petición',
    desc: 'Solicitud respetuosa de información, documentos o actuación a la entidad.',
    icon: '📋',
    color: BLUE,
  },
  queja: {
    label: 'Queja',
    desc: 'Manifestación de inconformidad por la atención recibida o servicio prestado.',
    icon: '💬',
    color: BLUE_SEC,
  },
  reclamo: {
    label: 'Reclamo',
    desc: 'Exigencia relacionada con la prestación de un servicio o producto contratado.',
    icon: '⚡',
    color: BLUE_SEC,
  },
  sugerencia: {
    label: 'Sugerencia',
    desc: 'Propuesta para mejorar nuestros procesos, servicios o atención al cliente.',
    icon: '💡',
    color: '#059669',
  },
};

const productos = [
  'Seguro de Vida', 'Seguro de Salud', 'ARL – Riesgos Laborales',
  'SOAT', 'Seguro de Hogar', 'Seguro de Vehículos', 'Pymes y Empresas', 'Otro',
];

const ciudades = [
  'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena',
  'Bucaramanga', 'Pereira', 'Manizales', 'Ibagué', 'Otra',
];

export default function App() {
  const [mode, setMode] = useState<'selector' | 'form'>('selector');
  const [step, setStep] = useState<Step>(1);
  const [anonima, setAnonima] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [radicado, setRadicado] = useState('');

  const [form, setForm] = useState<FormData>({
    tipo: '', producto: '', nombre: '', apellido: '', cedula: '',
    email: '', telefono: '', ciudad: '', numeropoliza: '',
    descripcion: '', anonima: false, archivo: null,
  });

  const set = (key: keyof FormData, val: string | boolean | File | null) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const startForm = (isAnonima: boolean) => {
    setAnonima(isAnonima);
    set('anonima', isAnonima);
    setMode('form');
    setStep(1);
  };

  const handleSubmit = () => {
    const rad = `AXA-${new Date().getFullYear()}-${Math.floor(Math.random() * 900000 + 100000)}`;
    setRadicado(rad);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setMode('selector');
    setStep(1);
    setForm({ tipo: '', producto: '', nombre: '', apellido: '', cedula: '', email: '', telefono: '', ciudad: '', numeropoliza: '', descripcion: '', anonima: false, archivo: null });
  };

  const canNext1 = !!form.tipo;
  const canNext2 = anonima ? !!form.email : (!!form.nombre && !!form.apellido && !!form.cedula && !!form.email && !!form.telefono);
  const canNext3 = !!form.producto && form.descripcion.length >= 20;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Source Sans Pro', sans-serif", background: '#ffffff' }}>

      {/* ── Utility bar (idéntica al blog) ── */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center h-8">
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-[#00008F]" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Personas</a>
            <a href="#" className="text-xs text-gray-600 hover:text-[#00008F]" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Empresas</a>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <a href="#" className="text-xs text-gray-500 hover:text-[#00008F]" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Ley de transparencia</a>
            <div className="flex items-center gap-1 cursor-pointer group">
              <User size={13} className="text-gray-400 group-hover:text-[#00008F]" />
              <span className="text-xs text-gray-500 group-hover:text-[#00008F]" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Pagos y facturación</span>
              <ChevronDown size={12} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <User size={13} className="text-gray-400 group-hover:text-[#00008F]" />
              <span className="text-xs text-gray-500 group-hover:text-[#00008F]" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Ingresa a tu cuenta</span>
              <ChevronDown size={12} className="text-gray-400" />
            </div>
            <button className="border border-[#00008F] text-[#00008F] hover:bg-[#00008F] hover:text-white text-xs font-semibold px-4 h-8 transition-colors" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
              Paga aquí
            </button>
          </div>
        </div>
      </div>

      {/* ── Main nav (idéntico al blog) ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center h-[52px] gap-8">
            <img
              src="https://image.marketing.axacolpatria.co/lib/fe2911747364047e721277/m/1/414c8f47-08cb-4aca-80c0-c4ef42d1e91d.jpg"
              alt="AXA COLPATRIA"
              className="h-8 flex-shrink-0"
            />
            <nav className="flex items-center justify-center gap-7 flex-1">
              {['Vida', 'Autos', 'Hogar', 'ARL', 'Salud', 'Nosotros', 'Otros seguros'].map(item => (
                <a
                  key={item}
                  href="#"
                  className="text-sm font-bold text-[#00008F] hover:text-[#4976BA] whitespace-nowrap transition-colors"
                  style={{ fontFamily: "'Source Sans Pro', sans-serif" }}
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="bg-[#00008F] hover:bg-[#0000b3] text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                Cotiza tu seguro aquí
              </button>
              <button className="border border-[#00008F] text-[#00008F] hover:bg-[#00008F] hover:text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
                Contáctanos
              </button>
              <button className="p-2 text-gray-500 hover:text-[#00008F] transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Banner hero ── */}
      <div className="w-full bg-[#f4f6fa] border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto">
          <img
            src="https://res.cloudinary.com/ddqbnr9vo/image/upload/v1783696739/Banner_AXA__PQRS_1_oi7ojq.jpg"
            alt="Radica tu PQRS - AXA COLPATRIA"
            className="w-full h-auto block"
          />
        </div>
      </div>

      {/* ── BODY ── */}
      <main className="flex-1 max-w-[1280px] mx-auto px-4 md:px-6 w-full py-10">
        {submitted ? (
          <SuccessView radicado={radicado} form={form} onReset={reset} />
        ) : mode === 'selector' ? (
          <SelectorView onSelect={startForm} />
        ) : (
          <FormView
            step={step}
            form={form}
            set={set}
            anonima={anonima}
            canNext1={canNext1}
            canNext2={canNext2}
            canNext3={canNext3}
            onNext={() => setStep(s => (s < 4 ? (s + 1) as Step : s))}
            onBack={() => { if (step === 1) { setMode('selector'); } else { setStep(s => (s - 1) as Step); } }}
            onSubmit={handleSubmit}
          />
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="w-full mt-auto h-16" style={{ background: BLUE_SEC }} />
    </div>
  );
}

/* ── SELECTOR ── */
function SelectorView({ onSelect }: { onSelect: (anon: boolean) => void }) {
  return (
    <div>
      <div className="p-4 mb-8 flex items-start gap-3 text-sm" style={{ background: '#EEF2FF', borderLeft: `4px solid ${BLUE}` }}>
        <AlertCircle size={18} style={{ color: BLUE }} className="mt-0.5 shrink-0" />
        <p style={{ color: '#1e3a8a' }}>
          AXA COLPATRIA recibirá y responderá tu solicitud en los tiempos definidos por ley.
          Antes de radicar, puedes consultar el{' '}
          <a href="https://www.axacolpatria.co/documents/42201273/76795004/Instructivo-para-radicacion-PQRS.pdf" target="_blank" rel="noopener noreferrer" className="underline font-semibold" style={{ color: BLUE }}>Manual de Radicación PQRS</a>.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Publico Headline Web', serif", color: '#343c3d' }}>
        ¿Cómo deseas radicar tu solicitud?
      </h2>
      <p className="text-gray-400 mb-8">Selecciona la modalidad que mejor se adapte a tu situación.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Identified */}
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow group flex flex-col rounded-2xl" style={{ border: '1px solid #E5E9F5' }}>
          <div className="p-8 flex flex-col items-center text-center flex-1 justify-between">
            <div className="flex flex-col items-center w-full">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: '#EEF2FF' }}>
                <User size={28} style={{ color: BLUE }} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE, fontWeight: 900 }}>
                PQRS Ante AXA COLPATRIA
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                Radica tu solicitud ante la compañía. Tu solicitud será registrada y gestionada de acuerdo con los tiempos y procedimientos establecidos.
              </p>
            </div>
            <a
              href="https://crust-civil-94769050.figma.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-semibold text-white transition-all rounded-full w-full max-w-xs cursor-pointer text-center inline-block"
              style={{ background: BLUE, fontFamily: "'Source Sans Pro', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0000F7')}
              onMouseLeave={e => (e.currentTarget.style.background = BLUE)}
            >
              Radicar
            </a>
          </div>
        </div>

        {/* Anonymous */}
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow group flex flex-col rounded-2xl" style={{ border: '1px solid #E5E9F5' }}>
          <div className="p-8 flex flex-col items-center text-center flex-1 justify-between">
            <div className="flex flex-col items-center w-full">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: '#EEF2FF' }}>
                <Shield size={28} style={{ color: BLUE }} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE, fontWeight: 900 }}>
                PQRS Anónima / Identidad Reservada
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                Si deseas presentar una PQRS de forma anónima, utiliza esta opción. Serás redirigido a un canal externo donde podrás realizar el registro.
              </p>
            </div>
            <a
              href="https://www.procuraduria.gov.co/Pages/solicituddeinformacionconidentificacionreservada.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-semibold text-white transition-all rounded-full w-full max-w-xs cursor-pointer text-center inline-block"
              style={{ background: BLUE, fontFamily: "'Source Sans Pro', sans-serif" }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0000F7')}
              onMouseLeave={e => (e.currentTarget.style.background = BLUE)}
            >
              Radicar
            </a>
          </div>
        </div>

        {/* Consultar PQRS */}
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow group flex flex-col rounded-2xl" style={{ border: '1px solid #E5E9F5' }}>
          <div className="p-8 flex flex-col items-center text-center flex-1 justify-between">
            <div className="flex flex-col items-center w-full">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: '#EEF2FF' }}>
                <ClipboardList size={28} style={{ color: BLUE }} />
              </div>
              <h3 className="text-xl mb-3" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE, fontWeight: 900 }}>
                Consultar PQRS
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
                ¿Ya radicaste una solicitud? Consulta el estado y el historial de tus PQRS ingresando tu número de radicado.
              </p>
            </div>
            <a
              href="https://lair-tech-29288756.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 font-semibold transition-all rounded-full w-full max-w-xs cursor-pointer text-center inline-block"
              style={{ border: `2px solid ${BLUE}`, color: BLUE, fontFamily: "'Source Sans Pro', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0000F7'; e.currentTarget.style.borderColor = '#0000F7'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
            >
              Consultar estado
            </a>
          </div>
        </div>
      </div>

      {/* Info de reserva de identidad */}
      <div className="p-4 mb-10 rounded-xl flex items-start gap-3 border border-slate-200" style={{ background: '#F8FAFC' }}>
        <Shield size={18} className="text-slate-500 mt-0.5 shrink-0" />
        <p className="text-xs leading-relaxed text-slate-700">
          <strong>Información sobre identidad reservada:</strong> Conforme al Artículo 38 Ley 190/1995, Art. 69 Ley 734/2002 y Art. 81 Ley 962/2005. Si deseas que tu solicitud sea tratada bajo la modalidad de identidad reservada, ten en cuenta que el trámite se debe adelantar directamente ante la <strong>Procuraduría General de la Nación</strong>.
        </p>
      </div>

      {/* Other channels */}
      <div className="p-6 border-t border-gray-100 mt-8">
        <h4 className="font-bold mb-6 text-gray-700">Otros canales de atención</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Línea integral */}
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100" style={{ background: '#F8FAFF' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#EEF2FF' }}>
              <Phone size={20} style={{ color: BLUE }} />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Otros medios</div>
              <h5 className="text-base font-bold text-gray-800 mb-2">Línea integral</h5>
              <div className="space-y-1 text-sm text-gray-600">
                <p><strong>Bogotá:</strong> +57 (601) 423 5757</p>
                <p><strong>Resto del país:</strong> +57 01-8000-512620</p>
                <p><strong>Desde tu celular:</strong> #247</p>
              </div>
            </div>
          </div>

          {/* Sucursales */}
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100" style={{ background: '#F8FAFF' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#EEF2FF' }}>
              <MapPin size={20} style={{ color: BLUE }} />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-xs text-gray-400 mb-1">Oficinas físicas</div>
                <h5 className="text-base font-bold text-gray-800 mb-2">Sucursales</h5>
                <p className="text-sm text-gray-600 mb-4">Encuentra la oficina o punto de atención más cercano a ti.</p>
              </div>
              <a
                href="https://www.axacolpatria.co/es/sac/red-oficinas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-semibold hover:underline"
                style={{ color: BLUE }}
              >
                Ver puntos de atención →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FORM VIEW ── */
function FormView({ step, form, set, anonima, canNext1, canNext2, canNext3, onNext, onBack, onSubmit }: {
  step: Step; form: FormData;
  set: (k: keyof FormData, v: string | boolean | File | null) => void;
  anonima: boolean; canNext1: boolean; canNext2: boolean; canNext3: boolean;
  onNext: () => void; onBack: () => void; onSubmit: () => void;
}) {
  const steps = [
    { n: 1, label: 'Tipo de solicitud' },
    { n: 2, label: 'Datos personales' },
    { n: 3, label: 'Detalle' },
    { n: 4, label: 'Revisión' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{ background: step > s.n ? '#059669' : step === s.n ? BLUE : '#E5E9F5', color: step >= s.n ? '#fff' : '#9CA3AF' }}
              >
                {step > s.n ? <CheckCircle size={18} /> : s.n}
              </div>
              <span className="text-xs mt-1.5 font-medium hidden sm:block" style={{ color: step === s.n ? BLUE : '#9CA3AF' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-4 rounded" style={{ background: step > s.n ? '#059669' : '#E5E9F5' }} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8" style={{ border: '1px solid #E5E9F5' }}>
        {step === 1 && <Step1 form={form} set={set} />}
        {step === 2 && <Step2 form={form} set={set} anonima={anonima} />}
        {step === 3 && <Step3 form={form} set={set} />}
        {step === 4 && <Step4 form={form} anonima={anonima} />}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-colors"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            ← Atrás
          </button>
          {step < 4 ? (
            <button
              onClick={onNext}
              disabled={step === 1 ? !canNext1 : step === 2 ? !canNext2 : !canNext3}
              className="px-8 py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-40"
              style={{ background: BLUE }}
            >
              Continuar →
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="px-8 py-3 rounded-xl font-semibold text-sm text-white"
              style={{ background: `linear-gradient(90deg, ${BLUE}, ${BLUE_SEC})` }}
            >
              Radicar solicitud
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Step1({ form, set }: { form: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE }}>
        ¿Qué tipo de solicitud deseas radicar?
      </h2>
      <p className="text-gray-400 text-sm mb-6">Selecciona una opción para continuar.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {Object.entries(tiposMap).map(([key, t]) => (
          <button
            key={key}
            onClick={() => set('tipo', key)}
            className="text-left p-5 rounded-xl border-2 transition-all"
            style={{ borderColor: form.tipo === key ? t.color : '#E5E9F5', background: form.tipo === key ? `${t.color}08` : '#fff' }}
          >
            <div className="text-2xl mb-3">{t.icon}</div>
            <div className="font-bold text-gray-800 mb-1">{t.label}</div>
            <div className="text-xs text-gray-400 leading-relaxed">{t.desc}</div>
            {form.tipo === key && (
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: t.color }}>
                <CheckCircle size={13} /> Seleccionado
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ form, set, anonima }: { form: FormData; set: (k: keyof FormData, v: string) => void; anonima: boolean }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE }}>
        {anonima ? 'Medio de contacto' : 'Datos personales'}
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        {anonima
          ? 'Tu identidad permanecerá en reserva. Solo necesitamos un email para enviarte el número de radicado.'
          : 'Completa tus datos para que podamos responderte personalizadamente.'}
      </p>
      {anonima ? (
        <div>
          <div className="p-4 mb-6 flex items-start gap-3" style={{ background: '#EEF2FF', borderLeft: `4px solid ${BLUE}` }}>
            <Shield size={18} style={{ color: BLUE }} className="mt-0.5 shrink-0" />
            <p className="text-sm" style={{ color: '#1e3a8a' }}>
              Tu información personal no será almacenada. Solo usaremos el email para enviarte el número de radicado.
            </p>
          </div>
          <Field label="Correo electrónico *" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={v => set('email', v)} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Nombre(s) *" placeholder="Ej. Carlos" value={form.nombre} onChange={v => set('nombre', v)} />
          <Field label="Apellido(s) *" placeholder="Ej. Rodríguez" value={form.apellido} onChange={v => set('apellido', v)} />
          <Field label="Cédula de ciudadanía *" placeholder="Ej. 1234567890" value={form.cedula} onChange={v => set('cedula', v)} />
          <Field label="Correo electrónico *" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={v => set('email', v)} />
          <Field label="Teléfono / Celular *" placeholder="Ej. 301 123 4567" value={form.telefono} onChange={v => set('telefono', v)} />
          <SelectField label="Ciudad de residencia" value={form.ciudad} options={ciudades} onChange={v => set('ciudad', v)} />
        </div>
      )}
    </div>
  );
}

function Step3({ form, set }: { form: FormData; set: (k: keyof FormData, v: string | File | null) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE }}>
        Detalle de tu solicitud
      </h2>
      <p className="text-gray-400 text-sm mb-6">Mientras más detallada sea tu descripción, más rápido podremos atenderte.</p>
      <div className="space-y-4">
        <SelectField label="Producto o servicio afectado *" value={form.producto} options={productos} onChange={v => set('producto', v)} />
        <Field label="Número de póliza / contrato (opcional)" placeholder="Ej. 12345678" value={form.numeropoliza} onChange={v => set('numeropoliza', v)} />
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Descripción detallada * <span className="font-normal text-gray-400 text-xs">(mínimo 20 caracteres)</span>
          </label>
          <textarea
            rows={5}
            value={form.descripcion}
            onChange={e => set('descripcion', e.target.value)}
            placeholder="Describe con claridad el motivo de tu solicitud, fechas relevantes y cualquier información que consideres importante..."
            className="w-full rounded-xl border px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none transition-all"
            style={{ borderColor: '#E5E9F5' }}
          />
          <div className="text-xs text-gray-400 mt-1 text-right">{form.descripcion.length} caracteres</div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Adjuntar documentos (opcional)</label>
          <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed cursor-pointer hover:border-blue-300 transition-colors" style={{ borderColor: '#E5E9F5' }}>
            <Paperclip size={20} className="text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-600">{form.archivo ? form.archivo.name : 'Adjuntar archivo'}</div>
              <div className="text-xs text-gray-400">PDF, JPG, PNG hasta 5MB</div>
            </div>
            <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => set('archivo', e.target.files?.[0] ?? null)} />
            {form.archivo && (
              <button type="button" onClick={e => { e.preventDefault(); set('archivo', null); }} className="ml-auto text-gray-400 hover:text-red-400 transition-colors">
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

function Step4({ form, anonima }: { form: FormData; anonima: boolean }) {
  const tipo = tiposMap[form.tipo];
  const rows = [
    { label: 'Tipo de solicitud', value: tipo?.label },
    ...(!anonima ? [
      { label: 'Nombre completo', value: `${form.nombre} ${form.apellido}` },
      { label: 'Cédula', value: form.cedula },
      { label: 'Teléfono', value: form.telefono },
    ] : []),
    { label: 'Correo electrónico', value: form.email },
    { label: 'Producto / Servicio', value: form.producto },
    ...(form.numeropoliza ? [{ label: 'Número de póliza', value: form.numeropoliza }] : []),
    { label: 'Modalidad', value: anonima ? 'Anónima / Identidad Reservada' : 'Identificada' },
    ...(form.archivo ? [{ label: 'Adjunto', value: form.archivo.name }] : []),
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE }}>
        Revisión de tu solicitud
      </h2>
      <p className="text-gray-400 text-sm mb-6">Verifica que todos los datos sean correctos antes de radicar.</p>
      {tipo && (
        <div className="flex items-center gap-3 p-4 rounded-xl mb-5" style={{ background: `${tipo.color}10`, border: `1px solid ${tipo.color}30` }}>
          <span className="text-2xl">{tipo.icon}</span>
          <div>
            <div className="font-bold" style={{ color: tipo.color }}>{tipo.label}</div>
            <div className="text-xs text-gray-500">{tipo.desc}</div>
          </div>
        </div>
      )}
      <div className="divide-y divide-gray-50 rounded-xl overflow-hidden" style={{ border: '1px solid #E5E9F5' }}>
        {rows.map(r => (
          <div key={r.label} className="flex justify-between items-start px-5 py-3 bg-white">
            <span className="text-sm text-gray-400 w-40 shrink-0">{r.label}</span>
            <span className="text-sm font-medium text-gray-700 text-right">{r.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 p-4 rounded-xl text-sm" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
        <div className="flex items-center gap-2 font-semibold text-green-700 mb-1">
          <CheckCircle size={16} /> Todo en orden
        </div>
        <p className="text-green-600">
          "{form.descripcion.slice(0, 90)}{form.descripcion.length > 90 ? '…' : ''}"
        </p>
      </div>
    </div>
  );
}

function SuccessView({ radicado, form, onReset }: { radicado: string; form: FormData; onReset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-10">
      <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_SEC})` }}>
        <CheckCircle size={48} className="text-white" />
      </div>
      <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Publico Headline Web', serif", color: BLUE }}>
        ¡Solicitud radicada exitosamente!
      </h2>
      <p className="text-gray-500 mb-8 text-lg">
        Tu {tiposMap[form.tipo]?.label?.toLowerCase()} ha sido recibida y asignada a nuestro equipo.
      </p>
      <div className="bg-white rounded-2xl p-8 shadow-sm mb-8" style={{ border: '1px solid #E5E9F5' }}>
        <div className="text-sm text-gray-400 mb-2">Número de radicado</div>
        <div className="text-3xl font-bold tracking-wider mb-4" style={{ color: BLUE, fontFamily: 'monospace' }}>{radicado}</div>
        <p className="text-sm text-gray-500">
          Guarda este número para hacer seguimiento. Enviaremos confirmación a <strong>{form.email}</strong>.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-50">
          {[
            { label: 'Tipo', value: tiposMap[form.tipo]?.label },
            { label: 'Modalidad', value: form.anonima ? 'Anónima' : 'Identificada' },
            { label: 'Tiempo de respuesta', value: '15 días hábiles' },
          ].map(i => (
            <div key={i.label} className="text-center">
              <div className="text-xs text-gray-400 mb-1">{i.label}</div>
              <div className="text-sm font-bold text-gray-700">{i.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onReset} className="px-8 py-3 rounded-xl font-semibold text-white" style={{ background: BLUE }}>
          Radicar otra solicitud
        </button>
        <button className="px-8 py-3 rounded-xl font-semibold border-2" style={{ borderColor: BLUE, color: BLUE }}>
          Descargar comprobante
        </button>
      </div>
    </div>
  );
}

/* ── Shared inputs ── */
function Field({ label, type = 'text', placeholder, value, onChange }: {
  label: string; type?: string; placeholder?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border px-4 py-3 text-sm text-gray-700 focus:outline-none transition-all"
        style={{ borderColor: '#E5E9F5' }}
        onFocus={e => (e.target.style.borderColor = BLUE)}
        onBlur={e => (e.target.style.borderColor = '#E5E9F5')}
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value} onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border px-4 py-3 text-sm text-gray-700 focus:outline-none bg-white transition-all pr-10"
          style={{ borderColor: '#E5E9F5' }}
        >
          <option value="">Seleccionar…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
