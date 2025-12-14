import React, { useState } from 'react';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { QuestionnaireAnswers, AnswerType } from '../types';
import { QUESTION_DEFINITIONS } from '../constants';

interface Props {
  onSubmit: (data: QuestionnaireAnswers) => void;
}

export const QuestionnaireForm: React.FC<Props> = ({ onSubmit }) => {
  const [answers, setAnswers] = useState<Partial<QuestionnaireAnswers>>({});

  const handleSelect = (key: keyof QuestionnaireAnswers, value: AnswerType) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const isComplete = QUESTION_DEFINITIONS.every(q => answers[q.id as keyof QuestionnaireAnswers]);

  const handleSubmit = () => {
    if (isComplete) {
      onSubmit(answers as QuestionnaireAnswers);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-2">Security Controls Assessment</h2>
        <p className="text-indigo-100 opacity-90">
          Answer strictly based on your current status. "Unknown" is treated as a risk.
        </p>
      </div>

      <div className="space-y-4">
        {QUESTION_DEFINITIONS.map((q, index) => (
          <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold mt-0.5">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-1">{q.label}</h3>
                <p className="text-sm text-slate-500">{q.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ml-0 sm:ml-9">
              {(['yes', 'partial', 'no', 'unknown'] as AnswerType[]).map((option) => {
                 const isSelected = answers[q.id as keyof QuestionnaireAnswers] === option;
                 let activeClass = "";
                 
                 if (isSelected) {
                   switch(option) {
                     case 'yes': activeClass = "bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500"; break;
                     case 'partial': activeClass = "bg-yellow-50 border-yellow-500 text-yellow-700 ring-1 ring-yellow-500"; break;
                     case 'no': activeClass = "bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500"; break;
                     case 'unknown': activeClass = "bg-slate-100 border-slate-500 text-slate-700 ring-1 ring-slate-500"; break;
                   }
                 } else {
                   activeClass = "bg-white border-slate-200 text-slate-600 hover:bg-slate-50";
                 }

                 return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(q.id as keyof QuestionnaireAnswers, option)}
                    className={`
                      px-3 py-2.5 rounded-lg border text-sm font-medium capitalize transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500
                      ${activeClass}
                    `}
                  >
                    {option}
                  </button>
                 );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4 pb-12">
        <button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`
            inline-flex items-center justify-center px-8 py-3.5 text-base font-bold rounded-lg shadow-sm transition-all
            ${isComplete 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
          `}
        >
          Generate Report
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};
