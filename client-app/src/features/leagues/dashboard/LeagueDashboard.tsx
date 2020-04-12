import React from "react";
import { Grid, List } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";
import { LeagueList } from "./LeagueList";
import { LeagueDetails } from "../details/LeagueDetails";

interface IProps {
    leagues: ILeague[]
}

export const LeagueDashboard: React.FC<IProps> = ({leagues}) => {
  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <LeagueList leagues = {leagues}/>
        </Grid.Column>
        <Grid.Column width={6}>
          <LeagueDetails leagues = {leagues}/>
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
