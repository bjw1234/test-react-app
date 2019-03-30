import {
    action,
    observable,
    extendObservable,
    autorun,
} from 'mobx';

import model from '../util/model';
import { topicSchema } from '../util/schema-define';

// 使得数据所有字段都有定义
const createTopic = (topic) => {
    return Object.assign({}, topicSchema, topic);
};

class Topic {
    constructor(data) {
        // 将一个对象上的所有属性都附加在this上面
        extendObservable(this, data);
    }

    @observable syncing = false;
}

class TopicStore {
    @observable topics;

    @observable syncing;

    constructor({ syncing, topics } = { syncing: false, topics: [] }) {
        this.syncing = syncing;
        this.topics = topics.map((topic) => {
            return new Topic(createTopic(topic));
        });
        autorun(() => {
            console.log(this.topics);
        });
    }

    addTopic(topic) {
        this.topics.push(new Topic(createTopic(topic)));
    }

    @action
    fetchTopics() {
        return new Promise((resolve, reject) => {
            this.syncing = true;
            model.get('/api/topics', {
                mdrender: 'false',
                limit: 3,
            }).then((resp) => {
                if (resp.success) {
                    resp.data.forEach((topic) => {
                        this.addTopic(topic);
                    });
                    resolve();
                } else {
                    reject();
                }
                this.syncing = false;
            }).catch((err) => {
                reject(err);
                this.syncing = false;
            });
        });
    }
}

export default TopicStore;
