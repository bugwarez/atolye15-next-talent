/* Algoritmanın testi için örnek kod */
type JobPost = {
  expertise: string;
  seniority: string;
  requiredTechnologies: string[];
  workType: string;
  projectDurationMonths: number;
};

type FreelancerProfile = {
  expertise: string;
  seniority: string;
  technologies: string[];
  preferredWorkType: string;
  experienceMonths: number;
};

function calculateMatchScore(jobPost: JobPost, freelancer: FreelancerProfile): number {
  let score = 0;

  // Uzmanlık Alanı (0,3 Öncelik)
  const expertiseScore = jobPost.expertise === freelancer.expertise ? 1 : 0;
  score += expertiseScore * 0.3;

  // Uzmanlık (0,2 Öncelik)
  const seniorityScore = jobPost.seniority === freelancer.seniority ? 1 : 0;
  score += seniorityScore * 0.2;

  // Teknolojiler (0,25 Öncelik)
  const matchingTechnologies = jobPost.requiredTechnologies.filter(tech => freelancer.technologies.includes(tech)).length;
  const technologyScore = matchingTechnologies / jobPost.requiredTechnologies.length;
  score += technologyScore * 0.25;

  // Çalışma Türü (0,1 Öncelik)
  const workTypeScore = jobPost.workType === freelancer.preferredWorkType ? 1 : 0;
  score += workTypeScore * 0.1;

  // Deneyim Süresi (0,15 Öncelik)
  const experienceScore = freelancer.experienceMonths >= jobPost.projectDurationMonths ? 1 : 0;
  score += experienceScore * 0.15;

  return score;
}

// Örnek iş ilanı datası
const jobPost: JobPost = {
  expertise: "Frontend Development",
  seniority: "MID",
  requiredTechnologies: ["React", "TypeScript", "Redux"],
  workType: "FULL_TIME",
  projectDurationMonths: 12,
};

//Örnek aday profil datası
const freelancer: FreelancerProfile = {
  expertise: "Frontend Development",
  seniority: "MID",
  technologies: ["React", "TypeScript", "GraphQL"],
  preferredWorkType: "FULL_TIME",
  experienceMonths: 24,
};

const matchScore = calculateMatchScore(jobPost, freelancer);
console.log("Eşleşme Puanı:", matchScore.toFixed(4));
