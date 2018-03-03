
const jwt = require('jsonwebtoken');
const config = require('../config');
const Favorite = require('../models').Favorite;
const Rating = require('../models').Rating;


function loadFavorite(req, res, next) {
  let id;
  if (!req.user) {
    id = null;
  } else {
    id = req.user.id;
  }
  Favorite.findAll({
    where: {
      userId: id
    },
    raw: true,
    attributes: ['roomId']
  }).then((favorites) => {
    const roomIds = [];
    favorites.forEach((favorite) => {
      roomIds.push(favorite.roomId);
    });
    req.roomIds = roomIds;
    return next();
  }).catch(e => next(e));
}

function checkFavorite(rooms, roomIds) {
  const result = [];
  rooms.forEach((room) => {
    if (roomIds.includes(room.id)) {
      room.dataValues.isFavorite = true;
    } else {
      room.dataValues.isFavorite = false;
    }
    result.push(room);
  });
  return result;
}

function loadUser(req, res, next) {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
  }
  return next();
}

function checkDetailRoom(room, user) {
  let id;
  if (!user) {
    id = null;
  } else {
    id = user.id;
  }
  return Promise.all([checkIsFavoriteDetail(room, id), checkIsRating(room, id), checkIsBooking(room, id)]).then((values) => {
    room.dataValues.isFavorite = values[0];
    room.dataValues.isRating = values[1];
    room.dataValues.isBooking = values[2];
    return room;
  }).catch((error) => { throw error; });
}

function checkIsFavoriteDetail(room, id) {
  return Favorite.findOne({
    where: { roomId: room.id, userId: id },
    plain: true
  }).then((favorite) => {
    if (favorite) {
      return true;
    }
    return false;
  }).catch((error) => {
    throw error;
  });
}

function checkIsRating(room, id) {
  return Rating.findOne({
    where: { roomId: room.id, userId: id },
    plain: true
  }).then((rating) => {
    if (rating) {
      return true;
    }
    return false;
  }).catch((error) => {
    throw error;
  });
}

function checkIsBooking(room, id) {
  return new Promise(((resolve, reject) => {
    resolve(true);
  }));
}

module.exports = {
  loadFavorite,
  checkFavorite,
  loadUser,
  checkDetailRoom
};
