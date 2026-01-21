import { useState } from 'react';
import { IntentManagement } from './components/IntentManagement';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

export default function App() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-auto">
          <IntentManagement />
        </div>
      </div>
    </div>
  );
}
