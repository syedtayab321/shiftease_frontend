// const BASE_URL = "http://192.168.18.2:2346";
const BASE_URL = "http://192.168.65.18:7344";
// const BASE_URL = "http://10.115.149.37:2346";
// const BASE_URL = "http://10.115.149.45:2346";
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
  RENT_AD_GET:`${BASE_URL}/adminapis/RentAdData/`,
  RENT_AD_DELETE:`${BASE_URL}/adminapis/RentAdData/?id=`,

  // users data related data apis
  BUYER_GET_DATA:`${BASE_URL}/adminapis/UserSignUp/`,
  BUYER_DELETE_DATA:`${BASE_URL}/adminapis/UserSignUp/?UserId=`,
  // providers company team data related
  PROVIDER_TEAM_DATA_UPDATE:`${BASE_URL}/providerapis/teamdata/?id=`,
  PROVIDER_TEAM_DATA_POST:`${BASE_URL}/providerapis/teamdata/`,
  PROVIDER_TEAM_DATA_GET:`${BASE_URL}/providerapis/teamdata/?company_id=`,
  PROVIDER_TEAM_DATA_DELETE:`${BASE_URL}/providerapis/teamdata/?id=`,
  
  // order requests data
  PROVIDER_ORDER_REQUESTS_GET:`${BASE_URL}/providerapis/serviceBookingRequests/`,
  PROVIDER_ORDER_REQUEST_DELETE:`${BASE_URL}/providerapis/serviceBookingRequests/?request_id=`,
  PROVIDER_ORDER_REQUEST_APPROVAL:`${BASE_URL}/providerapis/ApprovedOrders/`,

  PROVIDER_APPROVED_ORDERS_GET:`${BASE_URL}/providerapis/ApprovedOrders/?company_id=`,
  PROVIDER_APPROVED_ORDERS_UPDATE:`${BASE_URL}/providerapis/ApprovedOrders/?order_id=`,
  PROVIDER_APPROVED_ORDERS_DELETE:`${BASE_URL}/providerapis/ApprovedOrders/?order_id=`,
  //  Provider Message Apis
  PROVIDER_MESSAGE_API_POST:`${BASE_URL}/MessageApis/providerMessage/`,
  PROVIDER_MESSAGE_API_GET:`${BASE_URL}/MessageApis/providerMessage/?receiverName=&senderName=`,
  PROVIDER_MESSAGE_API_DELETE:`${BASE_URL}/MessageApis/providerMessage/?messageId=`,
  //  Admin Message Apis
  ADMIN_MESSAGE_API_POST:`${BASE_URL}/MessageApis/adminMessage/`,
  ADMIN_MESSAGE_API_GET:`${BASE_URL}/MessageApis/adminMessage/?receiverName=&senderName=`,
  ADMIN_MESSAGE_API_DELETE:`${BASE_URL}/MessageApis/adminMessage/?messageId=`,
//   user message apis
   USER_MESSAGE_API_POST:`${BASE_URL}/MessageApis/adminMessage/`,
   USER_MESSAGE_API_GET:`${BASE_URL}/MessageApis/adminMessage/?receiverName=&senderName=`,
   USER_MESSAGE_API_DELETE:`${BASE_URL}/MessageApis/adminMessage/?messageId=`,
};

export default apiUrls;
