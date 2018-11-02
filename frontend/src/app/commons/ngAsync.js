import decoratorHelper from "../configs/decoratorHelper";

const ngAsync = function() {
  return function(target, key, descriptor) {
    const fn = descriptor.value;
    descriptor.value = function() {
      const result = fn.apply(this, arguments);
      const $injector = decoratorHelper.injector;
      $injector.invoke(($rootScope, $q) => {
        "ngInject";
        $q.when(result).then(() => $rootScope.$applyAsync());
      });
    };
  };
};

export default ngAsync;
