export class SecretSantaService {
  /** @ngInject */
  constructor(Restangular) {
    this.secretSanta = Restangular.all("secretSanta/");
  }

  add(record) {
    return this.secretSanta.customPOST(record);
  }

  delete(record) {
    return record.customDELETE(record._id);
  }

  get() {
    return this.secretSanta.getList();
  }

  update(record) {
    return record.customPUT(record, record._id);
  }
}
