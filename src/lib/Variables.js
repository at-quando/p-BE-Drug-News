const destinationAttributes = ['id', 'name', 'image', 'description', 'createdAt', 'updatedAt'];
const roomBannerAttributes = ['id', 'name', 'street', 'apt', 'addressId', 'roomTypeId', 'avgRating'];
const roomExperienceAttributes = ['id', 'name', 'description', 'numberOfPeople', 'roomTypeId', 'addressId', 'avgRating'];

const active = 'active';

module.exports = {
  destinationAttributes,
  roomBannerAttributes,
  roomExperienceAttributes,
  active
};
