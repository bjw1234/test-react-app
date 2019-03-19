/**
 * 纯前端相关
 */
import {
    observable,
    computed,
    action,
    autorun,
} from 'mobx';

class AppState {
    @observable count = 0;

    @observable name = 'tom';

    @computed
    get msg() {
        return `${this.name} say count is ${this.count}`;
    }

    @action
    add() {
        this.count += 1;
    }

    @action
    changeName(name) {
        this.name = name;
    }
}

const appState = new AppState();

setInterval(() => {
    appState.add();
}, 1000);

// 当有数据发生改变，会执行的回调
autorun(() => {
    // console.log(appState.count);
});

export default appState;
