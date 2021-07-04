import { rest } from 'msw';

export const handlers = [
  rest.post('/session', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        sessionId: 'b80f6d37-8bfc-4c8b-b51a-7df89d9a9fad',
      })
    );
  }),
];
