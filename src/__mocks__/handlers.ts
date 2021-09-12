import { rest } from 'msw';

// Mock responses
import myths from './responses/myths.json';
import session from './responses/session.json';
import questions from './responses/questions.json';
import scores from './responses/scores.json';
import personalValues from './responses/personal-values.json';
import climateFeed from './responses/climate-feed.json';
import solutions from './responses/solutions.json';
import login from './responses/login.json';
import logout from './responses/logout.json';
import register from './responses/register.json';
import zipcode from './responses/zipCode.json';

export const handlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL}:5000/session`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(session));
    }
  ),

  rest.get(`${process.env.REACT_APP_API_URL}/myths`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(myths));
  }),

  rest.get(`${process.env.REACT_APP_API_URL}/questions`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(questions));
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/scores`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(scores));
  }),

  rest.get(
    `${process.env.REACT_APP_API_URL}/personal_values`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(personalValues));
    }
  ),

  rest.get(`${process.env.REACT_APP_API_URL}/feed`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(climateFeed));
  }),

  rest.get(`${process.env.REACT_APP_API_URL}/solutions`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(solutions));
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/login`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(login));
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/logout`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(logout));
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/register`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(register));
  }),

  rest.post(`${process.env.REACT_APP_API_URL}/post-code`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(zipcode));
  }),
];
