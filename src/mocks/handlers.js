import { rest } from 'msw';
import { MYTH_RESPONSE } from './responseBodies/mythsResponse';
import { PERSONAL_VALUES_RESPONSE } from './responseBodies/personalValuesResopnse';
import { CONVERSATIONS_RESPONSE } from './responseBodies/conversationsResponse';
import { QUESTIONS_RESPONSE } from './responseBodies/questions';

export const handlers = [
  // Capture a GET /user/:userId request,
  // 00ad4670-24df-42ca-bfa2-0ce1e2bebafb
  rest.get(/personal_values/, (req, res, ctx) => {
    // ...and respond with this mocked response.
    console.log('MOCKED GET personal_values');
    return res(ctx.json(PERSONAL_VALUES_RESPONSE));
  }),

  rest.get('http://localhost:5000/questions', (req, res, ctx) => {
    console.log('MOCKED GET questions');
    return res(ctx.json(QUESTIONS_RESPONSE));
  }),

  rest.get('http://localhost:5000/myths', (req, res, ctx) => {
    console.log('MOCKED GET myths');
    return res(ctx.json(MYTH_RESPONSE));
  }),
  // TODO: Fix this scores should be a post
  // rest.get('http://localhost:5000/scores', (req, res, ctx) => {
  //   return res(
  //     ctx.json({
  //       sessionId: '52a95263-a95c-4dd1-85ab-6cd8013dce0d',
  //     })
  //   );
  // }),
  rest.get('http://localhost:5000/conversations', (req, res, ctx) => {
    return res(ctx.json(CONVERSATIONS_RESPONSE));
  }),
];
