import MockAdapter from 'axios-mock-adapter';
import { climateApi as api } from './apiHelper';

export const climateApi = new MockAdapter(api);
