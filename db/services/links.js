import Prisma from "../dbconprisma";

/**
 * get LinkData
 * @param {*} includeInactive
 * @returns
 */
export async function getLinkData(includeInactive = true) {
  try {
    let pageDataResponse = await Prisma.pagedata.findMany();

    let pageData = pageDataResponse[0];

    let whereCluase = includeInactive
      ? { pagedataid: pageData.id }
      : { pagedataid: pageData.id, active: true };

    let linkDataResponse = await Prisma.linkdata.findMany({
      orderBy: { orderIndex: "asc" },
      where: whereCluase,
    });

    let linkData = [];

    linkDataResponse.forEach((element, index) => {
      let { created_at, ...linkDataRows } = element;
      linkData.push(linkDataRows);
    });

    return { linkData };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * insert PageLink
 * @param {*} data
 * @returns
 */
export async function insertPageLinks(data) {
  try {
    let insertLinksData = Prisma.linkdata.create({ data });

    return insertLinksData;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * update Link
 * @param {*} data
 * @returns
 */
export async function updateLink(data) {
  try {
    const { id, ...dataWOid } = data;

    let updatedLink = await Prisma.linkdata.update({
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
 * delete Link
 * @param {*} id
 * @returns
 */
export async function deleteLink({ id }) {
  if (id === null || id === undefined) {
    throw new Error("pass valid id");
  }
  try {
    let response = await Prisma.linkdata.delete({ where: { id } });

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
 * update all links with common data
 * @param {*} data
 * @returns
 */
export async function updateCommonData(data) {
  try {
    await Prisma.linkdata.updateMany({ data: data });
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * reorder Links
 * @param {*} data
 * @returns
 */
export async function reorderLinks(data = []) {
  if (data.length < 1) {
    throw new Error("invalid data");
  }

  let promiseArr = [];

  try {
    data.forEach((link) => {
      promiseArr.push(
        Prisma.linkdata.update({
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
