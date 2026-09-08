+++
title = 'PayRoute'
summary = 'Transfer + risk gate. Go payments, Python risk over gRPC (HTTP/2).'
date = '2026-09-08T13:23:24-03:00'
draft = false
kind = 'example'
repo = 'https://github.com/volkya/gRPC-styleAPI'
demo = ''
tags = ['Go', 'Python', 'gRPC', 'Docker', 'AWS']
+++

PayRoute is a payments-platform slice: before a transfer is approved, a Go service validates and stores it, then asks a Python risk service over gRPC (HTTP/2) whether the operation fits the risk appetite. That is the same gate a neobank puts between the BFF and the ledger—approve or reject with a clear trail, not blind money movement.

The technical heart stays small on purpose: shared `.proto` contracts, hexagonal layout on the Go side, idempotency keys so retries do not double-debit, plus timeout and circuit breaker toward risk. Phase 1 runs on Docker Compose; AWS/Terraform is scaffolded for a later deploy path.