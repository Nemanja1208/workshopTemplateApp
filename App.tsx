import React, { useState } from 'react';
import { Shield, ArrowRight, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { BusinessContextForm } from './components/BusinessContextForm';
import { QuestionnaireForm } from './components/QuestionnaireForm';
import { ReportDashboard } from './components/ReportDashboard';
import { LanguageSelector } from './components/LanguageSelector';
import { generateReport } from './services/geminiService';
import { BusinessContext, QuestionnaireAnswers, ShieldCheckReport } from './types';
import { useLanguage, LanguageProvider } from './i18n.tsx';

enum AppStep {
  WELCOME,
  CONTEXT,
  QUESTIONS,
  ANALYZING,
  REPORT
}

function AppContent() {
  const { t } = useLanguage();
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [businessContext, setBusinessContext] = useState<BusinessContext | null>(null);
  const [answers, setAnswers] = useState<QuestionnaireAnswers | null>(null);
  const [report, setReport] = useState<ShieldCheckReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleContextSubmit = (data: BusinessContext) => {
    setBusinessContext(data);
    setStep(AppStep.QUESTIONS);
  };

  const handleQuestionsSubmit = async (data: QuestionnaireAnswers) => {
    setAnswers(data);
    setStep(AppStep.ANALYZING);
    setError(null);

    try {
      if (!businessContext) throw new Error(t.errors.missingContext);
      const generatedReport = await generateReport(businessContext, data);
      setReport(generatedReport);
      setStep(AppStep.REPORT);
    } catch (err) {
      console.error(err);
      setError(t.errors.generateFailed);
      setStep(AppStep.QUESTIONS); // Go back to allow retry
    }
  };

  const handleReset = () => {
    setStep(AppStep.WELCOME);
    setBusinessContext(null);
    setAnswers(null);
    setReport(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">{t.header.title}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-slate-500 hidden sm:block">
              {step === AppStep.WELCOME && t.header.subtitle}
              {step === AppStep.CONTEXT && t.header.step1}
              {step === AppStep.QUESTIONS && t.header.step2}
              {step === AppStep.ANALYZING && t.header.processing}
              {step === AppStep.REPORT && t.header.finalReport}
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {step === AppStep.WELCOME && (
            <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto mt-10">
              <div className="bg-indigo-50 p-4 rounded-full">
                <Shield className="w-16 h-16 text-indigo-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {t.welcome.headline} <span className="text-indigo-600">{t.welcome.headlineHighlight}</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.welcome.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-start">
                {[
                  { title: t.welcome.feature1Title, desc: t.welcome.feature1Desc },
                  { title: t.welcome.feature2Title, desc: t.welcome.feature2Desc },
                  { title: t.welcome.feature3Title, desc: t.welcome.feature3Desc }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(AppStep.CONTEXT)}
                className="mt-8 group relative inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                {t.welcome.startButton}
                <ArrowRight className="w-5 h-5 ms-2 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
            </div>
          )}

          {step === AppStep.CONTEXT && (
            <BusinessContextForm onNext={handleContextSubmit} />
          )}

          {step === AppStep.QUESTIONS && (
            <QuestionnaireForm onSubmit={handleQuestionsSubmit} />
          )}

          {step === AppStep.ANALYZING && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.analyzing.title}</h2>
              <p className="text-slate-600 max-w-md">
                {t.analyzing.description}
              </p>
            </div>
          )}

          {step === AppStep.REPORT && report && (
            <ReportDashboard report={report} onReset={handleReset} />
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-slate-400">
          {t.footer.text}
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}