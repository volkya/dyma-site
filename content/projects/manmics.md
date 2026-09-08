+++
title = 'Manmics'
date = '2026-09-08T15:29:15-03:00'
draft = false
kind = 'example'
repo = ''
demo = ''
tags = ['Kotlin', 'Android']
+++

Manmics is a comics reader for a personal library: you add sources, keep chapter progress, and pick up the same title on the phone or in the browser. The hard part is not a pretty viewer—it is one catalog, one history, and sources that can be added without rewriting the app.

The core stays in Kotlin on purpose. Library, reading state, and source adapters live in a shared domain; Android is the first client, and the web client consumes the same model instead of becoming a second product. Offline cache and extension-style sources come after that library holds up.
