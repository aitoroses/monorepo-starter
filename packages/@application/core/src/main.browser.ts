
/*
 * App Module
 * our top level module that holds all of our components
 */
import { bootstrap } from './app';


function main() {

    let target: HTMLElement | null = (<any>global).rootElement
         || document.getElementById('root')

    bootstrap(target)
}

if (document.readyState === 'complete' || document.readyState === 'loaded') {
     main()
} else {
    document.addEventListener('DOMContentLoaded', main)
}
