import AppState from './app-state';

// 导出一个或多个数据store
export default {
    AppState,
};

export const createStoreMap = () => ({
    appState: new AppState(),
});
