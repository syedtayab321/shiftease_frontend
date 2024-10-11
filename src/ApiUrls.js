// const BASE_URL = "http://192.168.18.2:7666";
const BASE_URL = "http://192.168.112.18:7666";
const apiUrls = {
  MAIN_URL:`${BASE_URL}`,
  // provider realted data apis
  PROVIDER_LOGIN:`${BASE_URL}/providerapis/login/`,
  PROVIDER_OWN_DATA_GET:`${BASE_URL}/providerapis/providerOwnData/?id=`,
  PROVIDER_CREATE_ACCOUNT:`${BASE_URL}/providerapis/signup/`,
  PROVIDER_ACCOUNT_APPROVAL: `${BASE_URL}/adminapis/accountApproval/`,
  PROVIDER_DELETE_ACCOUNT: `${BASE_URL}/adminapis/providersdata/?id=`,
  PROVIDER_ACCOUNT_GET: `${BASE_URL}/adminapis/providersdata/`,
// providers packages related data
  PROVIDER_PACKAGE_DATA_GET:`${BASE_URL}/providerapis/packagesdata/?company_id=`,
  PROVIDER_PACKAGE_DELETE:`${BASE_URL}/providerapis/packagesdata/?package_id=`,
  PROVIDER_PACKAGE_UPDATE:`${BASE_URL}/providerapis/packagesdata/?package_id=`,
  PROVIDER_PACKAGE_POST:`${BASE_URL}/providerapis/packagesdata/`,
  // house selling ads data
  HOUSE_SELLING_AD_GET:`${BASE_URL}/adminapis/HouseSellingAdData/`,
  HOUSE_SELLING_AD_UPDATE:`${BASE_URL}/adminapis/HouseSellingAdData/id=`,
  // apratment selling ads data
  Apartment_SELLING_AD_GET:`${BASE_URL}/adminapis/ApartmentSellingAdData/`,
  Apartment_SELLING_AD_UPDATE:`${BASE_URL}/adminapis/ApartmentSellingAdData/id=`,
 //  office selling ads data
  Office_SELLING_AD_GET:`${BASE_URL}/adminapis/OfficeSellingAdData/`,
  Office_SELLING_AD_UPDATE:`${BASE_URL}/adminapis/OfficeSellingAdData/id=`,
  // users data related data apis
  BUYER_GET_DATA:`${BASE_URL}/adminapis/UserSignUp/`,
  // providers company team data related
  PROVIDER_TEAM_DATA_UPDATE:`${BASE_URL}/providerapis/teamdata/?id=`,
  PROVIDER_TEAM_DATA_POST:`${BASE_URL}/providerapis/teamdata/`,
  PROVIDER_TEAM_DATA_GET:`${BASE_URL}/providerapis/teamdata/?company_id=`,
  PROVIDER_TEAM_DATA_DELETE:`${BASE_URL}/providerapis/teamdata/?id=`,
  
  // order requests data
  PROVIDER_ORDER_REQUESTS_GET:`${BASE_URL}/providerapis/serviceBookingRequests/`,
  PROVIDER_ORDER_REQUEST_DELETE:`${BASE_URL}/providerapis/serviceBookingRequests/?request_id=`,
  PROVIDER_ORDER_REQUEST_APPROVAL:`${BASE_URL}/providerapis/ApprovedOrders/`,
  PROVIDER_APPROVED_ORDERS_GET:`${BASE_URL}/providerapis/ApprovedOrders/?company_id=`
};

export default apiUrls;
