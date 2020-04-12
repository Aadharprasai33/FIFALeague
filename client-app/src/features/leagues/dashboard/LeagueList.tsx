import React from "react";
import { Item, Segment, Button } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";

interface IProps {
  leagues: ILeague[];
}

export const LeagueList: React.FC<IProps> = ({ leagues }) => {
  return (
    <div>
      <Segment clearing>
        <Item.Group divided>
          {leagues.map((league) => (
            <Item key = {league.id}>
              <Item.Image size="tiny" src="/assets/fifa20.jpg" />
              <Item.Content header={league.title} verticalAlign="middle" />
              <Button floated='right' content='View' color='green' />
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
};
