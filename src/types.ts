/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceLevel {
  label: string;
  description: string;
  multiplier: number;
  deliveryTime: string;
  metricBoost: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  benefits: string[];
  deliverables: string[];
  levels: ServiceLevel[];
  businessGoalAlign: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  industry: string;
  clientName: string;
  tagline: string;
  metrics: {
    value: string;
    label: string;
  };
  duration: string;
  challenge: string;
  solution: string;
  outcome: string;
  servicesProvided: string[];
  technologies: string[];
  imageTheme: 'amber' | 'emerald' | 'cyan' | 'purple';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  industry: string;
}

export interface InquirySubmission {
  id: string;
  name: string;
  companyName: string;
  email: string;
  selectedServices: string[];
  approxBudget: string;
  projectNotes: string;
  submittedAt: string;
  status: 'pending' | 'reviewed';
}
