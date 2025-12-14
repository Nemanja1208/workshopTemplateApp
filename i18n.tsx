import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ar';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
];

export interface Translations {
  header: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    processing: string;
    finalReport: string;
  };
  welcome: {
    headline: string;
    headlineHighlight: string;
    description: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    startButton: string;
  };
  context: {
    title: string;
    description: string;
    companyName: string;
    companyPlaceholder: string;
    industry: string;
    industryPlaceholder: string;
    employeeCount: string;
    workstyle: string;
    remote: string;
    office: string;
    hybrid: string;
    techStack: string;
    techStackPlaceholder: string;
    nextButton: string;
  };
  questionnaire: {
    title: string;
    description: string;
    yes: string;
    partial: string;
    no: string;
    unknown: string;
    generateButton: string;
  };
  questions: {
    mfa_email_admin: { label: string; description: string };
    backups_data: { label: string; description: string };
    patching_cadence: { label: string; description: string };
    admin_access: { label: string; description: string };
    password_management: { label: string; description: string };
    phishing_training: { label: string; description: string };
    endpoint_protection: { label: string; description: string };
    disk_encryption: { label: string; description: string };
    incident_response: { label: string; description: string };
    logging_alerts: { label: string; description: string };
  };
  analyzing: {
    title: string;
    description: string;
  };
  report: {
    riskLabel: string;
    confidence: string;
    summaryTitle: string;
    mainDrivers: string;
    savePdf: string;
    startOver: string;
    priorityPlan: string;
    quickWins: string;
    quickWinsSubtitle: string;
    successMetrics: string;
    baseline: string;
    targetState: string;
    howToTrack: string;
    projectedRoi: string;
    timeSaved: string;
    hoursMonth: string;
    costAvoidance: string;
    prevention: string;
    detailedFindings: string;
    input: string;
    impact: string;
    recommendation: string;
    disclaimer: string;
    generatedAt: string;
    whyNow: string;
    steps: string;
    tools: string;
    cost: string;
  };
  footer: {
    text: string;
  };
  errors: {
    generateFailed: string;
    missingContext: string;
  };
}

const en: Translations = {
  header: {
    title: 'ShieldCheck',
    subtitle: 'Cybersecurity Hygiene Assessment',
    step1: 'Step 1: Context',
    step2: 'Step 2: Controls',
    processing: 'Processing...',
    finalReport: 'Final Report',
  },
  welcome: {
    headline: 'Secure Your Business in',
    headlineHighlight: 'Minutes',
    description: 'ShieldCheck is an AI-powered assessment tool designed for small businesses. Answer 10 simple questions to get a personalized risk score, prioritized fix list, and measurable ROI metrics.',
    feature1Title: 'No Tech Jargon',
    feature1Desc: 'Simple yes/no questions.',
    feature2Title: 'Instant Report',
    feature2Desc: 'Actionable JSON output.',
    feature3Title: 'Privacy First',
    feature3Desc: 'No secrets or keys required.',
    startButton: 'Start Assessment',
  },
  context: {
    title: 'Business Context',
    description: 'Help ShieldCheck tailor the report to your specific environment. We do not store this data.',
    companyName: 'Company Name',
    companyPlaceholder: 'Acme Corp',
    industry: 'Industry',
    industryPlaceholder: 'e.g. Healthcare, Retail',
    employeeCount: 'Employee Count',
    workstyle: 'Primary Workstyle',
    remote: 'Remote',
    office: 'Office',
    hybrid: 'Hybrid',
    techStack: 'Primary Tech Stack (Optional)',
    techStackPlaceholder: 'e.g. Google Workspace, Microsoft 365, AWS',
    nextButton: 'Next Step',
  },
  questionnaire: {
    title: 'Security Controls Assessment',
    description: 'Answer strictly based on your current status. "Unknown" is treated as a risk.',
    yes: 'Yes',
    partial: 'Partial',
    no: 'No',
    unknown: 'Unknown',
    generateButton: 'Generate Report',
  },
  questions: {
    mfa_email_admin: {
      label: 'Do you enforce Multi-Factor Authentication (MFA) on all email and admin accounts?',
      description: 'MFA requires a second form of verification (like a code on your phone) to log in.',
    },
    backups_data: {
      label: 'Do you have automated, offline (or immutable) backups of critical business data?',
      description: 'Backups should run automatically and be protected from ransomware deletion.',
    },
    patching_cadence: {
      label: 'Are operating systems and software updated automatically or at least monthly?',
      description: 'Prompt patching prevents attackers from exploiting known vulnerabilities.',
    },
    admin_access: {
      label: 'Is administrator access restricted to only those who absolutely need it?',
      description: 'Least privilege: Employees should only have access to what they need for their job.',
    },
    password_management: {
      label: 'Does the company use a Password Manager to generate and store unique passwords?',
      description: 'Reusing passwords across sites is a major security risk.',
    },
    phishing_training: {
      label: 'Do employees receive basic phishing awareness training?',
      description: 'Training helps staff recognize suspicious emails and links.',
    },
    endpoint_protection: {
      label: 'Is Antivirus/Endpoint Detection & Response (EDR) installed on all devices?',
      description: 'Modern protection tools block malware and suspicious behavior.',
    },
    disk_encryption: {
      label: 'Is full-disk encryption (BitLocker/FileVault) enabled on all laptops?',
      description: 'Encryption protects data if a device is lost or stolen.',
    },
    incident_response: {
      label: 'Do you have a basic plan for who to call if you get hacked?',
      description: 'Knowing who to contact (IT, Insurance, Legal) saves critical time.',
    },
    logging_alerts: {
      label: 'Are logs collected for critical systems (email, login attempts)?',
      description: 'Logs help you understand what happened during an incident.',
    },
  },
  analyzing: {
    title: 'Analyzing Security Posture',
    description: 'Our AI is evaluating your answers against the ShieldCheck scoring model to generate your personalized action plan...',
  },
  report: {
    riskLabel: 'Risk',
    confidence: 'Confidence',
    summaryTitle: 'Assessment Summary',
    mainDrivers: 'Main Drivers:',
    savePdf: 'Save PDF',
    startOver: 'Start Over',
    priorityPlan: 'Priority Action Plan',
    quickWins: 'Quick Wins',
    quickWinsSubtitle: 'Under 90 mins',
    successMetrics: 'Success Metrics',
    baseline: 'Baseline',
    targetState: 'Target State',
    howToTrack: 'How to Track',
    projectedRoi: 'Projected ROI',
    timeSaved: 'Time Saved',
    hoursMonth: 'hours/month',
    costAvoidance: 'Cost Avoidance',
    prevention: 'Prevention',
    detailedFindings: 'Detailed Findings',
    input: 'Input',
    impact: 'Impact:',
    recommendation: 'Recommendation:',
    disclaimer: 'Disclaimer',
    generatedAt: 'Generated at',
    whyNow: 'Why Now',
    steps: 'Steps',
    tools: 'Tools',
    cost: 'Cost',
  },
  footer: {
    text: 'ShieldCheck AI Assessment • v1.0 • Built with Gemini API',
  },
  errors: {
    generateFailed: 'Failed to generate report. Please verify your API key and try again.',
    missingContext: 'Missing business context',
  },
};

const es: Translations = {
  header: {
    title: 'ShieldCheck',
    subtitle: 'Evaluación de Higiene de Ciberseguridad',
    step1: 'Paso 1: Contexto',
    step2: 'Paso 2: Controles',
    processing: 'Procesando...',
    finalReport: 'Informe Final',
  },
  welcome: {
    headline: 'Asegura tu Negocio en',
    headlineHighlight: 'Minutos',
    description: 'ShieldCheck es una herramienta de evaluación impulsada por IA diseñada para pequeñas empresas. Responde 10 preguntas simples para obtener una puntuación de riesgo personalizada, lista de correcciones priorizadas y métricas de ROI medibles.',
    feature1Title: 'Sin Jerga Técnica',
    feature1Desc: 'Preguntas simples de sí/no.',
    feature2Title: 'Informe Instantáneo',
    feature2Desc: 'Resultados accionables.',
    feature3Title: 'Privacidad Primero',
    feature3Desc: 'Sin secretos ni claves requeridas.',
    startButton: 'Iniciar Evaluación',
  },
  context: {
    title: 'Contexto Empresarial',
    description: 'Ayuda a ShieldCheck a adaptar el informe a tu entorno específico. No almacenamos estos datos.',
    companyName: 'Nombre de la Empresa',
    companyPlaceholder: 'Empresa S.A.',
    industry: 'Industria',
    industryPlaceholder: 'ej. Salud, Retail',
    employeeCount: 'Número de Empleados',
    workstyle: 'Estilo de Trabajo Principal',
    remote: 'Remoto',
    office: 'Oficina',
    hybrid: 'Híbrido',
    techStack: 'Stack Tecnológico Principal (Opcional)',
    techStackPlaceholder: 'ej. Google Workspace, Microsoft 365, AWS',
    nextButton: 'Siguiente Paso',
  },
  questionnaire: {
    title: 'Evaluación de Controles de Seguridad',
    description: 'Responde estrictamente según tu estado actual. "Desconocido" se trata como un riesgo.',
    yes: 'Sí',
    partial: 'Parcial',
    no: 'No',
    unknown: 'Desconocido',
    generateButton: 'Generar Informe',
  },
  questions: {
    mfa_email_admin: {
      label: '¿Aplicas Autenticación Multifactor (MFA) en todas las cuentas de email y administración?',
      description: 'MFA requiere una segunda forma de verificación (como un código en tu teléfono) para iniciar sesión.',
    },
    backups_data: {
      label: '¿Tienes copias de seguridad automatizadas y offline (o inmutables) de datos críticos?',
      description: 'Las copias de seguridad deben ejecutarse automáticamente y estar protegidas contra eliminación por ransomware.',
    },
    patching_cadence: {
      label: '¿Los sistemas operativos y software se actualizan automáticamente o al menos mensualmente?',
      description: 'Los parches rápidos previenen que los atacantes exploten vulnerabilidades conocidas.',
    },
    admin_access: {
      label: '¿El acceso de administrador está restringido solo a quienes lo necesitan absolutamente?',
      description: 'Privilegio mínimo: Los empleados solo deben tener acceso a lo que necesitan para su trabajo.',
    },
    password_management: {
      label: '¿La empresa usa un Gestor de Contraseñas para generar y almacenar contraseñas únicas?',
      description: 'Reutilizar contraseñas en diferentes sitios es un riesgo de seguridad importante.',
    },
    phishing_training: {
      label: '¿Los empleados reciben capacitación básica sobre concienciación de phishing?',
      description: 'La capacitación ayuda al personal a reconocer correos y enlaces sospechosos.',
    },
    endpoint_protection: {
      label: '¿Está instalado Antivirus/EDR (Detección y Respuesta de Endpoints) en todos los dispositivos?',
      description: 'Las herramientas de protección modernas bloquean malware y comportamiento sospechoso.',
    },
    disk_encryption: {
      label: '¿Está habilitado el cifrado de disco completo (BitLocker/FileVault) en todos los portátiles?',
      description: 'El cifrado protege los datos si un dispositivo se pierde o es robado.',
    },
    incident_response: {
      label: '¿Tienes un plan básico de a quién llamar si te hackean?',
      description: 'Saber a quién contactar (TI, Seguro, Legal) ahorra tiempo crítico.',
    },
    logging_alerts: {
      label: '¿Se recopilan logs de sistemas críticos (email, intentos de inicio de sesión)?',
      description: 'Los logs ayudan a entender qué pasó durante un incidente.',
    },
  },
  analyzing: {
    title: 'Analizando Postura de Seguridad',
    description: 'Nuestra IA está evaluando tus respuestas contra el modelo de puntuación ShieldCheck para generar tu plan de acción personalizado...',
  },
  report: {
    riskLabel: 'Riesgo',
    confidence: 'Confianza',
    summaryTitle: 'Resumen de Evaluación',
    mainDrivers: 'Factores Principales:',
    savePdf: 'Guardar PDF',
    startOver: 'Comenzar de Nuevo',
    priorityPlan: 'Plan de Acción Prioritario',
    quickWins: 'Victorias Rápidas',
    quickWinsSubtitle: 'Menos de 90 min',
    successMetrics: 'Métricas de Éxito',
    baseline: 'Línea Base',
    targetState: 'Estado Objetivo',
    howToTrack: 'Cómo Rastrear',
    projectedRoi: 'ROI Proyectado',
    timeSaved: 'Tiempo Ahorrado',
    hoursMonth: 'horas/mes',
    costAvoidance: 'Ahorro de Costos',
    prevention: 'Prevención',
    detailedFindings: 'Hallazgos Detallados',
    input: 'Entrada',
    impact: 'Impacto:',
    recommendation: 'Recomendación:',
    disclaimer: 'Descargo de Responsabilidad',
    generatedAt: 'Generado el',
    whyNow: 'Por Qué Ahora',
    steps: 'Pasos',
    tools: 'Herramientas',
    cost: 'Costo',
  },
  footer: {
    text: 'ShieldCheck Evaluación IA • v1.0 • Desarrollado con Gemini API',
  },
  errors: {
    generateFailed: 'Error al generar el informe. Por favor verifica tu clave API e intenta de nuevo.',
    missingContext: 'Falta contexto empresarial',
  },
};

const fr: Translations = {
  header: {
    title: 'ShieldCheck',
    subtitle: 'Évaluation de l\'Hygiène Cybersécurité',
    step1: 'Étape 1: Contexte',
    step2: 'Étape 2: Contrôles',
    processing: 'Traitement...',
    finalReport: 'Rapport Final',
  },
  welcome: {
    headline: 'Sécurisez Votre Entreprise en',
    headlineHighlight: 'Minutes',
    description: 'ShieldCheck est un outil d\'évaluation alimenté par l\'IA conçu pour les petites entreprises. Répondez à 10 questions simples pour obtenir un score de risque personnalisé, une liste de correctifs prioritaires et des métriques ROI mesurables.',
    feature1Title: 'Sans Jargon Technique',
    feature1Desc: 'Questions simples oui/non.',
    feature2Title: 'Rapport Instantané',
    feature2Desc: 'Résultats exploitables.',
    feature3Title: 'Confidentialité d\'Abord',
    feature3Desc: 'Aucun secret ni clé requis.',
    startButton: 'Commencer l\'Évaluation',
  },
  context: {
    title: 'Contexte d\'Entreprise',
    description: 'Aidez ShieldCheck à adapter le rapport à votre environnement spécifique. Nous ne stockons pas ces données.',
    companyName: 'Nom de l\'Entreprise',
    companyPlaceholder: 'Entreprise SA',
    industry: 'Industrie',
    industryPlaceholder: 'ex. Santé, Commerce',
    employeeCount: 'Nombre d\'Employés',
    workstyle: 'Style de Travail Principal',
    remote: 'Télétravail',
    office: 'Bureau',
    hybrid: 'Hybride',
    techStack: 'Stack Technologique Principal (Optionnel)',
    techStackPlaceholder: 'ex. Google Workspace, Microsoft 365, AWS',
    nextButton: 'Étape Suivante',
  },
  questionnaire: {
    title: 'Évaluation des Contrôles de Sécurité',
    description: 'Répondez strictement selon votre état actuel. "Inconnu" est traité comme un risque.',
    yes: 'Oui',
    partial: 'Partiel',
    no: 'Non',
    unknown: 'Inconnu',
    generateButton: 'Générer le Rapport',
  },
  questions: {
    mfa_email_admin: {
      label: 'Appliquez-vous l\'Authentification Multi-Facteurs (MFA) sur tous les comptes email et admin?',
      description: 'MFA nécessite une deuxième forme de vérification (comme un code sur votre téléphone) pour se connecter.',
    },
    backups_data: {
      label: 'Avez-vous des sauvegardes automatisées, hors ligne (ou immuables) des données critiques?',
      description: 'Les sauvegardes doivent s\'exécuter automatiquement et être protégées contre la suppression par ransomware.',
    },
    patching_cadence: {
      label: 'Les systèmes d\'exploitation et logiciels sont-ils mis à jour automatiquement ou au moins mensuellement?',
      description: 'Les correctifs rapides empêchent les attaquants d\'exploiter des vulnérabilités connues.',
    },
    admin_access: {
      label: 'L\'accès administrateur est-il restreint uniquement à ceux qui en ont absolument besoin?',
      description: 'Privilège minimum: Les employés ne doivent avoir accès qu\'à ce dont ils ont besoin pour leur travail.',
    },
    password_management: {
      label: 'L\'entreprise utilise-t-elle un Gestionnaire de Mots de Passe pour générer et stocker des mots de passe uniques?',
      description: 'Réutiliser des mots de passe sur différents sites est un risque de sécurité majeur.',
    },
    phishing_training: {
      label: 'Les employés reçoivent-ils une formation de base sur la sensibilisation au phishing?',
      description: 'La formation aide le personnel à reconnaître les emails et liens suspects.',
    },
    endpoint_protection: {
      label: 'Un Antivirus/EDR (Détection et Réponse des Endpoints) est-il installé sur tous les appareils?',
      description: 'Les outils de protection modernes bloquent les malwares et comportements suspects.',
    },
    disk_encryption: {
      label: 'Le chiffrement de disque complet (BitLocker/FileVault) est-il activé sur tous les portables?',
      description: 'Le chiffrement protège les données si un appareil est perdu ou volé.',
    },
    incident_response: {
      label: 'Avez-vous un plan de base sur qui appeler si vous êtes piraté?',
      description: 'Savoir qui contacter (IT, Assurance, Juridique) fait gagner un temps précieux.',
    },
    logging_alerts: {
      label: 'Les logs sont-ils collectés pour les systèmes critiques (email, tentatives de connexion)?',
      description: 'Les logs aident à comprendre ce qui s\'est passé lors d\'un incident.',
    },
  },
  analyzing: {
    title: 'Analyse de la Posture de Sécurité',
    description: 'Notre IA évalue vos réponses selon le modèle de scoring ShieldCheck pour générer votre plan d\'action personnalisé...',
  },
  report: {
    riskLabel: 'Risque',
    confidence: 'Confiance',
    summaryTitle: 'Résumé de l\'Évaluation',
    mainDrivers: 'Facteurs Principaux:',
    savePdf: 'Enregistrer PDF',
    startOver: 'Recommencer',
    priorityPlan: 'Plan d\'Action Prioritaire',
    quickWins: 'Gains Rapides',
    quickWinsSubtitle: 'Moins de 90 min',
    successMetrics: 'Métriques de Succès',
    baseline: 'Base de Référence',
    targetState: 'État Cible',
    howToTrack: 'Comment Suivre',
    projectedRoi: 'ROI Projeté',
    timeSaved: 'Temps Économisé',
    hoursMonth: 'heures/mois',
    costAvoidance: 'Économies de Coûts',
    prevention: 'Prévention',
    detailedFindings: 'Résultats Détaillés',
    input: 'Entrée',
    impact: 'Impact:',
    recommendation: 'Recommandation:',
    disclaimer: 'Avertissement',
    generatedAt: 'Généré le',
    whyNow: 'Pourquoi Maintenant',
    steps: 'Étapes',
    tools: 'Outils',
    cost: 'Coût',
  },
  footer: {
    text: 'ShieldCheck Évaluation IA • v1.0 • Développé avec Gemini API',
  },
  errors: {
    generateFailed: 'Échec de la génération du rapport. Veuillez vérifier votre clé API et réessayer.',
    missingContext: 'Contexte d\'entreprise manquant',
  },
};

const de: Translations = {
  header: {
    title: 'ShieldCheck',
    subtitle: 'Cybersicherheits-Hygiene-Bewertung',
    step1: 'Schritt 1: Kontext',
    step2: 'Schritt 2: Kontrollen',
    processing: 'Verarbeitung...',
    finalReport: 'Abschlussbericht',
  },
  welcome: {
    headline: 'Sichern Sie Ihr Unternehmen in',
    headlineHighlight: 'Minuten',
    description: 'ShieldCheck ist ein KI-gestütztes Bewertungstool für kleine Unternehmen. Beantworten Sie 10 einfache Fragen, um einen personalisierten Risikoscore, priorisierte Maßnahmen und messbare ROI-Metriken zu erhalten.',
    feature1Title: 'Kein Fachjargon',
    feature1Desc: 'Einfache Ja/Nein-Fragen.',
    feature2Title: 'Sofortiger Bericht',
    feature2Desc: 'Umsetzbare Ergebnisse.',
    feature3Title: 'Datenschutz Zuerst',
    feature3Desc: 'Keine Geheimnisse oder Schlüssel erforderlich.',
    startButton: 'Bewertung Starten',
  },
  context: {
    title: 'Unternehmenskontext',
    description: 'Helfen Sie ShieldCheck, den Bericht auf Ihre spezifische Umgebung anzupassen. Wir speichern diese Daten nicht.',
    companyName: 'Firmenname',
    companyPlaceholder: 'Firma GmbH',
    industry: 'Branche',
    industryPlaceholder: 'z.B. Gesundheit, Einzelhandel',
    employeeCount: 'Mitarbeiterzahl',
    workstyle: 'Hauptarbeitsstil',
    remote: 'Remote',
    office: 'Büro',
    hybrid: 'Hybrid',
    techStack: 'Haupt-Tech-Stack (Optional)',
    techStackPlaceholder: 'z.B. Google Workspace, Microsoft 365, AWS',
    nextButton: 'Nächster Schritt',
  },
  questionnaire: {
    title: 'Sicherheitskontrollen-Bewertung',
    description: 'Antworten Sie streng nach Ihrem aktuellen Status. "Unbekannt" wird als Risiko behandelt.',
    yes: 'Ja',
    partial: 'Teilweise',
    no: 'Nein',
    unknown: 'Unbekannt',
    generateButton: 'Bericht Generieren',
  },
  questions: {
    mfa_email_admin: {
      label: 'Setzen Sie Multi-Faktor-Authentifizierung (MFA) für alle E-Mail- und Admin-Konten durch?',
      description: 'MFA erfordert eine zweite Verifizierungsform (wie einen Code auf Ihrem Telefon) zum Anmelden.',
    },
    backups_data: {
      label: 'Haben Sie automatisierte, Offline- (oder unveränderliche) Backups kritischer Geschäftsdaten?',
      description: 'Backups sollten automatisch laufen und vor Ransomware-Löschung geschützt sein.',
    },
    patching_cadence: {
      label: 'Werden Betriebssysteme und Software automatisch oder mindestens monatlich aktualisiert?',
      description: 'Schnelles Patchen verhindert, dass Angreifer bekannte Schwachstellen ausnutzen.',
    },
    admin_access: {
      label: 'Ist der Administratorzugang nur auf diejenigen beschränkt, die ihn unbedingt benötigen?',
      description: 'Minimales Privileg: Mitarbeiter sollten nur Zugang zu dem haben, was sie für ihre Arbeit brauchen.',
    },
    password_management: {
      label: 'Verwendet das Unternehmen einen Passwort-Manager zur Generierung und Speicherung einzigartiger Passwörter?',
      description: 'Die Wiederverwendung von Passwörtern auf verschiedenen Seiten ist ein großes Sicherheitsrisiko.',
    },
    phishing_training: {
      label: 'Erhalten Mitarbeiter grundlegende Phishing-Awareness-Schulungen?',
      description: 'Schulungen helfen dem Personal, verdächtige E-Mails und Links zu erkennen.',
    },
    endpoint_protection: {
      label: 'Ist Antivirus/Endpoint Detection & Response (EDR) auf allen Geräten installiert?',
      description: 'Moderne Schutztools blockieren Malware und verdächtiges Verhalten.',
    },
    disk_encryption: {
      label: 'Ist Festplattenverschlüsselung (BitLocker/FileVault) auf allen Laptops aktiviert?',
      description: 'Verschlüsselung schützt Daten, wenn ein Gerät verloren geht oder gestohlen wird.',
    },
    incident_response: {
      label: 'Haben Sie einen grundlegenden Plan, wen Sie anrufen, wenn Sie gehackt werden?',
      description: 'Zu wissen, wen man kontaktiert (IT, Versicherung, Recht) spart kritische Zeit.',
    },
    logging_alerts: {
      label: 'Werden Logs für kritische Systeme gesammelt (E-Mail, Anmeldeversuche)?',
      description: 'Logs helfen zu verstehen, was während eines Vorfalls passiert ist.',
    },
  },
  analyzing: {
    title: 'Analyse der Sicherheitslage',
    description: 'Unsere KI bewertet Ihre Antworten anhand des ShieldCheck-Bewertungsmodells, um Ihren personalisierten Aktionsplan zu erstellen...',
  },
  report: {
    riskLabel: 'Risiko',
    confidence: 'Vertrauen',
    summaryTitle: 'Bewertungszusammenfassung',
    mainDrivers: 'Haupttreiber:',
    savePdf: 'PDF Speichern',
    startOver: 'Neu Starten',
    priorityPlan: 'Priorisierter Aktionsplan',
    quickWins: 'Schnelle Erfolge',
    quickWinsSubtitle: 'Unter 90 Min',
    successMetrics: 'Erfolgsmetriken',
    baseline: 'Ausgangslage',
    targetState: 'Zielzustand',
    howToTrack: 'Wie Verfolgen',
    projectedRoi: 'Prognostizierter ROI',
    timeSaved: 'Zeitersparnis',
    hoursMonth: 'Stunden/Monat',
    costAvoidance: 'Kostenvermeidung',
    prevention: 'Prävention',
    detailedFindings: 'Detaillierte Ergebnisse',
    input: 'Eingabe',
    impact: 'Auswirkung:',
    recommendation: 'Empfehlung:',
    disclaimer: 'Haftungsausschluss',
    generatedAt: 'Erstellt am',
    whyNow: 'Warum Jetzt',
    steps: 'Schritte',
    tools: 'Werkzeuge',
    cost: 'Kosten',
  },
  footer: {
    text: 'ShieldCheck KI-Bewertung • v1.0 • Entwickelt mit Gemini API',
  },
  errors: {
    generateFailed: 'Bericht konnte nicht generiert werden. Bitte überprüfen Sie Ihren API-Schlüssel und versuchen Sie es erneut.',
    missingContext: 'Unternehmenskontext fehlt',
  },
};

const ar: Translations = {
  header: {
    title: 'ShieldCheck',
    subtitle: 'تقييم النظافة السيبرانية',
    step1: 'الخطوة 1: السياق',
    step2: 'الخطوة 2: الضوابط',
    processing: 'جاري المعالجة...',
    finalReport: 'التقرير النهائي',
  },
  welcome: {
    headline: 'أمّن عملك في',
    headlineHighlight: 'دقائق',
    description: 'ShieldCheck هي أداة تقييم مدعومة بالذكاء الاصطناعي مصممة للشركات الصغيرة. أجب على 10 أسئلة بسيطة للحصول على درجة مخاطر مخصصة وقائمة إصلاحات ذات أولوية ومقاييس عائد استثمار قابلة للقياس.',
    feature1Title: 'بدون مصطلحات تقنية',
    feature1Desc: 'أسئلة نعم/لا بسيطة.',
    feature2Title: 'تقرير فوري',
    feature2Desc: 'نتائج قابلة للتنفيذ.',
    feature3Title: 'الخصوصية أولاً',
    feature3Desc: 'لا أسرار أو مفاتيح مطلوبة.',
    startButton: 'ابدأ التقييم',
  },
  context: {
    title: 'سياق العمل',
    description: 'ساعد ShieldCheck في تخصيص التقرير لبيئتك المحددة. نحن لا نخزن هذه البيانات.',
    companyName: 'اسم الشركة',
    companyPlaceholder: 'شركة مثال',
    industry: 'الصناعة',
    industryPlaceholder: 'مثال: الرعاية الصحية، التجزئة',
    employeeCount: 'عدد الموظفين',
    workstyle: 'نمط العمل الرئيسي',
    remote: 'عن بُعد',
    office: 'مكتب',
    hybrid: 'هجين',
    techStack: 'المكدس التقني الرئيسي (اختياري)',
    techStackPlaceholder: 'مثال: Google Workspace، Microsoft 365، AWS',
    nextButton: 'الخطوة التالية',
  },
  questionnaire: {
    title: 'تقييم ضوابط الأمان',
    description: 'أجب بدقة بناءً على وضعك الحالي. "غير معروف" يُعامل كمخاطرة.',
    yes: 'نعم',
    partial: 'جزئي',
    no: 'لا',
    unknown: 'غير معروف',
    generateButton: 'إنشاء التقرير',
  },
  questions: {
    mfa_email_admin: {
      label: 'هل تفرض المصادقة متعددة العوامل (MFA) على جميع حسابات البريد الإلكتروني والمسؤولين؟',
      description: 'MFA تتطلب شكلاً ثانياً من التحقق (مثل رمز على هاتفك) لتسجيل الدخول.',
    },
    backups_data: {
      label: 'هل لديك نسخ احتياطية آلية وغير متصلة (أو غير قابلة للتغيير) للبيانات الحرجة؟',
      description: 'يجب أن تعمل النسخ الاحتياطية تلقائياً وتكون محمية من حذف برامج الفدية.',
    },
    patching_cadence: {
      label: 'هل يتم تحديث أنظمة التشغيل والبرامج تلقائياً أو شهرياً على الأقل؟',
      description: 'التصحيح السريع يمنع المهاجمين من استغلال الثغرات المعروفة.',
    },
    admin_access: {
      label: 'هل وصول المسؤول مقيد فقط لمن يحتاجونه بشكل مطلق؟',
      description: 'أقل امتياز: يجب أن يكون للموظفين وصول فقط لما يحتاجونه لعملهم.',
    },
    password_management: {
      label: 'هل تستخدم الشركة مدير كلمات مرور لإنشاء وتخزين كلمات مرور فريدة؟',
      description: 'إعادة استخدام كلمات المرور عبر المواقع هو خطر أمني كبير.',
    },
    phishing_training: {
      label: 'هل يتلقى الموظفون تدريباً أساسياً على الوعي بالتصيد الاحتيالي؟',
      description: 'التدريب يساعد الموظفين على التعرف على الرسائل والروابط المشبوهة.',
    },
    endpoint_protection: {
      label: 'هل مكافح الفيروسات/EDR مثبت على جميع الأجهزة؟',
      description: 'أدوات الحماية الحديثة تحجب البرامج الضارة والسلوك المشبوه.',
    },
    disk_encryption: {
      label: 'هل تشفير القرص الكامل (BitLocker/FileVault) مفعل على جميع الحواسيب المحمولة؟',
      description: 'التشفير يحمي البيانات إذا فُقد الجهاز أو سُرق.',
    },
    incident_response: {
      label: 'هل لديك خطة أساسية لمن تتصل به إذا تعرضت للاختراق؟',
      description: 'معرفة من تتصل به (تقنية المعلومات، التأمين، القانونية) يوفر وقتاً حرجاً.',
    },
    logging_alerts: {
      label: 'هل يتم جمع السجلات للأنظمة الحرجة (البريد الإلكتروني، محاولات تسجيل الدخول)؟',
      description: 'السجلات تساعد في فهم ما حدث أثناء الحادث.',
    },
  },
  analyzing: {
    title: 'تحليل الوضع الأمني',
    description: 'ذكاؤنا الاصطناعي يقيّم إجاباتك وفق نموذج تقييم ShieldCheck لإنشاء خطة عملك المخصصة...',
  },
  report: {
    riskLabel: 'المخاطر',
    confidence: 'الثقة',
    summaryTitle: 'ملخص التقييم',
    mainDrivers: 'العوامل الرئيسية:',
    savePdf: 'حفظ PDF',
    startOver: 'البدء من جديد',
    priorityPlan: 'خطة العمل ذات الأولوية',
    quickWins: 'مكاسب سريعة',
    quickWinsSubtitle: 'أقل من 90 دقيقة',
    successMetrics: 'مقاييس النجاح',
    baseline: 'خط الأساس',
    targetState: 'الحالة المستهدفة',
    howToTrack: 'كيفية التتبع',
    projectedRoi: 'عائد الاستثمار المتوقع',
    timeSaved: 'الوقت الموفر',
    hoursMonth: 'ساعة/شهر',
    costAvoidance: 'تجنب التكاليف',
    prevention: 'الوقاية',
    detailedFindings: 'النتائج التفصيلية',
    input: 'المدخل',
    impact: 'التأثير:',
    recommendation: 'التوصية:',
    disclaimer: 'إخلاء المسؤولية',
    generatedAt: 'تم الإنشاء في',
    whyNow: 'لماذا الآن',
    steps: 'الخطوات',
    tools: 'الأدوات',
    cost: 'التكلفة',
  },
  footer: {
    text: 'تقييم ShieldCheck بالذكاء الاصطناعي • الإصدار 1.0 • مبني بواسطة Gemini API',
  },
  errors: {
    generateFailed: 'فشل إنشاء التقرير. يرجى التحقق من مفتاح API والمحاولة مرة أخرى.',
    missingContext: 'سياق العمل مفقود',
  },
};

export const translations: Record<Language, Translations> = { en, es, fr, de, ar };

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'shieldcheck-language';

function getInitialLanguage(): Language {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && stored in translations) {
        return stored as Language;
      }
      const browserLang = navigator.language?.split('-')[0];
      if (browserLang && browserLang in translations) {
        return browserLang as Language;
      }
    }
  } catch (e) {
    // localStorage might be blocked
  }
  return 'en';
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language after mount
  useEffect(() => {
    if (!isInitialized) {
      const initialLang = getInitialLanguage();
      setLanguageState(initialLang);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // localStorage might be blocked
    }
  };

  const dir = LANGUAGES.find(l => l.code === language)?.dir || 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
