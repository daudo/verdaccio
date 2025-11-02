import React from 'react';
import { Route as RouterRoute, Routes } from 'react-router-dom';

import { NotFound, Route, VersionProvider, loadable } from '../index';
import { AuthProvider } from '../providers/AuthProvider';

const VersionPage = loadable(() => import(/* webpackChunkName: "Version" */ '../pages/Version'));
const Front = loadable(() => import(/* webpackChunkName: "Home" */ '../pages/Front'));
const Login = loadable(() => import(/* webpackChunkName: "Login" */ '../pages/Security/Login'));
const Success = loadable(
  () => import(/* webpackChunkName: "Success" */ '../pages/Security/Success')
);
const AddUser = loadable(
  () => import(/* webpackChunkName: "AddUser" */ '../pages/Security/AddUser')
);
const ChangePassword = loadable(
  () => import(/* webpackChunkName: "ChangePassword" */ '../pages/Security/ChangePassword')
);

const AppRoute: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <RouterRoute path={Route.ROOT} element={<Front />} />
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
        <RouterRoute path={Route.LOGIN} element={<Login />} />
        <RouterRoute path={Route.SUCCESS} element={<Success />} />
        <RouterRoute path={Route.ADD_USER} element={<AddUser />} />
        <RouterRoute path={Route.CHANGE_PASSWORD} element={<ChangePassword />} />
        <RouterRoute path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoute;
