export enum Page {
  Home = 'home',
  Course = 'course',
  Database = 'database',
  Profile = 'profile',
  Onboarding = 'onboarding',
  Portfolio = 'portfolio',
  About = 'about',
  Forum = 'forum',
  Parents = 'parents',
}

export interface User {
  fullName: string;
  nickname: string;
  email: string;
}

export interface Mentor {
  id: number;
  name: string;
  specialization: string;
  imageUrl: string;
  details: string;
}

export interface RequiredExam {
  name: string;
  minScore: string;
  deadline: string;
}

export interface PopularMajor {
  name: string;
  subjectCombination: string;
}

export interface University {
  id: number;
  name:string;
  city: string;
  country: string;
  description: string;
  admissionInfo: string;
  requiredExams: RequiredExam[];
  popularMajors: PopularMajor[];
  applicationLink: string;
  logoUrl: string;
  tags: string[];
  ranking?: number;
}

export interface Profession {
  id: number;
  name: string;
  description: string;
  requiredSubjects: string[];
  prospects: string;
  relatedUniversityIds: number[];
  tags: string[];
}


export interface Testimonial {
  id: number;
  name: string;
  text: string;
  imageUrl: string;
  university: string;
}

export interface QuestionnaireData {
    fullName: string;
    budget: number;
    region: string;
    avgGrade: number;
    exams: string;
    preferences: string;
    studyFormat: 'online' | 'offline' | 'hybrid';
}

export interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

export interface UserProfile extends User {
    questionnaireData?: QuestionnaireData;
    psychTestResults?: string[];
    recommendedUniversities?: University[];
    chosenMentor?: Mentor;
    chatConsultationAnswers?: string[];
}