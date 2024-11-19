import React from 'react';
import { useLanguage } from '@/Contexts/LanguageContext';
import { Button } from '@/Components/ui/button';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();
    
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
        >
            <Globe className="h-4 w-4" />
            <span className="text-white">{language === 'en' ? 'ID' : 'EN'}</span>
        </Button>
    );
}