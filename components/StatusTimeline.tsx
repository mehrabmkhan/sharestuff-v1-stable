
import React from 'react';
import { CheckCircle2, Package, Truck, Flag, DollarSign } from 'lucide-react';
import { OrderStatus } from '../types';

interface StatusTimelineProps {
  currentStatus: keyof typeof OrderStatus | OrderStatus;
}

const steps = [
  { id: OrderStatus.POSTED, label: 'Request Posted', icon: Package },
  { id: OrderStatus.FUNDED, label: 'Escrow Secured', icon: DollarSign },
  { id: OrderStatus.PICKED_UP, label: 'Item Inspected', icon: Truck },
  { id: OrderStatus.DELIVERED, label: 'Delivered', icon: Flag },
  { id: OrderStatus.PAID, label: 'Traveler Payout', icon: CheckCircle2 },
];

const StatusTimeline: React.FC<StatusTimelineProps> = ({ currentStatus }) => {
  const currentIndex = steps.findIndex(s => s.id === currentStatus);

  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between items-center">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-1000"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isActive = idx === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center group">
              <div className={`
                w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500
                ${isCompleted ? 'bg-emerald-500 border-white text-white shadow-lg' : 'bg-white border-slate-100 text-slate-300'}
                ${isActive ? 'scale-125 ring-8 ring-emerald-500/10' : ''}
              `}>
                <Icon size={20} />
              </div>
              <p className={`
                absolute top-16 text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-colors
                ${isCompleted ? 'text-slate-900' : 'text-slate-400'}
              `}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
