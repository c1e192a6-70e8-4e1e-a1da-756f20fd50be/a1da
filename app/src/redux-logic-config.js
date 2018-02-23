import logics from './logics';
import { createLogicMiddleware } from 'redux-logic';
import { toast } from 'react-toastify';
import { apiBase } from './settings';
const deps = { toast, apiBase };
const logicMiddleware = createLogicMiddleware(logics, deps);
export default logicMiddleware;
