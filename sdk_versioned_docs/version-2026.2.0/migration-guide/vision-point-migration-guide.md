---
id: "vision-point-migration-guide"
title: "Vision Point Migration Guide"
sidebar_label: "Vision Point Migration Guide"
sidebar_position: 2
---
Source: `src/Docs/Vision_Point_Migration_Guide.docx`

Migration guidance sourced from the existing Word document.

Vision Point to Vision Point II

Migration Guide

May 2026

Rev 2026.1.2

## Revision History

Table 1 – Revision History

## Table of Contents

## Figures and Tables

### List of Tables

Table 1 – Revision History	1

Table 2 – Adapter library	7

Table 3 – Implemented functions	10

## Introduction

### Safety precautions

Please take the time to read through the precautions listed below to prevent preventable and unnecessary injuries and damage to you, other personnel, or property. Read these safety instructions carefully before your first use of the product, as these precautions contain safety instructions that must be observed. Be sure to follow this manual to prevent misuse of the product.

### Disclaimer

KAYA Vision will assume no responsibility for any damage that may ensue by the use of this product for any purpose other than intended, as previously stated. Without detracting from what was previously written, please be advised that the company will take no responsibility for any damages caused by:

Earthquake, thunderstrike, natural disasters, fire caused by use beyond our control, wilful and/or accidental misuse and/or use under other abnormal and/or unreasonable conditions.

Secondary damages caused by the use of this product or its unusable state (business interruption or others).

Use of this product in any manner that contradicts this manual or malfunctions that may occur due to connection to other devices. Damage to this product that is out of our control or failure due to modification

Accidents and/or third parties that may be involved.

Additionally, KAYA Vision assumes no responsibility or liability for:

Erasure or corruption of data caused by the use of this product.

Any consequences or other abnormalities following the use of this product

## Overview

The purpose of this document is to list and demonstrate the ways to migrate to the new Vision Point II API.

This API is to be used with KAYA Frame Grabbers hardware provided by KAYA Vision. This is a high-level API for connecting, configuring and capturing data streaming over 1, 2, 4 or 8 channels. KAYA Frame Grabbers are capable of connecting to various cameras at various speeds and topologies.

### Document Structure

This migration guide is divided into few major topics each related to different functionalities:

Legacy Vision Point API Adapter.

Transition to the new API.

## Legacy Vision Point API Adapter

Use the new possibilities with Vision Point II, knowing that existing code is supported. To ensure a smooth transition, a legacy Vision Point API Adapter was developed. The Adapter allows to use the Vision Point II libraries with existing code developed using the legacy Vision Point API.

### Old code usage

To enable the customer to use the Vision Point API Adapter, it is necessary to link to the Adapter library.

Install Vision Point II from the official source.

Open an existing project in Visual Studio (or another preferred application).

Add KAYA_VISION_POINT_2_LIB_PATH to the /LIBPATH.

Link to the special Adapter library.

Table 2 – Adapter library

### Implemented functions

The most of Vision Point function were implemented to the Adapter library. The full list is below:

Table 3 – Implemented functions

In case of using not implemented function the user will receive a callback message “Function is not implemented”.

More functions might be added to the Adapter in next Vision Point II releases.

### Transition to the new API

When working with the Adapter as described above, it translates legacy API calls to the corresponding new API. It does so by creating new handles internally. To allow a gradual transition from legacy code to the new API, the Adapter implements additional public functions, listed below and declarated in KYFGLibA.h.

Important:

After including KYFGLibA.h, make sure to add the include directory KAYA_VISION_POINT_INCLUDE_PATH to your project's include paths.

These functions allow the code to retrieve the new API handles used by the Adapter to implement legacy functionality. For instance, if you have a FGHANDLE returned by the legacy API, you can retrieve the new KYVP_PCI_INTERFACE_HANDLE associated with it.

KYFG_Grabber_Get_KYVP_PCI_INTERFACE_HANDLE()

Returns underlying KYVP_PCI_INTERFACE_HANDLE for an open FGHANDLE;

Return value:

FGSTATUS - Status and error report.

KYFG_Grabber_Get_KYVP_COLLECTION_HANDLE()

Returns underlying KYVP_COLLECTION_HANDLE for an open FGHANDLE

Return value:

FGSTATUS - Status and error report.

KYFG_Camera_Get_KYVP_DEVICE_HANDLE()

Returns underlying KYVP_DEVICE_HANDLE for an open FGHANDLE

Return value:

FGSTATUS - Status and error report.

## REFERENCES

TECHNICAL SUPPORT AND PROFESSIONAL SERVICE

If you searched the documents and could not find the answers you need, contact KAYA Vision support service:

Create a support request on the web: support.kaya.vision

Our knowledge base is available on: kb.kaya.vision

Visit us at www.kaya.vision for comprehensive information.

SUBMITTING A SUPPORT REQUEST

When opening a support request, please provide the following information when applicable:

2025 KAYA Vision, Inc. All rights reserved. KAYA Vision, the KAYA Vision Komodo logo, Predator, Iron, Zinc, Mercury and combinations thereof are trademarks of KAYA Vision, Inc. in the United States and/or other jurisdictions. Microsoft Windows® is a registered trademark of Microsoft Corporation. Linux® is a registered trademark of Linus Torvalds in the U.S. and other countries. JetPack® is a trademark of NVIDIA Corporation. HALCON® is a registered trademark of MVTec Software GmbH. Neither KAYA Vision, nor any of its products or services are affiliated with, endorsed by, or sponsored by National Instruments. MATLAB® is a registered trademark of The MathWorks, Inc. Cognex® is a registered trademark of Cognex Corporation. Other names are for informational purposes only and may be trademarks of their respective owners. KAYA Vision is not liable for harm or damage incurred by information contained in this document.2025 KAYA Vision, Inc. All rights reserved. KAYA Vision, the KAYA Vision Komodo logo, Predator, Iron, Zinc, Mercury and combinations thereof are trademarks of KAYA Vision, Inc. in the United States and/or other jurisdictions. Microsoft Windows® is a registered trademark of Microsoft Corporation. Linux® is a registered trademark of Linus Torvalds in the U.S. and other countries. JetPack® is a trademark of NVIDIA Corporation. HALCON® is a registered trademark of MVTec Software GmbH. Neither KAYA Vision, nor any of its products or services are affiliated with, endorsed by, or sponsored by National Instruments. MATLAB® is a registered trademark of The MathWorks, Inc. Cognex® is a registered trademark of Cognex Corporation. Other names are for informational purposes only and may be trademarks of their respective owners. KAYA Vision is not liable for harm or damage incurred by information contained in this document.
