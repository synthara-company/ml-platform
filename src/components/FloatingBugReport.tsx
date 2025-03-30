import React, { useState, useEffect } from 'react';
import { Bug, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { BugReport } from './BugReport';

export function FloatingBugReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<{ name: string; age: number } | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <>
      {/* Bug Report Button - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <Bug className="w-6 h-6" />
        </motion.button>
      </div>

      <BugReport 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
