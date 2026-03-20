A plugin that adds actions for working with folder-scoped incremental files in Obsidian.

# What is a "folder-scoped incremental file"?

This refers to a file inside a top-level folder whose filename (before the extension) can be parsed as an integer, e.g.:

```
my-vault/groceries/00001.md
```

# What it does

This plugin adds two actions to Obsidian, as commands and ribbon buttons.

## 1. Open last incremental file in folder

This opens a fuzzy finder of the top-level folders in your vault. The last incremental file (i.e. the one with the highest number) in the folder you select is opened.

Given a vault that looks like this:

```
.
├── shopping
│   ├── 00001.md
│   └── stores
│       └── my-fav-store.md
├── Welcome.md
└── groceries
    ├── 00001.md
    ├── staples.md
    ├── 00002.md
    └── 00003.md
```

You will be presented with the following options. Note that nested folders are ignored.

- `shopping/`
- `groceries/`

Selecting `groceries/` will open the file `groceries/00003.md`

## 2. Create new incremental file in folder

This opens a fuzzy finder of the top-level folders in your vault. A new file with the incremental name that follows existing files is created in the folder that you select.

Given a vault that looks like this:

```
.
├── shopping
│   ├── 00001.md
│   └── stores
│       └── my-fav-store.md
├── Welcome.md
└── groceries
    ├── 00001.md
    ├── staples.md
    ├── 00002.md
    └── 00003.md
```

You will be presented with the following options. Note that nested folders are ignored.

- `shopping/`
- `groceries/`

Selecting `groceries/` will open a new file `groceries/00004.md`

# Why is this useful?

For me, it is for creating groceries lists. I've historically used the _Daily notes_ core plugin to create my next grocery list. But what if my next grocery shop isn't on the day that I created the note?

This plugin allows me to easily refer to a "current note" for a particular purpose, and then create a new one when I have determined the current note has expired.
