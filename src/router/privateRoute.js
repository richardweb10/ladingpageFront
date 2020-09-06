import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkSession } from '../utils/session';
import Loader from '../tools/loader';
//import MenuList from './MenuList';

let section = React.createRef();

function PrivateRoute({ component: Component, ...rest }) {
  const [cargaComponent, setCargaComponent] = useState(false);

  return (
    <Route
      {...rest}
      render={(props) =>
        checkSession() ? (
          <div>
            <section className={'container'}>
              <div ref={section} id="sectionContent" className="section">
                {cargaComponent ? (
                  sessionStorage.getItem('componente') == rest.path ? (
                    <Component {...rest} />
                  ) : (
                    <p>
                      No cuenta con los permisos para acceder al componente{' '}
                      <b>{rest.path.slice(1)}</b>, por favor comuníquese con el
                      administrador.
                    </p>
                  )
                ) : (
                  <div>
                    <div className="hide">
                      {setTimeout(
                        function () {
                          setCargaComponent(true);
                        }.bind(this),
                        2000
                      )}
                    </div>
                    <Loader />
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
