import 'reflect-metadata';
import {XMLValue as XMLValueModel} from "../models/XMLValue";

export function XMLValue(target: any, key: string, descriptor?: TypedPropertyDescriptor<any>) {
  XMLValueModel.annotate(target, key, descriptor);
}
