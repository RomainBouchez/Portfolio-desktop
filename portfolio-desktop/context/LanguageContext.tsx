'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr');

    useEffect(() => {
        try {
            const savedLang = localStorage.getItem('language') as Language;
            if (savedLang) {
                setLanguage(savedLang);
            } else {
                const browserLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
                setLanguage(browserLang);
            }
        } catch (error) {
            console.warn('localStorage is not available:', error);
            setLanguage(navigator.language.startsWith('fr') ? 'fr' : 'en');
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        try {
            localStorage.setItem('language', lang);
        } catch (error) {
            console.warn('localStorage is not available:', error);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
