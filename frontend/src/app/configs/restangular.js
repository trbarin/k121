/** @ngInject */
export function restangular(RestangularProvider) {
  RestangularProvider.setBaseUrl(process.env.API_URL);
  RestangularProvider.setDefaultHeaders({ "Content-Type": "application/json" });
  RestangularProvider.setFullResponse(true);
  RestangularProvider.addFullRequestInterceptor(
    (element, operation, what, url, headers, params, httpConfig) => {
      console.log(element, operation, what, url, headers, params, httpConfig);
    }
  );
}
