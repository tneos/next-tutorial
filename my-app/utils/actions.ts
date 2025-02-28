"use server";
import {readFile, writeFile} from "fs/promises";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export const createUser = async (prevState: any, formData: FormData) => {
  "use server";

  await new Promise(resolve => setTimeout(resolve, 3000));
  // Type assertion for both inputs
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;

  // Collect multiple input values
  // const rawData = Object.fromEntries(formData);
  const newUser: User = {firstName, lastName, id: Date.now().toString()};
  try {
    await saveUser(newUser);
    revalidatePath("/users");
    // Return success message
    return "user created successfully";
  } catch (error) {
    console.log(error);
    // Return error message
    return "failed to create user";
  }

  // Another solution is to redirect as soon as new user saved(place redirect() outside of try-catch block)
  //redirect('/');
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

export const deleteUser = async (formData: FormData) => {
  const id = formData.get("id") as string;
  const users = await fetchUsers();
  const updatedUsers = users.filter(user => user.id !== id);
  await writeFile("users.json", JSON.stringify(updatedUsers));
  revalidatePath("/actions");
};

// Alternative way
export const removeUser = async (id: string, formData: FormData) => {
  const name = formData.get("name") as string;
  console.log(name);

  const users = await fetchUsers();
  const updatedUsers = users.filter(user => user.id !== id);
  await writeFile("users.json", JSON.stringify(updatedUsers));
  revalidatePath("/actions");
};
