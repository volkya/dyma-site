+++
title = 'Welcome to the blog'
date = 2026-04-22
description = 'Markdown in the repo — link out to Dev.to / Medium when you republish.'
slug = 'bienvenida'
draft = false
tags = []

[[platforms]]
name = 'Dev.to'
url = 'https://dev.to/'

[[platforms]]
name = 'Medium'
url = 'https://medium.com/'
+++

This site builds articles from **Markdown** files in `content/posts/`.

- Edit a `.md`, run `hugo server`, and the page updates on save.
- Use `draft = true` in the front matter to hide a post in production (it stays visible in development with `hugo server -D`).
- Optional `platforms` become pills that link to where you also published (Dev.to, Medium, Hashnode, …).

```bash
content/posts/my-note.md
```
