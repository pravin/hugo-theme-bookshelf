# Hugo Theme Bookshelf

![Bookshelf home page](https://raw.githubusercontent.com/pravin/hugo-theme-bookshelf/main/images/screenshot.png)

A blog theme where your archive is a bookshelf. Every post is a book spine: **as thick as the piece is long, coloured by its subject**, and filed left to right by year. Pull a spine out and the article opens as a page from a book, with a chapter opener, justified text, Roman-numeral sections and a colophon.

## What makes it different

* **The archive is the home page.** Posts stand on shelves as spines. Spine width comes from the word count, the cloth colour from the post's first tag, and the height varies a little (picked from the title, so it never changes between builds). Year dividers sit between them, and the shelves wrap as your archive grows.
* **Articles read like a book.** A "No. 12 · Subject" chapter opener, a display title, a fleuron, small capitals on the first line, Roman numerals on every section heading, book-style tables, and a colophon with the word count.
* **Next to it on the shelf.** At the end of each article, the older and newer posts are laid flat as spines in their own colours.
* **A reading folio.** A quiet "page 2 of 6" at the foot of the window, where a page is one screenful.
* **Lamp off, lamp on.** Light and dark mode follow the reader's OS setting, with a toggle that remembers their choice.
* **Small.** One stylesheet and two tiny scripts. No CSS framework, no icon font.

| Dark mode | An article |
| --- | --- |
| ![Dark mode](https://raw.githubusercontent.com/pravin/hugo-theme-bookshelf/main/images/screenshot-dark.png) | ![An article](https://raw.githubusercontent.com/pravin/hugo-theme-bookshelf/main/images/article.png) |

The subjects page shows each tag as a volume, as long as the number of posts filed under it,

![Subjects](https://raw.githubusercontent.com/pravin/hugo-theme-bookshelf/main/images/subjects.png)

## Installation

This theme requires Hugo v0.146.0 or later.

As a git submodule,

```sh
git submodule add https://github.com/pravin/hugo-theme-bookshelf.git themes/hugo-theme-bookshelf
```

then set `theme = "hugo-theme-bookshelf"` in your `hugo.toml`.

Or as a Hugo module,

```sh
hugo mod init github.com/<you>/<your-site>
```

```toml
[module]
  [[module.imports]]
    path = "github.com/pravin/hugo-theme-bookshelf"
```

To try the example site,

```sh
cd exampleSite
hugo server
```

## Configuration

A complete example lives in [`exampleSite/hugo.toml`](https://github.com/pravin/hugo-theme-bookshelf/blob/main/exampleSite/hugo.toml).

```toml
baseURL = "https://example.com/"
locale = "en-GB"
title = "My Bookshelf"
theme = "hugo-theme-bookshelf"

[pagination]
  pagerSize = 10

[params]
  tagline = "Thoughts on engineering and management"
  author = "Your Name"
  authorImgPath = "/img/author.png"
  authorBlurb = "Something about you"
  mainSections = ["posts"]
  defaultTheme = "auto"
  themeToggle = true

  [params.bookshelf]
    intro = "Each spine is as thick as the piece is long and coloured by its subject. Pull one out to read it."

  [params.social]
    github = "https://github.com/you"
    mastodon = "https://mastodon.social/@you"
    email = "mailto:you@example.com"

[markup]
  [markup.highlight]
    noClasses = false
  [markup.goldmark.renderer]
    unsafe = true
```

### Site parameters

| Parameter | Default | What it does |
| --- | --- | --- |
| `tagline` | | Heading on the home page, and part of the home page title |
| `author` | | Author name, used for the copyright line, colophons and the spine monogram |
| `authorImgPath` | | Image shown beside the author blurb, and the default preview image for social cards |
| `authorBlurb` | | A line about the author on the home page. Markdown is allowed |
| `mainSections` | Hugo's default | Sections whose pages go on the shelf, in the catalogue and in the RSS feed |
| `defaultTheme` | `"auto"` | `"auto"` follows the reader's OS setting; `"light"` or `"dark"` makes that the default |
| `themeToggle` | `true` | Set to `false` to hide the "Lamp off / Lamp on" toggle |
| `favicon` | | Path to a favicon |
| `social.*` | | Links shown on the home page: `mastodon`, `bluesky`, `github`, `twitter`, `linkedin`, `medium`, `facebook`, `email`. `twitteruser` sets the Twitter card creator |

### Shelf parameters (`[params.bookshelf]`)

| Parameter | Default | What it does |
| --- | --- | --- |
| `intro` | see above | Text under the tagline on the home page, after the post count |
| `minSpine`, `maxSpine` | `40`, `120` | Narrowest and widest spine, in pixels |
| `fullSpineWords` | `1500` | Word count that gives the widest spine. Longer posts are capped |
| `minHeight`, `maxHeight` | `280`, `370` | Range of spine heights, in pixels |
| `monogram` | author's initials | Letters at the foot of every spine |
| `maxSpines` | `0` | Show only the newest N spines on the shelf. `0` shows all of them |
| `subjectsLimit` | `12` | Number of subjects listed on the home page |
| `palette` | 10 cloth colours | List of `{ bg = "#...", fg = "#..." }` used for spines. `fg` is the label colour, so keep it readable on `bg` |
| `colors` | | Pin a subject to a colour, e.g. `markdown = "#7B2A26"`. The label colour is chosen for contrast |

Subjects take palette colours in order of how many posts they have, so your most common subjects always look different from each other. Adding posts can occasionally shuffle the colours of your smaller subjects; pin the ones you care about with `colors`.

A custom palette,

```toml
[params.bookshelf]
  palette = [
    { bg = "#7B2A26", fg = "#F0E3C2" },
    { bg = "#24395C", fg = "#E6E0CC" },
    { bg = "#C08A2E", fg = "#231A0C" },
  ]
  [params.bookshelf.colors]
    management = "#2F4A3A"
```

### Front matter

```yaml
title: "On Hiring"
description: "Shown under the title, and in the catalogue"
date: 2026-10-12
author: "Overrides params.author for this post"
tags: ["hiring", "management"]   # the first tag sets the spine colour
previewimage: "cover.jpg"         # optional social card image
disableComments: true             # optional, turns off Disqus for this page
```

### Menu

By default the masthead shows The shelf, Subjects, About and RSS. To change these, define a `main` menu,

```toml
[[menus.main]]
  name = "The shelf"
  pageRef = "/"
  weight = 10
[[menus.main]]
  name = "Now"
  pageRef = "/now"
  weight = 20
```

### Syntax highlighting

Code is highlighted by Hugo's built-in highlighter, with colours that follow light and dark mode. This needs Chroma to output CSS classes,

```toml
[markup.highlight]
  noClasses = false
```

### Comments and analytics

Set `services.disqus.shortname` to enable Disqus on articles, and `services.googleAnalytics.ID` for Google Analytics. Analytics is only included in production builds.

## Customisation

* **Colours.** All colours are CSS variables at the top of `assets/css/style.css`, written as `light-dark(<light>, <dark>)`. Copy that file to your site's `assets/css/style.css` to change them.
* **Custom head and footer code.** Create `layouts/_partials/custom_header.html` or `custom_footer.html` in your site.
* **Fonts.** The theme uses Jost and Libre Caslon from Google Fonts. Override `layouts/_partials/head.html` to change them.

## Licence

MIT, by [Pravin Paratey](https://cto.me.uk).
