export interface ITask {
  title: string
  identificationKey: string
  creator: string
  payload: string
  systemAttributes: IAttributes
}

export interface IAttributes {
  state: string
  assignees: IAssignee[]
  assignedDate: number
  taskId: string
  taskDefinitionId: string
  systemMessageAttributes: IMessageAttributes
}

export interface IAssignee {
  id: string
  displayName: string
  type: string
  systemVersionFlag: string
}

export interface IMessageAttributes {
  textAttribute1: string
  textAttribute2: string
  textAttribute3: string
}
