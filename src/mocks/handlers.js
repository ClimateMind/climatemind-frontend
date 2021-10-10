import { rest } from 'msw';
import { MYTH_RESPONSE } from './mythsResponse';
import { PERSONAL_VALUES_RESPONSE } from './personalValuesResopnse';

export const handlers = [
  // Capture a GET /user/:userId request,
  // 00ad4670-24df-42ca-bfa2-0ce1e2bebafb
  rest.get('http://localhost:5000/personal_values:session-id', (req, res, ctx) => {
    // ...and respond with this mocked response.
    return res(
      ctx.json(PERSONAL_VALUES_RESPONSE),
    )
  }),
  rest.get('http://localhost:5000/myths', (req, res, ctx) => {
    return res(
      ctx.json(MYTH_RESPONSE),
    )
  }),
  rest.get('http://localhost:5000/scores', (req, res, ctx) => {
    return res(
      ctx.json({
        sessionId: "52a95263-a95c-4dd1-85ab-6cd8013dce0d"
      }),
    )
  }),
]