import React, { useState } from 'react';
import { BankAccount } from '../types';
import { Gift, X, Copy, Check, QrCode, Heart, Sparkles } from 'lucide-react';

interface GiftRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: BankAccount[];
}

export const GiftRegistryModal: React.FC<GiftRegistryModalProps> = ({
  isOpen,
  onClose,
  accounts
}) => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (accNum: string) => {
    navigator.clipboard.writeText(accNum.replace(/\s+/g, ''));
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#fcfaf7] border border-[#e8ded3] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#f4ece3] hover:bg-[#ebdccf] text-[#6b5849] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center max-w-sm mx-auto mb-6">
          <div className="w-12 h-12 rounded-full bg-[#93714b]/15 text-[#93714b] flex items-center justify-center mx-auto mb-3">
            <Gift className="w-6 h-6" />
          </div>
          <p className="font-script text-2xl text-[#b88e4f]">Wedding Blessing</p>
          <h3 className="font-display text-2xl font-bold text-[#2c241e]">Gift Registry & Envelope</h3>
          <p className="text-xs text-[#786a5e] mt-1.5 leading-relaxed">
            Your presence and prayers at our wedding are the greatest gift of all. For friends and family who have asked how they may honor us with a monetary blessing:
          </p>
        </div>

        {/* Bank Account Cards */}
        <div className="space-y-4">
          {accounts.map((acc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8ded3] shadow-xs hover:border-[#b88e4f]/50 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#faf3ea] text-[#93714b] border border-[#ebd8c5]">
                  {acc.recipientRole === 'Groom' ? "Groom's Account (Mohyeldin)" : "Bride's Account (Hend)"}
                </span>
                <span className="text-xs text-[#8c7b6d]">{acc.bankName}</span>
              </div>

              <div className="space-y-1 mt-3 text-xs sm:text-sm text-[#46382d]">
                <p>
                  <span className="text-[#8c7b6d] text-xs">Account Name:</span>{' '}
                  <strong className="text-[#2c241e] font-semibold">{acc.ownerName}</strong>
                </p>
                <div className="flex items-center justify-between bg-[#fbf8f4] p-2.5 rounded-xl border border-[#efe5d9] mt-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#93714b] font-bold block">
                      Account Number (IBAN / Local)
                    </span>
                    <span className="font-mono font-semibold text-xs sm:text-sm text-[#2c241e]">
                      {acc.accountNumber}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(acc.accountNumber)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#93714b] hover:bg-[#7d5f3d] text-white text-xs font-medium transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    {copiedAccount === acc.accountNumber ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-[#8c7b6d] italic">
            "May your love and blessings multiply and return to you tenfold."
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-[#f4ece3] hover:bg-[#ebdccf] text-[#594738] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
