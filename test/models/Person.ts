import {XMLChild} from "../../lib/annotations/XMLChild";
import {XMLElement} from "../../lib/annotations/XMLElement";
import {Hobby} from "./Hobby";
import {XMLAttribute} from "../../lib/annotations/XMLAttribute";

export const PERSON_ROOT = 'person';
export const PERSON_NS = 'ps';

@XMLElement({root: PERSON_ROOT})
export class Person {

  @XMLAttribute({namespace: ''})
  private firstname: string;

  private lastname: string;

  @XMLAttribute({namespace: PERSON_NS})
  get fullname(): string {

    return this.firstname + ' ' + this.lastname;
  }

  @XMLAttribute({namespace: PERSON_NS})
  private age: number;

  @XMLChild({
    namespace: PERSON_NS,
    name: 'hobby'
  })
  private hobbies: Hobby[];

  @XMLChild({
    namespace: PERSON_NS,
    stripPluralS: true
  })
  private friends: Person[];

  @XMLChild({
    name: 'pet',
    implicitStructure: 'pets.$'
  })
  private pets: string[];

  constructor(
    firstname: string,
    lastname: string,
    age: number,
    pets?: any,
    hobbies?: any,
  ) {

    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.pets = pets;
    this.hobbies = hobbies;
  }

  getFirstname(): string {

    return this.firstname;
  }

  getAge(): number {

    return this.age;
  }

  addHobby(hobby: Hobby): void {

    if (!this.hobbies) this.hobbies = [];

    this.hobbies.push(hobby);
  }

  addHobbies(hobbies: Hobby[]): void {

    if (!this.hobbies) this.hobbies = [];

    this.hobbies.push(...hobbies);
  }

  addFriend(friend: Person): void {

    if (!this.friends) this.friends = [];

    this.friends.push(friend);
  }

  addFriends(friends: Person[]): void {

    if (!this.friends) this.friends = [];

    this.friends.push(...friends);
  }

  addPets(pets: string[]): void {

    if (!this.pets) this.pets = [];

    this.pets.push(...pets);
  }

}
