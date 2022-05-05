import type { Post } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Post } from "@prisma/client";

export function getPost(id: Pick<Post, "id">) {
  // Return single post with matching id
}

export function getPosts() {
  return prisma.post.findMany({
    select: { id: true, title: true },
    // TODO: What to rank post by (poularity or latest?)
    orderBy: { updatedAt: "desc" },
  });
}

export function editPost(postId: string) {
  return  null
  // TODO: Enable this
}

export function likePost(postId: string, likedByUserWithThisId: string) {
  return  null
  // TODO: Enable this
}

export function bookmarkPost(postId: string, userId: string) {
  return  null
  // TODO: Enable this
}



