/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  ageGroup: string;
  currentLevel: string;
  preferredDays: string[];
  comments: string;
  dateSubmitted: string;
}

export interface ArabicLetter {
  id: string;
  letter: string;
  name: string;
  transliteration: string;
  pronunciation: string;
  makhraj: string; // Point of articulation
  example: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ScheduleOption {
  id: string;
  days: string;
  time: string;
  note: string;
  votes: number;
}
