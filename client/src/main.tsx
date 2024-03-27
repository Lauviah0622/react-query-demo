import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'virtual:uno.css';

import Without from './pages/Without.tsx';
import WithQuery from './pages/WithQuery.tsx';
import Mutation from './pages/Mutation.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Page from './components/Page.tsx';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({});

// 3. extend the theme
const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
});

console.log(theme);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Page title="React query demo">
        <UnorderedList>
          <ListItem>
            <a href="/without">with out query</a>
          </ListItem>
          <ListItem>
            <a href="/withquery">with react query</a>
          </ListItem>
          <ListItem>
            <a href="/without">mutate data</a>
          </ListItem>
        </UnorderedList>
      </Page>
    ),
  },
  {
    path: '/without',
    element: <Without />,
  },
  {
    path: '/withquery',
    element: <WithQuery />,
  },
  {
    path: '/mutate',
    element: <Mutation />,
  },
  {
    path: '/polling',
    element: (
      <Page title="Polling">
        <App />
      </Page>
    ),
  },
  {
    path: '/toast',
    element: (
      <Page title="Toast">
        <App />
      </Page>
    ),
  },
  {
    path: '/prefetch',
    element: (
      <Page title="prefetch">
        <App />
      </Page>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </>
  // </React.StrictMode>
);
