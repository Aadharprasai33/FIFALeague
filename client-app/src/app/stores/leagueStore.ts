import {observable, action} from 'mobx';
import { createContext } from 'react';
import { ILeague } from '../models/league';
import agent from '../api/agent';



class LeagueStore {
    @observable leagues: ILeague[] = [];
    @observable selectedLeague: ILeague | undefined;
    @observable loadingInitial = false;
    @observable editMode = false;

    @action loadLeagues = () => {
        this.loadingInitial=true;
        agent.Leagues.list()
        .then((leagues) => {
         
            leagues.forEach((league) => {
            league.date = league.date.split('.')[0];
            this.leagues.push(league);
          })
          
        }).finally(()=>this.loadingInitial = false);
    }

    @action selectLeague = (id:string) => {
        this.selectedLeague = this.leagues.find(a => a.id === a.id);
        this.editMode = false;
    }

}

export default createContext(new LeagueStore())