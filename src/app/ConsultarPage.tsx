import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, CheckCircle, AlertCircle } from 'lucide-react';

const BLUE = '#00008F';

export default function ConsultarPage() {
  const navigate = useNavigate();
  const [radicado, setRadicado] = useState('');
  const [resultado, setResultado] = useState<null | 'found' | 'not_found'>(null);

  const handleConsultar = () => {
    if (!radicado.trim()) return;
    setResultado(radicado.trim().length >= 3 ? 'found' : 'not_found');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Source Sans Pro', sans-serif", background: '#ffffff' }}>

      {/* Solo logo */}
      <header className="border-b border-gray-100 px-6 py-4">
        <img
          src="https://image.marketing.axacolpatria.co/lib/fe2911747364047e721277/m/1/414c8f47-08cb-4aca-80c0-c4ef42d1e91d.jpg"
          alt="AXA COLPATRIA"
          className="h-8"
        />
      </header>

      {/* Contenido */}
      <main className="flex-1 flex items-start justify-center px-4 pt-14 pb-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-center" style={{ fontFamily: "'Publico Headline Web', serif", color: '#343c3d' }}>
            Consulta el estado de tu PQRS
          </h1>
          <p className="text-center text-sm mb-8" style={{ color: '#4976BA' }}>
            Ingresa los datos solicitados para conocer el estado de tu solicitud.
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-5" style={{ border: '1px solid #E5E9F5' }}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Número de Radicado *
              </label>
              <input
                type="text"
                value={radicado}
                onChange={e => { setRadicado(e.target.value); setResultado(null); }}
                placeholder="EJ. AXA-2026-123456"
                className="w-full rounded-xl border px-4 py-3 text-sm text-gray-700 focus:outline-none transition-all"
                style={{ borderColor: '#E5E9F5' }}
                onFocus={e => (e.target.style.borderColor = BLUE)}
                onBlur={e => (e.target.style.borderColor = '#E5E9F5')}
                onKeyDown={e => e.key === 'Enter' && handleConsultar()}
              />
            </div>

            <button
              onClick={handleConsultar}
              disabled={!radicado.trim()}
              className="w-full py-3 rounded-full font-semibold text-white transition-all disabled:opacity-40"
              style={{ background: BLUE, fontFamily: "'Source Sans Pro', sans-serif" }}
              onMouseEnter={e => { if (radicado.trim()) e.currentTarget.style.background = '#0000F7'; }}
              onMouseLeave={e => (e.currentTarget.style.background = BLUE)}
            >
              Consultar
            </button>

            {resultado === 'found' && (
              <div className="mt-6 p-4 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                <div className="flex items-center gap-2 font-semibold text-green-700 mb-2">
                  <CheckCircle size={16} /> Radicado encontrado
                </div>
                <div className="text-sm text-green-600 space-y-1">
                  <p><strong>Radicado:</strong> {radicado.toUpperCase()}</p>
                  <p><strong>Estado:</strong> En gestión</p>
                  <p><strong>Tiempo estimado de respuesta:</strong> 15 días hábiles</p>
                </div>
              </div>
            )}

            {resultado === 'not_found' && (
              <div className="mt-6 p-4 rounded-xl" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <div className="flex items-center gap-2 font-semibold mb-1" style={{ color: '#B91C1C' }}>
                  <AlertCircle size={16} /> No encontrado
                </div>
                <p className="text-sm" style={{ color: '#DC2626' }}>No encontramos un radicado con ese número. Verifica e intenta de nuevo.</p>
              </div>
            )}
          </div>

          {/* Protección de datos */}
          <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <Shield size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>Protección de datos:</strong> De conformidad con la Ley Habeas Data (Ley 1581 de 2012), AXA COLPATRIA garantiza la confidencialidad y seguridad de tus datos personales ingresados para la consulta de solicitudes.
            </p>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="text-sm font-semibold hover:underline"
              style={{ color: BLUE }}
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
