---
title: "Implement the call"
slug: implemente-a-chamada
language: en
section: getting-started
section_label: "Get started"
order: 12
description: "Structure of the prediction request in each integration method."
sample: true
---

With the credential in place, the next step is issuing the prediction request.

:::tab api Via API

## Request

Send the batch of inputs as JSON to the prediction endpoint.

## Limits

Respect the maximum batch size documented in the API reference.

:::tab sdk Via SDK

## Request

Call the prediction method on the initialized client.

## Limits

The SDK splits large batches automatically.

:::tab server Server to server

## Request

Sign the request body and send it from the controlled environment.

## Limits

Batch runs have their own processing window.
