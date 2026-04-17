'use client';
import React, { useState, useEffect } from 'react';
import { Award, Download, Eye, Loader2, Calendar } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Certificate {
  id: number;
  certificate_id: string;
  cert_type: 'standard' | 'nft';
  issued_at: string;
  course_title: string;
  course_slug: string;
  learner_name: string;
  pdf_url: string | null;
  qr_code_url: string | null;
  verify_url: string;
  nft_tx_hash: string;
}

const MyCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const response = await api.get('/courses/my/certificates/');
      setCertificates(response.data);
    } catch (err) {
      console.error('Failed to load certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (certificateId: string) => {
    console.log('handleView called with id:', certificateId);
    if (certificateId) {
      console.log('Navigating to:', `/certificate/${certificateId}`);
      router.push(`/certificate/${certificateId}`);
    } else {
      console.error('Certificate ID is missing');
      alert('Certificate ID is missing. Please contact support.');
    }
  };

  const handleDownload = async (pdfUrl: string) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'certificate.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(pdfUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-[#00AEEF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Certificates</h1>
          <p className="text-gray-600">View and download your earned certificates</p>
        </div>

        {certificates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Certificates Yet</h2>
            <p className="text-gray-500">Complete courses to earn certificates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border-t-4 border-[#00AEEF]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-blue-100 rounded-full p-4">
                      <Award className="w-12 h-12 text-[#00AEEF]" />
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-gray-800 mb-2 text-center line-clamp-2">
                    {cert.course_title}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar size={14} />
                    <span>
                      {new Date(cert.issued_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-[#00AEEF] rounded-full text-xs font-semibold capitalize">
                      {cert.cert_type}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      href={cert.certificate_id ? `/certificate/${cert.certificate_id}` : '#'}
                      onClick={(e) => {
                        if (!cert.certificate_id) {
                          e.preventDefault();
                          alert('Certificate ID is missing. Please contact support.');
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00AEEF] text-white rounded-lg font-semibold hover:bg-[#0096ce] transition-colors text-sm"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                    
                    {cert.pdf_url && (
                      <button
                        onClick={() => handleDownload(cert.pdf_url!)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-[#00AEEF] text-[#00AEEF] rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                      >
                        <Download size={16} />
                        PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCertificates;
