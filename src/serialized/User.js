class UserSerialized{
  constructor(name, _id, email) {
    this.email = email;
    this.name = name;
    this._id = _id;
  }
}

module.exports = UserSerialized