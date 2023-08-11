import { Workflow, BodyParam } from './types'
import { buildEmailAction } from './automation'
import { isEmpty } from 'lodash'

let loadedWorkflows: Workflow[]

const setWorkflows = (workflows: Workflow[]) => {
  loadedWorkflows = workflows
}

const getWorkflows = (): Workflow[] => {
  return loadedWorkflows
}

const runWorkflow = async (workflow: string, sendTo: string, params: BodyParam[] = [], sendFrom: any = null) => {
  if (!getWorkflows() || isEmpty(getWorkflows())) {
    throw new Error('No workflows found. Run the init first: init()')
  }
  const messagesInWorkflow = getWorkflows().find((message) => message.name === workflow)
  if (messagesInWorkflow) {
    await buildEmailAction(messagesInWorkflow.emails, sendTo, params, sendFrom);
  }
}

export { setWorkflows, runWorkflow, getWorkflows }
