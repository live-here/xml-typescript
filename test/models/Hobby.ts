import {XMLAttribute} from "../../lib/annotations/XMLAttribute";
import {XMLValue} from "../../lib/annotations/XMLValue";

export const HOBBY_NS = 'h';

export class Hobby {

  @XMLAttribute({namespace: 'xmlns'})
  readonly h: string = 'http://hobby.example.com';

  @XMLAttribute({namespace: HOBBY_NS})
  private name: string;

  @XMLAttribute({namespace: HOBBY_NS})
  private description: string;

  @XMLValue
  private xmlvalue: any;

  constructor(name: string,
              description: string,
              xmlvalue: any) {

    this.name = name;
    this.description = description;
    this.xmlvalue = xmlvalue;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getXMLValue(): any {
    return this.xmlvalue;
  }
}
