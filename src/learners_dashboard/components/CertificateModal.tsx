'use client';
import React, { useState } from 'react';
import { Award, Hexagon, Download, X, CheckCircle2, Loader2 } from 'lucide-react';
import api from '@/lib/api';

interface CertificateModalProps {
  enrollmentId: number;
  courseTitle: string;
  onClose: () => void;
}

type CertType = 'standard' | 'nft';

interface IssuedCert {
  id: number;
  cert_type: CertType;
  pdf_url: string | null;
  nft_tx_hash: string;
  learner_name: string;
  issued_at: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ enrollmentId, courseTitle, onClose }) => {
  const [selected, setSelected] = useState<CertType | null>(null);
  const [loading, setLoading] = useState(false);
  const [issued, setIssued] = useState<IssuedCert | null>(null);
  const [error, setError] = useState('');

  const handleClaim = async () => {
    if (!selected) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post(`/courses/my/certificate/${enrollmentId}/`, { cert_type: selected });
      setIssued(data);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { detail?: string } } };
      setError(e.response?.data?.detail ?? 'Failed to issue certificate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {!issued ? (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Course Completed! 🎉</h2>
              <p className="text-sm text-gray-500 mt-1">Choose how you'd like to receive your certificate for</p>
              <p className="text-sm font-semibold text-gray-700 mt-0.5 line-clamp-1">{courseTitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* NFT Certificate */}
              <button
                onClick={() => setSelected('nft')}
                className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all text-left ${
                  selected === 'nft'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {selected === 'nft' && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                )}
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Hexagon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">NFT Certificate</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Stored on the blockchain. Verifiable, ownable, and transferable.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-purple-50 text-purple-600 rounded-full font-medium border border-purple-100">
                  Coming Soon
                </span>
              </button>

              {/* Standard Certificate */}
              <button
                onClick={() => setSelected('standard')}
                className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all text-left ${
                  selected === 'standard'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                {selected === 'standard' && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white" />
                  </span>
                )}
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Standard Certificate</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    A PDF certificate generated after completion. Download anytime.
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium border border-green-100">
                  Available Now
                </span>
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

            <button
              onClick={handleClaim}
              disabled={!selected || loading || selected === 'nft'}
              className="w-full py-3 bg-[#00A6FB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Issuing...</>
              ) : selected === 'nft' ? (
                'NFT Certificates Coming Soon'
              ) : (
                'Claim Certificate'
              )}
            </button>

            {selected === 'nft' && (
              <p className="text-xs text-center text-gray-400 mt-3">
                NFT certificate minting will be available once blockchain integration is live.
              </p>
            )}
          </>
        ) : (
          /* Success state */
          <div className="text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-9 h-9 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Certificate Issued!</h2>
            <p className="text-sm text-gray-500 mb-1">Congratulations, <span className="font-semibold text-gray-700">{issued.learner_name}</span></p>
            <p className="text-xs text-gray-400 mb-6">
              {issued.cert_type === 'standard' ? 'Standard Certificate' : 'NFT Certificate'} · {courseTitle}
            </p>

            {issued.cert_type === 'standard' && (
              issued.pdf_url ? (
                <a
                  href={issued.pdf_url}
                  download
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#00A6FB] text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-md shadow-blue-200"
                >
                  <Download className="w-4 h-4" /> Download Certificate
                </a>
              ) : (
                <div className="px-6 py-4 bg-gray-50 rounded-xl text-sm text-gray-500">
                  Your certificate is being generated. Check back shortly or visit your profile to download it.
                </div>
              )
            )}

            {issued.cert_type === 'nft' && (
              <div className="px-6 py-4 bg-purple-50 rounded-xl text-sm text-purple-600">
                Your NFT certificate will be minted once blockchain integration is live. We'll notify you when it's ready.
              </div>
            )}

            <button onClick={onClose} className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateModal;
