import * as types from '../index';

export const createCompany = (params) => {
  return { type: types.CREATE_COMPANY, params };
};
