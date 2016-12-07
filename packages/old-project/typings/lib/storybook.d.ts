
declare namespace __KadiraStoryBook {

    type JSXFactory = (context?) => JSX.Element

    interface StoryFunc {
        (this: Story, storyName: string, factory: JSXFactory): any
    }

    interface Story {
        add(storyName: string, factory: JSXFactory): Story
    }

    export function storiesOf(suite: string, module: any): Story
    export function action(event: string): any
    export function configure(start: Function, module: any)
    export function addDecorator(storyFn: (story: JSXFactory) => void)
    export function setAddon(obj: {[key: string]: StoryFunc})
    export function linkTo(group: string, story: string)

}

declare module "@kadira/storybook" {
    export = __KadiraStoryBook
}
