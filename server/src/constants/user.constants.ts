export const NameSite = 'בואינג כח אדם';

export const REMOVE_USER_FIELDS = ['-password', '-passwordHistory', '-jwt_ac_token', '-jwt_rf_token', '-__v', '-createdAt', '-updatedAt', '-expireToken', '-resetToken'].join(' ');
export const REMOVE_USER_FIELDS_LOGIN = ['-passwordHistory', '-jwt_ac_token', '-jwt_rf_token', '-__v', '-createdAt', '-updatedAt', '-expireToken', '-resetToken'].join(' ');

export const SELECTED_USER_FIELDS = ['_id', 'email', 'username', 'firstName', 'lastName', 'role', 'imgSrc'].join(' ');

// Company
export const REMOVE_COMPANY_FIELDS = ['-__v', '-createdAt', '-updatedAt', '-candidatesAssigned'];

// Job
export const REMOVE_JOB_FIELDS = ['-__v', '-createdAt', '-updatedAt'];

// Candidate
export const REMOVE_CANDIDATE_FIELDS = ['-__v', '-createdAt', '-updatedAt', '-isAssigned'];
