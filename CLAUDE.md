# ShieldCheck - Project Documentation

## Business Idea & Goal

**ShieldCheck** is an AI-powered cybersecurity hygiene assessment tool designed specifically for small businesses.

### Problem Statement
Small businesses (1-200+ employees) lack the technical expertise and resources to properly assess their cybersecurity posture. They need a simple, non-technical way to understand their security risks and prioritize fixes.

### Solution
An interactive questionnaire that generates instant, actionable security reports with:
- Prioritized security fixes
- Step-by-step implementation guides
- Measurable ROI metrics
- Business context-aware recommendations

### Target Market
- Small businesses with 1-200+ employees
- Organizations without dedicated security teams
- Business owners seeking to understand their security posture

### Key Value Propositions
1. **No technical jargon** - Simple yes/no/partial/unknown answers
2. **Instant AI-generated reports** - Personalized recommendations in seconds
3. **Privacy-first approach** - No API keys or sensitive data collected
4. **Business context-aware** - Industry and company-specific recommendations
5. **Measurable outcomes** - Clear ROI projections and success metrics

---

## Tech Stack

### Frontend
- **Framework:** React 19.2.3
- **Build Tool:** Vite 6.2.0
- **Language:** TypeScript 5.8.2 (strict mode)
- **Styling:** Tailwind CSS (CDN)
- **Icons:** Lucide React 0.561.0
- **Charts:** Recharts 3.5.1

### AI/Backend
- **AI Model:** Google Gemini 2.5-Flash
- **SDK:** @google/genai v1.33.0
- **API Key:** GEMINI_API_KEY (environment variable)

### Development
- **Package Manager:** npm
- **Dev Server Port:** 3000
- **Font:** Inter (Google Fonts)

---

## Features

### Implemented (v1.1)

| Feature | Status | Description |
|---------|--------|-------------|
| Welcome Screen | Done | Marketing-focused landing with value propositions |
| Business Context Form | Done | Collects company name, industry, employee count, workstyle, tech stack |
| Security Questionnaire | Done | 10 weighted security control questions with 4 answer options |
| AI Report Generation | Done | Gemini API integration for personalized reports |
| Risk Score Visualization | Done | Donut chart gauge (0-100 scale) |
| Priority Actions | Done | 3 prioritized actions with implementation steps |
| Quick Wins | Done | 3-5 actions completable in under 90 minutes |
| Success Metrics | Done | Baseline vs target metrics with tracking guidance |
| ROI Projections | Done | Time saved, cost avoidance, breach prevention estimates |
| Detailed Findings | Done | 3-6 findings with impact and remediation |
| Print to PDF | Done | Browser print functionality |
| Multi-language Support | Done | 5 languages (EN, ES, FR, DE, AR) with RTL support |
| Language Selector | Done | Global header dropdown with language persistence |

### Security Questions (Weighted)
1. MFA on email/admin accounts (weight: 15)
2. Automated offline/immutable backups (weight: 15)
3. Auto/monthly OS and software updates (weight: 12)
4. Admin access restricted - least privilege (weight: 10)
5. Password manager usage (weight: 10)
6. Employee phishing awareness training (weight: 8)
7. Antivirus/EDR on all devices (weight: 10)
8. Full-disk encryption enabled (weight: 8)
9. Incident response plan (weight: 6)
10. Logging and alerts on critical systems (weight: 6)

### Planned Features (Backlog)

| Feature | Priority | Description |
|---------|----------|-------------|
| Export to CSV/Excel | Medium | Additional export formats beyond PDF |
| Report History | Medium | Track assessments over time |
| Custom Branding | Low | White-label reports |
| Security Tool Integration | Medium | Connect with existing security tools |
| User Authentication | Medium | Personalized dashboards |
| Email Report Delivery | Low | Send reports via email |
| Progress Tracking | High | Follow-up assessments to measure improvement |
| Industry Benchmarks | Medium | Compare against industry averages |

---

## Project Structure

```
workshopTemplateApp/
├── App.tsx                    # Main app with state management and flow
├── index.tsx                  # React entry point with LanguageProvider
├── index.html                 # HTML shell with Tailwind + fonts
├── types.ts                   # TypeScript interfaces
├── constants.tsx              # Questions and AI system prompt
├── vite.config.ts             # Build configuration
├── tsconfig.json              # TypeScript config
├── package.json               # Dependencies
├── metadata.json              # App metadata
├── i18n.tsx                       # All translations + LanguageContext (single file)
├── components/
│   ├── BusinessContextForm.tsx    # Step 1: Context collection
│   ├── QuestionnaireForm.tsx      # Step 2: Security questions
│   ├── ReportDashboard.tsx        # Step 4: Report display
│   ├── RiskGauge.tsx              # Risk visualization
│   └── LanguageSelector.tsx       # Language dropdown in header
└── services/
    └── geminiService.ts           # Gemini API integration
```

---

## Application Flow

```
WELCOME → CONTEXT → QUESTIONS → ANALYZING → REPORT
   │          │          │           │          │
   │          │          │           │          └─ Display AI-generated report
   │          │          │           └─ Loading state while calling Gemini API
   │          │          └─ Answer 10 security control questions
   │          └─ Enter company info (name, industry, size, workstyle)
   └─ Landing page with value propositions
```

---

## Development Sessions

### Session 2 - Multi-language Support
**Date:** 2025-12-14

**Completed:**
- Created i18n folder with translations system
- Added 5 languages: English, Spanish, French, German, Arabic
- Implemented RTL support for Arabic
- Created LanguageContext with localStorage persistence
- Added LanguageSelector component to global header
- Updated all components to use translations
- Added browser language auto-detection

**Files Added:**
- `i18n.tsx` - All translations + LanguageContext (single file for Google AI Studio compatibility)
- `components/LanguageSelector.tsx` - Header dropdown

**Files Modified:**
- `index.tsx` - Wrapped app with LanguageProvider
- `App.tsx` - Added useLanguage hook and translations
- `components/BusinessContextForm.tsx` - Translations
- `components/QuestionnaireForm.tsx` - Translations
- `components/ReportDashboard.tsx` - Translations

---

### Session 1 - Project Initialization
**Date:** 2025-12-14
**Commits:**
- Initial commit
- feat: Initialize ShieldCheck project structure

**Completed:**
- Full project structure setup
- All core components implemented
- Gemini API integration
- TypeScript types defined
- Tailwind CSS styling
- Risk gauge visualization

---

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start development server: `npm run dev`
5. Open http://localhost:3000

---

## Risk Scoring Algorithm

The risk score is calculated as:
- **100** = All controls missing (maximum risk)
- **0** = All controls fully implemented (minimum risk)

### Answer Weights
- **Yes:** 0% of question weight (full credit)
- **Partial:** 50% of question weight
- **No:** 100% of question weight
- **Unknown:** 75% of question weight

### Risk Levels
| Score | Level | Color |
|-------|-------|-------|
| 0-19 | Low | Green |
| 20-39 | Medium | Yellow |
| 40-69 | High | Orange |
| 70-100 | Critical | Red |

---

## Development Instructions (For Claude)

**IMPORTANT:** After completing any feature or making significant changes:
1. Update this CLAUDE.md file to reflect the changes
2. Move completed features from "Planned" to "Implemented"
3. Add a new entry to the Development Sessions section
4. Document any new files, components, or architectural decisions

---

## Internationalization (i18n)

### Supported Languages
| Code | Language | Direction |
|------|----------|-----------|
| en | English | LTR |
| es | Spanish (Español) | LTR |
| fr | French (Français) | LTR |
| de | German (Deutsch) | LTR |
| ar | Arabic (العربية) | RTL |

### How It Works
1. **LanguageProvider** wraps the app in `index.tsx`
2. **useLanguage()** hook provides `t` (translations) and `setLanguage()`
3. Language selection persists in `localStorage` under `shieldcheck-language`
4. Auto-detects browser language on first visit
5. RTL direction is automatically applied for Arabic

### Adding a New Language
1. Add language code to `Language` type in `i18n.tsx`
2. Add entry to `LANGUAGES` array with code, name, nativeName, and dir
3. Create full translation object (copy from `en` and translate)
4. Add to `translations` record at bottom of file

### Using Translations in Components
```tsx
import { useLanguage } from '../i18n.tsx';

const MyComponent = () => {
  const { t } = useLanguage();
  return <h1>{t.welcome.headline}</h1>;
};
```

---

## Notes

- This is a stateless client-side application
- Reports are generated on-demand (not stored)
- Requires GEMINI_API_KEY environment variable at runtime
- No backend server or database required
