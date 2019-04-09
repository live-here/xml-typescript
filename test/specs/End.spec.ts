import {xml} from '../..'
import {Hobby} from '../models/Hobby';
import {Person} from '../models/Person';

const hobbies = [
  new Hobby('reading', 'loves to read books, magazines and web articles', 'a'),
  new Hobby('listening to Music', 'loves to listen to rock music', 'b'),
  new Hobby('travelling', 'loves to travel around the world', 'c'),
];

const pets = ['dog', 'cat'];
const bob = new Person('Bob', 'Mad', 29, pets, hobbies);

const bobXml = xml.serialize(bob);
console.log(bobXml);
