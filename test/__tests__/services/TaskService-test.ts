import { expect } from 'chai'
import * as sinon from 'sinon'

import { AuthenticateInput, QueryFilter, ITask} from 'bss-hw-api'
import { ReflectiveInjector, provide } from 'angular2-di'

import { TaskService } from '../../../src/services/TaskService'
import { HumanWorkflow } from '../../../src/services/HumanWorkflow'
import { Http } from '../../../src/services/Http'


// Mocks
class HumanWorkflowMock {
    authenticate = sinon.spy()
    getTaskDetailsById = sinon.spy()
    queryTasks = sinon.spy()
    queryTasksCount = sinon.spy()
    queryTasksByPage = sinon.spy()
    updateTask = sinon.spy()

}

class HttpMock {
    getBase() {
        return "/api"
    }
    getJWT() {
        return "jwt"
    }
}



describe('Services: TaskService', () => {

    const query: QueryFilter = {
        assignmentFilter: 'MY',
        columns: [] as any,
        clauses: [] as any
    }

    const task: ITask = "MY-TASK" as any

    let taskService: TaskService
    let hwMock: HumanWorkflowMock

    beforeEach(() => {
        // Instantiate objects before each test
        const injector = ReflectiveInjector.resolveAndCreate([
            provide(Http, { useClass: HttpMock }),
            provide(HumanWorkflow, { useClass: HumanWorkflowMock }),
            TaskService
        ])

        taskService = injector.get(TaskService)
        hwMock = injector.get(HumanWorkflow)
    })

    it('#authenticate', () => {
        let payload = {login: 'jlondon1', password: "welcome1"}
        taskService.authenticate(payload)

        // Expect a call to humanworkflow mock
        expect(hwMock.authenticate).to.have.been.calledWith(payload)
    })

    it('#queryTaskDetails', () => {
        let taskId = "task-id"
        taskService.queryTaskDetails("task-id")

        // Expect a call to humanworkflow mock
        expect(hwMock.getTaskDetailsById).to.have.been.calledWith("jwt", taskId)
    })

    it('#queryTasksCount', () => {
        taskService.queryTasksCount(query)

        // Expect a call to humanworkflow mock
        expect(hwMock.queryTasksCount).to.have.been.calledWith("jwt", query)
    })

    it('#queryTasks', () => {
        taskService.queryTasks(query)

        // Expect a call to humanworkflow mock
        expect(hwMock.queryTasks).to.have.been.calledWith("jwt", query)
    })

    it('#queryTasksPaginated', () => {
        taskService.queryTasksPaginated(query, 0, 8)

        // Expect a call to humanworkflow mock
        expect(hwMock.queryTasksByPage).to.have.been.calledWith("jwt", query, 0, 8)
    })

    it('#updateTask', () => {
        taskService.updateTask(task)

        // Expect a call to humanworkflow mock
        expect(hwMock.updateTask).to.have.been.calledWith("jwt", task)
    })
})
