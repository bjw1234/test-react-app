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

export default {
    topicSchema,
};
