'use client';
import { useEffect } from 'react';

export default function GoogleTranslateInit() {
  useEffect(() => {
    const div = document.createElement('div');
    div.id = 'google_translate_element';
    div.style.display = 'none';
    document.body.appendChild(div);

    (window as any).googleTranslateElementInit = () => {
      const el = new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
      // Expose restore function globally so LanguagePage can call it
      (window as any).ed3hubRestoreEnglish = () => {
        const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
        if (select) {
          select.value = 'en';
          select.dispatchEvent(new Event('change'));
        }
      };
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(div)) document.body.removeChild(div);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return null;
}
