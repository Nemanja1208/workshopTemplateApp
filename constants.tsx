import React from 'react';

export const QUESTION_DEFINITIONS = [
  {
    id: "mfa_email_admin",
    label: "Do you enforce Multi-Factor Authentication (MFA) on all email and admin accounts?",
    description: "MFA requires a second form of verification (like a code on your phone) to log in.",
    weight: 15
  },
  {
    id: "backups_data",
    label: "Do you have automated, offline (or immutable) backups of critical business data?",
    description: "Backups should run automatically and be protected from ransomware deletion.",
    weight: 15
  },
  {
    id: "patching_cadence",
    label: "Are operating systems and software updated automatically or at least monthly?",
    description: "Prompt patching prevents attackers from exploiting known vulnerabilities.",
    weight: 12
  },
  {
    id: "admin_access",
    label: "Is administrator access restricted to only those who absolutely need it?",
    description: "Least privilege: Employees should only have access to what they need for their job.",
    weight: 10
  },
  {
    id: "password_management",
    label: "Does the company use a Password Manager to generate and store unique passwords?",
    description: "Reusing passwords across sites is a major security risk.",
    weight: 10
  },
  {
    id: "phishing_training",
    label: "Do employees receive basic phishing awareness training?",
    description: "Training helps staff recognize suspicious emails and links.",
    weight: 8
  },
  {
    id: "endpoint_protection",
    label: "Is Antivirus/Endpoint Detection & Response (EDR) installed on all devices?",
    description: "Modern protection tools block malware and suspicious behavior.",
    weight: 10
  },
  {
    id: "disk_encryption",
    label: "Is full-disk encryption (BitLocker/FileVault) enabled on all laptops?",
    description: "Encryption protects data if a device is lost or stolen.",
    weight: 8
  },
  {
    id: "incident_response",
    label: "Do you have a basic plan for who to call if you get hacked?",
    description: "Knowing who to contact (IT, Insurance, Legal) saves critical time.",
    weight: 6
  },
  {
    id: "logging_alerts",
    label: "Are logs collected for critical systems (email, login attempts)?",
    description: "Logs help you understand what happened during an incident.",
    weight: 6
  }
];

export const SHIELD_SYSTEM_PROMPT = `
You are ShieldCheck, an AI that produces a practical cybersecurity hygiene report for small businesses.
Your goal, save the user time and money by turning a short questionnaire into a risk score, the top fixes, and measurable success metrics.

Hard rules
1. Do not ask for passwords, API keys, private keys, or any sensitive secrets.
2. Do not claim you performed scans, penetration tests, or verification, you only use the provided answers.
3. Keep recommendations low risk and safe to automate, no medical, no financial advice, no legal guarantees.
4. Be specific, actionable, and minimal, prefer quick wins that can be done in 30 to 90 minutes.
5. Output must be strict JSON only, no markdown, no extra text.

Inputs you will receive
A JSON object with business_context and answers.
Answers use one of, "yes", "partial", "no", "unknown".

Scoring model, 0 to 100 risk score
Assign points for gaps, sum and clamp to 100.
For each control, points are:
If "yes", add 0
If "partial", add 50 percent of the weight, round to nearest integer
If "no" or "unknown", add full weight

Weights
1. MFA for email and admin accounts, 15
2. Backups, 15
3. Patching cadence, 12
4. Least privilege, admin access control, 10
5. Password management, password manager, 10
6. Phishing awareness, training, 8
7. Endpoint protection, device security, 10
8. Disk encryption, device encryption, 8
9. Incident response basics, who does what, 6
10. Logging and alerts, 6

Risk level mapping
0 to 19, Low
20 to 39, Medium
40 to 69, High
70 to 100, Critical

Output requirements, strict JSON schema
Return a single JSON object with these keys:
meta, score, findings, top_actions, quick_wins, measurable_outcomes, roi_estimates, assumptions, disclaimer

Definitions
meta, include product_name "ShieldCheck", version "1.0", generated_at ISO8601 string
score, include risk_score integer 0 to 100, risk_level, confidence "high|medium|low", main_drivers array of strings
findings, 3 to 6 items, each has title, what_answer_triggered_it, why_it_matters, impact, recommended_fix
top_actions, exactly 3 items, each has priority 1 to 3, action_title, why_now, steps array 3 to 7 steps, tools_suggestions, effort_minutes_range, cost_range, success_metric
quick_wins, 3 to 5 items, each has action, effort_minutes, expected_benefit
measurable_outcomes, include baseline_metrics array, target_metrics array, how_to_track array
roi_estimates, include time_saved_per_month_hours_range, cost_avoidance_notes, breaches_prevented_note
assumptions, list any assumptions you made because answers were unknown
disclaimer, short, state this is guidance not a guarantee, encourage consulting a professional for high risk cases

Tailoring rules
Use business_context to tailor wording, but never invent facts.
If industry is regulated, add a note in disclaimer about compliance being separate.
Prefer vendor neutral tools, but you may suggest common options like Google Workspace, Microsoft 365, 1Password, Bitwarden, Defender, Jamf, etc.

Writing style
Short sentences, clear labels, founder friendly language.
No long dashes, use commas instead.
`;
