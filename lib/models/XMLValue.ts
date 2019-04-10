import {XMLElement} from "./XMLElement";

export class XMLValue {

  static annotate(target: any, key: string, descriptor?: TypedPropertyDescriptor<any>): void {
    const element = XMLElement.getOrCreateIfNotExists(target);

    element.value = (entity) => {
      if (descriptor && descriptor.get) {
        return descriptor.get.call(entity);
      }
      return entity[key];
    }
  }

}
