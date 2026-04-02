import type { Snack, Student, Order } from "@/types";

const STORAGE_KEYS = {
  snacks: "canteen_snacks",
  students: "canteen_students",
  orders: "canteen_orders",
};

const defaultSnacks: Snack[] = [
  { id: "s1", name: "Samosa", price: 15, ordersCount: 42 },
  { id: "s2", name: "Sandwich", price: 30, ordersCount: 28 },
  { id: "s3", name: "Chips Packet", price: 20, ordersCount: 55 },
  { id: "s4", name: "Juice Box", price: 25, ordersCount: 33 },
  { id: "s5", name: "Biscuit Pack", price: 10, ordersCount: 61 },
  { id: "s6", name: "Muffin", price: 35, ordersCount: 19 },
  { id: "s7", name: "Cold Coffee", price: 40, ordersCount: 22 },
  { id: "s8", name: "Veg Puff", price: 20, ordersCount: 37 },
];

const defaultStudents: Student[] = [
  { id: "st1", name: "Aarav Sharma", referralCode: "STU-A1B2", totalSpent: 150 },
  { id: "st2", name: "Priya Patel", referralCode: "STU-C3D4", totalSpent: 230 },
  { id: "st3", name: "Rohan Gupta", referralCode: "STU-E5F6", totalSpent: 80 },
];

const defaultOrders: Order[] = [
  { id: "o1", studentId: "st1", snackId: "s1", quantity: 2, payableAmount: 30, createdAt: "2025-03-28T10:30:00Z" },
  { id: "o2", studentId: "st1", snackId: "s4", quantity: 1, payableAmount: 25, createdAt: "2025-03-29T11:00:00Z" },
  { id: "o3", studentId: "st2", snackId: "s2", quantity: 3, payableAmount: 90, createdAt: "2025-03-28T12:15:00Z" },
  { id: "o4", studentId: "st2", snackId: "s7", quantity: 2, payableAmount: 80, createdAt: "2025-03-30T09:45:00Z" },
  { id: "o5", studentId: "st3", snackId: "s3", quantity: 4, payableAmount: 80, createdAt: "2025-03-29T14:20:00Z" },
];

function load<T>(key: string, defaults: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [...defaults];
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getSnacks(): Snack[] {
  return load(STORAGE_KEYS.snacks, defaultSnacks);
}

export function getStudents(): Student[] {
  return load(STORAGE_KEYS.students, defaultStudents);
}

export function getOrders(): Order[] {
  return load(STORAGE_KEYS.orders, defaultOrders);
}

export function saveSnacks(data: Snack[]) {
  save(STORAGE_KEYS.snacks, data);
}

export function saveStudents(data: Student[]) {
  save(STORAGE_KEYS.students, data);
}

export function saveOrders(data: Order[]) {
  save(STORAGE_KEYS.orders, data);
}
