import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";
import { observer } from "mobx-react-lite";
import LeagueStore from '../../../app/stores/leagueStore';

interface IProps {
 
  setEditMode: (setEdit: boolean) => void;
  setSelectedLeague: (league: ILeague | null) => void;
  
}

const LeagueDetails: React.FC<IProps> = ({
  setEditMode,
  setSelectedLeague,
  
}) => {
  const leagueStore = useContext(LeagueStore);
  const {selectedLeague: leagueToDisplay} = leagueStore;
  return (
    <div>
      <Card fluid>
        <Image src={`/assets/categoryImages/${leagueToDisplay!.title}.jpg`} />
        <Card.Content>
          <Card.Header>{leagueToDisplay!.title}</Card.Header>
          <Card.Meta>
            <span className="date">{leagueToDisplay!.date}</span>
          </Card.Meta>
          <Card.Description>{leagueToDisplay!.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
            <Button 
              onClick={() => setEditMode(true)
              }
              basic
              color="blue"
              content="Edit"
            />
            <Button
              onClick={() => setSelectedLeague(null)}
              basic
              color="blue"
              content="Cancel"
            />
          </Button.Group>
        </Card.Content>
      </Card>
    </div>
  );
};
export default observer(LeagueDetails);