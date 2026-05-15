'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/growth/PageHeader';
import GlassPanel from '@/components/growth/GlassPanel';
import GradientButton from '@/components/growth/GradientButton';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/design/cn';

// ---------------------------------------------------------------------------
// Toggle component
// ---------------------------------------------------------------------------

interface ToggleProps {
  on: boolean;
  onChange: (val: boolean) => void;
}

function Toggle({ on, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070A]',
        on ? '' : 'bg-zinc-700'
      )}
      style={
        on
          ? { background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)' }
          : {}
      }
    >
      <span
        className={cn(
          'pointer-events-none absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200',
          on ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Profile Tab
// ---------------------------------------------------------------------------

function ProfileTab() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState('Frxncois');
  const [handle, setHandle] = useState('@frxncois');
  const [bio, setBio] = useState(
    'Independent music artist — emo rap & sad rap. Building in public.'
  );

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#A1A1AA]">Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Display name"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#A1A1AA]">Handle</label>
        <Input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="@handle"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-[#A1A1AA]">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Tell your audience about yourself..."
          className={cn(
            'flex w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[#0F1117]',
            'px-3 py-2 text-sm text-white placeholder:text-[#71717A]',
            'transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C3AED]',
            'resize-none'
          )}
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <GradientButton onClick={handleSave}>Save Changes</GradientButton>
        {saved && (
          <span className="text-sm text-emerald-400 font-medium animate-fade-in">
            Saved!
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Notifications Tab
// ---------------------------------------------------------------------------

function NotificationsTab() {
  const [notifs, setNotifs] = useState({
    reports: true,
    digest: true,
    milestones: false,
  });

  function toggle(key: keyof typeof notifs) {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const rows: { key: keyof typeof notifs; label: string; description: string }[] = [
    {
      key: 'reports',
      label: 'New report ready',
      description: 'Get notified when a new growth report is generated for you.',
    },
    {
      key: 'digest',
      label: 'Weekly digest',
      description: 'A summary of your top metrics delivered every Monday.',
    },
    {
      key: 'milestones',
      label: 'Follower milestones',
      description: 'Celebrate hitting 1K, 5K, 10K follower thresholds.',
    },
  ];

  return (
    <div className="space-y-5">
      {rows.map((row, idx) => (
        <div
          key={row.key}
          className={cn(
            'flex items-center justify-between gap-4 py-4',
            idx < rows.length - 1 && 'border-b border-[rgba(255,255,255,0.06)]'
          )}
        >
          <div className="space-y-0.5">
            <p className="text-sm font-medium text-white">{row.label}</p>
            <p className="text-sm text-[#71717A]">{row.description}</p>
          </div>
          <Toggle on={notifs[row.key]} onChange={() => toggle(row.key)} />
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data Tab
// ---------------------------------------------------------------------------

function DataTab() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-white mb-1">Export Your Data</p>
        <p className="text-sm text-[#71717A]">
          Download a full copy of your growth analytics, follower history, and platform
          stats in your preferred format.
        </p>
      </div>
      <div className="flex gap-3 pt-1">
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-[10px] border transition-colors duration-150',
            'border-[rgba(255,255,255,0.12)] text-[#A1A1AA]',
            'hover:border-[rgba(255,255,255,0.24)] hover:text-white'
          )}
        >
          Export CSV
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-[10px] border transition-colors duration-150',
            'border-[rgba(255,255,255,0.12)] text-[#A1A1AA]',
            'hover:border-[rgba(255,255,255,0.24)] hover:text-white'
          )}
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const TABS = ['Profile', 'Notifications', 'Data'] as const;
type Tab = (typeof TABS)[number];

export default function SettingsPage() {
  const [active, setActive] = useState<Tab>('Profile');

  return (
    <div className="p-6 md:p-8 space-y-6">
      <PageHeader title="Settings" description="Manage your account and preferences" />

      <GlassPanel>
        {/* Tab nav */}
        <div className="flex gap-1 p-1 rounded-xl bg-[rgba(255,255,255,0.04)] w-fit mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                'relative px-5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150',
                active === tab ? 'text-white' : 'text-[#71717A] hover:text-[#A1A1AA]'
              )}
            >
              {active === tab && (
                <span
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background:
                      'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                    zIndex: 0,
                  }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        {active === 'Profile' && <ProfileTab />}
        {active === 'Notifications' && <NotificationsTab />}
        {active === 'Data' && <DataTab />}
      </GlassPanel>
    </div>
  );
}
