export const NameSite = 'בואינג כח אדם';

export const REMOVE_USER_FIELDS = [
	'-password',
	'-jwt_ac_token',
	'-jwt_rf_token',
	'-__v',
	'-createdAt',
	'-updatedAt',
	'-expireToken',
	'-resetToken'
].join(' ');

export const SELECTED_USER_FIELDS = ['_id', 'email', 'username', 'firstName', 'lastName', 'role', 'imgSRC'].join(' ');
