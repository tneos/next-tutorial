"use server";
import {readFile, writeFile} from "fs/promises";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (formData: FormData) => {
  "use server";

  // Type assertion for both inputs
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Collect multiple input values
  // const rawData = Object.fromEntries(formData);
  const newUser: User = {firstName, lastName, id: Date.now().toString()};

  await saveUser(newUser);
};

export const fetchUsers = async (): Promise<User[]> => {
  const result = await readFile("users.json", {encoding: "utf-8"});
  const users = result ? JSON.parse(result) : [];
  return users;
};

const saveUser = async (user: User) => {
  const users = await fetchUsers();
  users.push(user);
  await writeFile("users.json", JSON.stringify(users));
};
