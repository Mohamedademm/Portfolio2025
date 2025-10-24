import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import './LanguageSelector.css';

// Drapeaux pour chaque langue
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇹🇳' }
];

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLang(lng);
    // Changer la direction du texte pour l'arabe
    document.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLang) || languages[0];
  };

  return (
    <Dropdown className="language-selector">
      <Dropdown.Toggle 
        variant="outline-light" 
        id="language-dropdown"
        className="language-toggle"
      >
        <span className="language-flag">{getCurrentLanguage().flag}</span>
        <span className="language-name">{getCurrentLanguage().name}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="language-menu">
        {languages.map((lang) => (
          <Dropdown.Item
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            active={currentLang === lang.code}
            className="language-item"
          >
            <span className="language-flag">{lang.flag}</span>
            <span className="language-name">{lang.name}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default LanguageSelector;
