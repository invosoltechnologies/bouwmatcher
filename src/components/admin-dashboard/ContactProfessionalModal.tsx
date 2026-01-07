'use client';

import { Copy, Mail, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ContactProfessionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  professionalName: string;
  email: string;
  phone: string | null;
}

export function ContactProfessionalModal({
  isOpen,
  onClose,
  professionalName,
  email,
  phone,
}: ContactProfessionalModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/95 border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-slate-900">
            Wilt u in contact komen met gebruiker {professionalName}?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {/* Email */}
          <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(email, 'email')}
              className={cn(
                "flex-shrink-0 h-9 w-9 p-0",
                copiedEmail && "text-green-600"
              )}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          {/* Phone */}
          {phone && (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{phone}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(phone, 'phone')}
                className={cn(
                  "flex-shrink-0 h-9 w-9 p-0",
                  copiedPhone && "text-green-600"
                )}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
