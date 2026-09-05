---
title: "Video tour"
slug: video-tour
language: en
section: resources
section_label: "Resources"
order: 40
description: "A guided walkthrough of a full run, from data upload to reading predictions."
content_type: video
video_provider: youtube
video_id: aqz-KE-bpKQ
sample: true
---

## What the video covers

The tour walks through a complete run on the platform, in the same order a real
integration happens:

1. uploading the input data batch
2. triggering a modelling run
3. reading predictions and quality indicators
4. publishing the result to the target system

## Before watching

We recommend reading the authentication page first — the video assumes the
access token has already been issued.

```bash
curl -X POST https://api.infinity6.ai/v1/executions \
  -H "Authorization: Bearer $I6_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"dataset_id":"ds_example"}'
```

## After the video

The API reference details every parameter shown in the tour, including the
error codes that appear in the validation step.
