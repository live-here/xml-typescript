import { Hobby } from "./Hobby";
export declare const PERSON_ROOT = "person";
export declare const PERSON_NS = "ps";
export declare class Person {
    private firstname;
    private lastname;
    readonly fullname: string;
    private age;
    private hobbies;
    private friends;
    private pets;
    constructor(firstname: string, lastname: string, age: number);
    getFirstname(): string;
    getAge(): number;
    addHobby(hobby: Hobby): void;
    addHobbies(hobbies: Hobby[]): void;
    addFriend(friend: Person): void;
    addFriends(friends: Person[]): void;
    addPets(pets: string[]): void;
}
