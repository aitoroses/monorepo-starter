import { Http } from './Http'
import { Injectable } from 'angular2-di'

import { AuthenticateInput, TOKEN_UPDATED, TokenAction, QueryFilter} from 'bss-hw-api'
import { HumanWorkflow } from './HumanWorkflow'
import { ITask } from '../interfaces/task'

@Injectable()
export class TaskService {

    constructor(private hw: HumanWorkflow, private http: Http) { }

    authenticate = (payload: AuthenticateInput) => {
        return this.hw.authenticate(payload)
    }

    queryTasks = (query: QueryFilter): Promise<ITask[]> => {
        return this.hw.queryTasks(this.http.getJWT(), query) as any
    }

    queryTasksCount = (query: QueryFilter): Promise<ITask[]> => {
        return this.hw.queryTasksCount(this.http.getJWT(), query) as any
    }

    queryTasksPaginated = (query: QueryFilter, skip: number, limit: number): Promise<ITask[]> => {
        return this.hw.queryTasksByPage(this.http.getJWT(), query, skip, limit) as any
    }

    queryTaskDetails = (taskId: string): Promise<ITask> => {
        return this.hw.getTaskDetailsById(this.http.getJWT(), taskId) as any
    }

    updateTask = (task: ITask) => {
        return this.hw.updateTask(this.http.getJWT(), task)
    }

    updateTaskRaw = (task: ITask) => {
        return this.http.post(`HumanWorkflow/TaskService/updateTask`, task)
    }
}
