---
title: "Set up authentication"
slug: configure-a-autenticacao
language: en
section: getting-started
section_label: "Get started"
order: 11
description: "Credentials, scopes and rotation in each of the three integration methods."
sample: true
---

Authentication is the first point where the three methods differ. In all of
them, the credential must never reach the end user's browser.

:::tab api Via API

## Credential and header

The direct call uses a project key sent in the `Authorization` header.

```bash
curl https://api.example.i6/v1/predict \
  -H "Authorization: Bearer $I6_API_KEY" \
  -H "Content-Type: application/json"
```

@video youtube aqz-KE-bpKQ | Credential setup step by step

## Scopes

Every key carries explicit scopes. Request only `predict:read` for prediction
consumption — write scopes stay reserved for ingestion processes.

## Rotation

Create the new key before revoking the old one: both coexist for 24 hours.

:::tab sdk Via SDK

## Client initialization

The SDK reads the credential from the environment and handles refresh.

```ts
import { I6Client } from '@i6/sdk';

const client = new I6Client({
  apiKey: process.env.I6_API_KEY!,
  project: 'demo',
});
```

## Scopes

The client fails at initialization when the key lacks the required scope, with an
explicit message — there is no silent error at call time.

## Rotation

Swap the environment variable and restart the process. No code change.

:::tab server Server to server

## Long-lived credential

In server to server mode the credential is a key pair: a public identifier and a
private key used to sign every request.

```bash
I6_CLIENT_ID=cli_demo
I6_PRIVATE_KEY=/etc/i6/private.pem
```

The private key never leaves the server and must not be committed.

@download src/assets/docs-exemplo.pdf.asset.json | Credential rotation checklist

## Rotation

Rotation is scheduled: register the new public key, wait for the overlap window
and only then remove the previous one.
