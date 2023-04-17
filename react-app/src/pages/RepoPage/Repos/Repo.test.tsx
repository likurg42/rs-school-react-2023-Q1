import { waitFor } from '@testing-library/react';
// import { rest } from 'msw';
import { rest } from 'msw';
import { renderWithProviders } from '../../../test/utils/renderWithProviders';
import Repos from './Repos';
// import { server } from '../../../test/setup';
import { mockRepo } from '../../../test/mocks/mockRepo';
import { server } from '../../../test/setup';
import { routes } from '../../../common/routes';

describe('repos', () => {
  test('should fetch and display repos', async () => {
    const { getByText, queryByText } = renderWithProviders(
      <Repos />,
    );

    expect(queryByText(/loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      const rgxName = new RegExp(mockRepo.name, 'i');
      const rgxAlt = new RegExp(mockRepo.description, 'i');
      expect(getByText(rgxName)).toBeInTheDocument();
      expect(getByText(rgxAlt)).toBeInTheDocument();
    });

    expect(queryByText(/loading.../i)).not.toBeInTheDocument();
  });

  test('should display an error when the request fail', async () => {
    server.use(
      rest.get(routes.api.repositories(true), (_req, res, ctx) => res(ctx.status(500), ctx.json('an error has occurred'))),
    );

    const { getByText, queryByText } = renderWithProviders(<Repos />);

    expect(queryByText(/loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText(/Something went terribly wrong.../i)).toBeInTheDocument();
    });

    expect(queryByText(/loading.../i)).not.toBeInTheDocument();
  });
});
