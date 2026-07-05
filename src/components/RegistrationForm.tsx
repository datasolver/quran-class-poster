import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Info, Sparkles, User, Mail, Phone, Clock, FileText, Download} from 'lucide-react';
import { RegistrationFormData } from '../types';
import { registerStudent } from "@/src/services/registrationService";


interface RegistrationFormProps {
  onSuccess: (updatedCount: number) => void;
  currentCount: number;
}

export default function RegistrationForm({ onSuccess, currentCount }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    gender: 'Male',
    currentLevel: 'absolute-beginner',
    preferredDays: [],
    comments: ''
  } as any); // Type assertion to any to avoid type errors on initial state

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);
  const [userRegistrations, setUserRegistrations] = useState<RegistrationFormData[]>([]);
  const [registrationId, setRegistrationId] = useState("");

  // // Load existing registrations from local storage
  // useEffect(() => {
  //   const saved = localStorage.getItem('nmawa_quran_registrations');
  //   if (saved) {
  //     try {
  //       const parsed = JSON.parse(saved);
  //       setUserRegistrations(parsed);
  //     } catch (e) {
  //       console.error('Error parsing registrations', e);
  //     }
  //   }
  // }, []);

  const handleCheckboxChange = (day: string) => {
    const currentDays = [...(formData.preferredDays || [])];
    if (currentDays.includes(day)) {
      setFormData({
        ...formData,
        preferredDays: currentDays.filter(d => d !== day)
      });
    } else {
      setFormData({
        ...formData,
        preferredDays: [...currentDays, day]
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'WhatsApp number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone/WhatsApp number';
    }

    if (!formData.preferredDays || formData.preferredDays.length === 0) {
      newErrors.preferredDays = 'Please select at least one preferred schedule option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const timestamp = new Date().toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const payload: RegistrationFormData = {
        ...formData,
        dateSubmitted: timestamp,
      };

      const result = await registerStudent(payload);

      if (!result?.success) {
        alert(result?.message || 'Registration failed.');
        return;
      }

      const newRecord = {
        ...payload,
      };

      // Success UI state updates
      setSubmittedData(newRecord);
      setIsSubmitted(true);
      setRegistrationId(result.registrationId);

      const newCount = currentCount + 1;
      onSuccess(newCount);

      alert(`Registration successful!\nRegistration ID: ${result.registrationId}`);

      // Scroll only on success
      const section = document.getElementById('registration-section');
      section?.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      gender: 'Male',
      currentLevel: 'absolute-beginner',
      preferredDays: [],
      comments: ''
    });
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const handleDownloadSlip = () => {
    if (!submittedData) return;
    const slipText = `
==================================================
   NIGERIAN MUSLIMS' ASSOCIATION OF WESTERN AUSTRALIA
      INTEREST CONFIRMATION - PROPOSED QURAN CLASS
==================================================
Thank you for registering your interest!

REGISTRATION DETAILS:
--------------------------------------------------
Student Name:     ${submittedData.fullName}
Email Address:    ${submittedData.email}
WhatsApp Number:  ${submittedData.phone}
Gender:           ${submittedData.gender}
Current Level:    ${getLevelLabel(submittedData.currentLevel)}
Preferred Days:   ${submittedData.preferredDays.join(', ')}
Date Submitted:   ${submittedData.dateSubmitted}

Additional Notes:
${submittedData.comments || 'No additional notes provided.'}

--------------------------------------------------
CLASS FEATURES:
- 100% Free / Online (Zoom/Google Meet/WhatsApp)
- Twice a week schedule
- Core Qir'at (Recitation & Articulation points)
- Hifz (Memorisation of short Surahs)
- Adult absolute beginner syllabus

CONTACT & ENQUIRIES:
- Organized by: NMAWA Education Committee
- Contact Email: jamiuekundayo@gmail.com
==================================================
`;
    const blob = new Blob([slipText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NMAWA_Quran_Class_RSVP_${submittedData.fullName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'absolute-beginner': return 'Absolute Beginner (Cannot read letters)';
      case 'knows-letters': return 'Can recognize letters, cannot join words';
      case 'reads-words': return 'Can read joined words slowly, cannot read verses';
      default: return 'Absolute Beginner';
    }
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto scroll-mt-6" id="registration-section">
      <div className="bg-brand-green rounded-3xl border-[6px] sm:border-[10px] border-brand-gold shadow-2xl overflow-hidden">
        
        {/* Banner header inside card */}
        <div className="bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-dark p-6 md:p-8 text-[#f4f1ea] relative border-b border-brand-gold/30">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Proposed Quran Cohort
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">Register Your Interest</h3>
              <p className="text-brand-gold-light/80 text-xs font-light">
                Help us bring this class to life. No payment required, secure your interest today.
              </p>
            </div>
            
            <div className="bg-brand-green-dark border-2 border-brand-gold/40 rounded-xl px-5 py-3 shrink-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl sm:text-3xl font-bold text-brand-gold">{currentCount}</span>
              <span className="text-[9px] text-brand-gold-light/70 uppercase tracking-widest font-bold">Total RSVP Entries</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Intro notice */}
                <div className="bg-brand-green-dark border border-brand-gold/25 rounded-xl p-4 flex gap-3 items-start text-xs text-brand-gold-light">
                  <Info className="w-4.5 h-4.5 shrink-0 mt-0.5 text-brand-gold" />
                  <p className="leading-relaxed">
                    This is a community-driven interest poll by NMAWA. As soon as we reach our target size for the first adult cohort, we will finalize class times and contact you via WhatsApp/Email with the link.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-gold" /> Full Name <span className="text-brand-gold-light">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ibrahim Adebayo"
                      className="w-full bg-brand-green-dark border border-brand-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white transition-all placeholder-brand-gold-light/25"
                      id="form-fullname"
                    />
                    {errors.fullName && <p className="text-brand-gold text-xs">{errors.fullName}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-gold" /> Email Address <span className="text-brand-gold-light">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ibrahim@example.com"
                      className="w-full bg-brand-green-dark border border-brand-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white transition-all placeholder-brand-gold-light/25"
                      id="form-email"
                    />
                    {errors.email && <p className="text-brand-gold text-xs">{errors.email}</p>}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-gold" /> WhatsApp / Phone Number <span className="text-brand-gold-light">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +61 400 000 000"
                      className="w-full bg-brand-green-dark border border-brand-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white transition-all placeholder-brand-gold-light/25"
                      id="form-phone"
                    />
                    <p className="text-[10px] text-brand-gold-light/50 font-light">Highly recommended to facilitate communication with WA study group</p>
                    {errors.phone && <p className="text-brand-gold text-xs">{errors.phone}</p>}
                  </div>

                  {/* Gender */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" /> Gender <span className="text-brand-gold-light">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full bg-brand-green-dark border border-brand-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white transition-all"
                      id="form-gender"
                    >
                      <option className="bg-brand-green" value="Male">Male</option>
                      <option className="bg-brand-green" value="Female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Reading level selection */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                    What is your current level in Quran recitation? <span className="text-brand-gold-light">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, currentLevel: 'absolute-beginner' })}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 cursor-pointer transition-all ${
                        formData.currentLevel === 'absolute-beginner'
                          ? 'bg-brand-green-dark border-brand-gold text-white ring-2 ring-brand-gold/30'
                          : 'bg-brand-green-medium/25 border-brand-gold/15 text-white/95 hover:bg-brand-green-medium/50'
                      }`}
                      id="btn-level-1"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Level 1</span>
                      <p className="text-xs font-bold text-white">Absolute Beginner</p>
                      <p className="text-[10px] text-brand-gold-light/60 font-light leading-snug">Cannot recognize or pronounce Arabic letters yet.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, currentLevel: 'knows-letters' })}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 cursor-pointer transition-all ${
                        formData.currentLevel === 'knows-letters'
                          ? 'bg-brand-green-dark border-brand-gold text-white ring-2 ring-brand-gold/30'
                          : 'bg-brand-green-medium/25 border-brand-gold/15 text-white/95 hover:bg-brand-green-medium/50'
                      }`}
                      id="btn-level-2"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Level 2</span>
                      <p className="text-xs font-bold text-white">Can Identify Letters</p>
                      <p className="text-[10px] text-brand-gold-light/60 font-light leading-snug">Can recognize individual shapes, but struggling to join them.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, currentLevel: 'reads-words' })}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 cursor-pointer transition-all ${
                        formData.currentLevel === 'reads-words'
                          ? 'bg-brand-green-dark border-brand-gold text-white ring-2 ring-brand-gold/30'
                          : 'bg-brand-green-medium/25 border-brand-gold/15 text-white/95 hover:bg-brand-green-medium/50'
                      }`}
                      id="btn-level-3"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-gold">Level 3</span>
                      <p className="text-xs font-bold text-white">Can Read Slowly</p>
                      <p className="text-[10px] text-brand-gold-light/60 font-light leading-snug">Reads joined words with difficulty. Need fluency and Tajweed.</p>
                    </button>
                  </div>
                </div>

                {/* Preferred Schedule (Proposed) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                    Which proposed times/days would suit you best? (Select all that apply) <span className="text-brand-gold-light">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'weekend', label: 'Sat & Sun Mornings', time: '7:00 AM - 8:00 AM AWST' },
                      { id: 'weeknight-early', label: 'Tue & Thu Evenings', time: '8:00 PM - 9:00 PM AWST' },
                      { id: 'weeknight-late', label: 'Mon & Wed Nights', time: '8:00 PM - 9:00 PM AWST' }
                    ].map((option) => {
                      const isChecked = (formData.preferredDays || []).includes(option.label);
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleCheckboxChange(option.label)}
                          className={`p-4 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-brand-green-dark border-brand-gold text-white ring-2 ring-brand-gold/30'
                              : 'bg-brand-green-medium/25 border-brand-gold/15 text-white/95 hover:bg-brand-green-medium/50'
                          }`}
                          id={`btn-schedule-${option.id}`}
                        >
                          <span className="text-xs font-bold">{option.label}</span>
                          <span className="text-[10px] text-brand-gold-light/50 font-light mt-1">{option.time}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.preferredDays && <p className="text-brand-gold text-xs mt-1">{errors.preferredDays}</p>}
                </div>

                {/* Comments */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-gold" /> Questions, comments, or suggestions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="e.g. I live in WA but work shift hours; I prefer Zoom classes; etc."
                    className="w-full bg-brand-green-dark border border-brand-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold text-white transition-all resize-none placeholder-brand-gold-light/25"
                    id="form-comments"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark font-bold py-4 rounded shadow-lg transition-all text-xs uppercase tracking-widest cursor-pointer border border-brand-gold-light/15"
                  id="btn-form-submit"
                >
                  Submit RSVP & Verify Interest
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 px-4"
              >
                <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-400/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold animate-pulse">Masha'Allah!</span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-2 mb-3 tracking-tight">
                  Interest Successfully Registered
                </h3>
                <p className="text-brand-gold-light/80 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
                  JazaakumuLLahu Khairan! We have successfully recorded your details. Below is your official admission interest slip. We will keep you updated via WhatsApp as soon as class slots are finalized!
                </p>

                {/* Admission Slip Visual */}
                <div className="max-w-md mx-auto bg-brand-green-dark border-2 border-dashed border-brand-gold/45 rounded-2xl p-6 text-left shadow-2xl relative overflow-hidden mb-8">
                  {/* Watermark */}
                  <div className="absolute -bottom-8 -right-8 text-brand-gold/5 text-9xl font-arabic font-bold select-none pointer-events-none">
                    قرآن
                  </div>
                  
                  <div className="flex justify-between items-center border-b border-brand-gold/20 pb-3.5 mb-4">
                    <div>
                      <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest">NMAWA Education</p>
                      <h4 className="text-sm font-serif font-bold text-white leading-none mt-1">Quran Class Interest Slip</h4>
                    </div>
                    <span className="bg-brand-gold text-brand-green-dark text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">
                      Confirmed
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs text-brand-charcoal/95">
                    <div className="grid grid-cols-3 border-b border-brand-gold/5 pb-2">
                      <span className="font-semibold text-brand-gold-light/55 uppercase tracking-wider text-[9px]">Student</span>
                      <span className="col-span-2 font-bold text-white">{submittedData?.fullName}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-brand-gold/5 pb-2">
                      <span className="font-semibold text-brand-gold-light/55 uppercase tracking-wider text-[9px]">Email</span>
                      <span className="col-span-2 font-mono text-brand-gold-light/90 break-all">{submittedData?.email}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-brand-gold/5 pb-2">
                      <span className="font-semibold text-brand-gold-light/55 uppercase tracking-wider text-[9px]">WhatsApp</span>
                      <span className="col-span-2 font-mono text-brand-gold-light/90">{submittedData?.phone}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-brand-gold/5 pb-2">
                      <span className="font-semibold text-brand-gold-light/55 uppercase tracking-wider text-[9px]">Gender</span>
                      <span className="col-span-2 font-medium text-white">{submittedData?.gender}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-brand-gold/5 pb-2">
                      <span className="font-semibold text-brand-gold-light/55 uppercase tracking-wider text-[9px]">Skill Goal</span>
                      <span className="col-span-2 font-semibold text-brand-gold">{getLevelLabel(submittedData?.currentLevel || '')}</span>
                    </div>
                    <div className="grid grid-cols-3 border-b border-brand-gold/5 pb-2">
                      <span className="font-semibold text-brand-gold-light/55 uppercase tracking-wider text-[9px]">Preferences</span>
                      <span className="col-span-2 font-semibold text-emerald-400">{submittedData?.preferredDays.join(', ')}</span>
                    </div>
                    <div className="grid grid-cols-3 pt-1">
                      <span className="font-semibold text-brand-gold-light/55 uppercase tracking-wider text-[9px]">Logged Date</span>
                      <span className="col-span-2 font-medium text-brand-gold-light/70">{submittedData?.dateSubmitted}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={handleDownloadSlip}
                    className="bg-brand-gold hover:bg-brand-gold-light text-brand-green-dark text-xs font-bold px-6 py-3 rounded flex items-center justify-center gap-2 cursor-pointer transition-colors border border-brand-gold-light/10"
                    id="btn-download-slip"
                  >
                    <Download className="w-4 h-4" /> Download Confirmation Slip
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="bg-brand-green-dark border border-brand-gold/30 hover:bg-brand-green-medium text-brand-gold text-xs font-bold px-6 py-3 rounded cursor-pointer transition-colors"
                    id="btn-register-another"
                  >
                    Register Another Student
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
