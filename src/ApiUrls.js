const BASE_URL = "http://192.168.249.18:9898";

const apiUrls = {
  MAIN_URL:`${BASE_URL}`,
  
  PROVIDER_LOGIN:`${BASE_URL}/providerapis/login/`,
  PROVIDER_OWN_DATA_GET:`${BASE_URL}/providerapis/providerOwnData/?id=`,
  PROVIDER_CREATE_ACCOUNT:`${BASE_URL}/providerapis/signup/`,
  PROVIDER_ACCOUNT_APPROVAL: `${BASE_URL}/adminapis/accountApproval/`,
  PROVIDER_DELETE_ACCOUNT: `${BASE_URL}/adminapis/providersdata/?id=`,
  PROVIDER_ACCOUNT_GET: `${BASE_URL}/adminapis/providersdata/`,

  PROVIDER_PACKAGE_DATA_GET:`${BASE_URL}/providerapis/packagesdata/?company_id=`,
  PROVIDER_PACKAGE_DELETE:`${BASE_URL}/providerapis/packagesdata/?package_id=`,
  PROVIDER_PACKAGE_UPDATE:`${BASE_URL}/providerapis/packagesdata/?package_id=`,
  PROVIDER_PACKAGE_POST:`${BASE_URL}/providerapis/packagesdata/`,
  HOUSE_SELLING_AD:`${BASE_URL}/adminapis/HouseSellingAd/`,
  
  BUYER_GET_DATA:`${BASE_URL}/adminapis/UserSignUp/`,

  PROVIDER_TEAM_DATA_UPDATE:`${BASE_URL}/providerapis/teamdata/?id=`,
  PROVIDER_TEAM_DATA_POST:`${BASE_URL}/providerapis/teamdata/`,
  PROVIDER_TEAM_DATA_GET:`${BASE_URL}/providerapis/teamdata/?company_id=`,
  PROVIDER_TEAM_DATA_DELETE:`${BASE_URL}/providerapis/teamdata/?id=`,
};

export default apiUrls;
