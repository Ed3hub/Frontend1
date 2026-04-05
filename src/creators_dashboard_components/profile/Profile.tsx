'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  bio: string;
  avatar: string | null;
  city_country: string;
  specialization: string;
  experience: string;
  whatsapp: string;
  facebook: string;
  twitter_x: string;
  linkedin: string;
  instagram: string;
}

const FIELD_CLASS = 'p-2.5 font-medium rounded-lg w-full border outline-none border-gray-200 text-gray-700 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all';
const LABEL_CLASS = 'text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 block';

export default function Profile() {
  const [form, setForm] = useState<ProfileData>({
    first_name: '', last_name: '', email: '', username: '',
    bio: '', avatar: null, city_country: '', specialization: '',
    experience: '', whatsapp: '', facebook: '', twitter_x: '',
    linkedin: '', instagram: '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.get('/auth/me/').then((res) => {
      setForm(res.data);
      setAvatarPreview(res.data.avatar ?? null);
    }).finally(() => setLoading(false));
  }, []);

  const set = (key: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus('idle');
    try {
      const fd = new FormData();
      fd.append('first_name', form.first_name);
      fd.append('last_name', form.last_name);
      fd.append('bio', form.bio);
      fd.append('city_country', form.city_country);
      fd.append('specialization', form.specialization);
      fd.append('experience', form.experience);
      fd.append('whatsapp', form.whatsapp);
      fd.append('facebook', form.facebook);
      fd.append('twitter_x', form.twitter_x);
      fd.append('linkedin', form.linkedin);
      fd.append('instagram', form.instagram);
      if (avatarFile) fd.append('avatar', avatarFile);
      await api.patch('/auth/profile/update/', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
            {avatarPreview
              ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-300">
                  {form.first_name?.[0] ?? form.username?.[0] ?? '?'}
                </div>
            }
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-white" />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{form.first_name} {form.last_name}</p>
          <p className="text-sm text-gray-400">@{form.username}</p>
          <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-blue-500 mt-1 hover:underline">
            Change photo
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>First Name</label>
            <input className={FIELD_CLASS} value={form.first_name} onChange={set('first_name')} placeholder="First name" />
          </div>
          <div>
            <label className={LABEL_CLASS}>Last Name</label>
            <input className={FIELD_CLASS} value={form.last_name} onChange={set('last_name')} placeholder="Last name" />
          </div>
        </div>
        <div>
          <label className={LABEL_CLASS}>Email Address</label>
          <input className={`${FIELD_CLASS} bg-gray-50 cursor-not-allowed`} value={form.email} readOnly />
        </div>
        <div>
          <label className={LABEL_CLASS}>City, Country</label>
          <input className={FIELD_CLASS} value={form.city_country} onChange={set('city_country')} placeholder="e.g. Lagos, Nigeria" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLASS}>Specialization</label>
            <input className={FIELD_CLASS} value={form.specialization} onChange={set('specialization')} placeholder="e.g. DeFi, NFTs, Smart Contracts" />
          </div>
          <div>
            <label className={LABEL_CLASS}>Experience</label>
            <input className={FIELD_CLASS} value={form.experience} onChange={set('experience')} placeholder="e.g. 5 years" />
          </div>
        </div>
        <div>
          <label className={LABEL_CLASS}>Bio</label>
          <textarea
            className={`${FIELD_CLASS} resize-none`}
            rows={4}
            value={form.bio}
            onChange={set('bio')}
            placeholder="Tell learners about yourself..."
          />
        </div>
      </section>

      {/* Social Links */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold text-gray-700 border-b border-gray-100 pb-2">Social Links</h2>
        {[
          { key: 'whatsapp' as const, label: 'WhatsApp', placeholder: 'https://wa.me/234...' },
          { key: 'facebook' as const, label: 'Facebook', placeholder: 'https://facebook.com/yourprofile' },
          { key: 'twitter_x' as const, label: 'Twitter / X', placeholder: 'https://x.com/yourhandle' },
          { key: 'linkedin' as const, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/yourprofile' },
          { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://instagram.com/yourhandle' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className={LABEL_CLASS}>{label}</label>
            <input className={FIELD_CLASS} value={form[key]} onChange={set(key)} placeholder={placeholder} />
          </div>
        ))}
      </section>

      {/* Status + Save */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-2.5 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {status === 'success' && (
          <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4" /> Profile updated successfully
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-1.5 text-red-500 text-sm font-medium">
            <AlertCircle className="w-4 h-4" /> Failed to save. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
