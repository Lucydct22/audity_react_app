import { createContext } from 'react';
import initialUserState from './initialUserState';

const UserContext = createContext(initialUserState);

export default UserContext;
