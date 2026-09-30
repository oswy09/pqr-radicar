import { useState } from 'react';
import { Search, ChevronDown, Phone, MapPin, User, Shield, CheckCircle, AlertCircle, FileText, Calendar, Clock, RefreshCw, ArrowLeft } from 'lucide-react';

const BLUE = '#00008F';
const BLUE_SEC = '#4976BA';

const docTypes = [
  'Cédula de ciudadanía',
  'Cédula de extranjería',
  'Pasaporte',
  'NIT',
];

type QueryData = {
  tipoDoc: string;
  numDoc: string;
  radicado: string;
  anonima: boolean;
};

type MockTicket = {
  radicado: string;
  tipo: string;
  producto: string;
  fecha: string;
  descripcion: string;
  estado: 'recibido' | 'estudio' | 'respondido';
  respuesta?: string;
};

export default function ConsultarApp() {
  const [form, setForm] = useState<QueryData>({
    tipoDoc: '',
    numDoc: '',
    radicado: '',
    anonima: false,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MockTicket | null>(null);
  const [error, setError] = useState('');



  const set = (key: keyof QueryData, val: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setError('');
  };

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.radicado.trim()) {
      setError('Por favor, ingresa el número de radicado.');
      return;
    }
    if (!form.anonima) {
      if (!form.tipoDoc || !form.numDoc.trim()) {
        setError('Por favor, ingresa tu tipo y número de documento.');
        return;
      }
    }

    setLoading(true);
    setError('');

    // Simular retraso de búsqueda
    setTimeout(() => {
      setLoading(false);
      
      // Formato esperado de radicado: AXA-YYYY-XXXXXX
      const radUpper = form.radicado.toUpperCase().trim();
      
      // Si el radicado contiene "OK", "123" o termina en un dígito par, simulamos estado "respondido"; de lo contrario, "estudio"
      const isResolved = radUpper.includes('OK') || radUpper.includes('123') || (radUpper.match(/\d$/) && parseInt(radUpper.slice(-1)) % 2 === 0);
      const ticketEstado = isResolved ? 'respondido' : 'estudio';
      
      const isAnon = form.anonima;
      const mockTicket: MockTicket = {
        radicado: radUpper.startsWith('AXA-') ? radUpper : `AXA-2026-${radUpper}`,
        tipo: isAnon ? 'Petición' : 'Reclamo',
        producto: isAnon ? 'Seguro de Salud' : 'Seguro de Vehículos',
        fecha: '05/07/2026',
        descripcion: isAnon 
          ? 'Solicito comedidamente copia de la certificación tributaria de retenciones correspondientes al seguro de salud del año anterior.'
          : 'Presento inconformidad con el retraso en la asignación del taller para la reparación de mi vehículo asegurado tras el incidente reportado el día 02 de Julio.',
        estado: ticketEstado,
        respuesta: ticketEstado === 'respondido' 
          ? 'Estimado cliente, le informamos que su solicitud ha sido resuelta de manera favorable. Se ha autorizado la orden de reparación bajo el número de taller 98213. Adjuntamos la documentación correspondiente en su buzón registrado.'
          : undefined,
      };

      setResult(mockTicket);
    }, 1200);
  };

  const handleReset = () => {
    setResult(null);
    setForm({
      tipoDoc: '',
      numDoc: '',
      radicado: '',
      anonima: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Source Sans Pro', sans-serif", background: '#ffffff' }}>
      
      {/* ── Utility bar ── */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center h-8">
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#1A1D21] hover:text-[#00008F]">Personas</a>
            <a href="#" className="text-xs text-[#1A1D21] hover:text-[#00008F]">Empresas</a>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <a href="#" className="text-xs text-[#1A1D21] hover:text-[#00008F]">Ley de transparencia</a>
            <div className="flex items-center gap-1 cursor-pointer group">
              <User size={13} className="text-gray-400 group-hover:text-[#00008F]" />
              <span className="text-xs text-[#1A1D21] group-hover:text-[#00008F]">Pagos y facturación</span>
              <ChevronDown size={12} className="text-gray-400" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer group">
              <User size={13} className="text-gray-400 group-hover:text-[#00008F]" />
              <span className="text-xs text-[#1A1D21] group-hover:text-[#00008F]">Ingresa a tu cuenta</span>
              <ChevronDown size={12} className="text-gray-400" />
            </div>
            <button className="border border-[#00008F] text-[#00008F] hover:bg-[#00008F] hover:text-white text-xs font-semibold px-4 h-8 transition-colors">
              Paga aquí
            </button>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
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
                >
                  {item}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="bg-[#00008F] hover:bg-[#0000b3] text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap">
                Cotiza tu seguro aquí
              </button>
              <button className="border border-[#00008F] text-[#00008F] hover:bg-[#00008F] hover:text-white text-sm font-semibold px-4 py-2 transition-colors whitespace-nowrap">
                Contáctanos
              </button>
              <button className="p-2 text-[#1A1D21] hover:text-[#00008F] transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <main className="flex-1 max-w-[1280px] mx-auto px-4 md:px-6 w-full py-10">
        {result ? (
          <QueryResultView 
            ticket={result} 
            onBack={handleReset} 
          />
        ) : (
          <div className="mx-auto w-full" style={{ maxWidth: '420px' }}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-[#1A1D21]" style={{ fontFamily: "'Publico Headline Web', serif" }}>
                Consulta el estado de tu PQRS
              </h2>
              <p className="text-[#1A1D21] text-sm">
                Ingresa los datos solicitados a continuación para conocer el estado y la respuesta de tu radicado.
              </p>
            </div>

            <form onSubmit={handleQuery} className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 space-y-5">
              
              {/* Checkbox Anónima */}
              <label className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:bg-slate-50 transition-colors" style={{ borderColor: '#E5E9F5' }}>
                <input 
                  type="checkbox" 
                  checked={form.anonima} 
                  onChange={e => set('anonima', e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                  style={{ accentColor: BLUE }}
                />
                <div>
                  <div className="text-sm font-semibold text-[#1A1D21]">¿Es una solicitud Anónima?</div>
                  <div className="text-xs text-[#1A1D21]">Marca esta casilla si no ingresaste datos de identidad al radicar</div>
                </div>
              </label>

              {/* Formulario condicional para identificadas */}
              {!form.anonima && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1D21] mb-1.5">Tipo de documento *</label>
                    <div className="relative">
                      <select
                        value={form.tipoDoc}
                        onChange={e => set('tipoDoc', e.target.value)}
                        className="w-full appearance-none rounded-xl border px-4 py-3 text-sm text-[#1A1D21] bg-white focus:outline-none transition-all pr-10"
                        style={{ borderColor: '#E5E9F5' }}
                      >
                        <option value="">Seleccionar…</option>
                        {docTypes.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#1A1D21] mb-1.5">Número de documento *</label>
                    <input
                      type="text"
                      placeholder="Ej. 12345678"
                      value={form.numDoc}
                      onChange={e => set('numDoc', e.target.value)}
                      className="w-full rounded-xl border px-4 py-3 text-sm text-[#1A1D21] focus:outline-none transition-all"
                      style={{ borderColor: '#E5E9F5' }}
                    />
                  </div>
                </div>
              )}

              {/* Número de Radicado */}
              <div>
                <label className="block text-sm font-semibold text-[#1A1D21] mb-1.5">Número de Radicado *</label>
                <input
                  type="text"
                  placeholder="Ej. AXA-2026-123456"
                  value={form.radicado}
                  onChange={e => set('radicado', e.target.value)}
                  className="w-full rounded-xl border px-4 py-3 text-sm text-[#1A1D21] focus:outline-none transition-all font-mono uppercase"
                  style={{ borderColor: '#E5E9F5' }}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle size={14} /> {error}
                </div>
              )}

              <div className="flex justify-center" style={{ marginTop: '36px' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 rounded-full font-semibold text-white transition-all flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer whitespace-nowrap"
                  style={{ background: BLUE, width: '180px' }}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      Buscando...
                    </>
                  ) : (
                    'Consultar'
                  )}
                </button>
              </div>
            </form>

            {/* Legal Notice */}
            <div className="p-4 mt-6 rounded-xl flex items-start gap-3 border border-slate-200" style={{ background: '#F8FAFC' }}>
              <Shield size={18} className="text-slate-500 mt-0.5 shrink-0" />
              <p className="text-xs leading-relaxed text-[#1A1D21]">
                <strong>Protección de datos:</strong> De conformidad con la Ley Habeas Data (Ley 1581 de 2012), AXA COLPATRIA garantiza la confidencialidad y seguridad de tus datos personales ingresados para la consulta de solicitudes.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="w-full mt-auto h-16" style={{ background: BLUE_SEC }} />
    </div>
  );
}

/* ── RESULT VIEW ── */
function QueryResultView({ 
  ticket, 
  onBack 
}: { 
  ticket: MockTicket; 
  onBack: () => void;
}) {
  const steps = [
    { key: 'recibido', label: 'Recibido', desc: 'PQRS ingresada con éxito' },
    { key: 'estudio', label: 'En estudio', desc: 'En análisis de asesores' },
    { key: 'respondido', label: 'Respondido', desc: 'Respuesta disponible' },
  ];

  const getStepIndex = (est: string) => {
    if (est === 'recibido') return 0;
    if (est === 'estudio') return 1;
    return 2;
  };

  const currentIdx = getStepIndex(ticket.estado);

  return (
    <div className="max-w-2xl mx-auto">
      
      {/* Back button */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-sm font-semibold hover:underline mb-6"
        style={{ color: BLUE }}
      >
        <ArrowLeft size={16} /> Realizar otra consulta
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 space-y-8">
        
        {/* Ticket Header */}
        <div className="border-b border-gray-100 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="text-xs text-[#1A1D21] mb-1">Número de radicado</div>
            <div className="text-2xl font-bold tracking-wider font-mono text-[#1A1D21]">{ticket.radicado}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
              ticket.estado === 'respondido' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              {ticket.estado === 'recibido' ? 'Recibido' : ticket.estado === 'estudio' ? 'En Estudio' : 'Respondido'}
            </span>
          </div>
        </div>

        {/* Stepper del Estado */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-[#1A1D21]">Estado de tu trámite</h4>
          <div className="grid grid-cols-3 gap-2">
            {steps.map((s, i) => {
              const active = i <= currentIdx;
              const isCurrent = i === currentIdx;
              return (
                <div key={s.key} className="text-center relative">
                  <div 
                    className="h-1.5 rounded-full mb-2 transition-all duration-300"
                    style={{ 
                      background: active 
                        ? (s.key === 'respondido' && currentIdx === 2 ? '#059669' : BLUE) 
                        : '#E5E9F5' 
                    }} 
                  />
                  <div className={`text-xs font-bold ${active ? 'text-[#1A1D21]' : 'text-[#1A1D21]'}`}>{s.label}</div>
                  <div className="text-[10px] text-[#1A1D21] mt-0.5 hidden sm:block">{s.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalles del Radicado */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
          <h4 className="text-sm font-bold text-[#1A1D21]">Detalles de la solicitud</h4>
          <div className="grid grid-cols-2 gap-4 text-xs text-[#1A1D21]">
            <div>
              <span className="block text-[#1A1D21] mb-0.5">Tipo de PQRS</span>
              <strong className="text-[#1A1D21] text-sm">{ticket.tipo}</strong>
            </div>
            <div>
              <span className="block text-[#1A1D21] mb-0.5">Producto o Servicio</span>
              <strong className="text-[#1A1D21] text-sm">{ticket.producto}</strong>
            </div>
            <div>
              <span className="block text-[#1A1D21] mb-0.5">Fecha de Radicación</span>
              <strong className="text-[#1A1D21] text-sm flex items-center gap-1">
                <Calendar size={13} className="text-gray-400" /> {ticket.fecha}
              </strong>
            </div>
            <div>
              <span className="block text-[#1A1D21] mb-0.5">Plazo legal de respuesta</span>
              <strong className="text-[#1A1D21] text-sm flex items-center gap-1">
                <Clock size={13} className="text-gray-400" /> 15 días hábiles
              </strong>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3">
            <span className="block text-xs text-[#1A1D21] mb-1">Descripción reportada</span>
            <p className="text-xs text-[#1A1D21] leading-relaxed italic bg-white p-3 rounded-lg border border-slate-100">
              "{ticket.descripcion}"
            </p>
          </div>
        </div>

        {/* Respuesta de la Entidad */}
        {ticket.estado === 'respondido' ? (
          <div className="p-6 rounded-xl border border-green-200 bg-green-50/50 space-y-3">
            <div className="flex items-center gap-2 text-green-800 font-bold text-sm">
              <CheckCircle size={18} className="text-green-600" />
              Respuesta oficial de AXA COLPATRIA
            </div>
            <p className="text-xs text-green-700 leading-relaxed bg-white p-4 rounded-lg border border-green-100 shadow-xs">
              {ticket.respuesta}
            </p>
            <div className="flex justify-end pt-1">
              <button className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1">
                <FileText size={13} /> Descargar documento de respuesta
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/30 flex items-start gap-3">
            <Clock size={18} className="text-blue-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-800 mb-1">Su solicitud está en proceso</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Nuestros asesores están analizando la información aportada. La respuesta oficial será notificada al correo electrónico de contacto ingresado en el radicado original dentro del plazo legal.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
