---
title: "Choose the method"
slug: escolha-o-metodo
language: en
section: getting-started
section_label: "Get started"
order: 10
description: "Three integration paths ending in the same prediction: direct API, SDK or server to server."
sample: true
---

Every integration with i6 returns the same prediction. What changes is the path
to it — and that choice depends on how much control your team wants to keep over
the call.

Pick a tab below to see the matching path. The choice you make here applies to
the next steps in this section.

:::tab api Via API

## When to use the direct API

Use the direct call when your team already has its own integration layer and
wants full control over authentication, retries and observability.

- no additional dependency in your project
- stable HTTP contract, versioned by header
- you control the timeout and the retry policy

## Maintenance cost

You own payload serialization and error handling. It is the most transparent
path and the one that requires the most code on your side.

:::tab sdk Via SDK

## When to use the SDK

Use the SDK when the priority is reaching the first prediction fast, with typing
and retries already solved.

- ready-made types for prediction inputs and outputs
- built-in retry with exponential backoff
- transparent credential refresh

## Maintenance cost

You track the package version. In exchange, almost no infrastructure code stays
in your repository.

:::tab server Server to server

## When to use server to server

Use server to server when calls originate from a controlled environment, with no
browser in the path, and volume is predictable in batches.

- long-lived credential kept on the server only
- ideal for batch runs and scheduled windows
- no key exposure on the client

## Maintenance cost

It requires a credential rotation process on your side and your own endpoint to
receive the result when the run is asynchronous.
