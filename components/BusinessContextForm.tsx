import React, { useState } from 'react';
import { Briefcase, Users, Laptop, Server, ArrowRight } from 'lucide-react';
import { BusinessContext } from '../types';

interface Props {
  onNext: (data: BusinessContext) => void;
}

export const BusinessContextForm: React.FC<Props> = ({ onNext }) => {
  const [formData, setFormData] = useState<BusinessContext>({
    companyName: '',
    industry: '',
    employeeCount: '1-10',
    primaryWorkstyle: 'hybrid',
    techStackFocus: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.companyName && formData.industry) {
      onNext(formData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-indigo-600" />
          Business Context
        </h2>
        <p className="text-slate-600 mb-8">
          Help ShieldCheck tailor the report to your specific environment. We do not store this data.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Acme Corp"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="e.g. Healthcare, Retail"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Employee Count</label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                <select
                  name="employeeCount"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white"
                  value={formData.employeeCount}
                  onChange={handleChange}
                >
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Primary Workstyle</label>
            <div className="grid grid-cols-3 gap-4">
              {['remote', 'office', 'hybrid'].map((style) => (
                <label key={style} className={`
                  cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all
                  ${formData.primaryWorkstyle === style 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold ring-1 ring-indigo-600' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'}
                `}>
                  <input
                    type="radio"
                    name="primaryWorkstyle"
                    value={style}
                    checked={formData.primaryWorkstyle === style}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <Laptop className="w-5 h-5" />
                  <span className="capitalize">{style}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Primary Tech Stack (Optional)</label>
             <div className="relative">
                <Server className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="techStackFocus"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="e.g. Google Workspace, Microsoft 365, AWS"
                  value={formData.techStackFocus}
                  onChange={handleChange}
                />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next Step
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
