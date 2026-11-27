---
title: "How we estimate a project: function points, explained"
date: 2026-11-26
summary: "The IFPUG method we use to go from \"what the system must do\" to hours, timeline and price, with a full example."
tag: "Method"
---

When a provider gives you a price without explaining where it comes from, you can't tell whether it is fair. We estimate with **function points**, a standard method (IFPUG) that measures a system's size by what it does, not by how it is coded.

## 1. Count the functions

Everything the system stores or does falls into one of five types, each weighted by complexity:

| Type | What it is | Low | Average | High |
| --- | --- | --- | --- | --- |
| Internal logical file (ILF) | Data the system keeps: customers, bookings, orders | 7 | 10 | 15 |
| External interface file (EIF) | Data read from another system: a payment provider | 5 | 7 | 10 |
| External input (EI) | Creating, editing or deleting something | 3 | 4 | 6 |
| External output (EO) | Reports, invoices, automatic notices | 4 | 5 | 7 |
| External inquiry (EQ) | Searching and viewing data | 3 | 4 | 6 |

## 2. Adjust for the system's characteristics

Fourteen general characteristics (communications, performance, complexity of the rules, use across locations, among others) are rated 0 to 5. Their sum gives the **adjustment factor**: 0.65 + 0.01 × the sum, between 0.65 and 1.35.

## 3. Turn it into hours, timeline and price

We multiply the adjusted points by our productivity, currently calibrated at **3 hours per point**, and the hours by the **USD 35** rate. The price range we show is 20 % below and above that value.

## An example

A system that stores customers (with several fields each), issues complex invoices, takes online payments, has two kinds of user and sends automatic notices:

- **61 function points** before adjustment.
- Adjustment factor **1.01**.
- **61.61 adjusted points × 3 hours = 185 hours**.
- Reference price **USD 6,475**, range **USD 5,180 to 7,770**.
- About **4.7 weeks** with a 40-hour-a-week team.

Try it with your own project in the [estimator](/en/estimate/).
