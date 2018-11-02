import decoratorHelper from "./decoratorHelper";
import { restangular } from "./restangular";

angular
  .module("framework")
  .config(restangular)
  .run($injector => {
    "ngInject";
    decoratorHelper.injector = $injector;
  });
