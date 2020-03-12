class Player {
  constructor(id, name, character, position) {
    this.id = id;
    this.name = name;
    this.character = character;
    this.position = position;
    this.lastPosition = '';
    this.cards = [];
    this.message = '';
  }

  move(location) {
    this.lastPosition = this.position;
    this.position = location;
  }

  changeMessage(message) {
    this.message = message;
  }
}

module.exports = { Player };
