import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Header, Icon, List, Container } from "semantic-ui-react";
import { ILeague } from "../models/league";
import { NavBar } from "../../features/nav/NavBar";
import { LeagueDashboard } from "../../features/leagues/dashboard/LeagueDashboard";


const App = () => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);

  useEffect(() => {
    axios
      .get<ILeague[]>("http://localhost:5000/api/leagues")
      .then((response) => {
        setLeagues(response.data);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Container style={{marginTop: '2em'}}>
        <LeagueDashboard leagues = {leagues} />
      </Container>
    </div>
  );
};

export default App;
