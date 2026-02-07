
import React from 'react';
import { AlertTriangle, ShieldCheck, XCircle, Info } from 'lucide-react';

interface ProhibitedItemsModalProps {
  onAccept: () => void;
  onCancel: () => void;
}

const ProhibitedItemsModal: React.FC<ProhibitedItemsModalProps> = ({ onAccept, onCancel }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100">
        <div className="p-10 bg-slate-900 text-white text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-xl">
            <AlertTriangle size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4">Safety Policy Firewall</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
            ShareStuff operates under strict international aviation and customs laws. 
            Falsifying shipment content is a federal offense.
          </p>
        </div>

        <div className="p-10">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Prohibited Items (Do Not Send)</h3>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {[
              "Illegal Substances/Drugs",
              "Weapons or Munitions",
              "Lithium Batteries (Loose)",
              "Unsealed Liquids",
              "Cash/Currency Over $10k",
              "Counterfeit Goods"
            ].map(item => (
              <div key={item} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <XCircle size={16} className="text-rose-500 shrink-0" />
                <span className="text-xs font-bold text-slate-700">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl mb-10 flex gap-4">
            <ShieldCheck size={24} className="text-emerald-600 shrink-0" />
            <div>
              <h4 className="text-sm font-black text-emerald-900 mb-1">Traveler's Right of Inspection</h4>
              <p className="text-xs text-emerald-700 leading-relaxed">
                By clicking accept, you grant the Traveler the absolute right to physically inspect 
                the item at the time of handover. If the item does not match the description, 
                the Traveler will veto the shipment immediately.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={onCancel}
              className="flex-1 py-5 text-slate-400 font-bold hover:text-slate-900 transition-all"
            >
              Cancel Shipment
            </button>
            <button 
              onClick={onAccept}
              className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all"
            >
              I Agree & Sign Digital Waiver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProhibitedItemsModal;
