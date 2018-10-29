const name = "myMasterDetail";

let _this;

class controller {
  constructor(SecretSantaService, $rootScope, $scope) {
    "ngInject";
    this.SecretSantaService = SecretSantaService;
    this.$rootScope = $rootScope;

    this.isDetail = false;
    this.isNewRecord = false;
    this.record = {};
    this.records = [];

    this.onUpdate = $scope.$on("onUpdate", this.reload);

    _this = this;
  }

  $onInit() {
    this.reload();
  }

  $onChanges() {}

  $doCheck() {}

  $onDestroy() {
    this.onUpdate();
  }

  $postLink() {}

  add() {
    this.record = {};
    this.setDetail(true, true);
  }

  cancel() {
    this.record = {};
    this.setDetail(false, false);
  }

  delete(record) {
    this.SecretSantaService.delete(record)
      .then(this.reload)
      .catch(this.error);
  }

  edit(record) {
    this.setDetail(true, false);
    angular.copy(record, this.record);
  }

  setDetail(isDetail, isNewRecord) {
    _this.isDetail = isDetail;
    _this.isNewRecord = isNewRecord;
    _this.$rootScope.$emit("onRecordsChange", {
      isDetail: _this.isDetail,
      records: _this.records.length
    });
  }

  error(error) {
    console.log(error);
  }

  reload() {
    _this.SecretSantaService.get()
      .then(result => {
        _this.records = result.data;
        _this.setDetail(false, false);
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
