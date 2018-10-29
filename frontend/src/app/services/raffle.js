export class RaffleService {
  constructor(Restangular) {
    "ngInject";
    this.secretSanta = Restangular.all("raffle/");
  }

  raffle() {
    return this.secretSanta.customPOST();
  }
}
