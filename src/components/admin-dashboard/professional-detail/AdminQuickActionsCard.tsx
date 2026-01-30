'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, UserRoundX, Mail } from 'lucide-react';

interface AdminQuickActionsCardProps {
  status: 'verified' | 'pending' | 'in_review' | 'unverified' | 'rejected' | 'suspended';
  onVerify?: () => void;
  onUnverify?: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  onContact?: () => void;
  isLoading?: boolean;
}

export default function AdminQuickActionsCard({
  status,
  onVerify,
  onUnverify,
  onBlock,
  onUnblock,
  onContact,
  isLoading = false,
}: AdminQuickActionsCardProps) {
  return (
    <Card className="px-5 gap-4">
      <CardHeader className="p-0 gap-0">
        <CardTitle className="text-xl leading-normal">Admin Acties</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-3">
          {/* Contact Action */}
          {onContact && (
            <Button
              variant="outline"
              onClick={onContact}
              disabled={isLoading}
              className="w-full justify-start gap-3 border-primary text-primary hover:bg-primary"
            >
              <Mail className="w-4 h-4" />
              Contact Opnemen
            </Button>
          )}

          {/* Verify Action */}
          {status === 'unverified' && onVerify && (
            <Button
              onClick={onVerify}
              disabled={isLoading}
              className="w-full justify-start gap-3 bg-green-600 hover:bg-green"
            >
              <CheckCircle2 className="w-4 h-4" />
              Verifiëren
            </Button>
          )}

          {/* Unverify Action */}
          {status === 'verified' && onUnverify && (
            <Button
              variant="outline"
              onClick={onUnverify}
              disabled={isLoading}
              className="w-full justify-start gap-3 border-amber-600 text-amber-600 hover:bg-amber-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              Niet Verifiëren
            </Button>
          )}

          {/* Block Action */}
          {status !== 'suspended' && onBlock && (
            <Button
              variant="outline"
              onClick={onBlock}
              disabled={isLoading}
              className="w-full justify-start gap-3 border-red-600 text-red-600 hover:bg-red-400"
            >
              <UserRoundX className="w-4 h-4" />
              Blokkeren
            </Button>
          )}

          {/* Unblock Action */}
          {status === 'suspended' && onUnblock && (
            <Button
              onClick={onUnblock}
              disabled={isLoading}
              className="w-full justify-start gap-3 bg-blue-600 hover:bg-blue-500"
            >
              <CheckCircle2 className="w-4 h-4" />
              Deblokkeren
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
