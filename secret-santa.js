const config = require('./gouffon-config.json');

class SecretSanta {
  constructor(array) {
    this.array = array;
  }

  /**
   * The Fisher-Yates (aka Knuth) shuffle algorithm
   * http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * inspired by Daplie/knuth-shuffle
   * 
   * @param {Array} array - array to randomize
   * @returns {Array} array randomized
   * @memberof SecretSanta
   */
  knuth (array) {
    let index = array.length;

    // While there remain elements to shuffle...
    while (0 !== index) {

      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * index);
      index -= 1;

      // Swap it with the current element.
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]]
    }

    return array;
  }


  /**
   * Validate permutation of randomized array
   * 
   * @param {Array} a - reference array
   * @param {Array} b - randomized array
   * @param {string} key - comparison key
   * @returns {boolean}
   * @memberof SecretSanta
   */
  validate (a, b, key) {
    return !a.find((item, i) => item[key] === b[i][key]);
  }


  /**
   * Build randomized assigned people array
   * 
   * @returns {Array} 
   * @memberof SecretSanta
   */
  build () {
    let randomized = this.knuth([...this.array]);

    while (!this.validate(this.array, randomized, 'name')) {
      randomized = this.knuth([...this.array])
    }

    const validated = this.array.map((person, i) => {
      return {
        // valid: person.name === randomized[i].name,
        phone: person.phone,
        // name: person.name,
        assigned: randomized[i].name,
      };
    });

    return validated;
  }
}

const secret = new SecretSanta(config.people);

console.log(secret.build());