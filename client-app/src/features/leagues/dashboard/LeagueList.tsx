import React from "react";
import { Item, Segment, Button, List } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";

interface IProps {
  leagues: ILeague[];
  selectLeague: (id: string) => void;
  setEditMode: (editMode: boolean) => void;
  deleteLeague:  (id: string) => void;
  setSelectedLeague: (league: ILeague | null) => void;
 
}

export const LeagueList: React.FC<IProps> = ({
  leagues,
  selectLeague,
  setEditMode,
  deleteLeague,
  setSelectedLeague
 
}) => {
  return (
    <div>
      <Segment clearing>
        <Item.Group divided>
          {leagues.map((league) => (
            <Item>
              <Item.Image src="/assets/fifa20.jpg" />

              <Item.Content>
                <Item.Header as="a">{league.title}</Item.Header>
                <Item.Meta>{league.date}</Item.Meta>
                <Item.Meta>Description</Item.Meta>
                <Item.Description>{league.description}</Item.Description>
                <div>
                  <Button
                    onClick={() => {
                      selectLeague(league.id);
                      setEditMode(false);
                    }}
                    floated="right"
                    color="red"
                    content="view"
                  />
                  <Button
                    onClick={() => {
                      setSelectedLeague(null);
                      deleteLeague(league.id);


                    }}
                    content="Delete"
                    floated="right"
                    color="blue"
                  />
                </div>
              </Item.Content>
            </Item>
          ))}
        </Item.Group>
      </Segment>
    </div>
  );
};
