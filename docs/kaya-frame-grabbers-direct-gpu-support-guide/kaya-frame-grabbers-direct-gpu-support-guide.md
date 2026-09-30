---
id: "kaya-frame-grabbers-direct-gpu-support-guide"
title: "KAYA Frame Grabbers Direct GPU Support Guide"
sidebar_label: "KAYA Frame Grabbers Direct GPU Support Guide"
sidebar_position: 2
mdx:
  format: md
slug: "/kaya-frame-grabbers-direct-gpu-support-guide/kaya-frame-grabbers-direct-gpu-support-guide"
---
[Download PDF](/downloads/sdk/KAYA_Frame_Grabbers_direct_GPU_support_guide-2026.2.0.pdf)

<!-- Source: DocsBuilder/src/KAYA_Frame_Grabbers_direct_GPU_support_guide.docx -->

Direct GPU support guidance for KAYA frame grabbers.

## Overview

The purpose of this document is to describe the provided functionality of Direct GPU support in KAYA’s Frame Grabbers.

Modern GPUs which implement Direct GPU mechanism, allow system to eliminate redundant memory copies thus increasing data integrity and bandwidth by using less resources. The mechanism optimizes the data transfer path by performing as little data copies as possible, subject to GPU’s driver implementation, thus reducing transfer latency.

KAYA’s Frame Grabbers are able to utilize the Direct GPU capabilities, and perform a data transfer, with as little data copy as the GPU’s driver functionality implements.

## How does it work?

### NVIDIA GPUDirect for Video

NVIDIA GPUs, which implements the “GPUDirect”, eliminate unnecessary memory copies by using shared system memory, which then can be filled by a Frame Grabber. As a result, it reduces CPU and memory usage, as well as data transfer latency from the Frame Grabber to the GPU.

![Figure](./assets/kaya-frame-grabbers-direct-gpu-support-guide/d9d4d5a02b23fd8d91e3.jpeg)

<a id="word-_Toc241056366"></a>

*Figure 1 – Direct GPU workflow*

More information can be found on NVIDIA’s official site: [<strong>https://developer.nvidia.com/gpudirectforvideo</strong>](https://developer.nvidia.com/gpudirectforvideo)

Each GPU’s SDK provides different functionality, subject to GPU’s driver implementation, regarding Frame Grabber connectivity and data transfer method.

Successful data transfer process from KAYA’s Frame Grabber to destination GPU, differs very little from regular stream creation flow and data transfer. KAYA’s API function sequence should be incorporated in GPU’s native software SDK which will serve as the Host application.

Here are some examples on how to use KAYA’s API with different GPUs:

### API sample demonstrating using NVIDIA GPUDirect for Video with KAYA Vision Point II SDK

This sample demonstrate how to use

Open KYVP\_QueuedBuffers\_Example, activate macro KYVP\_CUDA\_BUFFERS and compile and run.

Make sure that ….(from email)
