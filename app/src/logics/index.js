import dataLogic from './data-logic';
import userLogic from './user-logic';
import startupLogic from './startup-logic';
export default [...dataLogic, ...userLogic, ...startupLogic];
