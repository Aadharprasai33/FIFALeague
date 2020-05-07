import React, {
  useState,
  useEffect,
  Fragment,
  SyntheticEvent,
  useContext,
} from "react";
import { Container } from "semantic-ui-react";
import { ILeague } from "../models/league";
import { NavBar } from "../../features/nav/NavBar";
import LeagueDashboard from "../../features/leagues/dashboard/LeagueDashboard";
import agent from "../api/agent";
import { LoadComponent } from "./LoadComponent";
import LeagueStore from "../stores/leagueStore";
import { observer } from "mobx-react-lite";

const App = () => {
  const leagueStore = useContext(LeagueStore);

  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<ILeague | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [target, setTarget] = useState(" ");

  const handleSelectedLeague = (id: string) => {
    setSelectedLeague(leagues.filter((a) => a.id === id)[0]);
    setEditMode(false);
  };

  const handleCreateForm = () => {
    setSelectedLeague(null);
    setEditMode(true);
  };

  const handleCreateLeague = (league: ILeague) => {
    setSubmit(true);
    agent.Leagues.create(league)
      .then(() => {
        setLeagues([...leagues, league]);
      })
      .then(() => setSubmit(false));
  };

  const handleEditLeague = (league: ILeague) => {
    setSubmit(true);
    agent.Leagues.update(league)
      .then(() => {
        setLeagues([...leagues.filter((a) => a.id !== league.id), league]);
      })
      .then(() => setSubmit(false));
  };

  const handleDeleteLeague = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmit(true);
    setTarget(event.currentTarget.name);
    agent.Leagues.delete(id)
      .then(() => {
        setLeagues([...leagues.filter((a) => a.id !== id)]);
      })
      .then(() => setSubmit(false));
  };

  useEffect(() => {
    leagueStore.loadLeagues();
  }, [leagueStore]); //function inside useEffect requires dsependencies it needs to run this function

  if (leagueStore.loadingInitial)
    return <LoadComponent content="loading leagues..." />;

  return (
    <div>
      <NavBar createForm={handleCreateForm} />
      <Container style={{ marginTop: "2em" }}>
        <LeagueDashboard
          leagues={leagueStore.leagues}
          selectLeague={handleSelectedLeague}
          setEditMode={setEditMode}
          setSelectedLeague={setSelectedLeague}
          createLeague={handleCreateLeague}
          editLeague={handleEditLeague}
          deleteLeague={handleDeleteLeague}
          submit={submit}
          target={target}
        />
      </Container>
    </div>
  );
};

export default observer(App);
