import * as types from '../index';

export const signin = params => {
    return { type: types.SIGNIN_USER, params };
};

