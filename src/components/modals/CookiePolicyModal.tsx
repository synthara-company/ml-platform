import React from 'react';
import { X } from 'lucide-react';

interface CookiePolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookiePolicyModal: React.FC<CookiePolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-2xl bg-surface rounded-2xl border border-border shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-text-primary">Cookie Policy</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <section>
            <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
            <p className="text-text-secondary">
              These cookies are necessary for the website to function and cannot be switched off.
              They are usually only set in response to actions made by you which amount to a request
              for services, such as setting your privacy preferences, logging in or filling in forms.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
            <p className="text-text-secondary">
              These cookies allow us to count visits and traffic sources so we can measure and improve
              the performance of our site. They help us to know which pages are the most and least
              popular and see how visitors move around the site.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold mb-2">Preference Cookies</h3>
            <p className="text-text-secondary">
              These cookies enable the website to provide enhanced functionality and personalisation.
              They may be set by us or by third party providers whose services we have added to our pages.
            </p>
          </section>
        </div>
        
        <div className="flex justify-end p-6 border-t border-border">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
