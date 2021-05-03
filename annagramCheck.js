/* 
Given two strings, check if both strings are annagrams. Each string can have whitespaces, but if the string has the right combination of characters, that string is still an annagram.
For example, "annagram" and "gra ma nan", the second string is still an annagram.

Example 1
string1 = "rat"
string2 = "car"
Output = false

*/

function areAnnagrams(val1, val2) {
  let string1 = val1;
  let string2 = val2;
  
  let string1Clean = string1.replace(/ /g, '');
  let string2Clean = string2.replace(/ /g, '');

  // If the length of both strings are not equal, then the two strings must not be annagrams
  if (string1Clean.length != string2Clean.length) {
    return false
  }

  // Break each string to its individual characters array
  // Trim each string first because it could contain whitespaces
  let charsInString1 = Array.from(string1Clean);
  let charsInString2 = Array.from(string2Clean);
  
  // Store each character from one of the strings e.g. from string1 into a Map
  // Keep track the count of each character. If two strings are annagram, both strings MUST have the same set of characters and each character MUST occur the same number of times.
  // Hashmap collection structure will be { "characterFromString": charactercCount }
  let string1HashMap = new Map();

  // Map each character from string1 i.e. each element of array charsInString1 to the hashmap string1HashMap
  charsInString1.forEach((char) => {
    if (string1HashMap.has(char) === true) { // If the character is already in the hashmap, then increase the count
      let charCount = string1HashMap.get(char);
      charCount++;
      string1HashMap.set(char, charCount);
    } else { // If the character does not exist yet in the hashmap, add it with count of 1
      string1HashMap.set(char, 1);
    }
  })  

  // Lookup each character from string2 character array i.e. charsInString2 and check if it exists in the hashmap i.e. string1HashMap
  charsInString2.forEach((char) => {
    if (string1HashMap.has(char) === true) {
      let charCount = string1HashMap.get(char);
      charCount--; // the charCount of each character is decreased by 1 everytime a character from string2 matches a character in string1. At the end, if number of the character matches, then the charCount value of that character should be 0, meaning that that character occurs the same number of times.
      string1HashMap.set(char, charCount);
    }
  })

  // Check the final charCount result for each character in the hashmap. If all characters' charCount are 0, that means each character matches and occurs the same number of times
  for (let charCount of string1HashMap.values()) {
    if (charCount !== 0 ) {
      return false
    }
  }

  return true
}

// console.log(areAnnagrams("rat", "car"));
console.log(areAnnagrams("annagram", "gra ma nan"));