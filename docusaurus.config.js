const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  trailingSlash: true,
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
  },

  title: 'jojonas',
  tagline: 'writings',
  url: 'https://jojonas.xyz/', 
  baseUrl: '/',
  projectName: 'jojonas.xyz',
  organizationName: 'jojonas',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.ico',


  themeConfig: {
    navbar: {
      title: 'jojonas\' cabin',
      hideOnScroll: true,
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://twitter.com/jojonas_xyz/',
          label: 'Twitter',
          position: 'right',
        },
        {
          href: 'https://t.me/jojonas_xyz',
          label: 'Telegram',
          position: 'right',
        },
        {
          href: 'https://lenster.xyz/u/jojonas1.lens',
          label: 'Lenster',
          position: 'right',
        },
        {
          href: 'https://mirror.xyz/jojonas1.eth',
          label: 'Mirror',
          position: 'right',
        },
        {
          label: "blogs",
          to: "/blog"
        },
    },
    footer: {
      style: 'light',
      links: [
        {
          title: "^_^",
          items: [
            {
              label: "Get Contact",
              to: "/docs/More/Contact/"
            },
            {
              label: "网站收藏夹",
              to: "/docs/More/bookmark"
            }
          ]
        },
        {
          title: "Social",
          items: [
            {
              label: "Bilibili",
              href: "https://space.bilibili.com/137897691"
            }
          ]
        },
        {
          title: "Novel Links",
          items: [
            {
              label: "Mirror",
              href: "https://mirror.xyz/0x4A36d2c1cbAeB213591450031EbA28ef29e0F715"
            },
            {
              label: "微信公众号",
              href: "https://mp.weixin.qq.com/s/2LiE1FVzija7SEayeBIccw"
            }
          ]
        },
        {
          title: "Community",
          items: [
          ]
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}.  Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
