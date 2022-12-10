import React, { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import Routes from './Route';
import authActions from './modules/auth/actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getTokens, unSetSessionCookies } from './modules/common/utils';
import { tokenExpireTime, newRefreshTokenTimeInterval } from './components/constants/options';
import { USERS_BASE_URL } from './components/constants/config/config.dev';
import axios from 'axios';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import LoadingPage from './components/Common/LoadingPage';

const host = window.location.origin;

const { Content } = Layout;

const App = () => {
  const dispatch = useDispatch();

  let refreshToken = getTokens()?.refresh?.token;
  const { hash } = useSelector(state => state.router.location);

  //request new token every N minutes
  useEffect(() => {
    if (refreshToken) {
      let interval = setInterval(() => {
        let loginTime = moment(localStorage?.getItem(`${host}_login_time`));
        let currentTime = moment();
        let diff = currentTime.diff(loginTime, 'minutes');
        if (diff !== null && diff >= newRefreshTokenTimeInterval && diff < tokenExpireTime) {
          refreshToken = getTokens()?.refresh?.token;
          axios
            .post(`${USERS_BASE_URL}/auth/refresh-tokens`, { refreshToken })
            .then(({ data }) => {
              window.localStorage.removeItem(`${host}_tokens`);
              window.localStorage.removeItem(`${host}_uuid`);
              window.localStorage[`${host}_uuid`] = JSON.stringify(data);
              window.localStorage[`${host}_tokens`] = JSON.stringify(data);
            })
            .catch(err => {
              dispatch(authActions.signout.request({}));
              unSetSessionCookies();
              window.location.href = '/login';
            });
          localStorage.setItem(`${host}_login_time`, moment());
        } else if (diff > tokenExpireTime) {
          dispatch(authActions.signout.request({}));
          unSetSessionCookies();
          window.location.href = '/login';
        }
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [hash]);

  return (
    <Layout>
      <Helmet>
        <title>Turing Technologies</title>
      </Helmet>
      <Content className="overallContent">
        <ErrorBoundary>
          <Suspense fallback={<LoadingPage/>}>
              <Routes />
          </Suspense>
        </ErrorBoundary>
      </Content>
    </Layout>
  );
};

export default App;
