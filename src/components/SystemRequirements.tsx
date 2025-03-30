import React from 'react';
import { Cpu, Memory, HardDrive, Monitor } from 'lucide-react';

export function SystemRequirements() {
  return (
    <div id="system-requirements" className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">System Requirements</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recommended Specs */}
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-4">Recommended</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-white">
              <Cpu className="w-5 h-5" /> Apple Silicon (M1/M2/M3)
            </li>
            <li className="flex items-center gap-2 text-white">
              <Memory className="w-5 h-5" /> 16GB-32GB RAM
            </li>
            <li className="flex items-center gap-2 text-white">
              <Monitor className="w-5 h-5" /> 6GB+ VRAM GPU
            </li>
            <li className="flex items-center gap-2 text-white">
              <HardDrive className="w-5 h-5" /> 50GB+ Storage
            </li>
          </ul>
        </div>

        {/* Minimum Specs */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Minimum</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-white">
              <Cpu className="w-5 h-5" /> Intel i7/AMD Ryzen 7
            </li>
            <li className="flex items-center gap-2 text-white">
              <Memory className="w-5 h-5" /> 8GB RAM
            </li>
            <li className="flex items-center gap-2 text-white">
              <Monitor className="w-5 h-5" /> Integrated Graphics
            </li>
            <li className="flex items-center gap-2 text-white">
              <HardDrive className="w-5 h-5" /> 20GB Storage
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
