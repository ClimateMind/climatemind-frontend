import { rest } from 'msw';
import { MYTH_RESPONSE } from './responseBodies/mythsResponse';
import { PERSONAL_VALUES_RESPONSE } from './responseBodies/personalValuesResopnse';
import { QUESTIONS_RESPONSE } from './responseBodies/questions';
import { GET_SINGLE_CONVERSATION_RESPONSE } from './responseBodies/getSingleConversationResponse';
import { POST_ALIGNMENT_RESPONSE } from './responseBodies/postAlignment';
import { GET_ALIGNMENT_RESPONSE } from './responseBodies/getAlignment';
import { SHARED_IMPACTS_RESPONSE } from './responseBodies/getSharedImpactsResponse';
import { SHARED_IMPACTS_DETAILS } from './responseBodies/getSharedImpactDetails';
import { SHARED_SOLUTIONS_RESPONSE } from './responseBodies/getSharedSolutionsResponse';
import { POST_SHARED_IMPACTS_RESPONSE } from './responseBodies/postSharedImpactsResponse';
import { SHARED_SOLUTION_DETAILS } from './responseBodies/getSharedSolutionDetails';
import { GET_CONVERSATIONS_RESPONSE } from './responseBodies/getConversationsResponse';
import { POST_SESSION_RESPONSE } from './responseBodies/postSessionResponse';

export const handlers = [
  // Capture a GET /user/:userId request,
  // 00ad4670-24df-42ca-bfa2-0ce1e2bebafb
  rest.get(/personal_values/, (req, res, ctx) => {
    // ...and respond with this mocked response.
    console.log('MOCKED GET personal_values');
    ctx.status(200);
    return res(ctx.json(PERSONAL_VALUES_RESPONSE));
  }),

  rest.get('http://localhost:5000/questions', (req, res, ctx) => {
    console.log('MOCKED GET questions');
    ctx.status(200);
    return res(ctx.json(QUESTIONS_RESPONSE));
  }),

  rest.get('http://localhost:5000/myths', (req, res, ctx) => {
    console.log('MOCKED GET myths');
    ctx.status(200);
    return res(ctx.json(MYTH_RESPONSE));
  }),

  // POST Scores
  rest.post('http://localhost:5000/scores', (req, res, ctx) => {
    return res(
      ctx.json({
        sessionId: '52a95263-a95c-4dd1-85ab-6cd8013dce0d',
      })
    );
  }),
  rest.get('http://localhost:5000/conversations', (req, res, ctx) => {
    ctx.status(200);
    return res(ctx.json(GET_CONVERSATIONS_RESPONSE));
  }),

  // *** USER B JOURNEY***

  // GET Single Conversaionion
  rest.get(
    /http:\/\/localhost:5000\/conversation\/[\w-]+/i,
    (req, res, ctx) => {
      console.log('MOCKED GET signle conversation');
      ctx.status(200);
      return res(ctx.json(GET_SINGLE_CONVERSATION_RESPONSE));
    }
  ),
  // POST Alignmeent
  rest.post('http://localhost:5000/alignment', (req, res, ctx) => {
    console.log('MOCKED POST Alignment');
    ctx.status(200);
    return res(ctx.json(POST_ALIGNMENT_RESPONSE));
  }),
  rest.get(/http:\/\/localhost:5000\/alignment\//, (req, res, ctx) => {
    console.log('MOCKED POST Alignment');
    ctx.status(200);
    return res(ctx.json(GET_ALIGNMENT_RESPONSE));
  }),

  // GET Shared Impacts
  // rest.get(/http:\/\/localhost:5000\/alignment\/[\w-]+/i, (req, res, ctx) => {
  rest.get(
    'http://localhost:5000/alignment/:alignmentScoresId/shared-impacts',
    (req, res, ctx) => {
      const perspective = req.url.searchParams.get('perspective');
      console.log('MOCKED GET Shared Impacts with perspective: ', perspective);
      ctx.status(200);
      return res(ctx.json(SHARED_IMPACTS_RESPONSE));
    }
  ),
  // GET Shared Impact details
  rest.get(
    'http://localhost:5000/alignment/shared-impact/:impactIri',
    (req, res, ctx) => {
      console.log('MOCKED GET Shared Impacts details');
      ctx.status(200);
      return res(ctx.json(SHARED_IMPACTS_DETAILS));
    }
  ),
  // GET Shared Solutions
  rest.get(
    'http://localhost:5000/alignment/:alignmentScoresId/shared-solutions',
    (req, res, ctx) => {
      console.log('MOCKED GET Shared Solutions', req);
      ctx.status(200);
      return res(ctx.json(SHARED_SOLUTIONS_RESPONSE));
    }
  ),
  // GET Shared Solution details
  rest.get(
    'http://localhost:5000/alignment/shared-solution/:solutionIri',
    (req, res, ctx) => {
      console.log('MOCKED GET Shared Solution details', req);
      ctx.status(200);
      return res(ctx.json(SHARED_SOLUTION_DETAILS));
    }
  ),

  // POST Choose Shared Impacts
  rest.post(
    'http://localhost:5000/alignment/:alignmentScoresId/shared-impacts',
    (req, res, ctx) => {
      console.log('MOCKED POST chosen Impacts');
      ctx.status(200);
      return res(ctx.json(POST_SHARED_IMPACTS_RESPONSE));
    }
  ),
  // POST Update Conversation
  rest.post(/http:\/\/localhost:5000\/conversation\/\w+/i, (req, res, ctx) => {
    console.log('MOCKED POST chosen Impacts');
    ctx.status(200);
    return res(ctx.json({}));
  }),

  // POST Session
  rest.post('http://localhost:5000/session', (req, res, ctx) => {
    console.log('MOCKED POST session');
    ctx.status(200);
    return res(ctx.json(POST_SESSION_RESPONSE));
  }),

  // POST User B
  rest.post(/http:\/\/localhost:5000\/user-b\/\w+/i, (req, res, ctx) => {
    console.log('MOCKED POST user-b');
    ctx.status(200);
    return res(ctx.json({}));
  }),
];
