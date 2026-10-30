import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Check, Clock, X, Search } from 'lucide-react';

const BLUE = '#00008F';

type Estado = 'exitoso' | 'en_proceso' | 'rechazado' | null;

const ESTADOS: Record<string, { estado: Estado; titulo: string; descripcion: string; fecha: string; respuesta?: string }> = {
  '0001': {
    estado: 'exitoso',
    titulo: 'Solicitud resuelta',
    descripcion: 'Tu solicitud fue atendida y resuelta satisfactoriamente.',
    fecha: '2026-10-15',
    respuesta: 'Hemos procesado tu solicitud y tomado las acciones correspondientes. Puedes comunicarte con nosotros si tienes dudas adicionales.',
  },
  '0002': {
    estado: 'en_proceso',
    titulo: 'En gestión',
    descripcion: 'Tu solicitud está siendo revisada por nuestro equipo.',
    fecha: '2026-10-25',
  },
  '0003': {
    estado: 'rechazado',
    titulo: 'Solicitud rechazada',
    descripcion: 'Tu solicitud no pudo ser procesada.',
    fecha: '2026-10-20',
    respuesta: 'Después de revisar tu caso, no es posible proceder con la solicitud debido a inconsistencias en la información suministrada.',
  },
};

const ESTADO_CONFIG = {
  exitoso: {
    bg: '#DFF8EA',
    text: '#0F4527',
    border: '#A3E6BF',
    iconBg: '#17663A',
    icon: <Check size={16} strokeWidth={2.5} />,
  },
  en_proceso: {
    bg: '#FFF3D6',
    text: '#5C4200',
    border: '#F0CC7A',
    iconBg: '#AD7D00',
    icon: <Clock size={16} />,
  },
  rechazado: {
    bg: '#FDD8E1',
    text: '#880727',
    border: '#F4A0B0',
    iconBg: '#880727',
    icon: <X size={16} strokeWidth={2.5} />,
  },
};

export default function ConsultarPage() {
  const navigate = useNavigate();
  const [radicado, setRadicado] = useState('');
  const [resultado, setResultado] = useState<'found' | 'not_found' | null>(null);
  const [data, setData] = useState<typeof ESTADOS[string] | null>(null);

  const handleConsultar = () => {
    const key = radicado.trim().replace(/^(AXA-\d{4}-)?/i, '').padStart(4, '0').slice(-4);
    const match = ESTADOS[key];
    if (match) {
      setData(match);
      setResultado('found');
    } else {
      setData(null);
      setResultado('not_found');
    }
  };

  const cfg = data?.estado ? ESTADO_CONFIG[data.estado] : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Source Sans Pro', sans-serif", background: '#F8FAFC' }}>

      {/* Solo logo */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <img
          src="https://image.marketing.axacolpatria.co/lib/fe2911747364047e721277/m/1/414c8f47-08cb-4aca-80c0-c4ef42d1e91d.jpg"
          alt="AXA COLPATRIA"
          className="h-8"
        />
      </header>

      <main className="flex-1 flex items-start justify-center px-4 pt-12 pb-10">
        <div className="w-full max-w-lg">

          <h1 className="font-bold mb-2 text-center" style={{ fontFamily: "'Publico Headline Web', serif", color: '#1A1A2E', fontSize: '48px', lineHeight: 1.1 }}>
            Consulta el estado de tu PQRS
          </h1>
          <p className="text-center mb-8 font-semibold" style={{ color: '#1A1A2E', fontSize: '18px' }}>
            Consulta el estado de tu solicitud con el número de radicado.
          </p>

          {/* Formulario */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-5" style={{ border: '1px solid #E5E9F5' }}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Número de Radicado *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={radicado}
                  onChange={e => { setRadicado(e.target.value); setResultado(null); setData(null); }}
                  placeholder="EJ. AXA-2026-000001"
                  className="w-full rounded-xl border px-4 py-3 pr-11 text-sm text-gray-700 focus:outline-none transition-all"
                  style={{ borderColor: '#E5E9F5' }}
                  onFocus={e => (e.target.style.borderColor = BLUE)}
                  onBlur={e => (e.target.style.borderColor = '#E5E9F5')}
                  onKeyDown={e => e.key === 'Enter' && handleConsultar()}
                />
                <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleConsultar}
              disabled={!radicado.trim()}
              className="w-full py-3 rounded-full font-semibold text-white transition-all disabled:opacity-40"
              style={{ background: BLUE }}
              onMouseEnter={e => { if (radicado.trim()) e.currentTarget.style.background = '#0000F7'; }}
              onMouseLeave={e => (e.currentTarget.style.background = BLUE)}
            >
              Consultar estado
            </button>

            {/* Resultado encontrado */}
            {resultado === 'found' && data && cfg && (
              <div className="mt-6 rounded-xl overflow-hidden" style={{ border: `1px solid ${cfg.border}` }}>
                {/* Header estado */}
                <div className="flex items-center gap-3 px-5 py-4" style={{ background: cfg.bg }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: cfg.iconBg, color: '#FFFFFF' }}>
                    {cfg.icon}
                  </div>
                  <div className="font-bold text-sm" style={{ color: cfg.text }}>{data.titulo}</div>
                </div>

                {/* Detalle */}
                <div className="bg-white px-5 py-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Radicado</span>
                    <span className="font-semibold text-gray-800 font-mono">{radicado.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Último movimiento</span>
                    <span className="font-semibold text-gray-800">{data.fecha}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-50">
                    <p className="text-sm text-gray-500 leading-relaxed">{data.descripcion}</p>
                  </div>
                  {data.respuesta && (
                    <div className="pt-2 border-t border-gray-50">
                      <div className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">Respuesta</div>
                      <p className="text-sm text-gray-700 leading-relaxed">{data.respuesta}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No encontrado */}
            {resultado === 'not_found' && (
              <div className="mt-6 p-4 rounded-xl flex items-start gap-3" style={{ background: '#FDD8E1', border: '1px solid #F4A0B0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: '#880727', color: '#FFFFFF' }}>
                  <XCircle size={16} />
                </div>
                <div className="pt-1">
                  <div className="font-semibold text-sm mb-0.5" style={{ color: '#880727' }}>Radicado no encontrado</div>
                  <p className="text-sm" style={{ color: '#880727' }}>No encontramos un radicado con ese número. Verifica e intenta de nuevo.</p>
                </div>
              </div>
            )}
          </div>

          {/* Protección de datos */}
          <div className="p-4 rounded-xl flex items-start gap-3 bg-white" style={{ border: '1px solid #E2E8F0' }}>
            <Shield size={15} className="text-slate-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>Protección de datos:</strong> De conformidad con la Ley Habeas Data (Ley 1581 de 2012), AXA COLPATRIA garantiza la confidencialidad y seguridad de tus datos personales.
            </p>
          </div>

          <div className="text-center mt-6">
            <button onClick={() => navigate('/')} className="text-sm font-semibold hover:underline" style={{ color: BLUE }}>
              ← Volver al inicio
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
