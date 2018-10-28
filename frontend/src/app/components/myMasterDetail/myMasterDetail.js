const name = "myMasterDetail";

let _this;

class controller {
  /** @ngInject */
  constructor(SecretSantaService) {
    this.SecretSantaService = SecretSantaService;

    this.isDetail = false;
    this.isNewRecord = false;
    this.record = {};

    _this = this;
  }

  $onInit() {
    this.reload();
  }

  $onChanges() {}

  $doCheck() {}

  $onDestroy() {}

  $postLink() {}

  add() {
    this.isDetail = true;
    this.isNewRecord = true;
    this.record = {};
  }

  cancel() {
    this.isDetail = false;
    this.isNewRecord = false;
    this.record = {};
  }

  delete(record) {
    this.isDetail = false;
    this.isNewRecord = false;
    this.SecretSantaService.delete(record)
      .then(this.reload)
      .catch(this.error);
  }

  edit(record) {
    this.isDetail = true;
    this.isNewRecord = false;
    angular.copy(record, this.record);
  }

  error(error) {
    console.log(error);
  }

  reload() {
    _this.SecretSantaService.get()
      .then(result => {
        _this.isDetail = false;
        _this.isNewRecord = false;
        _this.records = result.data;
      })
      .catch(_this.error);
  }

  save(record) {
    let promise;

    if (this.isNewRecord) {
      promise = this.SecretSantaService.add(record);
    } else {
      promise = this.SecretSantaService.update(record);
    }

    promise.then(_this.reload).catch(_this.error);
  }
}

require(`./${name}.scss`);

export const component = {
  bindings: {},
  controller,
  name,
  template: require(`./${name}.html`)
};
