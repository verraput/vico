import { loginResponse, registerResponse } from "@/data/authInterface";

export const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result: loginResponse = await response.json();

  return result;
};

export const logout = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const result: number = response.status;

  return result;
};

export const registerMentor = async (
  name: string,
  email: string,
  password: string,
  confirm_password: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_type: "mentor",
      name,
      email,
      password,
      confirm_password,
    }),
  });
  const result: registerResponse = await response.json();

  return result;
};
export const registerLearner = async (
  name: string,
  email: string,
  password: string,
  confirm_password: string
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_type: "learner",
      name,
      email,
      password,
      confirm_password,
    }),
  });
  const result: registerResponse = await response.json();

  return result;
};

export const getProfile = async (token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const result: loginResponse = await response.json();
  
  return result;
};
