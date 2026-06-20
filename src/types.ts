export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  profileUpdated?: boolean;
  updatedFields?: string[];
}

export interface CareerScore {
  matchPercentage: number;
  overallRating: 'Excellent' | 'Good' | 'Moderate' | 'Low';
  expectedSalary: {
    entry: string;
    mid: string;
    senior: string;
    currency: string;
  };
  missingSkills: {
    skill: string;
    importance: 'High' | 'Medium' | 'Low';
    estimatedTimeToLearn: string;
    category: string;
  }[];
  strengthSkills: string[];
  probabilityOfHiring: number; // 0 to 100
  timeNeededToQualify: string; // e.g., "3-6 months"
  regionalDemand: {
    level: 'Very High' | 'High' | 'Steady' | 'Declining';
    growthRate: string; // e.g. "+12% YoY"
    popularLocations: string[];
  };
  swedishMarketComparison?: {
    demandIndex: number; // 1-10
    popularSwedishPlatforms: { name: string; url: string; count: number }[];
    notes: string;
  };
  roadmap: {
    step: number;
    title: string;
    description: string;
    duration: string;
    resources: { name: string; url: string }[];
  }[];
}

export interface MarketPrognosis {
  role: string;
  description: string;
  salaryMin: number;
  salaryMax: number;
  salaryAverage: number;
  currency: string;
  demandTrend: 'highly-growing' | 'growing' | 'stable' | 'decreasing';
  demandScore: number; // 1-100
  forecastYears: { year: number; score: number }[];
  keyDrivers: string[];
  recommendedSwedishLinks: { platform: string; url: string; description: string }[];
}

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  matchScore: number;
  description: string;
  source: 'Arbetsförmedlingen' | 'LinkedIn Jobs' | 'Indeed Sweden' | 'Jobbsafari' | 'General';
  url: string;
  postedDate: string;
  skillsDemanded: string[];
}
