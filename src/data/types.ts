export type UserRole = "student" | "admin";
export type ProjectStatus = "Draft" | "Pending" | "Approved" | "Rejected" | "In Progress" | "Completed" | "Archived";
export type ProjectCategory = "Recycling" | "Energy" | "Water" | "Community" | "Research" | "Other";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  expectedImpact: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  status: ProjectStatus;
  createdBy: string;
  createdAt: string;
  submittedAt?: string;
}

export interface Approval {
  id: string;
  projectId: string;
  adminId: string;
  decision: "Approved" | "Rejected";
  comment: string;
  decisionDate: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  description: string;
  progressPercentage: number;
  metricType?: string;
  metricValue?: number;
  evidenceFilePath?: string;
  createdAt: string;
}
