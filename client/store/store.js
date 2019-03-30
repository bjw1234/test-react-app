import AppState from './app-state';
import TopicStore from './topic-store';

// 导出一个或多个数据store
export {
    AppState,
    TopicStore,
};

export const createStoreMap = () => ({
    appState: new AppState(),
    topicStore: new TopicStore(),
});
