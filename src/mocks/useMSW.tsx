import { setupWorker } from 'msw';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { rest } from 'msw';
import { QUESTIONS_RESPONSE } from './responseBodies/questions';
import { GET_SINGLE_CONVERSATION_RESPONSE } from './responseBodies/getSingleConversationResponse';
import { POST_ALIGNMENT_RESPONSE } from './responseBodies/postAlignment';
import { GET_ALIGNMENT_RESPONSE } from './responseBodies/getAlignment';
import { SHARED_IMPACTS_RESPONSE } from './responseBodies/getSharedImpactsResponse';
import { SHARED_SOLUTIONS_RESPONSE } from './responseBodies/getSharedSolutionsResponse';
import { POST_SHARED_IMPACTS_RESPONSE } from './responseBodies/postSharedImpactsResponse';
import { GET_CONVERSATIONS_RESPONSE } from './responseBodies/getConversationsResponse';

export function useMockServiceWorker() {
  // Set variables in localstorage for MSW and each end point. Hooks should default to false to prevent activation in CI
  const [useMSW, setUseMSW] = useLocalStorage('USE_MSW', false);
  const [useQuestions, setUseQuestions] = useLocalStorage(
    'MSW_GET_QUESTIONS',
    false
  );
  const [usePostAlignment, setUsePostAlignment] = useLocalStorage(
    'MSW_POST_ALIGNMENT',
    false
  );

  const [useGetAlignment, setUseGetAlignment] = useLocalStorage(
    'MSW_GET_ALIGNMENT',
    false
  );

  const [useGetOneConversation, setUseGetOneConversation] = useLocalStorage(
    'MSW_GET_ONE_CONVERSATION',
    false
  );

  const [useGetSharedImpacts, setUseGetSharedImpacts] = useLocalStorage(
    'SHARED_IMPACTS_RESPONSE',
    false
  );
  const [useGetSharedSolutions, setUseGetSharedSolutions] = useLocalStorage(
    'SHARED_SOLUTIONS_RESPONSE',
    false
  );
  const [usePostSharedSolutions, setUsePostSharedSolutions] = useLocalStorage(
    'POST_SHARED_IMPACTS_RESPONSE',
    false
  );

  const [useGetConversations, setUseGetConversations] = useLocalStorage(
    'MSW_GET_CONVERSATIONS',
    false
  );

  // Set up worker to be inmported into app. When ussing the msw hook by default no handles are set up and these are activated on at a time based on the settings
  const worker = setupWorker();

  // Contitionally activate handlers
  useQuestions &&
    worker.use(
      rest.get('http://localhost:5000/questions', (req, res, ctx) => {
        console.log('MOCKED GET questions');
        return res(ctx.json(QUESTIONS_RESPONSE));
      })
    );

  useGetOneConversation &&
    worker.use(
      rest.get(
        /http:\/\/localhost:5000\/conversation\/[\w-]+/i,
        (req, res, ctx) => {
          console.log('MOCKED GET signle conversation');
          return res(ctx.json(GET_SINGLE_CONVERSATION_RESPONSE));
        }
      )
    );

  usePostAlignment &&
    worker.use(
      rest.post('http://localhost:5000/alignment', (req, res, ctx) => {
        console.log('MOCKED POST Alignment');
        ctx.status(201);
        return res(ctx.json(POST_ALIGNMENT_RESPONSE));
      })
    );

  useGetAlignment &&
    worker.use(
      rest.get(
        /http:\/\/localhost:5000\/alignment\/[\w-]+/i,
        (req, res, ctx) => {
          console.log('MOCKED GET Alignment');
          return res(ctx.json(GET_ALIGNMENT_RESPONSE));
        }
      )
    );

  useGetSharedImpacts &&
    worker.use(
      rest.get(
        'http://localhost:5000/alignment/:alignmentScoresId/shared-impacts',
        (req, res, ctx) => {
          console.log('MOCKED GET shared impacts');
          ctx.status(200);
          return res(ctx.json(SHARED_IMPACTS_RESPONSE));
        }
      )
    );

  useGetSharedSolutions &&
    worker.use(
      rest.get(
        'http://localhost:5000/alignment/:alignmentScoresId/shared-solutions',
        (req, res, ctx) => {
          console.log('MOCKED GET shared solutions');
          ctx.status(200);
          return res(ctx.json(SHARED_SOLUTIONS_RESPONSE));
        }
      )
    );

  usePostSharedSolutions &&
    worker.use(
      rest.post(
        'http://localhost:5000/alignment/:alignmentScoresId/shared-impacts',
        (req, res, ctx) => {
          console.log('MOCKED GET Shared Solutions', req);
          ctx.status(200);
          return res(ctx.json(POST_SHARED_IMPACTS_RESPONSE));
        }
      )
    );

  useGetConversations &&
    worker.use(
      rest.get('http://localhost:5000/conversations', (req, res, ctx) => {
        console.log('MOCKED GET Conversations', req);
        ctx.status(200);
        return res(ctx.json(GET_CONVERSATIONS_RESPONSE));
      })
    );

  return {
    worker,
    useMSW,
    setUseMSW,
    useQuestions,
    setUseQuestions,
    useGetOneConversation,
    setUseGetOneConversation,
    usePostAlignment,
    setUsePostAlignment,
    useGetAlignment,
    setUseGetAlignment,
    useGetSharedImpacts,
    setUseGetSharedImpacts,
    useGetSharedSolutions,
    setUseGetSharedSolutions,
    usePostSharedSolutions,
    setUsePostSharedSolutions,
    useGetConversations,
    setUseGetConversations,
  };
}
