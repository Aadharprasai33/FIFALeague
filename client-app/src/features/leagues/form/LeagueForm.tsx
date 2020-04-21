import React, { useState, FormEvent } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { ILeague } from "../../../app/models/league";
import { v4 as uuid } from "uuid";
interface IProps {
  league: ILeague | null;
  setEditMode: (editMode: boolean) => void;
  createLeague: (league: ILeague) => void;
  editLeague: (league: ILeague) => void;
  submit: boolean
}

export const LeagueForm: React.FC<IProps> = ({
  league: initialFormState,
  setEditMode,
  createLeague,
  editLeague,
  submit
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        date: "",
      };
    }
  };

  const [league, setLeague] = useState<ILeague>(initializeForm);

  const handleInput = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setLeague({ ...league, [name]: value });
  };

  const handleSubmit = () => {
    if (league.id.length === 0) {
      let newLeague = {
        ...league,
        id: uuid(),
      };
      createLeague(newLeague);
    } else {
      editLeague(league);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInput}
          placeholder="Title"
          name="title"
          value={league.title}
        />
        <Form.TextArea
          onChange={handleInput}
          rows={2}
          placeholder="Description"
          name="description"
          value={league.description}
        />
        <Form.Input
          onChange={handleInput}
          type="datetime-local"
          placeholder="Date"
          name="date"
          value={league.date}
        />
        <Button loading={submit} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
