/**
 * 纯前端相关
 */
import {
    observable,
    computed,
    action,
    // autorun,
} from 'mobx';

class AppState {
    // 构造函数初始化数据
    constructor({ count, name } = { count: 0, name: 'tom' }) {
        this.count = count;
        this.name = name;
    }

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

    toJson() {
        return {
            count: this.count,
            name: this.name,
        };
    }
}

// 当有数据发生改变，会执行的回调
// autorun(() => {
//     console.log(appState.count);
// });

export default AppState;
