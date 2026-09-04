---
title: "Overview"
slug: overview
language: en
section: start
section_label: "Get started"
order: 10
description: "How the documentation is organized and where to start integrating with the i6 engines."
sample: true
---

## What you will find here

This area gathers the technical reference for integrating with the i6 engines: how to authenticate, how to send data, how to consume predictions and how to follow executions.

The left-hand navigation follows the suggested reading order. The index on the right helps you move inside a long page.

## Documentation structure

- **Get started** — overview, first steps and authentication.
- **API** — resource reference, parameters and error codes.

## Initial Setup

The starting point is obtaining environment credentials and confirming access to the service health endpoint.

```bash
curl -sS "$I6_API_BASE/health" \
  -H "Authorization: Bearer $I6_API_TOKEN"
```

## Conventions

All examples use environment variables for credentials, JSON as the exchange format and UTC dates in ISO 8601.
