import { Project, ProjectUpdate, User, Approval } from "./types";

export const mockUsers: User[] = [
  { id: "1", fullName: "Sarah Green", email: "sarah@university.edu", role: "student", createdAt: "2025-09-01" },
  { id: "2", fullName: "Dr. James Oak", email: "james@university.edu", role: "admin", createdAt: "2025-08-01" },
  { id: "3", fullName: "Emily Rivers", email: "emily@university.edu", role: "student", createdAt: "2025-09-15" },
];

export const mockProjects: Project[] = [
  {
    id: "1", title: "Campus Solar Panel Initiative", category: "Energy",
    description: "Install solar panels on the science building rooftop to reduce carbon footprint and energy costs. The project will involve a feasibility study, vendor selection, and installation.",
    expectedImpact: "Reduce campus energy consumption by 15% and save $20,000 annually.",
    startDate: "2025-10-01", endDate: "2026-03-01", budget: 85000,
    status: "In Progress", createdBy: "1", createdAt: "2025-09-10", submittedAt: "2025-09-12",
  },
  {
    id: "2", title: "Zero-Waste Cafeteria Program", category: "Recycling",
    description: "Transform campus cafeterias into zero-waste zones by introducing composting stations, reusable containers, and eliminating single-use plastics across all dining facilities.",
    expectedImpact: "Eliminate 2 tons of waste per month from campus cafeterias.",
    startDate: "2025-11-01", endDate: "2026-02-01", budget: 12000,
    status: "Approved", createdBy: "3", createdAt: "2025-09-20", submittedAt: "2025-09-22",
  },
  {
    id: "3", title: "Rainwater Harvesting System", category: "Water",
    description: "Design and install a rainwater harvesting system for irrigation of campus gardens and green spaces, reducing municipal water usage significantly.",
    expectedImpact: "Save 50,000 liters of water per semester.",
    startDate: "2026-01-01", endDate: "2026-06-01", budget: 35000,
    status: "Pending", createdBy: "1", createdAt: "2025-10-01", submittedAt: "2025-10-05",
  },
  {
    id: "4", title: "Biodiversity Garden", category: "Community",
    description: "Create a native plant garden on campus to support local pollinators and provide an outdoor learning space for biology students.",
    expectedImpact: "Support 30+ native species and provide habitat for pollinators.",
    startDate: "2026-03-01", endDate: "2026-09-01", budget: 8000,
    status: "Draft", createdBy: "3", createdAt: "2025-10-10",
  },
  {
    id: "5", title: "Campus Carbon Audit Research", category: "Research",
    description: "Conduct a comprehensive carbon audit of all campus buildings and operations to identify key areas for emissions reduction and develop a roadmap to carbon neutrality.",
    expectedImpact: "Identify 40% of reducible emissions with actionable recommendations.",
    startDate: "2025-09-01", endDate: "2025-12-01", budget: 5000,
    status: "Completed", createdBy: "1", createdAt: "2025-08-15", submittedAt: "2025-08-18",
  },
  {
    id: "6", title: "LED Lighting Retrofit", category: "Energy",
    description: "Replace all fluorescent lighting in the library and administration buildings with energy-efficient LED fixtures, reducing electricity use.",
    expectedImpact: "Cut lighting energy use by 60% in target buildings.",
    startDate: "2025-10-01", endDate: "2025-12-15",
    status: "Rejected", createdBy: "3", createdAt: "2025-09-25", submittedAt: "2025-09-28",
  },
];

export const mockUpdates: ProjectUpdate[] = [
  { id: "1", projectId: "1", description: "Completed rooftop structural assessment. Building is suitable for solar panel installation.", progressPercentage: 25, metricType: "Energy Saved", metricValue: 0, createdAt: "2025-10-15" },
  { id: "2", projectId: "1", description: "Vendor selected and contracts signed. Installation scheduled for January.", progressPercentage: 45, metricType: "Energy Saved", metricValue: 0, createdAt: "2025-11-20" },
  { id: "3", projectId: "5", description: "Full audit completed across all 12 campus buildings. Report finalized.", progressPercentage: 100, metricType: "CO2 Reduced", metricValue: 150, createdAt: "2025-11-30" },
];

export const mockApprovals: Approval[] = [
  { id: "1", projectId: "1", adminId: "2", decision: "Approved", comment: "Excellent initiative. Budget approved from sustainability fund.", decisionDate: "2025-09-14" },
  { id: "2", projectId: "2", adminId: "2", decision: "Approved", comment: "Great for reducing waste. Proceed with pilot in main cafeteria first.", decisionDate: "2025-09-25" },
  { id: "3", projectId: "5", adminId: "2", decision: "Approved", comment: "Important research. Please share findings with facilities management.", decisionDate: "2025-08-20" },
  { id: "4", projectId: "6", adminId: "2", decision: "Rejected", comment: "Budget not available this quarter. Please resubmit next semester with revised cost estimates.", decisionDate: "2025-10-01" },
];
