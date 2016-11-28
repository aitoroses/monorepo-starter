
import { configure } from '@kadira/storybook';

function loadStories() {
    require('../assets/style/app.css')
    require('../stories/index.tsx');
}

configure(loadStories, module);
