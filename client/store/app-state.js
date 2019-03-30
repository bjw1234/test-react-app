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
    @observable count = 0;

    @observable name = 'tom';

    // 构造函数初始化数据
    constructor({ count, name } = { count: 0, name: 'tom' }) {
        this.count = count;
        this.name = name;
    }

    @computed
    get msg() {
        return `${this.name} say count is ${this.count}`;
    }

    @action
    add() {
        this.count += 1;
    }

    @action
    changeName() {
        setTimeout(() => {
            console.log(this.name);
            this.name = this.name + 'xxx'; // eslint-disable-line
        }, 1500);
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
