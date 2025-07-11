//  MOCK DATABASE
import type { Listing, AdminAction } from "./types";

//admin users
export const adminUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@yopmail.com",
    role: "admin",
    password: "$2a$12$u7ysxsJEcoG8VjtrVlMhBuEKo6QvUcpLDTh5RAnJpnTCAvQ0qd7..", //Admin@123
  },
  {
    id: "2",
    name: "Sandeep Yadav",
    email: "sandeep@gmail.com",
    role: "admin",
    password: "$2a$12$r2VBbuTgRQij1apBK645d.w2sey0AKBDOgL5GO/HYygSz4r97faKm", //sandeep@786
  },
];

// car rentals list
export const listings: Listing[] = [
  {
    id: 1,
    userId: 1,
    userName: "John Smith",
    userEmail: "john@example.com",
    make: "Toyota",
    model: "Camry",
    year: 2022,
    pricePerDay: 45.0,
    location: "Los Angeles, CA",
    description: "Clean and reliable sedan perfect for city driving",
    features: ["GPS", "Bluetooth", "Backup Camera"],
    status: "pending",

    reviewedBy: null,
    reviewedAt: null,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    userId: 2,
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    make: "Honda",
    model: "CR-V",
    year: 2023,
    pricePerDay: 65.0,
    location: "San Francisco, CA",
    description: "Spacious SUV ideal for family trips",
    features: ["GPS", "AC", "Apple CarPlay", "All-Wheel Drive"],
    status: "pending",
    reviewedBy: null,
    reviewedAt: null,
    createdAt: "2024-01-14T14:30:00Z",
    updatedAt: "2024-01-14T14:30:00Z",
  },
  {
    id: 3,
    userId: 3,
    userName: "Mike Davis",
    userEmail: "mike@example.com",
    make: "BMW",
    model: "3 Series",
    year: 2021,
    pricePerDay: 85.0,
    location: "New York, NY",
    description: "Luxury sedan with premium features",
    features: ["GPS", "Leather Seats", "Sunroof", "Premium Audio"],
    status: "approved",
    reviewedBy: "Admin User",
    reviewedAt: "2024-01-13T09:15:00Z",
    createdAt: "2024-01-12T16:20:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: 4,
    userId: 4,
    userName: "Lisa Wilson",
    userEmail: "lisa@example.com",
    make: "Ford",
    model: "Mustang",
    year: 2020,
    pricePerDay: 95.0,
    location: "Miami, FL",
    description: "Sports car for an exciting driving experience",
    features: ["GPS", "Manual Transmission", "Premium Audio"],
    status: "rejected",
    reviewedBy: "Admin User",
    reviewedAt: "2024-01-11T11:45:00Z",
    createdAt: "2024-01-10T13:10:00Z",
    updatedAt: "2024-01-11T11:45:00Z",
  },
  {
    id: 5,
    userId: 5,
    userName: "David Brown",
    userEmail: "david@example.com",
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    pricePerDay: 120.0,
    location: "Seattle, WA",
    description: "Electric vehicle with autopilot features",
    features: ["Autopilot", "Supercharging", "Premium Interior"],
    status: "pending",
    reviewedBy: null,
    reviewedAt: null,
    createdAt: "2024-01-16T08:30:00Z",
    updatedAt: "2024-01-16T08:30:00Z",
  },
];

export const getData = async (
  page: number,
  limit: number,
  status: string | null
): Promise<{ data: Listing[]; totalCount: number; totalPages: number }> => {
  const skip = (page - 1) * limit;

  if (status) {
    const filteredData = listings.filter(
      (listing) => listing.status === status
    );
    return {
      totalCount: filteredData.length,
      totalPages: Math.ceil(filteredData.length / limit),
      data: filteredData.slice(skip, skip + limit),
    };
  }
  return {
    totalCount: listings.length,
    totalPages: Math.ceil(listings.length / limit),
    data: listings.slice(skip, skip + limit),
  };
};

//admin action logs
export const adminActions: AdminAction[] = [];

export const getLogs = async (): Promise<AdminAction[]> => {
  return adminActions;
};

// export async function getListingById(id: number): Promise<Listing | null> {
//   return listings.find((listing) => listing.id === id) || null
// }

// export async function updateListingStatus(
//   id: number,
//   status: "approved" | "rejected",
//   adminNotes: string,
//   adminName: string,
// ): Promise<boolean> {
//   const listingIndex = listings.findIndex((l) => l.id === id)
//   if (listingIndex === -1) return false

//   listings[listingIndex] = {
//     ...listings[listingIndex],
//     status,
//     adminNotes: adminNotes,
//     reviewedBy: adminName,
//     reviewedAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   }

//   // Add admin action
//   adminActions.push({
//     id: adminActions.length + 1,
//     listing_id: id,
//     admin_name: adminName,
//     action: status,
//     notes: adminNotes,
//     createdAt: new Date().toISOString(),
//   })

//   return true
// }

// export async function updateListing(id: number, updates: Partial<Listing>): Promise<boolean> {
//   const listingIndex = listings.findIndex((l) => l.id === id)
//   if (listingIndex === -1) return false

//   listings[listingIndex] = {
//     ...listings[listingIndex],
//     ...updates,
//     updatedAt: new Date().toISOString(),
//   }

//   return true
// }
