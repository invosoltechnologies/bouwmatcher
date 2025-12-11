'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePurchaseLead } from '@/lib/hooks/professional/leads';
import { PurchaseLeadDialogData } from '@/types/models/payment.model';
import { Loader2 } from 'lucide-react';

interface PurchaseLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: PurchaseLeadDialogData | null;
}

export default function PurchaseLeadDialog({
  open,
  onOpenChange,
  data,
}: PurchaseLeadDialogProps) {
  const { mutate: purchaseLead, isPending } = usePurchaseLead();

  if (!data) return null;

  const formattedPrice = `€ ${data.leadPrice.toFixed(2)}`;

  const handlePurchase = () => {
    purchaseLead(data.leadId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Ontgrendel contactgegevens
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Bevestig je aankoop om toegang te krijgen tot de contactinformatie van deze lead.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Lead Information */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Opdracht:</span>
              <span className="text-sm font-medium text-foreground">
                {data.categoryName} in {data.city}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Klant:</span>
              <span className="text-sm font-medium text-foreground">
                {data.customerName}
              </span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Totaal te betalen:</span>
              <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base font-semibold rounded-2xl">
                {formattedPrice}
              </Badge>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Door op "Doorgaan naar betaling" te klikken, wordt je doorgestuurd naar een beveiligde Stripe-betaalpagina.
            </p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Na succesvolle betaling krijg je direct toegang tot de contactgegevens</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Betaal veilig met iDEAL of creditcard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>Eenmalige betaling - geen verborgen kosten</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Annuleren
          </Button>
          <Button
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handlePurchase}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bezig met laden...
              </>
            ) : (
              'Doorgaan naar betaling'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
