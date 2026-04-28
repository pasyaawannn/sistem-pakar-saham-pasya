// Auth client-side ringan (localStorage + hash sederhana).
// Untuk demo. Backend Python (FastAPI + JWT + SQLite) tersedia di folder /backend.
// Mudah diganti: tinggal swap fungsi-fungsi di sini ke fetch ke API.

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

const USERS_KEY = "sahampakar_users";
const SESSION_KEY = "sahampakar_session";

interface StoredUser extends User {
  passwordHash: string;
}

async function hash(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text + "::sahampakar_salt");
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function loadUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function register(email: string, password: string, name: string): Promise<User> {
  const users = loadUsers();
  if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("Email sudah terdaftar.");
  }
  if (password.length < 6) {
    throw new Error("Password minimal 6 karakter.");
  }
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email,
    name,
    createdAt: new Date().toISOString(),
    passwordHash: await hash(password),
  };
  users.push(user);
  saveUsers(users);
  const { passwordHash, ...publicUser } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export async function login(email: string, password: string): Promise<User> {
  const users = loadUsers();
  const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
  if (!u) throw new Error("Email tidak ditemukan.");
  const h = await hash(password);
  if (h !== u.passwordHash) throw new Error("Password salah.");
  const { passwordHash, ...publicUser } = u;
  localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
  return publicUser;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
