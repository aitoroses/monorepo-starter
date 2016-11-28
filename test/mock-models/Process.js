import Process from 'bss-hw-state'
import { join } from 'path'

const exampleProcess = new Process({

    dbDir: join(__dirname, '..', 'mock-db'),

    processName: 'eApproval',

    initialState: 'draft',

    payload({requestId, disclaimer, currentStepId, requestDescription}) {
        return `
        <?xml version="1.0" encoding="UTF-8"?>
        <payload xmlns="http://xmlns.oracle.com/bpel/workflow/task">
            <disclaimer>${disclaimer || 1}</disclaimer>
            <VariablesBusinessObject xmlns="http://xmlns.oracle.com/bpm/bpmobject/Model/Runtime/VariablesBusinessObject" xmlns:ns0="http://xmlns.oracle.com/bpm/bpmobject/Model/Runtime/VariablesBusinessObject">
              <ns0:stringVar1>_Medical Advisor</ns0:stringVar1>
              <ns0:stringVar2>7001</ns0:stringVar2>
              <ns0:stringVar3>NA</ns0:stringVar3>
              <ns0:stringVar4>NA</ns0:stringVar4>
              <ns0:stringVar5>NA</ns0:stringVar5>
            </VariablesBusinessObject>
            <requestId>${requestId}</requestId>
            <currentStepId>${currentStepId || -1}</currentStepId>
            <requestDescription>${requestDescription}</requestDescription>
            <textAttribute1 />
            <textAttribute2 />
            <textAttribute3 />
            <textAttribute4 />
            <textAttribute5 />
            <numberAttribute1>0</numberAttribute1>
            <numberAttribute2>0</numberAttribute2>
            <numberAttribute3>0</numberAttribute3>
            <userAction />
            <userComment />
        </payload>
        `
    }
})

.state('draft', {
    // This is called before activity creation
    // Setup your activity to have a title, etc
    onActivityCreate(instance) {
        console.log(`draft::onActivityCreate`)
        let title = `Draft - Request ${instance.payload.requestId}`
        return {
            title: title,
            systemAttributes: {
                taskDefinitionId: "default/eAppKernel!1.0/EditDraftHumanTask",
                systemMessageAttributes: {
                    textAttribute1: title
                }
            }
        }
    },

    onAssign(activity, actor) {
        console.log(`draft::onAssign: ${actor}`)
        return actor
    },

    onCreate({instance, task}) {
        console.log(`draft::onCreate: Activity and instance were created with id ${instance.instance}`)
    },

    onOutcome(outcome, instance, actor) {
        console.log(`\ndraft::onOutcome: ${actor} updated the outcome to ${outcome}, next activity "configure"\n`)
        instance.state = "approve"
        // Here we can update the payload
        return instance
    }
})

.state('approve', {
    // This is called before activity creation
    // Setup your activity to have a title, etc
    onActivityCreate(instance) {
        console.log(`approve::onActivityCreate`)
        let title = `Approve - Request ${instance.payload.requestId}`
        return {
            title: title,
            systemAttributes: {
                taskDefinitionId: "default/eAppKernel!1.0/ApproveHumanTask",
                systemMessageAttributes: {
                    textAttribute1: title
                }
            }
        }
    },

    onAssign(activity, actor) {
        console.log(`approve::onAssign: ${actor}`)
        return actor
    },

    onCreate({instance, task}) {
        console.log(`approve::onCreate: Activity and instance were created with id ${instance.instance}`)
    },

    onOutcome(outcome, instance, actor) {
        console.log(`\napprove::onOutcome: ${actor} updated the outcome to ${outcome}, process finished\n`)
    }
})

export default exampleProcess
