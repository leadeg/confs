import Fetch from "../../utilities/Fetch";
import {getDate} from "../../utilities/helper"

const userContentFetcher = new Fetch({baseURL: window.HBConfig.QUERY_API_URL});
// const userContentFetcher = new Fetch({baseURL: "http://user-content-hermes.hepsiburada.com/queryapi/v1"});

const getDailyReviewCount = async ({startDate=getDate({}), endDate=getDate({})}) => {
  return (await userContentFetcher.get(`/UserContents/GetDailyReviewCount?startDate=${startDate}&endDate=${endDate}`)).data;
};

const getOperatedUserContentCount = async ({startDate=getDate({}), endDate=getDate({}), from=0, size=100}) => {
  return (await userContentFetcher.get(`/UserContents/GetOperatedUserContentCount?startDate=${startDate}&endDate=${endDate}&from=${from}&size=${size}`)).data;
};

const getFirstTimeReviewedProductList = async ({startDate=getDate({}), endDate=getDate({})}) => {
  return (await userContentFetcher.get(`/UserContents/GetFirstTimeReviewedProductList?startDate=${startDate}&endDate=${endDate}`)).data;
};

const getReactionCount = async ({startDate=getDate({}), endDate=getDate({})}) => {
  return (await userContentFetcher.get(`/UserContents/GetReactionCount?startDate=${startDate}&endDate=${endDate}`)).data;
};

const getMostReviewedProducts = async ({startDate=getDate({}), endDate=getDate({})}) => {
  return (await userContentFetcher.get(`/UserContents/GetMostReviewedProducts?startDate=${startDate}&endDate=${endDate}`)).data;
};


export default {
  getDailyReviewCount,
  getOperatedUserContentCount,
  getFirstTimeReviewedProductList,
  getReactionCount,
  getMostReviewedProducts,
};
