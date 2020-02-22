const Mock = require('mockjs');
const db = require('../server/common/db').default;

const result = Mock.mock({
  'list|100': [
    {
      id: '@increment',
      timestamp: '@date',
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      content_short: 'mock data',
      content:
        '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft'],
      display_time: '@datetime',
      comment_disabled: '@integer(0, 1)',
      pageviews: '@integer(300, 5000)',
      image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
      platforms: ['a-platform'],
    },
  ],
});

function main() {
  result.list.forEach(item => {
    db.query('insert into article set ?', item);
  });
}

main();
