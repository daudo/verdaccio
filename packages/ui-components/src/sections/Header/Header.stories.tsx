import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { HttpResponse, http } from 'msw';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { HeaderInfoDialog } from '../../';
import { VersionProvider } from '../../providers';
import Header from './Header';

type Story = StoryObj<typeof Header>;
const meta: Meta<typeof Header> = {
  title: 'Sections/Header',
  component: Header,
};

export default meta;

function CustomInfoDialog({ onCloseDialog, title, isOpen }) {
  return (
    <HeaderInfoDialog
      dialogTitle={title}
      isOpen={isOpen}
      onCloseDialog={onCloseDialog}
      tabPanels={[
        { element: <div>{'foo'}</div> },
        { element: <div>{'bar'}</div> },
        { element: <div>{'fooBar'}</div> },
      ]}
      tabs={[{ label: 'foo' }, { label: 'bar' }, { label: 'barFoo' }]}
    />
  );
}

export const HeaderAll: Story = {
  render: () => (
    <MemoryRouter initialEntries={[`/-/web/detail/storybook`]}>
      <Routes>
        <Route
          path="/-/web/detail/:package"
          element={
            <VersionProvider>
              <Header HeaderInfoDialog={CustomInfoDialog} />
            </VersionProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  ),
  parameters: {
    msw: {
      handlers: [
        http.get('https://my-registry.org/-/verdaccio/data/sidebar/storybook', () => {
          return HttpResponse.json(require('../../../vitest/api/storybook-sidebar.json'));
        }),
        http.get('https://my-registry.org/-/verdaccio/data/package/readme/storybook', () => {
          return HttpResponse.json(require('../../../vitest/api/storybook-readme')());
        }),
        http.get('https://my-registry.org/-/verdaccio/data/search/*', () => {
          return HttpResponse.json(require('../../../vitest/api/search-verdaccio.json'));
        }),
        http.post('https://my-registry.org/-/verdaccio/sec/login', async ({ request }) => {
          const body = (await request.json()) as { username: string; password: string };

          if (body.username === 'fail') {
            return new HttpResponse('unauthorized', { status: 401 });
          }

          return HttpResponse.json({ username: body.username, token: 'valid token' });
        }),
      ],
    },
  },
};
