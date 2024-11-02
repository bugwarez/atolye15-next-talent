CREATE TYPE user_role AS ENUM ('FREELANCER', 'COMPANY_REPRESENTATIVE', 'ADMIN');
CREATE TYPE employment_type AS ENUM ('FULL_TIME', 'PART_TIME', 'NOT_SURE');
CREATE TYPE specialization AS ENUM (
  'FRONTEND_DEVELOPER',
  'BACKEND_DEVELOPER',
  'FULLSTACK_DEVELOPER',
  'MOBILE_DEVELOPER',
  'AI_ENGINEER',
  'QA_ENGINEER',
  'DEVOPS_ENGINEER'
);
CREATE TYPE seniority AS ENUM ('JUNIOR', 'MID', 'SENIOR', 'LEAD');
CREATE TYPE job_status AS ENUM ('DRAFT', 'PUBLISHED', 'CLOSED', 'CANCELLED');
CREATE TYPE application_status AS ENUM (
  'PENDING',
  'REVIEWING',
  'ACCEPTED',
  'REJECTED',
  'WITHDRAWN'
);
CREATE TYPE technology_category AS ENUM (
  'FRONTEND',
  'BACKEND',
  'MOBILE',
  'DEVOPS',
  'DATABASE',
  'CLOUD',
  'OTHER'
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(50),
  country_of_residence VARCHAR(100) NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  employment_type employment_type,
  main_specialization specialization NOT NULL,
  seniority seniority NOT NULL,
  commercial_experience_start_date TIMESTAMPTZ NOT NULL,
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  cv_url VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  website VARCHAR(255),
  representative_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  category technology_category NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE profile_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  technology_id UUID NOT NULL REFERENCES technologies(id),
  seniority seniority NOT NULL,
  years_of_experience INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(profile_id, technology_id)
);

CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  industry VARCHAR(100) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  position VARCHAR(100) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  team_size INTEGER NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE job_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  hours_per_week INTEGER NOT NULL,
  project_length INTEGER NOT NULL,
  status job_status NOT NULL DEFAULT 'DRAFT',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE job_positions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_post_id UUID NOT NULL REFERENCES job_posts(id),
  specialization specialization NOT NULL,
  seniority seniority NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_post_id, specialization, seniority)
);

CREATE TABLE job_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_post_id UUID NOT NULL REFERENCES job_posts(id),
  technology_id UUID NOT NULL REFERENCES technologies(id),
  seniority seniority NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_post_id, technology_id)
);

CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_post_id UUID NOT NULL REFERENCES job_posts(id),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  applied_position specialization NOT NULL,
  status application_status NOT NULL DEFAULT 'PENDING',
  match_score FLOAT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_post_id, profile_id)
);

-- Indexes for performance optimization
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profile_technologies_profile_id ON profile_technologies(profile_id);
CREATE INDEX idx_profile_technologies_technology_id ON profile_technologies(technology_id);
CREATE INDEX idx_experiences_profile_id ON experiences(profile_id);
CREATE INDEX idx_job_posts_company_id ON job_posts(company_id);
CREATE INDEX idx_job_posts_status ON job_posts(status);
CREATE INDEX idx_job_positions_job_post_id ON job_positions(job_post_id);
CREATE INDEX idx_job_technologies_job_post_id ON job_technologies(job_post_id);
CREATE INDEX idx_job_technologies_technology_id ON job_technologies(technology_id);
CREATE INDEX idx_job_applications_job_post_id ON job_applications(job_post_id);
CREATE INDEX idx_job_applications_profile_id ON job_applications(profile_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);
