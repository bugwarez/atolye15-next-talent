/* Algoritmanın testi için örnek kod */
type JobPost = {
  id: string;
  companyId: string;
  title: string;
  description: string;
  hoursPerWeek: number;
  projectLength: number;
  positions: JobPosition[];
  technologies: JobTechnology[];
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
};

enum JobStatus {
  DRAFT,
  PUBLISHED,
  CLOSED,
  CANCELLED,
}

type JobPosition = {
  id: string;
  jobPostId: string;
  specialization: string;
  seniority: string;
  count: number;
};

type JobTechnology = {
  id: string;
  jobPostId: string;
  technologyId: string;
  technology: string;
  seniority: string;
};

type FreelancerProfile = {
  specialization: string;
  seniority: string;
  technologies: FreelancerTechnology[];
  experienceMonths: number;
  preferredWorkType: string;
};

type FreelancerTechnology = {
  name: string;
  seniority: string;
};

function calculateSeniorityScore(required: string, candidate: string): number {
  const levels: any = { JUNIOR: 1, MID: 2, SENIOR: 3 };
  const requiredLevel = levels[required] || 0;
  const candidateLevel = levels[candidate] || 0;

  if (candidateLevel >= requiredLevel) {
    return 1; // Full match or higher seniority
  } else if (candidateLevel > 0) {
    return 0.5; // Partial match (lower seniority)
  }
  return 0; // No match
}

function calculateMatchScore(jobPost: JobPost, freelancer: FreelancerProfile): number {
  let score = 0;

  // Specialization Match (0.3 Priority)
  let specializationScore = 0;
  const jobPosition = jobPost.positions.find(
    (position) => position.specialization === freelancer.specialization
  );

  if (jobPosition) {
    specializationScore = calculateSeniorityScore(jobPosition.seniority, freelancer.seniority);
  } else if (
    freelancer.specialization === "Fullstack Development" &&
    jobPost.positions.some(
      (position) =>
        position.specialization === "Frontend Development" || position.specialization === "Backend Development"
    )
  ) {
    specializationScore = 0.5; // Partial match for Fullstack candidate with Frontend/Backend position
  }
  score += specializationScore * 0.3;

  // Technology Match with Seniority Consideration (0.25 Priority)
  let totalTechnologyScore = 0;
  jobPost.technologies.forEach((requiredTech) => {
    const candidateTech = freelancer.technologies.find(
      (tech) => tech.name === requiredTech.technology
    );
    if (candidateTech) {
      totalTechnologyScore += calculateSeniorityScore(requiredTech.seniority, candidateTech.seniority);
    }
  });
  const technologyScore = totalTechnologyScore / jobPost.technologies.length;
  score += technologyScore * 0.25;

  // Other Criteria (Example placeholders, adjust as needed)
  // Work Type Match (0.1 Priority)
  const workTypeScore = jobPost.hoursPerWeek >= 40 && freelancer.preferredWorkType === "FULL_TIME" ? 1 : 0;
  score += workTypeScore * 0.1;

  // Experience Match (0.15 Priority)
  const experienceScore = freelancer.experienceMonths >= jobPost.projectLength ? 1 : 0;
  score += experienceScore * 0.15;

  return score;
}

const jobPost: JobPost = {
  id: "1",
  companyId: "1001",
  title: "Frontend Developer",
  description: "Looking for an experienced frontend developer",
  hoursPerWeek: 40,
  projectLength: 12,
  positions: [
    { id: "1", jobPostId: "1", specialization: "Frontend Development", seniority: "MID", count: 1 },
  ],
  technologies: [
    { id: "1", jobPostId: "1", technologyId: "101", technology: "React", seniority: "SENIOR" },
    { id: "2", jobPostId: "1", technologyId: "102", technology: "TypeScript", seniority: "MID" },
  ],
  status: JobStatus.PUBLISHED,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Example freelancer profile
const freelancer: FreelancerProfile = {
  specialization: "Fullstack Development",
  seniority: "MID",
  technologies: [
    { name: "React", seniority: "MID" },
    { name: "TypeScript", seniority: "SENIOR" },
  ],
  experienceMonths: 18,
  preferredWorkType: "FULL_TIME",
};

const matchScore = calculateMatchScore(jobPost, freelancer);
console.log("Match Score:", matchScore.toFixed(4));
