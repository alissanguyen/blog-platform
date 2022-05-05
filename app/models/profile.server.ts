import { prisma } from "~/db.server";

// TODO: Should create profile on register new user
export function createProfile(userId:string) {
    // return  prisma.profile.create({
    //     data: {

    //     }
    // })
    // TODO: Enable this
}

export function getProfile(postId: string) {
    return prisma.profile.findUnique({
        where: {id: postId}
    })
}
/**
 * User can only EDIT if he/she is authorized to do so
 * @param profileId 
 * @param userId 
 * @returns 
 */
export function editProfile(profileId: string, userId: string) {
    return  null
    // TODO: Enable this
}

/**
 * User should not be able to delete profile, they can delete their account which will trigger this function
 * @param profileId 
 * @param postId 
 * @returns 
 */
export function deleteProfile(profileId: string, postId: string) {
    return  null
    // TODO: Enable this
}

/**
 * Should get back the followers table and count
 * @param profileId 
 * @returns 
 */
export function getFollowers(profileId: string) {
    return  null
    // TODO: Enable this
}

export function getFollowing(profileId: string) {
    return  null
    // TODO: Enable this
}

export function getPostsForThisProfile(profileId: string) {
return null
}

export function getFollowedTopicsForThisProfile(profileId: string) {
return null
}

export function getBookmarkedPostsForThisProfile(profileId: string) {
    return null
}

export function getCommentsForThisProfile(profileId: string) {
    return null
}