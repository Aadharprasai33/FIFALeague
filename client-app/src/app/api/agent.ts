import axios, { AxiosResponse } from 'axios';
import { ILeague } from '../models/league';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response:AxiosResponse) => response.data;

const delay= (ms: number) => (response:AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));
                                        

const requests = {
    get: (url:string) =>axios.get(url).then(delay(1000)).then(responseBody),
    post: (url:string, body: {}) => axios.post(url, body).then(delay(1000)).then(responseBody),
    put: (url:string, body: {}) => axios.put(url,body).then(delay(1000)).then(responseBody),
    del: (url:string) => axios.delete(url).then(delay(1000)).then(responseBody)

}

const Leagues = {
    list: (): Promise<ILeague[]> => requests.get('/leagues'),
    details: (id:string)=> requests.get(`/leagues/${id}`),
    create: (league:ILeague) => requests.post(`/leagues`, league),
    update: (league: ILeague) => requests.put(`/leagues/${league.id}`, league),
    delete: (id:string) => requests.del(`leagues/${id}`)
}

export default {
    Leagues
}