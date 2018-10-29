export function restangular(RestangularProvider) {
  "ngInject";
  RestangularProvider.setBaseUrl(process.env.API_URL);
  RestangularProvider.setDefaultHeaders({ "Content-Type": "application/json" });
  RestangularProvider.setFullResponse(true);
}
