import React, { useEffect, useState } from 'react';
import { 
  Cpu, Memory, HardDrive, Monitor, AlertTriangle, 
  CheckCircle, XCircle, Battery, BatteryFull, BatteryWarning 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Add Battery interface
interface BatteryStatus {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}

interface SystemSpecs {
  cpu: {
    cores: number;
    model: string;
  };
  memory: {
    total: number; // in GB
  };
  gpu: {
    model: string;
    memory?: number; // in GB
  };
  storage: {
    free: number; // in GB
  };
  battery?: BatteryStatus;
}

export function SystemRequirementsChecker() {
  const [specs, setSpecs] = useState<SystemSpecs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [batteryStatus, setBatteryStatus] = useState<BatteryStatus | null>(null);

  useEffect(() => {
    async function checkSystemSpecs() {
      try {
        // Check if browser supports required APIs
        if (!navigator.hardwareConcurrency) {
          throw new Error('Your browser does not support system requirements checking');
        }

        // Get CPU info
        const cpuCores = navigator.hardwareConcurrency;

        // Get memory info
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
            model: gpuInfo.model,
            memory: undefined // Browser API limitation
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
    }

    checkSystemSpecs();
  }, []);

  useEffect(() => {
    async function getBatteryStatus() {
      try {
        // Check if the Battery API is available
        if ('getBattery' in navigator) {
          const battery: any = await (navigator as any).getBattery();
          
          const updateBatteryStatus = () => {
            setBatteryStatus({
              charging: battery.charging,
              level: battery.level * 100,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime
            });
          };

          // Initial status
          updateBatteryStatus();

          // Add event listeners for battery status changes
          battery.addEventListener('levelchange', updateBatteryStatus);
          battery.addEventListener('chargingchange', updateBatteryStatus);
          battery.addEventListener('chargingtimechange', updateBatteryStatus);
          battery.addEventListener('dischargingtimechange', updateBatteryStatus);

          // Cleanup
          return () => {
            battery.removeEventListener('levelchange', updateBatteryStatus);
            battery.removeEventListener('chargingchange', updateBatteryStatus);
            battery.removeEventListener('chargingtimechange', updateBatteryStatus);
            battery.removeEventListener('dischargingtimechange', updateBatteryStatus);
          };
        }
      } catch (error) {
        console.warn('Battery status not available:', error);
      }
    }

    getBatteryStatus();
  }, []);

  const getRequirementStatus = (type: string) => {
    if (!specs) return { meets: false, icon: XCircle, message: 'Unable to detect' };

    switch (type) {
      case 'cpu':
        return {
          meets: specs.cpu.cores >= 4,
          icon: specs.cpu.cores >= 4 ? CheckCircle : XCircle,
          message: `${specs.cpu.cores} cores detected (4+ recommended)`
        };
      case 'memory':
        return {
          meets: specs.memory.total >= 8,
          icon: specs.memory.total >= 8 ? CheckCircle : XCircle,
          message: `${specs.memory.total}GB detected (8GB+ recommended)`
        };
      case 'gpu':
        return {
          meets: specs.gpu.model !== 'Unknown',
          icon: specs.gpu.model !== 'Unknown' ? CheckCircle : XCircle,
          message: specs.gpu.model
        };
      default:
        return { meets: false, icon: XCircle, message: 'Unknown' };
    }
  };

  // Battery status renderer
  const renderBatteryStatus = () => {
    if (!batteryStatus) return null;

    const getBatteryIcon = () => {
      if (batteryStatus.level <= 20) {
        return <BatteryWarning className="w-5 h-5 text-red-400" />;
      }
      if (batteryStatus.level >= 90) {
        return <BatteryFull className="w-5 h-5 text-green-400" />;
      }
      return <Battery className="w-5 h-5 text-yellow-400" />;
    };

    const getBatteryColor = () => {
      if (batteryStatus.level <= 20) return 'text-red-400';
      if (batteryStatus.level >= 90) return 'text-green-400';
      return 'text-yellow-400';
    };

    const formatTime = (seconds: number): string => {
      if (!isFinite(seconds)) return 'Unknown';
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.02,
          transition: { type: "spring", stiffness: 400 }
        }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity" />
        
        <div className="relative flex items-center gap-4 p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            {getBatteryIcon()}
          </motion.div>

          <div className="flex-1">
            <motion.p 
              className="text-sm text-[#8b949e]"
              whileHover={{ color: "#fff" }}
            >
              Battery Status
            </motion.p>
            <p className="text-white flex items-center gap-2">
              <motion.span 
                className={`${getBatteryColor()} font-semibold`}
                whileHover={{ scale: 1.1 }}
              >
                {Math.round(batteryStatus.level)}%
              </motion.span>
              {batteryStatus.charging && (
                <motion.span 
                  className="text-green-400 text-sm"
                  animate={{ 
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5 
                  }}
                >
                  (Charging)
                </motion.span>
              )}
            </p>
            <p className="text-sm text-[#8b949e]">
              {batteryStatus.charging
                ? `Full in: ${formatTime(batteryStatus.chargingTime)}`
                : `Remaining: ${formatTime(batteryStatus.dischargingTime)}`}
            </p>
          </div>

          <motion.div 
            className="ml-auto"
            whileHover={{ scale: 1.1 }}
          >
            <div className="relative w-12 h-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-lg opacity-50" />
              <motion.div 
                className="relative border-2 rounded-md h-full"
                style={{
                  borderColor: getBatteryColor().replace('text-', '')
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${batteryStatus.level}%`,
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute left-0 top-0 bottom-0"
                  style={{
                    backgroundColor: getBatteryColor().replace('text-', ''),
                    opacity: 0.5
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-20 bg-[#1c2128] rounded-lg" />
        <div className="h-20 bg-[#1c2128] rounded-lg" />
        <div className="h-20 bg-[#1c2128] rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-900 rounded-lg">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-400 hover:text-red-300"
        >
          Retry Check
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#161b22] border border-[#30363d] rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Monitor className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Your System Specifications</h2>
      </div>

      <div className="grid gap-4">
        {batteryStatus && renderBatteryStatus()}
        
        {Object.entries(getRequirementStatus('cpu')).length > 0 && (
          <div className="flex items-center gap-4 p-4 bg-[#1c2128] rounded-lg">
            <Cpu className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-sm text-[#8b949e]">CPU</p>
              <p className="text-white">{specs?.cpu.model}</p>
              <p className="text-sm text-[#8b949e]">{getRequirementStatus('cpu').message}</p>
            </div>
            <div className="ml-auto">
              {React.createElement(getRequirementStatus('cpu').icon, {
                className: `w-5 h-5 ${getRequirementStatus('cpu').meets ? 'text-green-400' : 'text-yellow-400'}`
              })}
            </div>
          </div>
        )}

        {/* Similar blocks for Memory and GPU */}
        {/* ... */}

        <div className="mt-4 p-4 bg-[#1c2128] rounded-lg border border-[#30363d]/50">
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <AlertTriangle className="w-4 h-4" />
            <p>
              Note: Browser-based system detection is limited. For accurate requirements checking,
              download our system checker tool or check your system specifications manually.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
