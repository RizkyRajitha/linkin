import Prisma from "../dbconprisma";

/**
 * get SocialData
 * @param {*} includeInactive
 * @returns
 */
export async function getSocialData(includeInactive = true) {
  try {
    let pageDataResponse = await Prisma.pagedata.findMany();

    let pageData = pageDataResponse[0];

    let whereCluase = includeInactive
      ? { pagedataid: pageData.id }
      : { pagedataid: pageData.id, active: true };

    let socialDataResponse = await Prisma.socialdata.findMany({
      orderBy: { orderIndex: "asc" },
      where: whereCluase,
    });

    let socialData = [];

    socialDataResponse.forEach((element, index) => {
      let { created_at, ...socialDataRows } = element;
      socialData.push(socialDataRows);
    });

    return { socialData };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * insert SocialLink
 * @param {*} data
 * @returns
 */
export async function insertSocialLinks(data) {
  try {
    let insertSocialData = Prisma.socialdata.create({ data });

    return insertSocialData;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * update Social Link
 * @param {*} data
 * @returns
 */
export async function updateSocialLink(data) {
  try {
    const { id, ...dataWOid } = data;

    let updatedLink = await Prisma.socialdata.update({
      data: dataWOid,
      where: { id },
    });

    return updatedLink;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * delete Social Link
 * @param {*} id
 * @returns
 */
export async function deleteSocialLink({ id }) {
  if (id === null || id === undefined) {
    throw new Error("pass valid id");
  }
  try {
    let response = await Prisma.socialdata.delete({ where: { id } });

    return response;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * reorder Social Links
 * @param {*} data
 * @returns
 */
export async function reorderSocialLinks(data = []) {
  if (data.length < 1) {
    throw new Error("invalid data");
  }

  let promiseArr = [];

  try {
    data.forEach((link) => {
      promiseArr.push(
        Prisma.socialdata.update({
          where: { id: link.id },
          data: { orderIndex: link.orderIndex },
        })
      );
    });

    await Promise.all(promiseArr);
  } catch (error) {
    throw new Error(error.message);
  }

  return { success: true };
}
