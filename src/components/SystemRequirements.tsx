import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Memory, Monitor, HardDrive, 
  CheckCircle, XCircle, AlertTriangle, Info 
} from 'lucide-react';

interface SystemSpecs {
  cpu: {
    cores: number;
    model: string;
  };
  memory: {
    total: number;
  };
  gpu: {
    model: string;
    memory?: number;
  };
  storage: {
    free: number;
  };
}

export function SystemRequirements({ mode = 'static' }) {
  const [specs, setSpecs] = useState<SystemSpecs | null>(null);
  const [loading, setLoading] = useState(mode === 'dynamic');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'dynamic') {
      checkSystemSpecs();
    }
  }, [mode]);

  const checkSystemSpecs = async () => {
    try {
      const cpuCores = navigator.hardwareConcurrency;
      const memory = (navigator as any).deviceMemory || 'Unknown';
      
      // Get GPU info using WebGL
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const gpuInfo = gl ? {
        model: (gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_RENDERER_WEBGL) || 'Unknown'),
        vendor: (gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info')?.UNMASKED_VENDOR_WEBGL) || 'Unknown')
      } : { model: 'Unknown', vendor: 'Unknown' };

      // Get storage info
      const storage = await navigator.storage.estimate();
      const freeSpace = storage.quota ? Math.floor(storage.quota / (1024 * 1024 * 1024)) : 'Unknown';

      setSpecs({
        cpu: {
          cores: cpuCores,
          model: 'Detection Limited in Browser'
        },
        memory: {
          total: typeof memory === 'number' ? memory : 0
        },
        gpu: {
          model: gpuInfo.model
        },
        storage: {
          free: typeof freeSpace === 'number' ? freeSpace : 0
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check system requirements');
    } finally {
      setLoading(false);
    }
  };

  const renderStaticRequirements = () => (
    <div className="grid md:grid-cols-2 gap-6">
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
    </div>
  );

  const renderDynamicCheck = () => (
    <div className="space-y-4">
      {specs && (
        <>
          <div className="flex items-center gap-4 p-4 bg-[#1c2128] rounded-lg">
            <Cpu className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-[#8b949e]">CPU</p>
              <p className="text-white">{specs.cpu.model}</p>
              <p className="text-sm text-[#8b949e]">{specs.cpu.cores} cores detected (4+ recommended)</p>
            </div>
            <div className="ml-auto">
              {React.createElement(specs.cpu.cores >= 4 ? CheckCircle : XCircle, {
                className: `w-5 h-5 ${specs.cpu.cores >= 4 ? 'text-green-400' : 'text-yellow-400'}`
              })}
            </div>
          </div>
          {/* Add similar blocks for Memory, GPU, and Storage */}
        </>
      )}
      
      <div className="mt-4 p-4 bg-[#1c2128] rounded-lg border border-[#30363d]/50 space-y-2">
        <div className="flex items-center gap-2 text-sm text-yellow-400">
          <AlertTriangle className="w-4 h-4" />
          <p>Browser-based system detection is limited. For accurate requirements checking,
             download our system checker tool or check your system specifications manually.</p>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#0d1117] rounded-xl border border-[#30363d]/50"
    >
      <h2 className="text-2xl font-bold text-white mb-6">System Requirements</h2>
      {mode === 'static' ? renderStaticRequirements() : renderDynamicCheck()}
    </motion.div>
  );
}
