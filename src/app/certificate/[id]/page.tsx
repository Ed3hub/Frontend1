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
    if (!id || id === 'undefined') {
      setError('Invalid certificate ID.');
      setLoading(false);
      return;
    }
    loadCertificate();
  }, [id]);

  const loadCertificate = async () => {
    setLoading(true);
    try {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${BASE_URL}/api/courses/certificates/${id}/`);
      if (!res.ok) throw new Error('Certificate not found.');
      const data = await res.json();
      setCert(data);
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
      a.href = url;
      a.download = `certificate-${cert.certificate_id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(cert.pdf_url, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share && cert) {
      try {
        await navigator.share({
          title: `Certificate - ${cert.course_title}`,
          text: `I've completed ${cert.course_title} on ed3hub!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleRegenerate = async () => {
    if (!cert) return;
    setRegenerating(true);
    try {
      const { data } = await api.post(`/courses/certificates/${cert.certificate_id}/regenerate/`);
      setCert(data);
    } catch {
      setError('Failed to regenerate certificate.');
    } finally {
      setRegenerating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
    </div>
  );

  if (error || !cert) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error || 'Certificate not found.'}</p>
        <button onClick={() => router.back()} className="text-blue-500 hover:underline">Go Back</button>
      </div>
    </div>
  );

  const issueDate = new Date(cert.issued_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const certId = cert.certificate_id;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6 gap-6 overflow-auto">

      {/* Action bar */}
      <div className="w-full max-w-5xl flex items-center justify-between">
        <button onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex gap-3">
          <button onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 size={14} /> Share
          </button>
          <button onClick={handleRegenerate} disabled={regenerating}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
            <RefreshCw size={14} className={regenerating ? 'animate-spin' : ''} />
            {regenerating ? 'Regenerating...' : 'Regenerate'}
          </button>
          <button onClick={handleDownload} disabled={!cert.pdf_url}
            className="flex items-center gap-2 px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* Certificate preview wrapper */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: '4/3', minHeight: '600px' }}>

          {/* Corner triangles */}
          <svg className="absolute top-0 right-0 w-56 h-56 pointer-events-none opacity-25" viewBox="0 0 200 200" preserveAspectRatio="none">
            <polygon points="200,0 200,200 0,0" fill="#BFDBFE" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none opacity-25" viewBox="0 0 200 200" preserveAspectRatio="none">
            <polygon points="0,200 0,0 200,200" fill="#BFDBFE" />
          </svg>
          <svg className="absolute top-12 right-12 w-32 h-32 pointer-events-none opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,10 90,85 10,85" fill="#93C5FD" />
          </svg>
          <svg className="absolute bottom-12 left-12 w-32 h-32 pointer-events-none opacity-35" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="50,90 10,15 90,15" fill="#93C5FD" />
          </svg>

          {/* Borders */}
          <div className="absolute inset-0 border-8 border-blue-300 rounded-lg" />
          <div className="absolute inset-4 border-2 border-blue-900" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-16">

            {/* Logo */}
            <div className="mb-10 flex items-center gap-3">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-2xl h-12 w-12 flex items-center justify-center">e</div>
              <span className="text-4xl font-bold text-gray-900">ed3hub</span>
            </div>

            {/* Title */}
            <div className="text-center mb-6 w-full max-w-md">
              <div className="border-t-2 border-gray-400 mb-3" />
              <h1 className="text-2xl font-bold text-gray-800 tracking-widest">CERTIFICATE OF COMPLETION</h1>
              <div className="border-b-2 border-gray-400 mt-3" />
            </div>

            <p className="text-gray-700 mb-2 text-lg">This is to certify that</p>

            <h2 className="text-5xl font-bold text-blue-900 mb-2 text-center">{(cert.learner_name || '').toUpperCase()}</h2>

            <p className="text-gray-700 mb-1">has successfully completed the course</p>
            <div className="border-b-2 border-gray-400 w-80 mb-4" />

            <h3 className="text-2xl font-bold text-blue-600 mb-3 text-center">{(cert.course_title || '').toUpperCase()}</h3>

            <p className="text-gray-700 text-center text-sm max-w-2xl mb-8">
              on ed3hub, demonstrating proficiency and understanding of the subject matter.
            </p>

            {/* Footer */}
            <div className="w-full px-8 border-t-2 border-gray-400 pt-6 flex justify-between items-end gap-4">
              {/* Date */}
              <div className="text-center flex-1">
                <p className="text-gray-700 text-sm mb-2">Date</p>
                <p className="text-gray-900 font-semibold mb-3">{issueDate}</p>
                <svg width="60" height="24" viewBox="0 0 60 24" className="mx-auto text-gray-600 mb-1">
                  <path d="M8 16 Q14 8,20 12 T40 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <div className="border-t border-gray-400 w-20 mx-auto" />
                <p className="text-gray-500 text-xs mt-1">Issued On</p>
              </div>

              {/* Certificate ID */}
              <div className="text-center flex-1">
                <p className="text-gray-700 text-sm mb-2">Certificate ID</p>
                <p className="text-gray-900 font-semibold mb-3">{certId}</p>
                <div className="h-6" /> {/* Placeholder to match signature height */}
                <div className="border-t border-gray-400 w-20 mx-auto" />
                <p className="text-gray-500 text-xs mt-1">Verified</p>
              </div>

              {/* Instructor */}
              <div className="text-center flex-1">
                <p className="text-gray-700 text-sm mb-2">Instructor</p>
                <p className="text-gray-900 font-semibold mb-3">{cert.instructor_name}</p>
                <svg width="60" height="24" viewBox="0 0 60 24" className="mx-auto text-gray-600 mb-1">
                  <path d="M8 16 Q14 8,20 12 T40 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <div className="border-t border-gray-400 w-20 mx-auto" />
                <p className="text-gray-500 text-xs mt-1">ed3hub</p>
              </div>

              {/* QR code */}
              <div className="text-center flex flex-col items-center">
                {cert.qr_code_url ? (
                  <img 
                    src={cert.qr_code_url} 
                    alt="Certificate QR Code" 
                    className="w-20 h-20 rounded border-2 border-gray-300 mb-1 bg-white"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded border-2 border-gray-300 flex items-center justify-center mb-1">
                    <span className="text-gray-400 text-xs font-semibold">QR</span>
                  </div>
                )}
                <p className="text-gray-500 text-xs">Scan to Verify</p>
              </div>
            </div>

            {/* Verify link */}
            <p className="text-[10px] text-gray-400 mt-4 font-mono">
              Verify: {cert.verify_url}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
