'use client';
import React, { useState, useEffect } from 'react';
import { Award, Download, Share2, Loader2, CheckCircle } from 'lucide-react';
import api from '@/lib/api';

interface Certificate {
  id: number;
  cert_type: 'standard' | 'nft';
  issued_at: string;
  course_title: string;
  course_slug: string;
  learner_name: string;
  pdf_url: string | null;
  nft_tx_hash: string;
}

interface CertificateViewProps {
  enrollmentId?: number;
  certificateId?: number;
}

const CertificateView: React.FC<CertificateViewProps> = ({ enrollmentId, certificateId }) => {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (certificateId) {
      loadCertificate();
    } else if (enrollmentId) {
      generateCertificate();
    }
  }, [certificateId, enrollmentId]);

  const loadCertificate = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/courses/certificates/${certificateId}/`);
      setCertificate(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to load certificate');
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async () => {
    setGenerating(true);
    setLoading(true);
    try {
      const response = await api.post(`/courses/my/certificate/${enrollmentId}/`, {
        cert_type: 'standard'
      });
      setCertificate(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Failed to generate certificate');
    } finally {
      setGenerating(false);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (certificate?.pdf_url) {
      window.open(certificate.pdf_url, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share && certificate) {
      try {
        await navigator.share({
          title: `Certificate - ${certificate.course_title}`,
          text: `I've completed ${certificate.course_title} on ED3HUB!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#00AEEF] mx-auto mb-4" />
          <p className="text-gray-600">
            {generating ? 'Generating your certificate...' : 'Loading certificate...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center max-w-md p-8">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Award className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h1>
          <p className="text-lg text-gray-600 mb-4">
            You've successfully completed <span className="font-semibold text-[#00AEEF]">{certificate.course_title}</span>
          </p>
          <p className="text-sm text-gray-500">
            Issued on {new Date(certificate.issued_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Certificate Preview */}
        <div className="bg-white rounded-2xl shadow-2xl p-12 mb-8 border-8 border-[#00AEEF]">
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <Award className="w-24 h-24 text-[#00AEEF]" />
            </div>
            
            <h2 className="text-5xl font-bold text-[#00AEEF]">CERTIFICATE</h2>
            <p className="text-2xl text-gray-600">OF COMPLETION</p>
            
            <div className="border-t-2 border-[#00AEEF] w-64 mx-auto my-6"></div>
            
            <p className="text-lg text-gray-500">This is to certify that</p>
            
            <h3 className="text-4xl font-bold text-gray-800 border-b-2 border-[#00AEEF] inline-block pb-2 px-8">
              {certificate.learner_name}
            </h3>
            
            <p className="text-lg text-gray-500 pt-4">has successfully completed the course</p>
            
            <h4 className="text-3xl font-bold text-[#00AEEF] px-8">
              {certificate.course_title}
            </h4>
            
            <div className="pt-8">
              <p className="text-sm text-gray-600">
                Issued on {new Date(certificate.issued_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="pt-8">
              <p className="text-xs text-gray-400">ED3HUB - Web3 Learning Platform</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            disabled={!certificate.pdf_url}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#00AEEF] text-white rounded-lg font-semibold hover:bg-[#0096ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={20} />
            Download PDF
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#00AEEF] text-[#00AEEF] rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <Share2 size={20} />
            Share Certificate
          </button>
        </div>

        {/* Certificate Info */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Certificate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Certificate ID</p>
              <p className="font-semibold text-gray-800">#{certificate.id}</p>
            </div>
            <div>
              <p className="text-gray-500">Type</p>
              <p className="font-semibold text-gray-800 capitalize">{certificate.cert_type}</p>
            </div>
            <div>
              <p className="text-gray-500">Recipient</p>
              <p className="font-semibold text-gray-800">{certificate.learner_name}</p>
            </div>
            <div>
              <p className="text-gray-500">Course</p>
              <p className="font-semibold text-gray-800">{certificate.course_title}</p>
            </div>
          </div>
          
          {certificate.nft_tx_hash && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-gray-500 text-sm">NFT Transaction Hash</p>
              <p className="font-mono text-xs text-gray-800 break-all">{certificate.nft_tx_hash}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateView;
