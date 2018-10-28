const name = "myDetail";

class controller {
  /** @ngInject */
  constructor() {
    this.record = {};
  }

  $onInit() {}

  $onChanges() {}

  $doCheck() {}

  $onDestroy() {}

  $postLink() {}

  cancel() {
    this.onCancel();
  }

  save() {
    this.onSave({ record: this.record });
  }
}

require(`./${name}.scss`);

export const component = {
  bindings: {
    isNewRecord: "<",
    onCancel: "&",
    onSave: "&",
    record: "<"
  },
  controller,
  name,
  template: require(`./${name}.html`)
};
