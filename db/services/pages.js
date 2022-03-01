import Prisma from "../dbconprisma";
import { getLinkData } from "./links";
import { getSocialData } from "./socialicons";

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
 * get PageData with LinkData & SocialData
 * @param {*} includeInactive
 * @returns
 */
export async function getPageDatawLinkAndSocialData(includeInactive = true) {
  try {
    let [pageData, linkData, socialData] = await Promise.all([
      getPageData(),
      getLinkData(includeInactive),
      getSocialData(includeInactive),
    ]);

    return { ...pageData, ...linkData, ...socialData };
  } catch (error) {
    throw new Error(error.message);
  }
}

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
