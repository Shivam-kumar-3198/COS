import type { Snack, Student, Order } from "@/types";
import { getSnacks, getStudents, getOrders, saveSnacks, saveStudents, saveOrders } from "./mockData";

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// GET /snacks
export async function fetchSnacks(): Promise<Snack[]> {
  await delay();
  return getSnacks();
}

// GET /students
export async function fetchStudents(): Promise<Student[]> {
  await delay();
  return getStudents();
}

// GET /students/:id
export async function fetchStudent(id: string): Promise<Student & { orders: (Order & { snackName: string })[] }> {
  await delay();
  const students = getStudents();
  const student = students.find((s) => s.id === id);
  if (!student) throw new Error("Student not found");

  const snacks = getSnacks();
  const orders = getOrders()
    .filter((o) => o.studentId === id)
    .map((o) => ({
      ...o,
      snackName: snacks.find((s) => s.id === o.snackId)?.name ?? "Unknown",
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return { ...student, orders };
}

// POST /students
export async function createStudent(name: string): Promise<Student> {
  await delay();
  const students = getStudents();
  const code = `STU-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const newStudent: Student = {
    id: `st${Date.now()}`,
    name: name.trim(),
    referralCode: code,
    totalSpent: 0,
  };
  students.push(newStudent);
  saveStudents(students);
  return newStudent;
}

// POST /orders
export async function createOrder(studentId: string, snackId: string, quantity: number): Promise<Order> {
  await delay();
  const snacks = getSnacks();
  const snack = snacks.find((s) => s.id === snackId);
  if (!snack) throw new Error("Snack not found");

  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  if (!student) throw new Error("Student not found");

  const payableAmount = snack.price * quantity;
  const newOrder: Order = {
    id: `o${Date.now()}`,
    studentId,
    snackId,
    quantity,
    payableAmount,
    createdAt: new Date().toISOString(),
  };

  // Update snack ordersCount
  snack.ordersCount += quantity;
  saveSnacks(snacks);

  // Update student totalSpent
  student.totalSpent += payableAmount;
  saveStudents(students);

  const orders = getOrders();
  orders.push(newOrder);
  saveOrders(orders);

  return newOrder;
}
