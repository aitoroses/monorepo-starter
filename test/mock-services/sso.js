module.exports = [{
    method: 'GET',
    path: '/platform/sso',
    reply: function(params, query, body) {
        this.res.redirect(`/api/HumanWorkflow/identity/sso?redirectUrl=${params.redirectUrl}`);
    },
    options: {
        requiresAuth: false
    },
}, {
    method: 'GET',
    path: '/platform/sso/test',
    reply: function(params, query, body) {
        let redirectUrl = encodeURIComponent('/workspace/#/link/d29ya3NwYWNlPWNuZCZocmVmPS9hcGkvdGVzdC9oZWxsbw==')
        this.res.redirect(`/api/HumanWorkflow/identity/sso?redirectUrl=${redirectUrl}`)
    },
    options: {
        requiresAuth: false
    },
}]
