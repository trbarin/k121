const name = "myHeader";

class controller {
  constructor() {
    "ngInject";
  }

  $onInit() {}

  $onChanges() {}

  $doCheck() {}

  $onDestroy() {}

  $postLink() {}
}

require(`./${name}.scss`);

export const component = {
  bindings: {},
  controller,
  name,
  template: require(`./${name}.html`)
};
