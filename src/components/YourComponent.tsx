import React, { useState } from 'react';
import { Modal } from './Modal';

export function YourComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Open Modal
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Modal Content</h2>
        <p>Your content here...</p>
      </Modal>
    </div>
  );
}