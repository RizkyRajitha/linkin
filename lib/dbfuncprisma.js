import Prisma from "../db/dbconprisma";

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
 * get PageData
 * @returns {object} Pagedata
 */
export async function getPageData() {
  try {
    let pageDataResponse = await Prisma.pagedata.findMany();

    let { created_at, ...pageData } = pageDataResponse[0];

    return { pageData };
  } catch (error) {
    throw new Error(error.message);
  }
}

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
 * get PageData with LinkData
 * @param {*} includeInactive
 * @returns
 * @deprecated // Now all APP uses getPageDatawLinkAndSocialData method
 */
export async function getPageDatawLinkData(includeInactive = true) {
  try {
    let pageData = await getPageData();
    let linkData = await getLinkData(includeInactive);

    return { ...pageData, ...linkData };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * get PageData with LinkData & SocialData
 * @param {*} includeInactive
 * @returns
 */
export async function getPageDatawLinkAndSocialData(includeInactive = true) {
  try {
    let pageData = await getPageData();
    let linkData = await getLinkData(includeInactive);
    let socialData = await getSocialData(includeInactive);

    return { ...pageData, ...linkData, ...socialData };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * update PageData
 * @param {*} data
 * @returns
 */
export async function updatePageData(data) {
  try {
    let updatedPageData = await Prisma.pagedata.update({
      where: { id: 1 },
      data,
    });

    return updatedPageData;
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
