const rooms = {
  Lounge: 'Lounge',
  DiningRoom: 'Dining Room',
  Kitchen: 'Kitchen',
  Ballroom: 'Ball Room',
  Conservatory: 'Conservatory',
  Billiard: 'Billiard Room',
  Library: 'Library',
  Study: 'Study Room',
  Hall: 'Hall'
};

class Player {
  constructor(id, name, character, position) {
    this.id = id;
    this.name = name;
    this.character = character;
    this.position = position;
    this.lastPosition = '';
    this.cards = [];
    this.message = '';
    this.action = 'hide';
  }

  move(location) {
    this.lastPosition = this.position;
    this.position = location;
  }

  changeMessage(message) {
    this.message = message;
  }

  getPosition() {
    return this.position;
  }

  getMessage() {
    return this.message;
  }

  decideAction() {
    if (this.position in rooms) {
      this.action = 'show';
      return false;
    }
    return true;
  }
}

module.exports = { Player };
