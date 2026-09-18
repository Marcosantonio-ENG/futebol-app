'use client';
import { useState } from 'react';
import { MobileNav } from '@/components/MobileNav';
import { PortalAtleta } from '@/components/PortalAtleta';
import { AdminDashboard } from '@/components/AdminDashboard';
import { GeradorTimes } from '@/components/GeradorTimes';
import { BeiraQuadra } from '@/components/BeiraQuadra';

export default function Home() {
  const [activeTab, setActiveTab] = useState('atleta');

  return (
    <main className="min-h-screen bg-zinc-950">
      {activeTab === 'atleta' && <PortalAtleta />}
      {activeTab === 'admin' && <AdminDashboard />}
      {activeTab === 'sorteio' && <GeradorTimes />}
      {activeTab === 'beira' && <BeiraQuadra />}

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}