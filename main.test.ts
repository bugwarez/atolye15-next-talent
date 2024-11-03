// Eşleşme Algoritması için test caseler
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

function calculateMatchScore(
  jobPost: JobPost,
  freelancer: FreelancerProfile
): number {
  let score = 0;

  // Uzmanlık Alanı (0,3 Öncelik)
  let expertiseScore = 0;
  if (jobPost.expertise === freelancer.expertise) {
    expertiseScore = 1; // Tam Uyum
  } else if (
    (jobPost.expertise === "Frontend Development" ||
      jobPost.expertise === "Backend Development") &&
    freelancer.expertise === "Fullstack Development"
  ) {
    expertiseScore = 0.5; // Kısmi Uyum: Fullstack aday Frontend/Backend ilanına başvuruyor
  }
  score += expertiseScore * 0.3;

  // Uzmanlık (0,2 Öncelik)
  const seniorityScore = jobPost.seniority === freelancer.seniority ? 1 : 0;
  score += seniorityScore * 0.2;

  // Teknolojiler (0,25 Öncelik)
  const matchingTechnologies = jobPost.requiredTechnologies.filter((tech) =>
    freelancer.technologies.includes(tech)
  ).length;
  const technologyScore =
    matchingTechnologies / jobPost.requiredTechnologies.length;
  score += technologyScore * 0.25;

  // Çalışma Türü (0,1 Öncelik)
  const workTypeScore =
    jobPost.workType === freelancer.preferredWorkType ? 1 : 0;
  score += workTypeScore * 0.1;

  // Deneyim Süresi (0,15 Öncelik)
  const experienceScore =
    freelancer.experienceMonths >= jobPost.projectDurationMonths ? 1 : 0;
  score += experienceScore * 0.15;

  return score;
}

function runTests() {
  // Test Case 1: Tam Uyum
  const jobPost1: JobPost = {
    expertise: "Fullstack Development",
    seniority: "MID",
    requiredTechnologies: ["React", "TypeScript", "Redux"],
    workType: "FULL_TIME",
    projectDurationMonths: 12,
  };

  const freelancer1: FreelancerProfile = {
    expertise: "Fullstack Development",
    seniority: "MID",
    technologies: ["React", "TypeScript", "Redux"],
    preferredWorkType: "FULL_TIME",
    experienceMonths: 12,
  };

  console.log(
    "Test Case 1 - Tam Uyum:",
    calculateMatchScore(jobPost1, freelancer1).toFixed(4) === "1.0000"
  );

  // Test Case 2: Kısmi Uyum (Fullstack aday için Frontend İlanı)
  const jobPost2: JobPost = {
    expertise: "Frontend Development",
    seniority: "MID",
    requiredTechnologies: ["React", "TypeScript"],
    workType: "PART_TIME",
    projectDurationMonths: 6,
  };

  const freelancer2: FreelancerProfile = {
    expertise: "Fullstack Development",
    seniority: "MID",
    technologies: ["React", "TypeScript", "GraphQL"],
    preferredWorkType: "PART_TIME",
    experienceMonths: 10,
  };

  console.log(
    "Test Case 2 - Kısmi Uyum:",
    calculateMatchScore(jobPost2, freelancer2).toFixed(4)
  );

  // Test Case 3: Fullstack ilanı için Frontend Aday (Uzmanlık Skoru 0 olarak hesaplanmalı)
  const jobPost3: JobPost = {
    expertise: "Fullstack Development",
    seniority: "MID",
    requiredTechnologies: ["React", "TypeScript", "Redux"],
    workType: "FULL_TIME",
    projectDurationMonths: 12,
  };

  const freelancer3: FreelancerProfile = {
    expertise: "Frontend Development",
    seniority: "MID",
    technologies: ["React", "TypeScript"],
    preferredWorkType: "FULL_TIME",
    experienceMonths: 12,
  };

  console.log(
    "Test Case 3 - No Expertise Match for Fullstack:",
    calculateMatchScore(jobPost3, freelancer3).toFixed(4)
  );

  // Test Case 4: Uzmanlık Uyuşmazlığı
  const jobPost4: JobPost = {
    expertise: "Backend Development",
    seniority: "MID",
    requiredTechnologies: ["Node.js", "Express"],
    workType: "FULL_TIME",
    projectDurationMonths: 12,
  };

  const freelancer4: FreelancerProfile = {
    expertise: "Backend Development",
    seniority: "SENIOR",
    technologies: ["Node.js", "Express", "MongoDB"],
    preferredWorkType: "FULL_TIME",
    experienceMonths: 18,
  };

  console.log(
    "Test Case 4 - Uzmanlık Uyuşmazlığı:",
    calculateMatchScore(jobPost4, freelancer4).toFixed(4)
  );

  // Test Case 5: Yetersiz Tecrübe Yılı/Süresi
  const jobPost5: JobPost = {
    expertise: "Frontend Development",
    seniority: "JUNIOR",
    requiredTechnologies: ["React", "CSS", "HTML"],
    workType: "PART_TIME",
    projectDurationMonths: 24,
  };

  const freelancer5: FreelancerProfile = {
    expertise: "Frontend Development",
    seniority: "JUNIOR",
    technologies: ["React", "CSS", "HTML"],
    preferredWorkType: "PART_TIME",
    experienceMonths: 12,
  };

  console.log(
    "Test Case 5 - Yetersiz Tecrübe Yılı/Süresi:",
    calculateMatchScore(jobPost5, freelancer5).toFixed(4)
  );
}

runTests();
