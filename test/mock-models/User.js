/*
{
   "properties":[
      {
         "value":"1",
         "userId":"AT_REQ_ALL",
         "label":"EAPP_NOTIFICATION",
         "applicationId":2,
         "propertyId":100
      },
   ],
   "userData":{
      "uid":"at_req_all",
      "displayName":"at_req_all",
      "lastName":"mocked",
      "mail":"email.test2@bsstesting.com",
      "telephone":"100000000"
   },
   "ous":[
      "AUSTRIA_PH",
      "CHINA_MAXIMA"
   ]
}
*/

module.exports = {
    _index: {
        virtual: true,
        values: [0, 1, 2]
    },
    userData: {
        firstName: {
            function() {
                return ['James', 'John', 'Jack'][this.object._index]
            }
        },
        lastName: {
            function() {
                return ['London', 'Cooper', 'Stein'][this.object._index]
            }
        },
        uid: {
            function() {
                return 'j' + this.object.userData.lastName.toLowerCase()
            }
        },
        displayName: {
            function() {
                return this.object.userData.firstName + ' ' + this.object.userData.lastName
            }
        }
    },
    _ou: {
        virtual: true,
        hasOne: 'Ou'
    },
    ous: {
        function() {
            return [this.object._ou]
        }
    }
}
