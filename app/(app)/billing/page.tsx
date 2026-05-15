import PageHeader from '@/components/growth/PageHeader';
import GlassPanel from '@/components/growth/GlassPanel';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/design/cn';

export const metadata = { title: 'Billing' };

// ---------------------------------------------------------------------------
// Plan features
// ---------------------------------------------------------------------------

const PLAN_FEATURES = [
  { label: 'Reports', value: '10 / mo' },
  { label: 'AI Insights', value: '20 / mo' },
  { label: 'Multi-platform', value: 'Included' },
  { label: 'Priority support', value: 'Included' },
  { label: 'Team members', value: '1 seat' },
];

// ---------------------------------------------------------------------------
// Usage meters
// ---------------------------------------------------------------------------

const USAGE = [
  { label: 'Reports Generated', used: 3, total: 10, value: 30 },
  { label: 'AI Insights', used: 1, total: 20, value: 5 },
  { label: 'Team Members', used: 1, total: 5, value: 20 },
];

// ---------------------------------------------------------------------------
// Invoices
// ---------------------------------------------------------------------------

const INVOICES = [
  { date: '2026-05-01', amount: '$29.00', status: 'Paid' },
  { date: '2026-04-01', amount: '$29.00', status: 'Paid' },
  { date: '2026-03-01', amount: '$29.00', status: 'Paid' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BillingPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <PageHeader
        title="Billing"
        description="Manage your subscription and invoices"
      />

      {/* Current Plan */}
      <GlassPanel>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-white">Pro Plan</h3>
              <span
                className="px-2.5 py-0.5 text-xs font-semibold rounded-full text-white"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                }}
              >
                Active
              </span>
            </div>
            <p className="text-2xl font-bold text-white">
              $29
              <span className="text-sm font-normal text-[#71717A] ml-1">/ month</span>
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {PLAN_FEATURES.map((f) => (
            <div key={f.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#A1A1AA]">
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                  }}
                >
                  ✓
                </span>
                {f.label}
              </span>
              <span className="text-white font-medium">{f.value}</span>
            </div>
          ))}
        </div>

        <button
          className={cn(
            'w-full py-2 text-sm font-medium rounded-[10px] border transition-colors duration-150',
            'border-[rgba(255,255,255,0.12)] text-[#A1A1AA]',
            'hover:border-[rgba(255,255,255,0.24)] hover:text-white'
          )}
        >
          Upgrade to Enterprise
        </button>
      </GlassPanel>

      {/* Usage This Month */}
      <GlassPanel>
        <h3 className="text-sm font-semibold text-white mb-5">Usage This Month</h3>
        <div className="space-y-5">
          {USAGE.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A1A1AA]">{item.label}</span>
                <span className="text-white font-medium">
                  {item.used} of {item.total}
                </span>
              </div>
              <Progress value={item.value} />
            </div>
          ))}
        </div>
      </GlassPanel>

      {/* Invoices */}
      <GlassPanel>
        <h3 className="text-sm font-semibold text-white mb-4">Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="pb-3 text-left text-[#71717A] font-medium">Date</th>
                <th className="pb-3 text-right text-[#71717A] font-medium">Amount</th>
                <th className="pb-3 text-right text-[#71717A] font-medium">Status</th>
                <th className="pb-3 text-right text-[#71717A] font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {INVOICES.map((inv) => (
                <tr
                  key={inv.date}
                  className="hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <td className="py-3 text-[#A1A1AA]">{inv.date}</td>
                  <td className="py-3 text-right text-white font-medium">{inv.amount}</td>
                  <td className="py-3 text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      className="text-xs text-[#7C3AED] hover:text-[#EC4899] font-medium transition-colors duration-150"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassPanel>
    </div>
  );
}
