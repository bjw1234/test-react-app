export const topicSchema = {
    id: '',
    author_id: '',
    tab: '',
    content: '',
    title: '',
    last_reply_at: '',
    good: false,
    top: false,
    reply_count: 0,
    visit_count: 0,
    create_at: '',
    author: {
        loginname: '',
        avatar_url: '',
    },
    replies: [],
};

export const tabs = {
    all: {
        text: '全部',
        color: '',
    },
    ask: {
        text: '问答',
        color: 'red',
    },
    share: {
        text: '分享',
        color: 'green',
    },
    job: {
        text: '招聘',
        color: 'blue',
    },
    good: {
        text: '精华',
        color: 'purple',
    },
    dev: {
        text: '客户端测试',
        color: 'lime',
    },
};
