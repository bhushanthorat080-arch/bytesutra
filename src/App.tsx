/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import Smartphone from 'lucide-react/dist/esm/icons/smartphone';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Database from 'lucide-react/dist/esm/icons/database';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Check from 'lucide-react/dist/esm/icons/check';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Clock from 'lucide-react/dist/esm/icons/clock';
import User from 'lucide-react/dist/esm/icons/user';
import Users from 'lucide-react/dist/esm/icons/users';
import Award from 'lucide-react/dist/esm/icons/award';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import CalendarIcon from 'lucide-react/dist/esm/icons/calendar';
import DollarSign from 'lucide-react/dist/esm/icons/dollar-sign';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import Briefcase from 'lucide-react/dist/esm/icons/briefcase';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';
import Clock3 from 'lucide-react/dist/esm/icons/clock-3';
import ThumbsUp from 'lucide-react/dist/esm/icons/thumbs-up';
import Target from 'lucide-react/dist/esm/icons/target';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle';
import { ByteSutraLogo } from './components/SutraLogo';
import { PartnerClock } from './components/PartnerClock';
import { SERVICES, PORTFOLIO, TESTIMONIALS, FAQS, TRUST_STATS, WHY_US_PILLARS } from './data';
import { Service, Project, Testimonial } from './types';

// Lazy loaded heavy 3D-effect UI components to minimize initial JS bundle size and TBT
const Interactive3DPortal = React.lazy(() => import('./components/Interactive3DPortal').then(m => ({ default: m.Interactive3DPortal })));
const Interactive3DChart = React.lazy(() => import('./components/Interactive3DChart').then(m => ({ default: m.Interactive3DChart })));

// Static date snapshots initialized once to avoid heavy continuous parent component ticks
const systemLoadTime = new Date();
const currentYear = systemLoadTime.getFullYear();
const mobileDateStr = systemLoadTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const fullReferenceDateStr = systemLoadTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

export default function App() {
  // Navigation State
  const [activeAnchor, setActiveAnchor] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Services Section Interactive States
  const [selectedServiceId, setSelectedServiceId] = useState('web-dev');
  const [serviceTierMultiplier, setServiceTierMultiplier] = useState<'catalyst' | 'enterprise'>('catalyst');
  const [activeServiceDetail, setActiveServiceDetail] = useState<Service | null>(null);
  const [simVisits, setSimVisits] = useState(25000);
  const [simAov, setSimAov] = useState(85);
  const [simHours, setSimHours] = useState(40);

  // ROI / Savings Calculator States
  const [calcServiceId, setCalcServiceId] = useState('web-dev');
  const [calcInputTraffic, setCalcInputTraffic] = useState(15000); // Monthly users
  const [calcInputAOV, setCalcInputAOV] = useState(80); // Average Order Value in USD
  const [calcInputHoursLost, setCalcInputHoursLost] = useState(45); // Admin hours lost per month
  const [calcStaffHourlyRate, setCalcStaffHourlyRate] = useState(35); // Average hourly rate in USD
  
  // Portfolio Expanded Case Study Modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // FAQ Accordion State
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Lead / Consultation Onboarding Flow States
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
    priorityOutcome: 'Multiply online inquiries & credibility',
    approxBudget: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [enquiryId, setEnquiryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Booking calendar state
  const [selectedBookingDate, setSelectedBookingDate] = useState<string>('');
  const [selectedBookingTime, setSelectedBookingTime] = useState<string>('');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('us-est');
  const [customTimeMode, setCustomTimeMode] = useState<boolean>(false);
  const [customTime, setCustomTime] = useState<string>('');

  // Set default booking date as tomorrow relative to 2026-06-02
  useEffect(() => {
    const dateTomorrow = new Date();
    dateTomorrow.setDate(dateTomorrow.getDate() + 1);
    const dayStr = dateTomorrow.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    setSelectedBookingDate(dayStr);
    setSelectedBookingTime('10:30 AM EST');
  }, []);

  // Soft scroll to sections helper
  const scrollToSection = (id: string) => {
    setActiveAnchor(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Dynamic calculations based on user slider parameters:
  const getCalculatorResults = () => {
    let currentConversion = 0.012; // Standard average template conversion 1.2%
    let optimizedConversion = 0.026; // Optimized sub-second speed conversion 2.6%
    
    if (calcServiceId === 'ecommerce') {
      currentConversion = 0.015;
      optimizedConversion = 0.034;
    }

    // Mathematical formula for premium leads or sales uplift:
    const currentMonthlySales = Math.round(calcInputTraffic * currentConversion);
    const optimizedMonthlySales = Math.round(calcInputTraffic * optimizedConversion);
    const monthlySalesDelta = optimizedMonthlySales - currentMonthlySales;
    const additionalMonthlyRevenue = monthlySalesDelta * calcInputAOV;
    const additionalAnnualRevenue = additionalMonthlyRevenue * 12;

    // Operational hours saved:
    const monthlyHrsSaved = Math.round(calcInputHoursLost * 0.75); // 75% automation accuracy rate
    const monthlySavingsUSD = monthlyHrsSaved * calcStaffHourlyRate;
    const annualSavingsUSD = monthlySavingsUSD * 12;

    // Strategic Recommendations text:
    let recommendedTier = 'Custom Growth Setup';
    let projectedImplementationTime = '4 - 6 Weeks';
    let primaryImpactFocus = 'Getting More Phone Calls & Bookings';

    if (calcServiceId === 'web-apps' || calcServiceId === 'business-systems') {
      recommendedTier = calcInputHoursLost > 60 ? 'Complete Team & Business Hub' : 'Simple Staff Scheduler';
      projectedImplementationTime = calcInputHoursLost > 60 ? '10 - 12 Weeks' : '5 - 7 Weeks';
      primaryImpactFocus = 'Saving Office & Staff Workhours';
    } else if (calcServiceId === 'mobile-apps') {
      recommendedTier = 'Smart Mobile Customer App';
      projectedImplementationTime = '8 - 10 Weeks';
      primaryImpactFocus = 'Keeping Customers Coming Back';
    } else if (calcServiceId === 'ecommerce') {
      recommendedTier = calcInputTraffic > 30000 ? 'Complete Online Food & Shop System' : 'Simple Food & Order Store';
      projectedImplementationTime = calcInputTraffic > 30000 ? '8 - 10 Weeks' : '4 - 6 Weeks';
      primaryImpactFocus = 'Speedy Checkout & Easy Payments';
    } else {
      // web-dev
      recommendedTier = calcInputTraffic > 20000 ? 'High-Traffic Business Website' : 'Beautiful Business Webpage';
      projectedImplementationTime = calcInputTraffic > 20000 ? '6 - 8 Weeks' : '3 - 4 Weeks';
    }

    return {
      currentMonthlyValue: currentMonthlySales,
      optimizedMonthlyValue: optimizedMonthlySales,
      growthDelta: monthlySalesDelta,
      revenueLift: additionalMonthlyRevenue,
      annualRevenueLift: additionalAnnualRevenue,
      hoursSaved: monthlyHrsSaved,
      monthlySavingsUSD,
      annualSavingsUSD,
      recommendedTier,
      projectedImplementationTime,
      primaryImpactFocus
    };
  };

  const calcResults = getCalculatorResults();

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out your Name, Email, and Mobile / WhatsApp Number so we can generate your strategy blueprint.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      // 1. Insert into Supabase table
      const { supabase } = await import('./supabaseClient');
      const { data, error } = await supabase
        .from('enquiries')
        .insert([
          {
            name: formData.name,
            company: formData.company || null,
            email: formData.email,
            phone: formData.phone,
            priority_outcome: formData.priorityOutcome,
            approx_budget: formData.approxBudget || null,
            notes: formData.notes || null
          }
        ])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setEnquiryId(data[0].id);
      }

      // 2. Send email via Web3Forms if key is set
      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3Key && web3Key !== 'YOUR_WEB3FORMS_KEY_HERE') {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject: 'New Website Enquiry - Byte Sutra',
            from_name: 'Byte Sutra Platform',
            to_email: 'bytesutra@gmail.com',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || 'Not Provided',
            priorityOutcome: formData.priorityOutcome,
            approxBudget: formData.approxBudget || 'Flexible',
            notes: formData.notes || 'No extra notes provided.'
          })
        });
      }

      setFormSubmitted(true);
      
      // Smooth scroll inside intake card to booker section
      setTimeout(() => {
        const element = document.getElementById('scheduler-anchor');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);

    } catch (err) {
      console.error('Error submitting enquiry to database:', err);
      alert('There was a connection issue processing your request. Standard offline logs have been captured. Please verify your internet and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Booking confirm handler
  const handleBookingConfirm = async () => {
    if (!selectedBookingDate) {
      alert('Please select an available booking date first.');
      return;
    }
    if (!selectedBookingTime) {
      alert('Please select an available time or enter your custom time slot.');
      return;
    }
    setIsSubmitting(true);
    try {
      // 1. Update existing row in Supabase
      if (enquiryId) {
        const { supabase } = await import('./supabaseClient');
        const { error } = await supabase
          .from('enquiries')
          .update({
            booking_date: selectedBookingDate,
            booking_time: selectedBookingTime,
            booking_timezone: selectedTimezone
          })
          .eq('id', enquiryId);
        
        if (error) throw error;
      }

      // 2. Send booking notification email via Web3Forms
      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3Key && web3Key !== 'YOUR_WEB3FORMS_KEY_HERE') {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            subject: 'Strategic Consultation Call Scheduled - Byte Sutra',
            from_name: 'Byte Sutra Platform',
            to_email: 'bytesutra@gmail.com',
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            booking_date: selectedBookingDate,
            booking_time: selectedBookingTime,
            booking_timezone: selectedTimezone
          })
        });
      }

      setBookingConfirmed(true);
    } catch (err) {
      console.error('Error scheduling appointment:', err);
      alert('There was an issue saving your call preferences. Your contact details are already secured. We will contact you directly to confirm the timing!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto pre-fill service form if they choose a custom calculator strategy
  const handleClaimProjection = () => {
    const selectedService = SERVICES.find(s => s.id === calcServiceId);
    setFormData(prev => ({
      ...prev,
      priorityOutcome: `Optimize ${selectedService?.title || 'Digital Systems'} & secure ROI projections`,
      notes: `Calculated metrics in ROI Estimator: Traffic: ${calcInputTraffic}, Admin hours: ${calcInputHoursLost}/mo. Estimated potential gain: $${calcResults.annualRevenueLift.toLocaleString()} per year. Recommended framework: ${calcResults.recommendedTier}.`
    }));
    scrollToSection('contact');
  };

  // Helper date lists for active schedulers (from June 3, 2026 onwards)
  const getBookingDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // We start booking dates tomorrow onwards relative to June 2, 2026
    const baseDate = new Date(2026, 5, 3); // June 3, 2026 is a Wednesday
    
    for (let i = 0; i < 5; i++) {
      const temp = new Date(baseDate.getTime());
      temp.setDate(baseDate.getDate() + i);
      // Skip weekends if we want to feel premium/professional
      if (temp.getDay() === 0 || temp.getDay() === 6) {
        temp.setDate(temp.getDate() + (temp.getDay() === 0 ? 1 : 2));
      }
      const dayName = weekdays[temp.getDay()];
      const monthName = months[temp.getMonth()];
      const dateNum = temp.getDate();
      days.push(`${dayName}, ${monthName} ${dateNum}`);
    }
    return days;
  };

  const bookingDays = getBookingDays();

  // Timezone-related types and data
  const countryTimezones = [
    { id: 'us-est', country: 'USA & Canada (Eastern)', timezoneLabel: 'EST', offsetHours: 0 },
    { id: 'us-cst', country: 'USA & Canada (Central)', timezoneLabel: 'CST', offsetHours: -1 },
    { id: 'us-mst', country: 'USA & Canada (Mountain)', timezoneLabel: 'MST', offsetHours: -2 },
    { id: 'us-pst', country: 'USA & Canada (Pacific)', timezoneLabel: 'PST', offsetHours: -3 },
    { id: 'uk', country: 'United Kingdom', timezoneLabel: 'BST/GMT', offsetHours: 5 },
    { id: 'europe', country: 'Europe (Paris/Berlin)', timezoneLabel: 'CEST/CET', offsetHours: 6 },
    { id: 'india', country: 'India', timezoneLabel: 'IST', offsetHours: 9.5 },
    { id: 'singapore', country: 'Singapore & Malaysia', timezoneLabel: 'SGT', offsetHours: 12 },
    { id: 'australia', country: 'Australia (Sydney/AEST)', timezoneLabel: 'AEST', offsetHours: 14 },
    { id: 'nz', country: 'New Zealand', timezoneLabel: 'NZST', offsetHours: 16 }
  ];

  const convertEstTimeToLocal = (baseEstTime: string, offsetHours: number, timezoneLabel: string): string => {
    const [timePart, modifier] = baseEstTime.split(' ');
    const [hourStr, minuteStr] = timePart.split(':');
    let hour = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);
    
    if (modifier === 'PM' && hour !== 12) {
      hour += 12;
    } else if (modifier === 'AM' && hour === 12) {
      hour = 0;
    }
    
    const baseMinutesFromMidnight = hour * 60 + minutes;
    const offsetMinutes = Math.round(offsetHours * 60);
    let localMinutesFromMidnight = baseMinutesFromMidnight + offsetMinutes;
    
    let dayIndicator = '';
    if (localMinutesFromMidnight >= 1440) {
      localMinutesFromMidnight = localMinutesFromMidnight % 1440;
      dayIndicator = ' (+1 Day)';
    } else if (localMinutesFromMidnight < 0) {
      localMinutesFromMidnight = (localMinutesFromMidnight + 1440) % 1440;
      dayIndicator = ' (-1 Day)';
    }
    
    let localHour = Math.floor(localMinutesFromMidnight / 60);
    const localMinutes = localMinutesFromMidnight % 60;
    
    const ampm = localHour >= 12 ? 'PM' : 'AM';
    localHour = localHour % 12;
    localHour = localHour ? localHour : 12;
    
    const formattedMinutes = localMinutes < 10 ? '0' + localMinutes : localMinutes;
    
    return `${localHour}:${formattedMinutes} ${ampm} ${timezoneLabel}${dayIndicator}`;
  };

  const baseBookingTimes = ['9:00 AM', '10:30 AM', '1:00 PM', '3:00 PM', '4:30 PM'];

  const getLocalBookingTimes = () => {
    const activeTz = countryTimezones.find(t => t.id === selectedTimezone) || countryTimezones[0];
    return baseBookingTimes.map(baseTime => convertEstTimeToLocal(baseTime, activeTz.offsetHours, activeTz.timezoneLabel));
  };

  const handleTimezoneChange = (tzId: string) => {
    setSelectedTimezone(tzId);
    const nextTz = countryTimezones.find(t => t.id === tzId) || countryTimezones[0];
    
    if (customTimeMode) {
      if (customTime) {
        setSelectedBookingTime(`${customTime} ${nextTz.timezoneLabel}`);
      } else {
        setSelectedBookingTime('');
      }
      return;
    }
    
    const activeTz = countryTimezones.find(t => t.id === selectedTimezone) || countryTimezones[0];
    const renderedSlotsInPrevTz = baseBookingTimes.map(baseTime => 
      convertEstTimeToLocal(baseTime, activeTz.offsetHours, activeTz.timezoneLabel)
    );
    
    const selectedIdx = renderedSlotsInPrevTz.indexOf(selectedBookingTime);
    if (selectedIdx !== -1) {
      const nextSlot = convertEstTimeToLocal(baseBookingTimes[selectedIdx], nextTz.offsetHours, nextTz.timezoneLabel);
      setSelectedBookingTime(nextSlot);
    } else {
      setSelectedBookingTime(convertEstTimeToLocal('10:30 AM', nextTz.offsetHours, nextTz.timezoneLabel));
    }
  };

  const handleCustomTimeChange = (val: string) => {
    setCustomTime(val);
    const activeTz = countryTimezones.find(t => t.id === selectedTimezone) || countryTimezones[0];
    setSelectedBookingTime(val ? `${val} ${activeTz.timezoneLabel}` : '');
  };

  const bookingTimes = getLocalBookingTimes();

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#0ea5e9]/20 selection:text-slate-900">
      
      {/* IMMERSIVE FULL-SCREEN DETAILED SERVICE VIEW */}
      <AnimatePresence>
        {activeServiceDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 overflow-y-auto"
          >
            {/* Immersive Dark Cosmic Grid Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-950 to-black opacity-95 pointer-events-none z-0" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none z-0" />

            {/* Sub-Aura Glow Lamps */}
            <div className="absolute -top-40 left-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-16 text-slate-100 flex flex-col min-h-screen">
              
              {/* Operations Control Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-white/10 pb-8 mb-12">
                <button
                  onClick={() => {
                    setActiveServiceDetail(null);
                    const servicesSection = document.getElementById('services');
                    if (servicesSection) {
                      servicesSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="cursor-pointer group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-mono font-bold uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#93c5fd]" />
                  <span>← Back to Overview</span>
                </button>

                <div className="flex items-center gap-2">
                  <ByteSutraLogo showText={true} textSize="md" iconSize={36} className="text-white fill-white brightness-0 invert" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#93c5fd] font-extrabold bg-[#1e3b8a]/25 border border-[#1e3b8a]/30 rounded-md px-2 py-0.5">
                    Deep Diagnostic View
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/5 rounded-full px-4 py-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span className="font-mono">{fullReferenceDateStr} • GMT-5</span>
                </div>
              </div>

              {/* Showcase Grid Structure */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
                
                {/* LEFT BAR: Capabilities & Value metrics */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  <div>
                    <span className="text-xs font-mono font-extrabold text-[#93c5fd] tracking-widest uppercase bg-[#1e3a8a]/30 border border-[#1e3a8a]/45 rounded-full px-4 py-1.5 shadow">
                      {activeServiceDetail.tagline}
                    </span>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-white mt-6 mb-5 tracking-tight leading-tight">
                      {activeServiceDetail.title}
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      {activeServiceDetail.description}
                    </p>
                  </div>

                  {/* Side by side benefits & deliverables */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Business Impact Box */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                      <h3 className="text-xs font-mono font-extrabold uppercase text-[#93c5fd] tracking-widest mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        Business Impact Focus
                      </h3>
                      <div className="flex flex-col gap-3.5">
                        {activeServiceDetail.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-300 leading-relaxed font-semibold">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Engineering Artifacts Deliverable Box */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                      <h3 className="text-xs font-mono font-extrabold uppercase text-[#7c3aed] tracking-widest mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Engineered Deliverables
                      </h3>
                      <div className="flex flex-col gap-3.5">
                        {activeServiceDetail.deliverables.map((del, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5">
                            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-200 leading-relaxed font-bold">
                              {del}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Interactive Metrics Forecast Simulator Box */}
                  <div className="bg-gradient-to-br from-indigo-950/45 via-slate-950 to-blue-950/20 border border-white/10 rounded-[2.5rem] p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2.5 mb-6">
                      <TrendingUp className="w-5 h-5 text-[#93c5fd]" />
                      <h3 className="text-md font-bold tracking-tight text-white">
                        Interactive Operational Return Simulator
                      </h3>
                    </div>

                    {activeServiceDetail.id === 'web-dev' || activeServiceDetail.id === 'ecommerce' ? (
                      <div className="space-y-6">
                        <p className="text-xs text-slate-400">
                          Simulate how bespoke optimization and lightning fast loads boost your daily customer appointments or orders.
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                              <span>Monthly Operations Traffic (Site Visits)</span>
                              <span className="text-[#93c5fd] font-mono">{simVisits.toLocaleString()}</span>
                            </div>
                            <input
                              type="range"
                              min="1000"
                              max="100000"
                              step="1000"
                              value={simVisits}
                              onChange={(e) => setSimVisits(Number(e.target.value))}
                              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#93c5fd]"
                            />
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                              <span>Average Order Value</span>
                              <span className="text-emerald-400 font-mono">${simAov}</span>
                            </div>
                            <input
                              type="range"
                              min="20"
                              max="500"
                              step="5"
                              value={simAov}
                              onChange={(e) => setSimAov(Number(e.target.value))}
                              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#22c55e]"
                            />
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                              Projected Annual Revenue Lift
                            </span>
                            <p className="text-xs text-slate-300 mt-1">Based on standard conversions jumping from 1.2% to 3.4%</p>
                          </div>
                          <span className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                            +${Math.round(simVisits * 0.022 * simAov * 12).toLocaleString()} / Yr
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <p className="text-xs text-slate-400">
                          Simulate how system synchronization and automated crew/appointment logs eliminate admin overhead.
                        </p>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                            <span>Estimated Admin Hours Lost per Week</span>
                            <span className="text-[#93c5fd] font-mono">{simHours} Hours</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="100"
                            step="1"
                            value={simHours}
                            onChange={(e) => setSimHours(Number(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#93c5fd]"
                          />
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                          <div>
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                              Annual Hours Reclaimed
                            </span>
                            <p className="text-xs text-slate-300 mt-1">Automated validation saves ~80% of routine logs</p>
                          </div>
                          <span className="text-2xl sm:text-3xl font-black text-purple-400 tracking-tight">
                            {Math.round(simHours * 52 * 0.8)} Hours / Yr
                          </span>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* RIGHT BAR: Immersive 3D Stages */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  
                  {/* Immersive 3D Rotating Portal Frame */}
                  <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#7c3aed] uppercase">
                          Operational System Stage
                        </span>
                        <h4 className="text-xs font-bold text-slate-300 mt-0.5">
                          Spin state with responsive gesture tracking
                        </h4>
                      </div>

                      <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        3D Active
                      </span>
                    </div>

                    {/* Rendering rotating 3D interface */}
                    <div className="py-2">
                      <React.Suspense fallback={<div className="w-full h-[520px] rounded-[3rem] bg-slate-800/10 animate-pulse flex items-center justify-center text-slate-400 text-xs font-mono">Initializing Core...</div>}>
                        <Interactive3DPortal />
                      </React.Suspense>
                    </div>
                  </div>

                  {/* Custom Compiled Deployment Timeline */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden backdrop-blur-md">
                    <h4 className="text-xs font-mono font-extrabold uppercase text-slate-300 tracking-widest mb-6 border-b border-white/10 pb-4">
                      Bespoke Compile & Alignment Workflow
                    </h4>

                    <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                      
                      <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-[#1e3a8a] border border-[#93c5fd]/30 flex items-center justify-center text-[10px] font-bold text-white shrink-0 z-10">
                          1
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">Commercial Objectives Structuring</h5>
                          <p className="text-[11px] text-slate-400 leading-normal mt-1">
                            We detail specific ROI milestones, transaction bottlenecks, and localized Google keyword targets.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-purple-900 border border-purple-400/30 flex items-center justify-center text-[10px] font-bold text-white shrink-0 z-10">
                          2
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">Bespoke Structural Wireframing & Layout</h5>
                          <p className="text-[11px] text-slate-400 leading-normal mt-1">
                            No clunky predesigned builder. We draft user paths and wireframes specific to your client behaviors.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 relative">
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-white shrink-0 z-10">
                          3
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">Optimized Hand-Zipping Code</h5>
                          <p className="text-[11px] text-slate-400 leading-normal mt-1">
                            We compile and load-test layout files for sub-second responses and flawless viewport rendering.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>

              {/* Dynamic Performance metrics Comparison Section (3D Charts stage) */}
              <div className="mb-16 min-h-[380px]">
                <React.Suspense fallback={<div className="w-full max-w-4xl mx-auto h-[380px] rounded-[2.5rem] bg-slate-800/10 animate-pulse flex items-center justify-center text-slate-400 text-xs font-mono">Initializing Engine Chart...</div>}>
                  <Interactive3DChart />
                </React.Suspense>
              </div>

              {/* Immersive CTA conversion block */}
              <div className="mt-auto">
                <div className="bg-gradient-to-r from-blue-950 via-[#1e3a8a] to-indigo-950 border border-white/20 rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[110px]" />
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-[110px]" />
                  
                  <span className="text-[10px] font-mono uppercase tracking-widest font-black text-amber-300 bg-white/10 rounded-full px-4.5 py-1.5">
                    Operational Partnership Slot
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-6 mb-4 max-w-2xl mx-auto">
                    Ready to establish {activeServiceDetail.title} for your enterprise?
                  </h2>

                  <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
                    Lock in an intake strategy slot. Once submitted, our system maps diagnostic steps and unlocks the direct partner dashboard of record.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          priorityOutcome: `Optimize ${activeServiceDetail.title} for our brand`,
                          notes: `Strategy Intake request generated directly from Immersive 3D Studio for ${activeServiceDetail.title}.`
                        }));
                        setActiveServiceDetail(null);
                        setTimeout(() => {
                          scrollToSection('contact');
                        }, 350);
                      }}
                      className="cursor-pointer w-full sm:w-auto group flex items-center justify-center gap-3 bg-white text-slate-900 text-xs font-extrabold uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl hover:bg-[#93c5fd] transition-all"
                    >
                      Lock in Service Strategy
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#1e3a8a]" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveServiceDetail(null);
                        const servicesSection = document.getElementById('services');
                        if (servicesSection) {
                          servicesSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="cursor-pointer w-full sm:w-auto text-xs font-bold text-slate-300 hover:text-white px-6 py-4 rounded-full transition-colors border border-white/10 hover:bg-white/5"
                    >
                      Keep Browsing Other Capabilities
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AMBIENT GLOW SYSTEM (GLASSMORPHISM ATMOSPHERE) */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] left-[5%] w-[45vw] h-[45vw] max-w-[700px] rounded-full bg-blue-400/15 blur-[130px] animate-blob-1" />
        <div className="absolute top-[15%] right-[5%] w-[40vw] h-[40vw] max-w-[600px] rounded-full bg-indigo-400/15 blur-[110px] animate-blob-2" />
        <div className="absolute top-[40%] left-[20%] w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-purple-400/12 blur-[100px] animate-blob-3" />
        <div className="absolute top-[65%] right-[20%] w-[30vw] h-[30vw] max-w-[450px] rounded-full bg-sky-300/10 blur-[90px] animate-blob-1" />
      </div>

      {/* FIXED STRATEGIC TOP BAR (TIME-STAMPED PARTNERSHIP CLARITY) */}
      <div className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 transition-all">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mx-auto max-w-7xl rounded-full glass-panel border-white/60 shadow-[0_12px_40px_0_rgba(15,23,42,0.06)] px-6 py-3 flex items-center justify-between"
        >
          {/* Logo Brand Frame with Hover Spring Popup */}
          <motion.button 
            onClick={() => scrollToSection('hero')} 
            className="cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <ByteSutraLogo showText={true} textSize="md" iconSize={42} />
          </motion.button>

          {/* Desktop Navigation Link Capsule */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/45 border border-slate-200/40 rounded-full p-1.5 shadow-inner">
            {[
              { id: 'hero', name: 'Home' },
              { id: 'services', name: 'Services' },
              { id: 'cases', name: 'Completed Projects' },
              { id: 'calculator', name: 'ROI Planner' },
              { id: 'philosophy', name: 'Our Philosophy' },
              { id: 'faq', name: 'FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => scrollToSection(tab.id)}
                className="relative px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-colors duration-300 z-10 cursor-pointer text-slate-600 hover:text-[#1e3a8a]"
              >
                {activeAnchor === tab.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[#1e3a8a] rounded-full -z-10 shadow-[0_4px_12px_rgba(30,58,138,0.2)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={activeAnchor === tab.id ? 'text-white' : ''}>
                  {tab.name}
                </span>
              </button>
            ))}
          </nav>

          {/* Desktop Call To Action Trigger */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live timezone pulse */}
            <PartnerClock />
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.04, boxShadow: "0 10px 25px -3px rgba(14,165,233,0.3)" }}
              whileTap={{ scale: 0.96 }}
              className="group cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-[#0ea5e9] text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/15 transition-all duration-300"
            >
              Request Strategy Call
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Mobile Navigation Trigger Icon */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-full text-slate-700 bg-white/40 border border-slate-200/50 hover:bg-white/80 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </motion.header>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-20 left-4 right-4 rounded-3xl glass-dropdown border border-slate-200/70 p-6 flex flex-col gap-4 shadow-xl z-50"
            >
              <div className="flex flex-col gap-2">
                {[
                  { id: 'hero', name: 'Home Landing' },
                  { id: 'services', name: 'Strategic Outcomes' },
                  { id: 'cases', name: 'Completed Projects' },
                  { id: 'calculator', name: 'Interactive ROI Estimator' },
                  { id: 'philosophy', name: 'Logo & Core Values' },
                  { id: 'faq', name: 'Strategic FAQ' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      activeAnchor === tab.id
                        ? 'bg-gradient-to-r from-[#1e3a8a] to-[#0ea5e9] text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100/50'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-200/60 pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center px-4">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase">
                    Partner Schedule
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-600">
                    {mobileDateStr} — GMT-5
                  </span>
                </div>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full flex items-center justify-center gap-2 bg-[#1e3a8a] text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-2xl shadow-lg"
                >
                  Request Strategy Call
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="relative z-10 px-4 max-w-7xl mx-auto">
        
        {/* --- SECTION 1: HERO OUTCOMES VIEW WITH MOTION STAGGER --- */}
        <section id="hero" className="scroll-mt-20 pt-6 pb-16 md:pt-16 md:pb-28 flex flex-col items-center text-center">
          
          {/* Subtle Accent Notification */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 md:mb-8 flex items-center gap-2 bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 rounded-full px-4 py-1.5 md:px-5 md:py-2 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1479ea] animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-wider text-[#1e3a8a]">
              Your Friendly Tech Partners
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span className="text-[10px] md:text-[11px] font-sans font-bold text-[#7c3aed]">
              Zero Confusing Jargon
            </span>
          </motion.div>

          {/* Master Display Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-5 md:mb-8"
          >
            We build beautiful <span className="text-gradient">digital homes</span> for your business and unique craft.
          </motion.h1>

          {/* Structured Value Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-slate-600 text-sm sm:text-lg md:text-xl font-normal leading-relaxed mb-8 md:mb-12 px-2"
          >
            Byte Sutra replaces messy templates with custom-made websites, friendly client portals, online delivery setup, and easy shift planners. We handle layout design and coding in plain language so you can focus on your local customers.
          </motion.p>

          {/* Master CTA Container */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 md:mb-24 w-full sm:w-auto px-4 sm:px-0"
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(30,58,138,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto group cursor-pointer flex items-center justify-center gap-3 bg-[#1e3a8a] text-white text-xs md:text-sm font-bold tracking-wider uppercase px-6 py-3.5 md:px-8 md:py-4.5 rounded-full shadow-xl transition-all duration-300"
            >
              Let's Build Your Website
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>
            
            <motion.a
              href="https://wa.me/919272503104?text=Hi!%20I'm%20interested%20in%20building%20a%20website%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(16,185,129,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 text-xs md:text-sm font-bold tracking-wider uppercase px-6 py-3.5 md:px-8 md:py-4.5 rounded-full shadow-md border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-md"
            >
              Chat on WhatsApp
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/10 animate-bounce" />
            </motion.a>
          </motion.div>

          {/* Interactive 3D Holographic Portal (Curiosity & visual magnet, especially stunning on mobile!) */}
          <React.Suspense fallback={<div className="w-full max-w-lg mx-auto h-[520px] rounded-[3rem] bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-xs font-mono">Initializing Core...</div>}>
            <Interactive3DPortal />
          </React.Suspense>

          {/* Interactive Core Business Benefits Frame with Stagger & Hover Squeeze */}
          <div className="w-full max-w-5xl mb-24">
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08 }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-2 bg-slate-200/40 rounded-[2.5rem] border border-white/80 backdrop-blur-md shadow-inner"
            >
              {[
                {
                  title: 'Better Online Presence',
                  desc: 'Beautiful customized interfaces that earn absolute trust from premium prospects.',
                  iconColor: 'text-[#1e3a8a]'
                },
                {
                  title: 'More Trust from Customers',
                  desc: 'Frictionless, secure web environments with verified SSL safety standards and speed metrics.',
                  iconColor: 'text-[#0ea5e9]'
                },
                {
                  title: 'More Leads & Inquiries',
                  desc: 'High-conversion flow forms and interactive tools designed to capture target audiences.',
                  iconColor: 'text-[#7c3aed]'
                },
                {
                  title: 'Streamlined Experience',
                  desc: 'Eliminating administrative drag with automated cloud application tools.',
                  iconColor: 'text-[#22c55e]'
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                  }}
                  whileHover={{ y: -8, scale: 1.025 }}
                  className="bg-white/70 hover:bg-white/95 rounded-[2rem] p-6 border border-white/90 text-left shadow-[0_4px_24px_rgba(15,23,42,0.02)] hover:shadow-xl transition-all duration-300 group cursor-default"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] group-hover:scale-125 transition-transform" />
                    <h3 className="font-bold text-sm tracking-tight text-slate-900 group-hover:text-[#1e3a8a] transition-colors">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                    {benefit.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- CORPORATE METRICS BAR (Immediate Trust Anchor with Smooth Fade) --- */}
          <div className="w-full max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl glass-panel border border-white/60 p-8 md:p-10 shadow-[0_12px_45px_-5px_rgba(15,23,42,0.04)]"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-left max-w-sm">
                  <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-[#1e3a8a]">
                    Verified Performance
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 mt-1 mb-2">
                    Commercial Results Delivered
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We mathematically map every line of software we deploy back to client profitability margins and corporate overhead reductions.
                  </p>
                </div>

                <div className="w-full lg:w-auto h-px lg:h-12 bg-slate-200/70" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full lg:w-auto">
                  {TRUST_STATS.map((stat, idx) => (
                    <div key={idx} className="text-center sm:text-left">
                      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-1">
                        <span className="text-gradient font-sans font-black">{stat.value}</span>
                        {idx === 2 && <span className="text-xs text-[#22c55e] font-sans">★</span>}
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider font-mono">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </section>


        {/* --- SECTION 2: SERVICES DECISION ENGINE (Redesigned No-Scroll Grid layout) --- */}
        <section id="services" className="pt-10 pb-20 scroll-mt-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-[#7c3aed] uppercase tracking-widest bg-purple-50 border border-purple-100 rounded-full px-3 py-1">
              Business Capabilities Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Digital Systems Engineered for Profitability
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Instead of technical programming frameworks, we discuss your goals. We align custom code with quantifiable operational efficiencies, better buyer convenience, and massive scaling limits. Click any service card to launch its immersive 3D diagnostic experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, index) => {
              // Helper icon renderer
              const getServiceIcon = (name: string, color: string) => {
                 switch (name) {
                   case 'Globe': return <Globe className={`w-6 h-6 ${color}`} />;
                   case 'Cpu': return <Cpu className={`w-6 h-6 ${color}`} />;
                   case 'Smartphone': return <Smartphone className={`w-6 h-6 ${color}`} />;
                   case 'ShoppingBag': return <ShoppingBag className={`w-6 h-6 ${color}`} />;
                   default: return <Database className={`w-6 h-6 ${color}`} />;
                 }
              };

              return (
                <motion.div
                  key={s.id}
                  whileHover={{ y: -6, scale: 1.015, boxShadow: "0 20px 40px rgba(30,58,138,0.04)" }}
                  className="bg-white border border-slate-200/80 rounded-[2rem] p-6 text-left flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle index outline floating background */}
                  <span className="absolute top-4 right-6 text-5xl font-black font-mono text-slate-100 select-none group-hover:text-blue-50 transition-colors pointer-events-none">
                    0{index + 1}
                  </span>

                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-2xl bg-blue-50/70 border border-blue-100/50 flex items-center justify-center mb-5 group-hover:bg-[#1e3a8a]/5 group-hover:border-[#1e3a8a]/20 transition-all">
                      {getServiceIcon(s.iconName, 'text-[#1e3a8a]')}
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#1e3a8a] transition-colors leading-tight mb-2.5">
                      {s.title}
                    </h3>

                    {/* Highly readable, important tagline value hook */}
                    <p className="text-xs font-bold uppercase tracking-wide mb-3 text-[#7c3aed]">
                      {s.tagline}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-8">
                      {s.description.slice(0, 160)}...
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      Deep Diagnostic Setup
                    </span>
                    <button
                      onClick={() => {
                        setActiveServiceDetail(s);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="cursor-pointer font-bold text-xs text-[#1e3a8a] group-hover:text-[#1479ea] flex items-center gap-1.5 transition-colors"
                    >
                      <span>Explore 3D Stage</span>
                      <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-all group-hover:translate-x-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Custom Integration Strategy Card */}
            <motion.div
              whileHover={{ y: -6, scale: 1.015 }}
              className="bg-gradient-to-br from-blue-950 via-indigo-950 to-[#1e3a8a] text-white border border-blue-900 rounded-[2rem] p-6 text-left flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="font-extrabold text-[#93c5fd] text-md leading-tight mb-2">
                  Have a bespoke software or business idea in mind?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal mt-2">
                  Our partners specialize in designing custom logical models for local leaders. We’ll map out clear strategy options free of charge.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Partner Intake Active
                </span>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="cursor-pointer text-xs font-bold text-white hover:text-sky-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Book Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>

        </section>


        {/* --- SECTION 4: OUR COMPLETED PROJECTS (Upgraded Cards and Spring modal) --- */}
        <section id="cases" className="pt-10 pb-20 scroll-mt-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-[#7c3aed] uppercase tracking-widest bg-purple-50 border border-purple-100 rounded-full px-3 py-1">
              Our Completed Projects
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Real Examples of How We Help
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Read how we helped local home builders, bakeries, community schools, and contractors save money and grow. Click any card below to see the details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO.map((p) => (
              <motion.div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group cursor-pointer rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 text-left shadow-sm hover:shadow-xl hover:border-[#1e3a8a]/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Category and Industry Metadata */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-wider font-extrabold uppercase text-slate-400">
                      {p.industry}
                    </span>
                    <span className="text-[10px] font-bold text-[#1e3a8a] bg-blue-50/70 border border-blue-100 rounded-full px-3.5 py-1.5 backdrop-blur-sm">
                      {p.category}
                    </span>
                  </div>

                  {/* Headline Title */}
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#1e3a8a] transition-colors">
                    {p.title}
                  </h3>

                  {/* High Quality Tagline */}
                  <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2.5 mb-6">
                    {p.tagline}
                  </p>

                  {/* Prime Metric Highlight Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-100 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-sans font-bold text-slate-400 uppercase tracking-widest block leading-none">
                        Engineered Metric Target
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold block mt-1.5">
                        Deployment duration: {p.duration}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-slate-900 tracking-tight block">
                        {p.metrics.value}
                      </span>
                      <span className="text-[9px] font-bold text-[#22c55e] uppercase tracking-wider block">
                        {p.metrics.label}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Call Out To Open Case Study */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-[#1e3a8a] group-hover:text-[#1479ea] transition-colors mt-6">
                  <span>Explore Transformation Mechanics</span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 group-hover:translate-x-1.5 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Interactive Case study Drawer / Modal (Frosted iridescent Glass container inside AnimatePresence) */}
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                
                {/* Backdrop Blur screen */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute inset-0 bg-slate-950/45 backdrop-blur-md"
                />

                {/* Spring Pop Container */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.94, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  className="w-full max-w-3xl rounded-[2.5rem] glass-panel border border-white p-6 sm:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto glow-royal z-10 text-left"
                >
                  {/* Close Button Anchor */}
                  <motion.button
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute top-6 right-6 p-2 rounded-full text-slate-500 hover:text-slate-900 bg-white shadow hover:scale-105 transition-all outline-none cursor-pointer"
                    aria-label="Close modal dialog"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  {/* Modal Title Frame */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-bold text-[#7c3aed] uppercase tracking-widest bg-purple-50 px-2.5 py-0.5 rounded-md">
                        {selectedProject.industry} Case Story
                      </span>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="text-xs font-bold text-slate-500">
                        Partner Client: {selectedProject.clientName}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug mb-2">
                       {selectedProject.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold mb-6">
                      {selectedProject.category} • Completed in {selectedProject.duration}
                    </p>
                  </div>

                  {/* Substantive Outcome Metrics Board */}
                  <div className="px-6 py-4.5 rounded-3xl bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 mb-8 flex items-center justify-between backdrop-blur-sm">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-slate-400">
                        Bottom-Line Outcome
                      </span>
                      <span className="text-slate-800 font-extrabold block text-sm sm:text-base mt-0.5">
                        {selectedProject.metrics.label}
                      </span>
                    </div>

                    <span className="text-3xl sm:text-4xl font-black text-[#1e3a8a] tracking-tight">
                      {selectedProject.metrics.value}
                    </span>
                  </div>

                  {/* Multi-layered story breakdown (No tech larping, pure commercial alignment) */}
                  <div className="space-y-6">
                    
                    {/* Part 1: Challenge */}
                    <div className="p-5.5 rounded-2xl bg-white/55 border border-slate-200/50 backdrop-blur-sm shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-slate-900 font-extrabold text-xs tracking-wider uppercase">
                        <HelpCircle className="w-4 h-4 text-rose-500" />
                        The Commercial Challenge
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    {/* Part 2: Solution */}
                    <div className="p-5.5 rounded-2xl bg-white/55 border border-slate-200/50 backdrop-blur-sm shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-slate-900 font-extrabold text-xs tracking-wider uppercase">
                        <Lightbulb className="w-4 h-4 text-emerald-500" />
                        Our Custom Digital Engineering
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {selectedProject.solution}
                      </p>
                    </div>

                    {/* Part 3: Outcome */}
                    <div className="p-5.5 rounded-2xl bg-white/55 border border-slate-200/50 backdrop-blur-sm shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-slate-900 font-extrabold text-xs tracking-wider uppercase">
                        <TrendingUp className="w-4 h-4 text-[#1479ea]" />
                        Realized Business Outcome
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                        {selectedProject.outcome}
                      </p>
                    </div>

                  </div>

                  {/* Implemented engineering stacks list */}
                  <div className="mt-8 pt-6 border-t border-slate-200/60">
                    <h4 className="text-[10px] font-mono tracking-widest text-slate-400 font-extrabold uppercase mb-3">
                      Bespoke Pipelines Implemented
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.servicesProvided.map((serv, index) => (
                        <span
                          key={index}
                          className="text-[10px] font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50"
                        >
                          {serv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Frame to lock consultation */}
                  <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-slate-500 font-semibold">
                      Want to achieve similar strategic outcomes?
                    </span>
                    
                    <div className="flex gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          setSelectedProject(null);
                          scrollToSection('contact');
                        }}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1e3a8a] text-white text-xs font-bold tracking-wider uppercase px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer hover:bg-blue-800"
                      >
                        Inquire About This Framework
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="w-full sm:w-auto text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl transition-all cursor-pointer"
                      >
                        Dismiss View
                      </button>
                    </div>
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </section>


        {/* --- SECTION 3: INTERACTIVE ROI PROJECTION PANEL --- */}
        <section id="calculator" className="pt-10 pb-20 scroll-mt-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-[#0ea5e9] uppercase tracking-widest bg-sky-50 border border-sky-100 rounded-full px-3 py-1">
              Simulate Your Savings & Growth
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              See How Much Time & Money You Can Save
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Plug in your numbers below to see how a beautiful, fast website or booking portal can bring in more local clients and free up your busy schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column Parameters Modifiers */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-[2.5rem] bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <h3 className="font-extrabold text-md text-slate-900 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#0ea5e9]" />
                    Step 1: Set Your Current Numbers
                  </h3>
                  
                  {/* Service selector in calculator */}
                  <select
                    value={calcServiceId}
                    onChange={(e) => setCalcServiceId(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#0ea5e9] cursor-pointer"
                  >
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                {/* Symmetrical Slider Group depending on selected category */}
                <div className="space-y-6">
                  
                  {/* Traffic slider (only relevant to consumer/marketing systems) */}
                  {(calcServiceId === 'web-dev' || calcServiceId === 'ecommerce' || calcServiceId === 'mobile-apps') && (
                    <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-xs font-bold text-slate-600">Approx. Monthly Website Visitors</span>
                        <span className="text-xs font-mono font-extrabold bg-[#0ea5e9]/10 text-[#0ea5e9] px-3 py-1 rounded-full">
                          {calcInputTraffic.toLocaleString()} visitors
                        </span>
                      </div>
                      <input
                        type="range"
                        min="2000"
                        max="150000"
                        step="1000"
                        value={calcInputTraffic}
                        onChange={(e) => setCalcInputTraffic(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>2k</span>
                        <span>50k</span>
                        <span>100k</span>
                        <span>150k+</span>
                      </div>
                    </div>
                  )}

                  {/* Average Order Value / Lead Value slider (convertible value) */}
                  {(calcServiceId === 'web-dev' || calcServiceId === 'ecommerce' || calcServiceId === 'mobile-apps') && (
                    <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className="text-xs font-bold text-slate-600">Average Spend per Customer (AOV or Order size)</span>
                        <span className="text-xs font-mono font-extrabold bg-[#7c3aed]/10 text-[#7c3aed] px-3 py-1 rounded-full">
                          ${calcInputAOV} USD
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="500"
                        step="5"
                        value={calcInputAOV}
                        onChange={(e) => setCalcInputAOV(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                        <span>$10</span>
                        <span>$150</span>
                        <span>$300</span>
                        <span>$500</span>
                      </div>
                    </div>
                  )}

                  {/* Administrative hours lost slider (highly relevant to apps and internal tracking) */}
                  <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-xs font-bold text-slate-600">Hours Spent on Boring Paperwork & Manual Bookings / Month</span>
                      <span className="text-xs font-mono font-extrabold bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded-full">
                        {calcInputHoursLost} Hrs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={calcInputHoursLost}
                      onChange={(e) => setCalcInputHoursLost(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#22c55e]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>10 hr</span>
                      <span>50 hr</span>
                      <span>120 hr</span>
                      <span>200 hr+</span>
                    </div>
                  </div>

                  {/* Staff loaded salary modifier */}
                  <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-xs font-bold text-slate-600">Hourly Cost of Your Staff (or Your Time)</span>
                      <span className="text-xs font-mono font-extrabold bg-slate-600/15 text-slate-700 px-3 py-1 rounded-full">
                        ${calcStaffHourlyRate}/Hr USD
                      </span>
                    </div>
                    <input
                      type="range"
                      min="15"
                      max="120"
                      step="5"
                      value={calcStaffHourlyRate}
                      onChange={(e) => setCalcStaffHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                      <span>$15/hr</span>
                      <span>$45/hr</span>
                      <span>$80/hr</span>
                      <span>$120/hr</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tactical Explanation Checklist */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between text-slate-500 text-xs text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span>Based on real results from local custom websites</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span>Calculated from average service time saved</span>
                </div>
              </div>

            </div>

            {/* Right Column: Outcomes Glass Display Badge with beautiful spring counters */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-[2.5rem] glass-panel border border-white p-6 sm:p-8 shadow-xl text-left text-slate-900 glow-royal relative overflow-hidden">
              
              {/* Internal subtle background watermark */}
              <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.035] select-none translate-x-[15%] translate-y-[15%]">
                <ByteSutraLogo showText={false} iconSize={260} />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#1e3a8a] uppercase bg-[#1e3a8a]/5 px-3 py-1 rounded-full border border-[#1e3a8a]/5 backdrop-blur-md">
                  Estimated Result
                </span>

                {/* Simulated Revenue Increment Loop */}
                {(calcServiceId === 'web-dev' || calcServiceId === 'ecommerce' || calcServiceId === 'mobile-apps') ? (
                  <div className="mt-6 mb-6">
                    <span className="text-xs font-semibold text-slate-400">Extra Estimated Sales for Your Business:</span>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-2.5 tracking-tight flex items-baseline">
                      <motion.span 
                        key={calcResults.annualRevenueLift}
                        initial={{ opacity: 0.5, scale: 0.93, y: 3 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="text-gradient block"
                        transition={{ type: "spring", stiffness: 350, damping: 18 }}
                      >
                        +${calcResults.annualRevenueLift.toLocaleString()}
                      </motion.span>
                      <span className="text-sm font-bold text-slate-500 font-mono ml-1">/ Year</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 font-medium leading-relaxed">
                      Based on highly responsive pages that make pre-ordering, calling, or booking simple for your local clients.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 mb-6">
                    <span className="text-xs font-semibold text-slate-400">Total Hours Freed Up For You:</span>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-2.5 tracking-tight flex items-baseline">
                      <motion.span 
                        key={calcResults.hoursSaved}
                        initial={{ opacity: 0.5, scale: 0.93, y: 3 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="text-gradient-purple block"
                        transition={{ type: "spring", stiffness: 350, damping: 18 }}
                      >
                        {calcResults.hoursSaved * 12} Hrs
                      </motion.span>
                      <span className="text-sm font-bold text-slate-500 font-mono ml-1">/ Year</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 font-medium leading-relaxed">
                      Reclaims your staff's busy schedule through automatic customer portals, easy crew tables, and simple calendars.
                    </p>
                  </div>
                )}

                <div className="border-t border-slate-200/60 pt-6 space-y-4">
                  
                  {/* Projected annual labor savings */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500">Estimated Staff Cost Saved:</span>
                    <motion.span 
                      key={calcResults.annualSavingsUSD}
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="font-mono font-bold text-slate-800"
                    >
                      +${calcResults.annualSavingsUSD.toLocaleString()} / Year
                    </motion.span>
                  </div>

                  {/* Impact alignment priority */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500">Primary Improvement Area:</span>
                    <span className="font-bold text-[#7c3aed]">
                      {calcResults.primaryImpactFocus}
                    </span>
                  </div>

                  {/* Recommended tier path */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500">Recommended Package:</span>
                    <span className="font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      {calcResults.recommendedTier}
                    </span>
                  </div>

                  {/* Implementation period estimate */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-500">Estimated Delivery Time:</span>
                    <span className="font-mono font-bold text-slate-600">
                      {calcResults.projectedImplementationTime}
                    </span>
                  </div>

                </div>
              </div>

              {/* Projection Conversion Claim Button */}
              <div className="mt-8 pt-6 border-t border-slate-200/60 relative z-10">
                <motion.button
                  onClick={handleClaimProjection}
                   whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full cursor-pointer group flex items-center justify-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-blue-800 text-white text-xs font-bold tracking-wider uppercase px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Discuss This Plan With Us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </motion.button>
                <div className="text-center mt-3">
                  <span className="text-[9px] font-mono tracking-wide text-slate-400 font-bold uppercase">
                    Free friendly consulting chat included
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Dynamic 3D Interactive Animated Chart */}
          <div className="w-full min-h-[380px]">
            <React.Suspense fallback={<div className="w-full max-w-4xl mx-auto h-[380px] rounded-[2.5rem] bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 text-xs font-mono">Initializing Engine Chart...</div>}>
              <Interactive3DChart />
            </React.Suspense>
          </div>

        </section>


        {/* --- SECTION 5: PHILOSOPHY OF THE SUTRA LOGO --- */}
        <section id="philosophy" className="pt-10 pb-20 scroll-mt-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-[#22c55e] uppercase tracking-widest bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
              Brand Values Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              The Meaning of the Byte Sutra Logo
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The term <span className="font-semibold text-slate-800">Sutra</span> represents a thread or connection that brings disparate concepts together into a unified, harmonious whole. Here is how our visual identity reflects our operational values.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Huge Vector Logo Representation */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                whileHover={{ rotate: 1.5, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-[3rem] glass-panel border border-white p-8 bg-white/33 backdrop-blur-lg shadow-xl relative flex justify-center items-center"
              >
                {/* Visual accent framing circles inside the background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a8a]/5 to-[#7c3aed]/5 blur-2xl rounded-full" />
                
                {/* Renders the massive 280px recreation of Byte Sutra */}
                <ByteSutraLogo showText={false} iconSize={280} />
              </motion.div>
            </div>

            {/* Right Column: Narrative Breakdown with Custom Hover shadows */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-6 rounded-full bg-slate-950" />
                <h3 className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  The Integration of Technology, Agility, and Growth.
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mb-8">
                Every business owner needs digital solutions they can trust entirely. We intentionally selected the visual coordinates of our identity to communicate this very pledge:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'The Lotus Petals',
                    subtitle: 'Elegance & Wisdom',
                    desc: 'A symmetrical lotus symbolizes absolute software organization, focus, and pristine user interfaces. It ensures your digital portals remain highly professional and instantly trustworthy for premium buyers.',
                    borderAccent: 'border-l-[#1e3a8a]'
                  },
                  {
                    title: 'The Integrated Circuitry',
                    subtitle: 'Clean Connections & Logic',
                    desc: 'Branching upward from the center lettermark, discrete nodes symbolize future-proof databases, integrated legacy APIs, and automated business synchronicity that eliminate administrative errors.',
                    borderAccent: 'border-l-[#7c3aed]'
                  },
                  {
                    title: 'The Infinity Cloud',
                    subtitle: 'Frictionless Scaling & Flow',
                    desc: 'The swirling loops below form the infinity pathway representing a cloud-authorized, robust ecosystem. This guarantees your digital presence is highly responsive, active 24/7, and scaling with zero blockages.',
                    borderAccent: 'border-l-[#0ea5e9]'
                  },
                  {
                    title: 'The Fresh Green Vine',
                    subtitle: 'Financial Prosperity',
                    desc: 'Circling the base represent sustainable financial returns, reduction of operations overhead, and organic lead acquisition. This is the ultimate objective of every digital tool we launch for your team.',
                    borderAccent: 'border-l-[#22c55e]'
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.015 }}
                    className={`bg-white/60 hover:bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between border-l-4 ${item.borderAccent} hover:shadow-md transition-all duration-300 backdrop-blur-sm`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold font-mono">{item.subtitle}</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed mt-2 font-semibold">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

          </div>

          {/* --- FOUNDER INTEGRITY COMMITTMENT CARD --- */}
          <div className="mt-16 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl bg-gradient-to-br from-indigo-900 via-[#1e3a8a] to-[#1479ea] text-white p-8 sm:p-12 text-left relative overflow-hidden shadow-2xl"
            >
              {/* Abstract decorative accent circle in background */}
              <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-white/5 blur-3xl translate-x-12 -translate-y-12 pointer-events-none" />

              <div className="max-w-2xl relative z-10">
                <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-sky-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  Partnership Commitment
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-5 mb-4">
                  "Most agencies focus on hours billed. We focus on results materialized."
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed font-sans mb-8">
                  We built Byte Sutra to represent long-term strategic integrity. We will never sell you unneeded plugins, we will never over-complicate your software architecture to lock you into heavy retainer systems, and we will never deliver templates that break under peak traffic. We design and compile digital assets that increase the exit or cash-flow valuation of your business of record.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-xs text-sky-200">
                      BS
                    </div>
                    <div>
                      <span className="text-xs font-bold block">The Partners of Byte Sutra</span>
                      <span className="text-[10px] text-sky-200 block mt-0.5">Corporate Software Advisors</span>
                    </div>
                  </div>

                  <div className="hidden sm:block w-px h-8 bg-white/25" />

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-200">
                    <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
                    All Intellectual Property owned 100% by your firm.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </section>


        {/* --- SECTION 6: THE VOICE OF EXECUTIVES (Smooth carousel structure) --- */}
        <section className="py-24">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-[#7c3aed] uppercase tracking-widest bg-purple-50 border border-purple-100 rounded-full px-3 py-1">
              Executive Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              What Boardroom Leaders Say About Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Real results evaluated by operational partners who needed speed, reliability, and automated system synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between text-left hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>

                  {/* Body Text */}
                  <p className="text-xs text-slate-600 leading-relaxed italic font-sans font-semibold">
                    "{t.text}"
                  </p>

                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 bg-transparent">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 block leading-tight">
                      {t.author}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {t.role}, <span className="font-semibold text-[#1e3a8a]">{t.company}</span>
                    </span>
                  </div>

                  <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-50 border border-slate-200/50 px-2.5 py-1 rounded-full">
                    {t.industry}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </section>


        {/* --- SECTION 7: BESPOKE LEAD INTAKE & SCHEDULER (Fluid step animations) --- */}
        <section id="contact" className="pt-10 pb-20 scroll-mt-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-[#111827] uppercase tracking-widest bg-slate-200/70 border border-slate-200/50 rounded-full px-3 py-1">
              Commercial Onboarding
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Begin Strategic System Mapping
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Submit your foundational corporate goals. Once received, our dashboard will generate an initial structural roadmap and unlock our direct partner consultation calendar below.
            </p>
          </div>

          {/* Master intake container (Glassy panel) */}
          <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden text-left relative">
            <div id="scheduler-anchor" className="absolute top-0 left-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Panel Intake Form */}
              <div className="md:col-span-7 p-6 sm:p-10 relative overflow-hidden border-b md:border-b-0 md:border-r border-slate-100">
                
                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      key="formSubmittedView"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col justify-center items-center text-center py-8"
                    >
                      
                      <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 text-emerald-500">
                        <CheckCircle className="w-8 h-8" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-950 mb-2">
                        Core Blueprint Details Locked!
                      </h3>
                      
                      <p className="text-xs text-slate-500 leading-relaxed mb-6 max-w-sm">
                        Outstanding, <span className="font-extrabold text-[#1e3a8a]">{formData.name}</span>. We have synchronized your strategic digital priorities. The next step is to lock your priority advisor strategy web call on our live calendar.
                      </p>

                      <div className="w-full p-4.5 rounded-2xl bg-slate-50 border border-slate-100 text-left mb-6">
                        <span className="text-[9px] font-mono text-slate-400 font-extrabold uppercase">
                          Onboarding Profile Compiled
                        </span>
                        <div className="space-y-2 mt-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-semibold">Outcome target:</span>
                            <span className="font-bold text-slate-700 truncate max-w-[170px]">{formData.priorityOutcome}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-semibold">Allocated scale:</span>
                            <span className="font-bold text-[#7c3aed]">{formData.approxBudget || 'Flexible / Open'}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-semibold">Contact mobile:</span>
                            <span className="font-bold text-slate-700 truncate max-w-[170px]">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Button trigger to restart input if needed */}
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 underline cursor-pointer"
                      >
                        Modify onboarding priorities
                      </button>

                    </motion.div>
                  ) : (
                    <motion.form 
                      key="formInputView"
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 25 }}
                      transition={{ duration: 0.4 }}
                      onSubmit={handleFormSubmit} 
                      className="space-y-5"
                    >
                      <div>
                        <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#1e3a8a] uppercase block mb-1">
                          Step 1 of 2
                        </span>
                        <h3 className="font-black text-lg text-slate-900">
                          Operational Objectives Form
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Submit basic objectives so our partners can formulate real commercial recommendations.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                            Professional Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Elena Rostova"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] bg-slate-50/50"
                          />
                        </div>
                        
                        {/* Company Name */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Novapoint Care"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a8a] bg-slate-50/50"
                          />
                        </div>
                      </div>

                      {/* Email & Mobile */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                            Direct Corporate Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="elena@novapointcare.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a8a] bg-slate-50/50"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                            Mobile / WhatsApp Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 019-2834"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a8a] bg-slate-50/50"
                          />
                        </div>
                      </div>

                      {/* Selected Primary Business Outcome */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                          Which outcome matters most to you?
                        </label>
                        <select
                          value={formData.priorityOutcome}
                          onChange={(e) => setFormData({ ...formData, priorityOutcome: e.target.value })}
                          className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none focus:border-[#1e3a8a] cursor-pointer"
                        >
                          <option value="Multiply online inquiries & credibility">Multiply online inquiries & credibility</option>
                          <option value="Reduce manual staff overhead bottlenecks">Reduce manual staff overhead bottlenecks</option>
                          <option value="Scale up visual e-commerce sales conversions">Scale up visual e-commerce sales conversions</option>
                          <option value="Launch a premium direct mobile user channel">Launch a premium direct mobile user channel</option>
                        </select>
                      </div>

                      {/* Project budget scope */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                          What is your preferred budget range? (e.g. $2,000, or Flexible)
                        </label>
                        <input
                          type="text"
                          value={formData.approxBudget}
                          onChange={(e) => setFormData({ ...formData, approxBudget: e.target.value })}
                          placeholder="Type your budget range or write 'Flexible'"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a8a] bg-white shadow-sm"
                        />
                      </div>

                      {/* Strategy Notes */}
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5">
                          Briefly list any existing software hurdles (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="e.g. Existing admin team wastes 14 hours copy-pasting customer details off older WordPress spreadsheets..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a8a] bg-slate-50/50"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className={`w-full flex items-center justify-center gap-2 text-white text-xs font-bold tracking-wider uppercase py-4 rounded-xl shadow-md transition-colors cursor-pointer ${
                          isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#1e3a8a] hover:bg-slate-900'
                        }`}
                      >
                        {isSubmitting ? 'Processing Onboarding...' : 'Process Onboarding Details'}
                        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>

              {/* Right Panel Real-time consultation booker */}
              <div className="md:col-span-5 bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 sm:p-10 flex flex-col justify-between">
                
                <AnimatePresence mode="wait">
                  {bookingConfirmed ? (
                    <motion.div
                      key="bookingConfirmedView"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12"
                    >
                      
                      <div className="p-3 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] rounded-full animate-bounce">
                        <CheckCircle className="w-8 h-8" />
                      </div>

                      <h4 className="font-black text-slate-950 text-md">
                        Strategy Briefing Scheduled!
                      </h4>

                      <div className="py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-xs inline-block shadow-sm">
                        <span className="font-extrabold text-slate-900 block font-sans">
                          {selectedBookingDate}
                        </span>
                        <span className="font-mono text-slate-500 font-bold block mt-0.5">
                          {selectedBookingTime}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs font-semibold">
                        A personalized calendar synchronization invite has been dispatched to <span className="font-bold text-[#1e3a8a]">bytesutra@gmail.com</span>. One of our lead software advisors will attend the call with an original analysis of your platform's speed and conversion opportunities.
                      </p>

                      <button
                        onClick={() => setBookingConfirmed(false)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 underline flex items-center justify-center gap-1 cursor-pointer w-full"
                      >
                        Reschedule appointment time
                      </button>

                    </motion.div>
                  ) : (
                    <motion.div
                      key="bookingPickerView"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#7c3aed] uppercase block mb-1">
                          Step 2 of 2
                        </span>
                        <h3 className="font-black text-lg text-slate-900">
                          Advisor Calendar
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {formSubmitted
                            ? 'Intake locked! Select an available strategic slot with Byte Sutra\'s partners below.'
                            : 'Submit the intake form first to unlock professional consultation dates.'}
                        </p>
                      </div>

                      {/* Date picker grid */}
                      <div className={`space-y-4 transition-opacity duration-300 ${formSubmitted ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                        
                        {/* Booking days row */}
                        <div>
                          <span className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase block mb-2">
                            Available Dates (June 2026)
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {bookingDays.map((day, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setSelectedBookingDate(day)}
                                className={`px-3 py-2.5 rounded-xl text-[10px] font-bold text-center border transition-all cursor-pointer ${
                                  selectedBookingDate === day
                                    ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-sm'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Country / Timezone Select Field */}
                        <div>
                          <span className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase block mb-2">
                            Select Country & Time Zone
                          </span>
                          <select
                            value={selectedTimezone}
                            onChange={(e) => handleTimezoneChange(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-[10px] font-bold text-slate-700 bg-white focus:outline-none focus:border-[#1e3a8a] focus:ring-1 focus:ring-[#1e3a8a] transition-all cursor-pointer shadow-sm"
                          >
                            {countryTimezones.map((tz) => (
                              <option key={tz.id} value={tz.id}>
                                {tz.country} ({tz.timezoneLabel})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Time picker row */}
                        <div>
                          <span className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase block mb-2">
                            Available Times ({countryTimezones.find(t => t.id === selectedTimezone)?.timezoneLabel || 'Local'})
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {bookingTimes.map((time, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setCustomTimeMode(false);
                                  setSelectedBookingTime(time);
                                }}
                                className={`px-2.5 py-2.5 rounded-xl text-[10px] font-bold text-center border transition-all cursor-pointer ${
                                  !customTimeMode && selectedBookingTime === time
                                    ? 'bg-[#1479ea] text-white border-[#1479ea] shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => {
                                setCustomTimeMode(true);
                                const activeTz = countryTimezones.find(t => t.id === selectedTimezone) || countryTimezones[0];
                                setSelectedBookingTime(customTime ? `${customTime} ${activeTz.timezoneLabel}` : '');
                              }}
                              className={`px-2.5 py-2.5 rounded-xl text-[10px] font-bold text-center border transition-all cursor-pointer ${
                                customTimeMode
                                  ? 'bg-[#1479ea] text-white border-[#1479ea] shadow-sm'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              Custom Time...
                            </button>
                          </div>

                          {/* Custom time input field when customTimeMode is enabled */}
                          <AnimatePresence>
                            {customTimeMode && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 overflow-hidden"
                              >
                                <label className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase block mb-1.5">
                                  Enter Custom Time Slot ({countryTimezones.find(t => t.id === selectedTimezone)?.timezoneLabel || 'Local'})
                                </label>
                                <div className="relative flex items-center">
                                  <input
                                    type="text"
                                    value={customTime}
                                    onChange={(e) => handleCustomTimeChange(e.target.value)}
                                    placeholder="e.g., 2:00 PM, 11:30 AM, or 6:00 PM - 7:00 PM"
                                    className="w-full px-4 py-3 pr-16 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#1e3a8a] bg-white shadow-sm font-semibold transition-colors"
                                  />
                                  <div className="absolute right-3 text-[9px] font-mono font-black text-slate-400 bg-slate-100 px-2 py-1 rounded-md pointer-events-none select-none uppercase">
                                    {countryTimezones.find(t => t.id === selectedTimezone)?.timezoneLabel || 'Local'}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Explicit confirmation */}
                        <div className="pt-4 mt-6 border-t border-slate-200/50">
                          <motion.button
                            type="button"
                            onClick={handleBookingConfirm}
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`w-full flex items-center justify-center gap-1.5 text-white text-xs font-bold tracking-wider uppercase py-3.5 rounded-xl shadow transition-colors cursor-pointer ${
                              isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-[#1e3a8a]'
                            }`}
                          >
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {isSubmitting ? 'Confirming Preference...' : 'Confirm Strategy Call Slot'}
                          </motion.button>
                        </div>

                      </div>

                      {!formSubmitted && (
                        <div className="text-center py-5 bg-slate-200/20 border border-dashed border-slate-200/60 rounded-2xl backdrop-blur-sm">
                          <span className="text-[10px] font-bold text-slate-400 block px-4 py-2 uppercase leading-normal tracking-wide">
                            Unlock Live Calendar By Booking Step 1
                          </span>
                        </div>
                      )}

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </div>

        </section>


        {/* --- SECTION 8: FAQ ACCORDIONS (Smooth Animated Expansion) --- */}
        <section id="faq" className="pt-10 pb-20 scroll-mt-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-extrabold text-[#111827] uppercase tracking-widest bg-slate-200/70 border border-slate-200/40 rounded-full px-3 py-1">
              Strategic Help Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 mb-4">
              Answers to Key Corporate Inbound Queries
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A collection of foundational answers for managers seeking to evaluate the structure, pricing metrics, and long-term partnership timelines of Byte Sutra.
            </p>
          </div>

          <div className="w-full max-w-3xl mx-auto space-y-3 text-left">
            {FAQS.map((faq, index) => {
              const isExpanded = expandedFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 shrink-0 ml-4 font-mono font-extrabold text-lg">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {/* Expansion pane with smooth height motion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="px-5 pb-5 pt-3.5 text-xs text-slate-500 leading-relaxed font-sans font-semibold">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </section>


        {/* --- SECTION 9: TACTICAL PROGRESSION STRIP (Bottom Sticky trust block) --- */}
        <section className="py-14 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-400">
            {WHY_US_PILLARS.map((pillar, index) => (
              <div key={index} className="text-left">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  0{index + 1} / {pillar.title.split(' ')[0]}
                </span>
                <h4 className="font-extrabold text-xs text-slate-900 mb-1">
                  {pillar.title}
                </h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* --- PREMIUM BRAND FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 mt-20 pt-16 pb-12 border-t border-slate-950 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 text-left">
            
            {/* Column 1: Info Footer Block */}
            <div className="md:col-span-5 space-y-4">
              <ByteSutraLogo showText={true} textSize="md" iconSize={36} className="text-white fill-white brightness-0 invert" />
              
              <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm mt-3">
                Byte Sutra functions as a elite cloud applications and digital systems development partnership. We do not recycle templates, we do not utilize outsourcing networks, and we never prioritize programming jargon ahead of commercial ROI.
              </p>
              
              <div className="pt-2 text-xs text-slate-500 font-mono space-y-1">
                <div>HQ Coordinate: Silicon Valley & Global Remote</div>
                <div>Operational Hours: 08:00 AM - 06:00 PM EST</div>
              </div>
            </div>

            {/* Column 2: Solutions Navigation Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="font-mono text-xs font-bold tracking-widest text-slate-300 uppercase">
                Aligned Services
              </h4>
              <ul className="space-y-2 text-xs">
                {SERVICES.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => {
                        setSelectedServiceId(s.id);
                        scrollToSection('services');
                      }}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Corporate Directory */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold tracking-widest text-slate-300 uppercase">
                Company Links
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => scrollToSection('hero')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                    Home Landing
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('cases')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                    Completed Projects
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('calculator')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                    Metric Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('philosophy')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                    Brand Narrative
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Action Frame */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="font-mono text-xs font-bold tracking-widest text-slate-300 uppercase">
                Strategic Inbound
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-white transition-colors font-bold text-sky-400 cursor-pointer">
                    Strategy Mapping →
                  </button>
                </li>
                <li className="text-[10px] text-slate-500 font-mono mt-4">
                  Partner Contact Email:<br />
                  <a href="mailto:bytesutra@gmail.com" className="text-slate-300 select-all hover:text-sky-400 transition-colors">
                    bytesutra@gmail.com
                  </a>
                </li>
                <li className="text-[10px] text-slate-500 font-mono mt-3">
                  Partner Contact Mobile:<br />
                  <a href="tel:+919272503104" className="text-slate-300 select-all hover:text-sky-400 transition-colors">
                    +91 92725 03104
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Symmetrical border separator */}
          <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-500" />
              <span>© {currentYear} Byte Sutra LLC. All custom intellectual designs secured.</span>
            </div>

            <div className="flex items-center gap-6">
              <span>Time reference check: {fullReferenceDateStr}</span>
              <span className="text-[10px] bg-slate-800 px-3 py-1 rounded-full text-slate-400 font-semibold uppercase tracking-wider">
                99.9% UPTIME PLATFORM
              </span>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
