export interface Listing {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  location: string;
  description: string | null;
  features: string[];
  status: "pending" | "approved" | "rejected";
  // adminNotes: string | null
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAction {
  id: number;
  name: string;
  action: string;
  createdAt: string;
}
