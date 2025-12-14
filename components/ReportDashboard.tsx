import React from 'react';
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  List,
  Zap,
  Target,
  Download,
  RotateCcw,
} from 'lucide-react';
import { ShieldCheckReport, ShieldCheckAction } from '../types';
import { RiskGauge } from './RiskGauge';
import { useLanguage, Translations } from '../i18n.tsx';

interface Props {
  report: ShieldCheckReport;
  onReset: () => void;
}

export const ReportDashboard: React.FC<Props> = ({ report, onReset }) => {
  const { t } = useLanguage();
  const { score, top_actions, quick_wins, findings, roi_estimates, measurable_outcomes, disclaimer } = report;

  const getRiskColorClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Top Summary Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <RiskGauge score={score.risk_score} />
            <div className={`mt-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide border ${getRiskColorClass(score.risk_level)}`}>
              {score.risk_level} {t.report.riskLabel}
            </div>
            <p className="text-xs text-slate-400 mt-2">{t.report.confidence}: {score.confidence}</p>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">{t.report.summaryTitle}</h2>
            <div className="space-y-2">
              <p className="text-slate-600 font-medium">{t.report.mainDrivers}</p>
              <ul className="space-y-2">
                {score.main_drivers.map((driver, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 flex gap-3">
              <button onClick={() => window.print()} className="inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                <Download className="w-4 h-4 me-2" />
                {t.report.savePdf}
              </button>
              <button onClick={onReset} className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                <RotateCcw className="w-4 h-4 me-2" />
                {t.report.startOver}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Actions - The Meat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
            <List className="w-6 h-6 text-indigo-600" />
            {t.report.priorityPlan}
          </h3>
        </div>
        {top_actions.map((action, idx) => (
          <ActionCard key={idx} action={action} index={idx} t={t} />
        ))}
      </div>

      {/* ROI & Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Wins */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-500" />
            {t.report.quickWins} ({t.report.quickWinsSubtitle})
          </h3>
          <div className="space-y-4">
            {quick_wins.map((win, i) => (
              <div key={i} className="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="mt-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{win.action}</div>
                  <div className="text-xs text-slate-500 mt-1 flex gap-2">
                    <span>{win.effort_minutes}</span>
                    <span>•</span>
                    <span className="text-emerald-600">{win.expected_benefit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Measurable Outcomes */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-indigo-500" />
            {t.report.successMetrics}
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-semibold text-slate-700 mb-1">{t.report.baseline}</div>
              <div className="flex flex-wrap gap-2">
                {measurable_outcomes.baseline_metrics.map((m, i) => (
                   <span key={i} className="bg-slate-100 px-2 py-1 rounded text-slate-600">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-700 mb-1">{t.report.targetState}</div>
              <div className="flex flex-wrap gap-2">
                {measurable_outcomes.target_metrics.map((m, i) => (
                   <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded">{m}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="font-semibold text-slate-700 mb-1">{t.report.howToTrack}</div>
              <ul className="list-disc list-inside text-slate-500 space-y-1">
                {measurable_outcomes.how_to_track.map((track, i) => <li key={i}>{track}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

       {/* ROI Stats */}
      <div className="bg-indigo-900 rounded-xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-300" />
          {t.report.projectedRoi}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-indigo-200 text-xs uppercase font-bold tracking-wider mb-1">{t.report.timeSaved}</div>
            <div className="text-2xl font-bold">{roi_estimates.time_saved_per_month_hours_range}</div>
            <div className="text-xs text-indigo-200 mt-1">{t.report.hoursMonth}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-indigo-200 text-xs uppercase font-bold tracking-wider mb-1">{t.report.costAvoidance}</div>
            <div className="text-sm font-medium leading-snug">{roi_estimates.cost_avoidance_notes}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
             <div className="text-indigo-200 text-xs uppercase font-bold tracking-wider mb-1">{t.report.prevention}</div>
             <div className="text-sm font-medium leading-snug">{roi_estimates.breaches_prevented_note}</div>
          </div>
        </div>
      </div>

      {/* Findings Detail Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="font-bold text-slate-900">{t.report.detailedFindings}</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {findings.map((finding, i) => (
            <div key={i} className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-800 text-lg">{finding.title}</h4>
                <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">
                  {t.report.input}: {finding.what_answer_triggered_it}
                </span>
              </div>
              <p className="text-slate-600 mb-3">{finding.why_it_matters}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                 <div className="bg-red-50 p-3 rounded text-red-800">
                    <span className="font-bold block mb-1">{t.report.impact}</span>
                    {finding.impact}
                 </div>
                 <div className="bg-emerald-50 p-3 rounded text-emerald-800">
                    <span className="font-bold block mb-1">{t.report.recommendation}</span>
                    {finding.recommended_fix}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
        <p className="mb-2 font-semibold">{t.report.disclaimer}</p>
        <p>{disclaimer}</p>
        <p className="mt-2">{t.report.generatedAt}: {new Date(report.meta.generated_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

const ActionCard: React.FC<{ action: ShieldCheckAction; index: number; t: Translations }> = ({ action, index, t }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col h-full relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="absolute top-0 start-0 w-1.5 h-full bg-indigo-600"></div>

      <div className="mb-4">
        <div className="flex justify-between items-start">
           <div className="bg-indigo-50 text-indigo-700 font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg mb-2">
             {index + 1}
           </div>
           <div className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded">
             {action.effort_minutes_range}
           </div>
        </div>
        <h4 className="text-lg font-bold text-slate-900 leading-tight">{action.action_title}</h4>
      </div>

      <div className="space-y-4 flex-grow">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.report.whyNow}</span>
          <p className="text-sm text-slate-600 mt-1">{action.why_now}</p>
        </div>

        <div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.report.steps}</span>
           <ul className="text-sm text-slate-600 mt-1 space-y-1 list-disc list-inside">
             {action.steps.slice(0, 4).map((step, i) => (
               <li key={i}>{step}</li>
             ))}
           </ul>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-slate-400 block mb-1 font-medium">{t.report.tools}</span>
          <span className="text-slate-700 font-medium">{action.tools_suggestions}</span>
        </div>
        <div>
          <span className="text-slate-400 block mb-1 font-medium">{t.report.cost}</span>
          <span className="text-slate-700 font-medium">{action.cost_range}</span>
        </div>
      </div>
    </div>
  );
}
