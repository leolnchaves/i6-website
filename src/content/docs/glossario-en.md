---
title: "Glossary"
slug: glossario
language: en
section: glossary
section_label: "Glossary"
order: 50
description: "Full technical vocabulary of the i6 intelligence: algorithms, decision metrics and operational terms used across the documentation and the product pages."
site_managed: true
---

This glossary gives the full definition of terms that appear in condensed form on the product pages. Alphabetical order, for direct lookup.

## Active Learning

Training strategy in which the model itself chooses which samples should be labelled or added to the learning cycle, instead of consuming all available data indiscriminately. The selection criterion is usually uncertainty: the model prioritises the examples it is least confident about, because those are the ones that reduce error the most once learned.

In practice this shortens adaptation time to a new client or domain and cuts annotation cost, because a small, well-chosen amount of data replaces a large amount of redundant data.

## Behavioral prediction

Modeling that learns the behavior actually observed for a customer, channel or product from transactional data — what was bought, when, in which context — rather than from preferences declared in a form or survey. The goal is to anticipate the next relevant action, not to describe the past.

It applies to known and anonymous users alike, because behavior is represented in the same latent space whether or not an account is attached.

## Contextual fit

Degree to which a decision produced by the model makes sense in the context where it will be applied — timing, channel, operational constraint and the immediate history of the customer or product. A statistically correct recommendation can have poor contextual fit if it ignores that the item is out of stock, that the customer just bought the same product, or that the channel does not support that offer format.

That is why the i6 engines treat context and constraint as part of the decision function, not as a filter applied after the result.

## Conversion propensity

Estimated probability that a person, in a specific context, performs the action of interest — buy, subscribe, renew, respond to an offer. It is a calibrated output: when the model says 30%, roughly 30% of the cases in that band should convert, which makes the number usable for cut-off and prioritisation decisions.

Used to rank commercial effort and decide who receives which offer, instead of applying the same approach to the whole base.

## Dynamic elasticity

Price sensitivity of demand, computed continuously per SKU, channel and lifecycle stage, instead of being fixed in a static curve revised now and then. Every new data cycle recomputes elasticity, which makes it possible to react to competitive moves, seasonality and buying behavior without waiting for a manual pricing round.

Margin and positioning constraints enter as model bounds, so the suggested price never leaves the range the business accepts.

## i6-RecSys-Base.g1

infinity6's proprietary foundation model, the basis for the forecasting, recommendation and pricing engines. It combines three architectural elements: MAML, for fast adaptation from few samples; Active Learning, to select the most informative data; and Topological Loss, to preserve the structure of the learned relationships.

It was pre-trained on 20B cross-sector records, which means adapting it to a specific client requires far less proprietary data than training a model from scratch.

## MAML

Short for Model-Agnostic Meta-Learning, an algorithm published by Finn, Abbeel and Levine in 2017. Instead of training a model to solve one task well, MAML trains a parameter starting point that adapts to a new task with very few updates and very little data.

It is the basis of i6-RecSys-Base.g1 and the reason a new client goes live with few samples of its own, inheriting what the foundation model already learned.

## Shelf out-of-stock

Situation where the product is unavailable at the point of sale exactly when the customer wants to buy it, even though stock exists elsewhere in the chain. Unlike a general stockout, this is an allocation and replenishment problem — the item exists, just not where demand happened.

It costs the immediate sale and, when recurrent, shifts preference to a competing brand. It is one of the direct targets of granular forecasting per SKU and point of sale.

## Topological Loss

Loss function that, beyond prediction error, penalises distortion of the topological relationships between examples in the latent space — that is, it requires items that are close in the real world to stay close in the learned representation.

The practical effect is a more stable embedding and better generalisation in few-shot scenarios, because the structure learned during pre-training does not fall apart when the model is adapted to a new domain.
