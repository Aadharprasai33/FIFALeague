import React, { SyntheticEvent } from "react";
import { Grid } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";
import { LeagueList } from "./LeagueList";
import { LeagueDetails } from "../details/LeagueDetails";
import { LeagueForm } from "../form/LeagueForm";

interface IProps {
  leagues: ILeague[];
  selectLeague: (id: string) => void;
  selectedLeague: ILeague | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedLeague: (league: ILeague | null) => void;
  createLeague: (league: ILeague) => void;
  editLeague: (league: ILeague) => void;
  deleteLeague:  (e: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submit: boolean
  target:string;
 
}

export const LeagueDashboard: React.FC<IProps> = ({
  leagues,
  selectLeague,
  selectedLeague,
  editMode,
  setEditMode,
  setSelectedLeague,
  createLeague,
  editLeague,
  deleteLeague,
  submit,
  target
  
}) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
         
            <LeagueList
              leagues={leagues}
              selectLeague={selectLeague}
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
              
              leagueToDisplay={selectedLeague}
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

// <List>
//   {leagues.map((league: any) => (
//     <List.Item key={league.id}>{league.title}</List.Item>
//   ))}
// </List>
