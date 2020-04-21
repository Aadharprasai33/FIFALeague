import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { Container } from "semantic-ui-react";
import { ILeague } from "../models/league";
import { NavBar } from "../../features/nav/NavBar";
import { LeagueDashboard } from "../../features/leagues/dashboard/LeagueDashboard";
import agent from "../api/agent";
import { LoadComponent } from "./LoadComponent";

const App = () => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<ILeague | null>(null);
  const [editMode, setEditMode] = useState(false);
  const[loading, setLoading] = useState(true);
  const[submit, setSubmit] = useState(false);
  const[target,setTarget] = useState(' ');
 
  const handleSelectedLeague = (id: string) => {
    setSelectedLeague(leagues.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleCreateForm = () => {
    setSelectedLeague(null);
    setEditMode(true);
  }

  const handleCreateLeague = (league : ILeague) => {
    setSubmit(true);
    agent.Leagues.create(league).then(() => {
    setLeagues([...leagues, league])
  }).then(() => setSubmit(false))
  }

  const handleEditLeague = (league:ILeague) => {
    setSubmit(true);
    agent.Leagues.update(league).then(() => {
      setLeagues([...leagues.filter(a => a.id !== league.id), league])
    }).then(() => setSubmit(false))
    
  }

  const handleDeleteLeague = (event:SyntheticEvent<HTMLButtonElement>,id: string) => {
    setSubmit(true);
    setTarget(event.currentTarget.name)
    agent.Leagues.delete(id).then(() => {
      setLeagues([...leagues.filter(a => a.id !== id)])
    }).then(() => setSubmit(false))
   
  } 


  useEffect(() => {
    agent.Leagues.list()
      .then((response) => {
        let leagues:ILeague[] = [];
        response.forEach((league) => {
          league.date = league.date.split('.')[0];
          leagues.push(league);
        })
        setLeagues(leagues);
      }).then(()=>setLoading(false));
  }, []); //add second parameter to prevent the useEffect to run again as our app renders

  if(loading) return <LoadComponent content='loading leagues...' />


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
          submit = {submit}
          target={target}
         
        />
      </Container>
    </div>
  );
};

export default App;
