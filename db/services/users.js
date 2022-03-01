import Prisma from "../dbconprisma";

/**
 * get User by username
 * @param {*} username
 * @returns User
 */
export async function getUser(username = null) {
  if (username === null) {
    throw new Error("pass valid username");
  }
  try {
    let response = await Prisma.users.findUnique({
      where: { username },
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}


/**
 * change Password
 * @param {*} param0
 * @returns
 */
 export async function changePassword({ username, newhashedpassword }) {
  if (username === null || username === undefined) {
    throw new Error("pass valid username");
  }

  if (newhashedpassword === null || newhashedpassword === undefined) {
    throw new Error("pass valid newhashedpassword");
  }

  try {
    let { password, ...response } = await Prisma.users.update({
      data: { password: newhashedpassword },
      where: { username: username },
    });

    return response;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}
