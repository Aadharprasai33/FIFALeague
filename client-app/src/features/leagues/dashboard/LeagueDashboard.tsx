import React, { SyntheticEvent, useContext } from "react";
import { Grid } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";
import LeagueList from "./LeagueList";
import LeagueDetails from "../details/LeagueDetails";
import { LeagueForm } from "../form/LeagueForm";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import LeagueStore from '../../../app/stores/leagueStore';

interface IProps {
  leagues: ILeague[];
  selectLeague: (id: string) => void;
  setEditMode: (editMode: boolean) => void;
  setSelectedLeague: (league: ILeague | null) => void;
  createLeague: (league: ILeague) => void;
  editLeague: (league: ILeague) => void;
  deleteLeague:  (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submit: boolean
  target:string;
 
}

const LeagueDashboard: React.FC<IProps> = ({

  setEditMode,
  setSelectedLeague,
  createLeague,
  editLeague,
  deleteLeague,
  submit,
  target
  
}) => {
  const leagueStore = useContext(LeagueStore);
  const {editMode,selectedLeague} = leagueStore;
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
         
            <LeagueList
            
            
              setEditMode={setEditMode}
              deleteLeague={deleteLeague}
              setSelectedLeague={setSelectedLeague}
              submit = {submit}
              target ={target}
            />
          
         
          
        </Grid.Column>
        <Grid.Column width={6}>
          {/* executes if left part is not null or edit Mode is !true*/}
          {selectedLeague && !editMode && (
            <LeagueDetails
              setSelectedLeague={setSelectedLeague}
              setEditMode={setEditMode}
            />
          )}

          {editMode && (
            <LeagueForm
              key={(selectedLeague && selectedLeague.id) || 0} //reinitialize component that updates the state to new state
              league={selectedLeague!}
              setEditMode={setEditMode}
              createLeague={createLeague}
              editLeague={editLeague}
              submit = {submit}
            />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default observer(LeagueDashboard);
