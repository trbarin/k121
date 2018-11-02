class DecoratorHelper {
  get injector() {
    return this.injectorInstance;
  }
  set injector(injector) {
    this.injectorInstance = injector;
  }
}

const decoratorHelper = new DecoratorHelper();

export default decoratorHelper;
