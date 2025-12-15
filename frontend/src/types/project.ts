export interface Project {
  id: string;
  title: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  score?: number;
  feedback?: string;
  certificateUrl?: string;
}
