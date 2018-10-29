const name = "myFooter";

let _this;

class controller {
  constructor(RaffleService, $rootScope, $timeout) {
    "ngInject";

    this.RaffleService = RaffleService;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;

    this.canRaffle = false;

    this.onRecordsChange = $rootScope.$on("onRecordsChange", (event, data) => {
      this.canRaffle = !data.isDetail && data.records > 1;
    });

    _this = this;
  }

  $onInit() {}

  $onChanges() {}

  $doCheck() {}

  $onDestroy() {
    _this.onRecordsChange();
  }

  $postLink() {}

  raffle() {
    this.RaffleService.raffle().then(() => {
      _this.$timeout(() => _this.$rootScope.$broadcast("onUpdate"), 250);
    });
  }
}

require(`./${name}.scss`);

export const component = {
  bindings: {},
  controller,
  name,
  template: require(`./${name}.html`)
};
