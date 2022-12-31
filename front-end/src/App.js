import React from 'react';
import Router from './Router'
import { BrowserRouter } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faPlusSquare, faCaretRight, faFileAlt, faStar, faFolder, 
  faUserFriends, faBriefcase, faChalkboardTeacher, faUser, faTrash, faCog,
  faBars 
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faPlusSquare, faCaretRight, faFileAlt, faStar, faFolder, 
  faUserFriends, faBriefcase, faChalkboardTeacher, faUser, faTrash, faCog, 
  faBars
);

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
