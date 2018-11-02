import ngAsync from "../../commons/ngAsync";

const name = "myMasterDetail";

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

  @ngAsync()
  async delete(record) {
    try {
      await this.SecretSantaService.delete(record);
      this.reload();
    } catch (error) {
      this.error(error);
    }
  }

  edit(record) {
    this.setDetail(true, false);
    angular.copy(record, this.record);
  }

  setDetail(isDetail, isNewRecord) {
    this.isDetail = isDetail;
    this.isNewRecord = isNewRecord;
    this.$rootScope.$emit("onRecordsChange", {
      isDetail: this.isDetail,
      records: this.records.length
    });
  }

  error(error) {
    console.log(error);
  }

  @ngAsync()
  async reload() {
    try {
      const result = await this.SecretSantaService.get();
      this.records = result.data;
      this.setDetail(false, false);
    } catch (error) {
      this.error(error);
    }
  }

  @ngAsync()
  async save(record) {
    try {
      if (this.isNewRecord) {
        await this.SecretSantaService.add(record);
      } else {
        await this.SecretSantaService.update(record);
      }
      this.reload();
    } catch (error) {
      this.error(error);
    }
  }
}

require(`./${name}.scss`);

export const component = {
  bindings: {},
  controller,
  name,
  template: require(`./${name}.html`)
};
