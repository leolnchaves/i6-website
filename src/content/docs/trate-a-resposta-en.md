---
title: "Handle the response"
slug: trate-a-resposta
language: en
section: getting-started
section_label: "Get started"
order: 13
description: "Reading the result, expected errors and retries in each method."
sample: true
---

The prediction response has the same shape in all three methods; error handling is what changes.

:::tab api Via API

## Result

Read the JSON body and validate the model version field.

## Errors

Handle 401, 429 and 5xx explicitly, with your own retry.

:::tab sdk Via SDK

## Result

The return value is already typed.

## Errors

Retry and backoff are applied by the client; catch only the final error.

:::tab server Server to server

## Result

In an asynchronous run, the result arrives at your callback endpoint.

## Errors

Acknowledge receipt to avoid a resend of the same run.
