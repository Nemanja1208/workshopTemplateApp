export type AnswerType = "yes" | "partial" | "no" | "unknown";

export interface BusinessContext {
  companyName: string;
  industry: string;
  employeeCount: string;
  primaryWorkstyle: "remote" | "office" | "hybrid";
  techStackFocus: string; // e.g., Google Workspace, O365, AWS
}

export interface QuestionnaireAnswers {
  mfa_email_admin: AnswerType;
  backups_data: AnswerType;
  patching_cadence: AnswerType;
  admin_access: AnswerType;
  password_management: AnswerType;
  phishing_training: AnswerType;
  endpoint_protection: AnswerType;
  disk_encryption: AnswerType;
  incident_response: AnswerType;
  logging_alerts: AnswerType;
}

// Reporting Structures as defined by the Prompt Requirements

export interface ShieldCheckMeta {
  product_name: string;
  version: string;
  generated_at: string;
}

export interface ShieldCheckScore {
  risk_score: number;
  risk_level: string;
  confidence: "high" | "medium" | "low";
  main_drivers: string[];
}

export interface ShieldCheckFinding {
  title: string;
  what_answer_triggered_it: string;
  why_it_matters: string;
  impact: string;
  recommended_fix: string;
}

export interface ShieldCheckAction {
  priority: number;
  action_title: string;
  why_now: string;
  steps: string[];
  tools_suggestions: string;
  effort_minutes_range: string;
  cost_range: string;
  success_metric: string;
}

export interface ShieldCheckQuickWin {
  action: string;
  effort_minutes: string;
  expected_benefit: string;
}

export interface ShieldCheckMeasurableOutcomes {
  baseline_metrics: string[];
  target_metrics: string[];
  how_to_track: string[];
}

export interface ShieldCheckRoiEstimates {
  time_saved_per_month_hours_range: string;
  cost_avoidance_notes: string;
  breaches_prevented_note: string;
}

export interface ShieldCheckReport {
  meta: ShieldCheckMeta;
  score: ShieldCheckScore;
  findings: ShieldCheckFinding[];
  top_actions: ShieldCheckAction[];
  quick_wins: ShieldCheckQuickWin[];
  measurable_outcomes: ShieldCheckMeasurableOutcomes;
  roi_estimates: ShieldCheckRoiEstimates;
  assumptions: string[];
  disclaimer: string;
}
