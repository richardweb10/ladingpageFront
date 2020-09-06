import React from 'react';
import { mount, shallow, render } from 'enzyme';
import configureStore from 'redux-mock-store';
import Resend from '../../../components/resend/index';

describe('reenviar', () => {
  const mockStore = configureStore();
  let state = {
    quote: {
      resend: true,
      error: false,
      isLoading: true
    },
    showFormContact: true
  };

  let name,
    email = null;
  const store = mockStore(state);
  const wrapper = mount(<Resend store={store} stateTest={true} />);
  //wrapper.setState({ show: true });
  //wrapper.setState({ showFormContact: true });

  it('resend email', () => {
    email = wrapper.find('input.email');
    email.simulate('focus');
    email.props().value = 'astridduq@gmail.com';
    expect(email.props().value).toBe('astridduq@gmail.com');
  });

  it('resend nombre', () => {
    name = wrapper.find('input#name');
    name.simulate('focus');
    name.props().value = 'astrid';
    expect(name.props().value).toBe('astrid');
  });

  it('resend generar enlace', () => {
    wrapper
      .find('#name')
      .simulate('change', { target: { name: 'name', value: 'Richard' } });

    wrapper.find('#email').simulate('change', {
      target: { name: 'email', value: 'richard.restrepo10@gmail.com' }
    });

    wrapper.find('#btnGenerar').simulate('click');
    expect(wrapper.find('input#jwtTxt').props().value).not.toEqual('');
  });
});
