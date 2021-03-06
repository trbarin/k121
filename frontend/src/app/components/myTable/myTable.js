const name = "myTable";

class controller {
  constructor() {
    "ngInject";
  }

  $onInit() {}

  $onChanges() {}

  $doCheck() {}

  $onDestroy() {}

  $postLink() {}

  delete(record) {
    this.onDelete({ record });
  }

  edit(record) {
    this.onEdit({ record });
  }
}

require(`./${name}.scss`);

export const component = {
  bindings: {
    onDelete: "&",
    onEdit: "&",
    records: "<"
  },
  controller,
  name,
  template: require(`./${name}.html`)
};
