function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function payload(requestId) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <payload xmlns="http://xmlns.oracle.com/bpel/workflow/task">
       <disclaimer>1</disclaimer>
       <VariablesBusinessObject xmlns="http://xmlns.oracle.com/bpm/bpmobject/Model/Runtime/VariablesBusinessObject" xmlns:ns0="http://xmlns.oracle.com/bpm/bpmobject/Model/Runtime/VariablesBusinessObject">
          <ns0:stringVar1>_Medical Advisor</ns0:stringVar1>
          <ns0:stringVar2>7001</ns0:stringVar2>
          <ns0:stringVar3>NA</ns0:stringVar3>
          <ns0:stringVar4>NA</ns0:stringVar4>
          <ns0:stringVar5>NA</ns0:stringVar5>
       </VariablesBusinessObject>
       <requestId>${requestId}</requestId>
       <currentStepId>-1</currentStepId>
       <requestDescription>requestTitle</requestDescription>
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

module.exports = {
  _user: {
    virtual: true,
    hasOne: 'User'
  },

  _requestId: {
    virtual: true,
    function() {
      return Math.floor(Math.random() * 10000)
    }
  },
  title: {
    function() {
      return `Approve - Request Id: ${this.object._requestId}`
    }
  },
  identificationKey: {
    function() {
      return Math.floor(Math.random() * 100000)
    }
  },
  creator: {
    function() {
      return this.object._user.userData.uid
    }
  },
  payload: {
    function() {
      return payload(this.object._requestId)
    }
  },
  systemAttributes: {
    state: {
      values: [
        "ASSIGNED"
      ]
    },
    assignees: {
      function() {
        return [{
          id: this.object._user.userData.uid,
          displayName: this.object._user.userData.displayName,
          type: "USER",
          systemVersionFlag: null
        }]
      }
    },
    assignedDate: {
      static: 1432628751000
    },
    taskId: {
      function() {
        return guid()
      }
    },
    taskDefinitionId: {
      values: ["default\/eAppKernel!1.0\/ApproveHumanTask"]
    },
    systemMessageAttributes: {
      textAttribute1: {
        static: "Promotional material"
      },
      textAttribute2: {
        static: "CC"
      },
      textAttribute3: {
        static: "test"
      }
    }
  }
}
