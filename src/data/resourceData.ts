export type ResourceLink = {
  id: string;
  title: string;
  url: string;
};

export type TopicResource = {
  id: string;
  title: string;
  intro: ResourceLink[];
  other: ResourceLink[];
  interesting?: ResourceLink[];
};

export const topicResources: Record<string, TopicResource> = {
  '16': {
    id: '16',
    title: 'Databases',
    intro: [],
    other: [],
    interesting: [
      { id: 'db1', title: 'Cassandra code', url: 'github.com/apache/cassandra' },
      { id: 'db2', title: 'Materialize', url: 'github.com/MaterializeInc/materialize' },
      { id: 'db3', title: 'Tuple Database', url: 'github.com/ccorcos/tuple-database' },
      { id: 'db4', title: 'GreptimeDB', url: 'github.com/GreptimeTeam/greptimedb' },
      { id: 'db5', title: 'LMDB Store', url: 'github.com/DoctorEvidence/lmdb-store' },
      { id: 'db6', title: 'Mentat', url: 'github.com/mozilla/mentat' },
      { id: 'db7', title: 'RocksDB', url: 'github.com/facebook/rocksdb' },
      { id: 'db8', title: 'TerarkDB', url: 'github.com/bytedance/terarkdb' },
      { id: 'db9', title: 'LevelDB', url: 'github.com/google/leveldb' },
      { id: 'db10', title: 'GoLevelDB', url: 'github.com/syndtr/goleveldb' },
      { id: 'db11', title: 'NodeLevelDB', url: 'github.com/Level/level' },
      { id: 'db12', title: 'TiDB', url: 'github.com/pingcap/tidb' },
      { id: 'db13', title: 'TiKV', url: 'github.com/tikv/tikv' },
      { id: 'db14', title: 'Noria', url: 'github.com/mit-pdos/noria' }
    ]
  },
  // Using ID '22' from our graphData which represents HTML/CSS
  '22': {
    id: '22',
    title: 'HTML',
    intro: [
      { id: 'i1', title: 'Learn HTML', url: 'web.dev/learn/html' }
    ],
    other: [
      { id: 'o1', title: 'Avoiding <img> layout shifts: aspect-ratio vs width & height attributes', url: 'jakearchibald.com/2022/img-aspect-ratio' },
      { id: 'o2', title: 'Virtual DOM is pure overhead', url: 'svelte.dev/blog/virtual-dom-is-pure-overhead' },
      { id: 'o3', title: 'Native HTML Autocomplete with datalist', url: 'codepen.io/tejask/pen/OJJBLrq' },
      { id: 'o4', title: "HTML isn't done! (Chrome Dev Summit 2019)", url: 'youtube.com/watch?v=ZFvPLrKZywA' },
      { id: 'o5', title: 'html-tags', url: 'github.com/sindresorhus/html-tags' },
      { id: 'o6', title: 'hast', url: 'github.com/syntax-tree/hast' },
      { id: 'o7', title: 'Optimal Virtual DOM', url: 'blog.kabir.sh/posts/optimal-virtual-dom.html' },
      { id: 'o8', title: 'tags-input', url: 'github.com/developit/tags-input' },
      { id: 'o9', title: "HTML attributes to improve your users' two factor authentication experience", url: 'twilio.com/blog/html-attributes-two-factor-authentication-autocomplete' }
    ]
  }
};

// Fallback logic for when a user clicks a node that we haven't written specific mock data for
export function getTopicResource(id: string, defaultTitle: string = 'Topic'): TopicResource {
  if (topicResources[id]) {
    return topicResources[id];
  }
  return {
    id,
    title: defaultTitle,
    intro: [
      { id: 'f1', title: `Introduction to ${defaultTitle}`, url: 'example.com/intro' }
    ],
    other: [
      { id: 'f2', title: `Advanced techniques for ${defaultTitle}`, url: 'example.com/advanced' },
      { id: 'f3', title: `GitHub repositories related to ${defaultTitle}`, url: 'github.com/search' }
    ]
  };
}
