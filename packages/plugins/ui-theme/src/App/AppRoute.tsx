import React from 'react';
import { Outlet, Route as RouterRoute, Routes } from 'react-router';

import {
  AuthV1Provider,
  ManifestsProvider,
  NotFound,
  Route,
  VersionProvider,
  loadable,
} from '@verdaccio/ui-components';

const VersionPage = loadable(() => import(/* webpackChunkName: "Version" */ '../pages/Version'));
const FrontPage = loadable(() => import(/* webpackChunkName: "Home" */ '../pages/Front'));
const Login = loadable(() => import(/* webpackChunkName: "Login" */ '../pages/Security/Login'));
const AddUser = loadable(
  () => import(/* webpackChunkName: "AddUser" */ '../pages/Security/AddUser')
);
const ChangePassword = loadable(
  () => import(/* webpackChunkName: "ChangePassword" */ '../pages/Security/ChangePassword')
);
const Success = loadable(
  () => import(/* webpackChunkName: "Success" */ '../pages/Security/Success')
);

// Layout component to wrap auth routes with AuthV1Provider
const AuthLayout: React.FC = () => (
  <AuthV1Provider>
    <Outlet />
  </AuthV1Provider>
);

const AppRoute: React.FC = () => {
  return (
    <Routes>
      <RouterRoute
        path={Route.ROOT}
        element={
          <ManifestsProvider>
            <FrontPage />
          </ManifestsProvider>
        }
      />
      <RouterRoute
        path={Route.PACKAGE}
        element={
          <VersionProvider>
            <VersionPage />
          </VersionProvider>
        }
      />
      <RouterRoute
        path={Route.PACKAGE_VERSION}
        element={
          <VersionProvider>
            <VersionPage />
          </VersionProvider>
        }
      />
      <RouterRoute
        path={Route.SCOPE_PACKAGE_VERSION}
        element={
          <VersionProvider>
            <VersionPage />
          </VersionProvider>
        }
      />
      <RouterRoute
        path={Route.SCOPE_PACKAGE}
        element={
          <VersionProvider>
            <VersionPage />
          </VersionProvider>
        }
      />
      {/* Auth routes wrapped in AuthV1Provider via layout */}
      <RouterRoute element={<AuthLayout />}>
        <RouterRoute path={Route.LOGIN} element={<Login />} />
        <RouterRoute path={Route.SUCCESS} element={<Success />} />
        <RouterRoute path={Route.ADD_USER} element={<AddUser />} />
        <RouterRoute path={Route.CHANGE_PASSWORD} element={<ChangePassword />} />
      </RouterRoute>
      <RouterRoute path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
