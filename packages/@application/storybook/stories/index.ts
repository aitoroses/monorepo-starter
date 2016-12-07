/// <reference path='../custom-typings.d.ts' />

let context = require.context('./', true, /\.story.(ts|tsx|js|jsx)$/)

context.keys().forEach(filename => context(filename))

const stylesheets = [
  '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css',
  '//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/theme/monokai.min.css'
]

stylesheets.forEach(k => {
    let link = document.createElement('link')
    link.href = k
    link.rel = 'stylesheet'
    document.head.appendChild(link)
})
