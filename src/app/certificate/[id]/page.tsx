'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, ArrowLeft, Loader2, RefreshCw, Share2 } from 'lucide-react';
import api from '@/lib/api';

interface Certificate {
  id: number;
  certificate_id: string;
  cert_type: 'standard' | 'nft';
  issued_at: string;
  course_title: string;
  course_slug: string;
  learner_name: string;
  instructor_name: string;
  pdf_url: string | null;
  qr_code_url: string | null;
  verify_url: string;
}

export default function CertificatePreviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || id === 'undefined') { setError('Invalid certificate ID.'); setLoading(false); return; }
    loadCertificate();
  }, [id]);

  const loadCertificate = async () => {
    setLoading(true);
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${BASE_URL}/api/courses/certificates/${id}/`);
      if (!res.ok) throw new Error('Certificate not found.');
      setCert(await res.json());
    } catch (err: any) {
      setError(err?.message || 'Certificate not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!cert?.pdf_url) return;
    try {
      const res = await fetch(cert.pdf_url);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `certificate-${cert.certificate_id}.pdf`;
      document.body.appendChild(a); a.click(); a.remove();
      window.URL.revokeObjectURL(url);
    } catch { window.open(cert.pdf_url, '_blank'); }
  };

  const handleShare = async () => {
    if (navigator.share && cert) {
      try { await navigator.share({ title: `Certificate - ${cert.course_title}`, text: `I've completed ${cert.course_title} on ed3hub!`, url: window.location.href }); }
      catch {}
    } else { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
  };

  const handleRegenerate = async () => {
    if (!cert) return;
    setRegenerating(true);
    try { const { data } = await api.post(`/courses/certificates/${cert.certificate_id}/regenerate/`); setCert(data); }
    catch { setError('Failed to regenerate certificate.'); }
    finally { setRegenerating(false); }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  if (error || !cert) return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || 'Certificate not found.'}</p>
        <button onClick={() => router.back()} className="text-blue-500 hover:underline">Go Back</button>
      </div>
    </div>
  );

  const issueDate = new Date(cert.issued_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 gap-4 sm:gap-6">

      {/* Action bar */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleShare} className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 size={14} /> Share
          </button>
          <button onClick={handleRegenerate} disabled={regenerating} className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
            <RefreshCw size={14} className={regenerating ? 'animate-spin' : ''} />
            {regenerating ? 'Regenerating...' : 'Regenerate'}
          </button>
          <button onClick={handleDownload} disabled={!cert.pdf_url} className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* Certificate card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden relative">

        {/* Decorative corner triangles */}
        <svg className="absolute top-0 right-0 w-32 sm:w-48 h-32 sm:h-48 pointer-events-none opacity-20" viewBox="0 0 200 200" preserveAspectRatio="none">
          <polygon points="200,0 200,200 0,0" fill="#BFDBFE" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-32 sm:w-48 h-32 sm:h-48 pointer-events-none opacity-20" viewBox="0 0 200 200" preserveAspectRatio="none">
          <polygon points="0,200 0,0 200,200" fill="#BFDBFE" />
        </svg>

        {/* Borders */}
        <div className="absolute inset-0 border-4 sm:border-8 border-blue-300 rounded-xl pointer-events-none z-10" />
        <div className="absolute inset-2 sm:inset-4 border border-blue-900 rounded-lg pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center px-6 sm:px-12 md:px-20 py-8 sm:py-12 gap-4 sm:gap-5">

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-600 text-white rounded-lg font-bold text-lg sm:text-2xl w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">e</div>
            <span className="text-2xl sm:text-4xl font-bold text-gray-900">ed3hub</span>
          </div>

          {/* Certificate of completion */}
          <div className="text-center w-full max-w-sm sm:max-w-lg">
            <div className="border-t-2 border-gray-400 mb-2 sm:mb-3" />
            <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-800 tracking-widest">CERTIFICATE OF COMPLETION</h1>
            <div className="border-b-2 border-gray-400 mt-2 sm:mt-3" />
          </div>

          <p className="text-gray-600 text-sm sm:text-base">This is to certify that</p>

          {/* Learner name */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-900 text-center leading-tight break-words w-full text-center">
            {(cert.learner_name || '').toUpperCase()}
          </h2>

          <p className="text-gray-600 text-sm sm:text-base text-center">has successfully completed the course</p>
          <div className="border-b-2 border-gray-400 w-48 sm:w-72" />

          {/* Course title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 text-center break-words w-full">
            {(cert.course_title || '').toUpperCase()}
          </h3>

          <p className="text-gray-500 text-xs sm:text-sm text-center max-w-md">
            on ed3hub, demonstrating proficiency and understanding of the subject matter.
          </p>

          {/* Footer */}
          <div className="w-full border-t-2 border-gray-400 pt-4 sm:pt-6 mt-2">

            {/* Mobile: stacked, Desktop: row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-4">

              {/* Date */}
              <div className="text-center flex-1">
                <p className="text-gray-500 text-xs mb-1">Date</p>
                <p className="text-gray-900 font-semibold text-sm sm:text-base">{issueDate}</p>
                <svg width="50" height="20" viewBox="0 0 60 24" className="mx-auto text-gray-500 my-2">
                  <path d="M8 16 Q14 8,20 12 T40 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <div className="border-t border-gray-400 w-16 mx-auto" />
                <p className="text-gray-400 text-xs mt-1">Issued On</p>
              </div>

              {/* Certificate ID */}
              <div className="text-center flex-1">
                <p className="text-gray-500 text-xs mb-1">Certificate ID</p>
                <p className="text-gray-900 font-semibold text-xs sm:text-sm font-mono">{cert.certificate_id}</p>
                <div className="h-5 my-2" />
                <div className="border-t border-gray-400 w-16 mx-auto" />
                <p className="text-gray-400 text-xs mt-1">Verified</p>
              </div>

              {/* Instructor */}
              <div className="text-center flex-1">
                <p className="text-gray-500 text-xs mb-1">Instructor</p>
                <p className="text-gray-900 font-semibold text-sm sm:text-base">{cert.instructor_name}</p>
                <svg width="50" height="20" viewBox="0 0 60 24" className="mx-auto text-gray-500 my-2">
                  <path d="M8 16 Q14 8,20 12 T40 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <div className="border-t border-gray-400 w-16 mx-auto" />
                <p className="text-gray-400 text-xs mt-1">ed3hub</p>
              </div>

              {/* QR code */}
              <div className="flex flex-col items-center flex-shrink-0">
                {cert.qr_code_url ? (
                  <img src={cert.qr_code_url} alt="QR Code" className="w-16 h-16 sm:w-20 sm:h-20 rounded border-2 border-gray-300 bg-white" />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-xs font-semibold">QR</span>
                  </div>
                )}
                <p className="text-gray-400 text-xs mt-1">Scan to Verify</p>
              </div>
            </div>
          </div>

          {/* Verify URL */}
          <p className="text-[9px] sm:text-[10px] text-gray-400 font-mono text-center break-all pb-2">
            Verify: {cert.verify_url}
          </p>

        </div>
      </div>
    </div>
  );
}
