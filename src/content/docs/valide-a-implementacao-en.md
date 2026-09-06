---
title: "Validate the implementation"
slug: valide-a-implementacao
language: en
section: getting-started
section_label: "Get started"
order: 14
description: "Minimum checks before considering the integration complete."
sample: true
---

Before turning the integration on in production, confirm the points below in the chosen method.

:::tab api Via API

## Checks

- credential with the correct scope
- timeout and retry defined
- model version recorded in your log

:::tab sdk Via SDK

## Checks

- package version pinned
- environment variable present in every environment
- final error handled in the application

:::tab server Server to server

## Checks

- private key outside the repository
- callback endpoint reachable and idempotent
- rotation scheduled
