import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";

interface IProps {
  leagues: ILeague[];
}

export const LeagueDetails: React.FC<IProps> = ({ leagues }) => {
  return (
    <div>
      <Card>
        <Image src="/assets/fifa20.jpg" />
        <Card.Content>
          <Card.Header>Name of the league</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            This is the description of a league
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    </div>
  );
};
