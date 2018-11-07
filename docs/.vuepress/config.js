module.exports = {
  title: 'Template for documentation',
  description: "A demo documentation using VuePress",
  themeConfig:{
    nav: [
      // TODO: example
      // { text: 'COUNTER', link: '/foo1/' },
      // { text: 'GUIDE', link: '/foo/' },
    ],
    sidebar: [
      {
        title: 'Counter',
        collapsable: false,
        children: [
        // TODO: example
        // '/counter/counter-app'
        ]
      },
      {
        title: 'API Guide',
        collapsable: false,
        children: [
          // TODO:
          // example
        	// '',
          // '/foo/',
          // '/foo/two',
          // '/foo/one'
        ]
      }
    ]
  }
}