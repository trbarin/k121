import ngAsync from "../../commons/ngAsync";

const name = "myFooter";

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
  }

  $onInit() {}

  $onChanges() {}

  $doCheck() {}

  $onDestroy() {
    this.onRecordsChange();
  }

  $postLink() {}

  @ngAsync()
  async raffle() {
    await this.RaffleService.raffle();
    this.$timeout(() => this.$rootScope.$broadcast("onUpdate"), 250);
  }
}

require(`./${name}.scss`);

export const component = {
  bindings: {},
  controller,
  name,
  template: require(`./${name}.html`)
};
