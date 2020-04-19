import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { ILeague } from "../models/league";
import { NavBar } from "../../features/nav/NavBar";
import { LeagueDashboard } from "../../features/leagues/dashboard/LeagueDashboard";

const App = () => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<ILeague | null>(null);
  const [editMode, setEditMode] = useState(false);
 
  const handleSelectedLeague = (id: string) => {
    setSelectedLeague(leagues.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleCreateForm = () => {
    setSelectedLeague(null);
    setEditMode(true);
  }

  const handleCreateLeague = (league : ILeague) => {
    setLeagues([...leagues, league])
  }

  const handleEditLeague = (league:ILeague) => {
    setLeagues([...leagues.filter(a => a.id !== league.id), league])
  }

  const handleDeleteLeague = (id: string) => {
    setLeagues([...leagues.filter(a => a.id !== id)])
  } 


  useEffect(() => {
    axios
      .get<ILeague[]>("http://localhost:5000/api/leagues")
      .then((response) => {
        let leagues:ILeague[] = [];
        response.data.forEach(league => {
          league.date = league.date.split('.')[0];
          leagues.push(league);
        })
        setLeagues(leagues);
      });
  }, []); //add second parameter to prevent the useEffect to run again as our app renders

  return (
    <div>
      <NavBar createForm = {handleCreateForm}/>
      <Container style={{ marginTop: "2em" }}>
        <LeagueDashboard
          leagues={leagues}
          selectLeague={handleSelectedLeague}
          selectedLeague={selectedLeague}
          setEditMode={setEditMode}
          editMode={editMode}
          setSelectedLeague = {setSelectedLeague}
          createLeague = {handleCreateLeague}
          editLeague = {handleEditLeague}
          deleteLeague = {handleDeleteLeague}
         
        />
      </Container>
    </div>
  );
};

export default App;
