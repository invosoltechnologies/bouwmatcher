'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContactLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadName: string;
  email: string;
  phone: string | null;
}

export default function ContactLeadModal({
  isOpen,
  onClose,
  leadName,
  email,
  phone,
}: ContactLeadModalProps) {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} gekopieerd naar klembord`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Lead: {leadName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Email */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{email}</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(email, 'Email')}
              className="p-2 hover:bg-slate-200 rounded-md transition-colors"
              title="Kopieer email"
            >
              <Copy className="h-4 w-4 text-slate-600" />
            </button>
          </div>

          {/* Phone */}
          {phone && (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Telefoon</p>
                  <p className="font-medium text-slate-900">{phone}</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(phone, 'Telefoonnummer')}
                className="p-2 hover:bg-slate-200 rounded-md transition-colors"
                title="Kopieer telefoonnummer"
              >
                <Copy className="h-4 w-4 text-slate-600" />
              </button>
            </div>
          )}

          {!phone && (
            <div className="text-sm text-slate-500 text-center py-2">
              Geen telefoonnummer beschikbaar
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
