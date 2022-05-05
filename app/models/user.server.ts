import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  // TODO: Fix this bug 
  /**
   * Type '{ email: string; password: { create: { hash: string; }; }; }' is not assignable to type '(Without<UserCreateInput, UserUncheckedCreateInput> & UserUncheckedCreateInput) | (Without<...> & UserCreateInput)'.
   */
  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

// TODO: Modify this function so only authorized user can delete their own account
export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}


export function resetPassword(userId: string) {
  return  null
  // TODO: Enable this
}

export function followAnotherUser(primaryUserId: string, userWantedToFollowId: string) {
  return  null
  // TODO: Enable this
}

export function unfollowAnotherUser(primaryUserId: string, userWantedToUnfollowId: string) {
  return  null
  // TODO: Enable this
}

export function addFollowedTopics(topicId: string, userId: string) {
  return  null
  // TODO: Enable this
}
