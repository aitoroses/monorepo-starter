import eAppProcess from '../mock-models/Process'

module.exports = [
    {
        method: 'GET',
        path: '/test/500',
        reply: function() {
            let stack = Error("TestError").stack
            setTimeout(() => {
                this.res.status(500)
                this.res.end(stack)
            }, 1500)
        }
    }, {
        method: 'GET',
        path: '/test/404',
        reply: function() {
            setTimeout(() => {
                this.res.status(404)
                this.res.end("404 page not found")
            }, 1500)
        }
    }, {
        method: 'GET',
        path: '/test/hello',
        reply: function() {
            setTimeout(() => {
                this.res.status(200)
                this.res.write("Hello World")
                this.res.end()
            }, 1500)
        }
    }, {
        method: 'POST',
        path: '/test/instantiate',
        reply: function(params, query, body) {
            (async () => {
                try {
                    let actor = this.req.jwt && this.req.jwt.sub

                    if (actor) {
                        let {instance, task} = eAppProcess.createInstance({
                            actor: actor,
                            payload: {
                                requestId: Math.round(Math.random() * 10000)
                            }
                        })

                        this.res.json(task)

                    } else {
                        this.res.status(401)
                        this.res.end()
                    }

                } catch(e) {
                    console.error(e)
                }
            })()
        }
    }
]
