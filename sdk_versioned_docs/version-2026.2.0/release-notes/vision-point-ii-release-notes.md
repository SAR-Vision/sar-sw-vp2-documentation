---
id: "vision-point-ii-release-notes"
title: "Vision Point II Release Notes"
sidebar_label: "Vision Point II Release Notes"
sidebar_position: 2
---
Source: `src/Docs/Vision_Point_II_Release_Notes.docx`

Release notes sourced from the existing Word document.

Vision Point II

Release Notes

May 2026

Rev 2026.1.2

## Revision History

Table 1 – Revision History

## Figures and Tables

### List of Tables

Table 1 – Revision History	1

## Introduction

### Safety precautions

Please take the time to read through the precautions listed below to prevent preventable and unnecessary injuries and damage to you, other personnel, or property. Read these safety instructions carefully before your first use of the product, as these precautions contain safety instructions that must be observed. Be sure to follow this manual to prevent misuse of the product.

### Disclaimer

KAYA Vision assumes no responsibility for any damage that may ensue by using this product for any purpose other than intended, as previously stated. Without detracting from what was previously written, please be advised that the company will take no responsibility for any damages caused by:

Earthquake, thunder strike, natural disasters, a fire caused by use beyond our control, willful and/or accidental misuse and/or use under other abnormal and/or unreasonable conditions.

Secondary damages caused by the use of this product or its unusable state (business interruption or others).

Use of this product in any manner that contradicts this manual or malfunctions due to connection to other devices. Damage to this product that is out of our control or failure due to modification

Accidents and/or third parties that may be involved.

Additionally, KAYA Vision assumes no responsibility or liability for:

Erasure or corruption of data caused by the use of this product.

Any consequences or other abnormalities following the use of this product

## Release notes

The purpose of this document is to describe the changes, enhancements, and bug fix report for the new version release of Vision Point II.

### Release notes Vision Point II/API 2026.1 (Service pack 2)

#### Fixes and improvements

Various bug fixes and improvements.

### Release notes Vision Point II/API 2026.1 (Service pack 1)

#### New features

Introduced a new GUI application, KAYA Vision Studio, which aims to replace Vision Point II in future.

Added the ability to save buffers as image files or RAW data (single file or batch mode).

Added ability to acquire a specified number of frames. (For precise control and accuracy, the use of triggers is recommended).

Implemented device event support via the extension library API, KYVPLibTL, and the GenTL producer.

#### Fixes and improvements

Fixed an issue that caused image corruption during the acquisition start/stop sequence on Komodo III CLHS compatible.

Fixed an issue where the GenTL producer in MATLAB could fail to detect devices in the Image Acquisition Toolbox (“no devices found” issue).

Fixed an issue in the Windows installation package (silent installation) where the /COMPONENTS="" command-line argument was ignored.

Fixed an issue where the installation process could fail during the driver build step on Ubuntu 24 with kernel 6.17.

Various bug fixes and improvements.

### Release notes Vision Point II/API 2026.1

#### New features

Added support for Zinc PCIe cameras.

Added a new API sample "KYVP_ManualDetection_Example" demonstrating the correct procedure for configuring manual detection through XML parameters.

Updated the "KYVP_QueuedBuffers_Example" API sample to demonstrate the usage of the direct stream callback.

#### Fixes and improvements

Fixed an issue that caused image corruption when packed-data mode was enabled on III generation frame grabbers used with cameras supporting Tap Geometry.

Fixed an issue that prevented streaming from starting on CLHS line scan cameras.

Various bug fixes and improvements.

### Release notes Vision Point II/API 2025.2 (Service pack 4)

#### New features

Added manual camera discovery using frame grabber XML parameters (commonly used with the KAYA GenTL provider).

Improved Power over CoaXPress (PoCXP) management.

Added support for frame grabber event handling.

#### Fixes and improvements

Fixed an issue with incorrect CXP packet tag assignment.

Fixed an issue with CLHS frame grabber sharing.

Fixed an issue with stream failure on CLHS cameras when using the KAYA GenTL producer.

### Release notes Vision Point II/API 2025.2 (Service pack 3)

#### New features

Added support for manual camera detection.

Added an option to retrieve the current software version through KYVPLibTL_TLGetInfo.

#### Fixes and improvements

Fixed a crash that occurred when creating a stream via CL over Fiber range extender.

Buffer metadata is now initialized using the first (master) logical DMA channel for streams composed of multiple DMA channels.

### Release notes Vision Point II/API 2025.2 (Service pack 2)

#### Fixes and improvements

Fixed an issue where the timestamp in the KYVP_IO_AUX_DATA structure was reported incorrectly (multiplied by 8).

Added support for retrieving precise buffer reception timestamps via new commands:

KYVP_BUFFER_INFO_CMD_TIMESTAMP_NS_HW (activated by a debug setting)

KYVP_BUFFER_INFO_CMD_TIMESTAMP_NS_CHRONO

### Release notes Vision Point II/API 2025.2 (Service pack 1)

#### New features

Added support for Ubuntu 24.04 with Kernel 6.8.

Added .NET wrapper via Legacy Vision Point API Adapter.

Added support for Packed data streaming.

Added Save image option via GUI.

Added enable/disable Grid Lines overlay via GUI.

#### Fixes and improvements

Fixed a bug causing corrupted stream images when using dual or quad link cameras with CLHS Frame Grabbers.

Bug fixes and improvements.

### Release notes Vision Point II/API 2025.2.0

#### New features

Implemented serial API interface.

KYFG_StreamCreateAndAlloc was implemented to the adapter.

Hardware debayering support.

Color correction matrix support.

Added controll of number of buffers per stream in Vision Point II app.

#### Fixes and improvements

Improve performance of communication with cameras.

Various bug fixes and improvements.

### Release notes Vision Point II/API 2025.1 (Service pack 3)

#### New features

Implemented IO auxiliary callback.

Implemented new API functions to locking/unlocking Frame Grabber links.

#### Fixes and improvements

Fixed a bug causing image corruption on the Komodo III Octo CoaXPress when changing the connection speed.

### Release notes Vision Point II/API 2025.1 (Service pack 2)

#### New features

Added triggers support:

Digital I/O

Encoder

Link trigger

Timer

Stream trigger

Camera trigger

Pulse message trigger

#### Fixes and improvements

Added Vision Point II API Sample KYVP_QueuedBuffer_Example.

Fixed DMA management bugs in third-generation Frame Grabbers.

Restored missing files in API samples.

### Release notes Vision Point II/API 2025.1 (Service pack 1)

#### New features

Added the Firmware update directly through the Vision Point II GUI.

### Release notes Vision Point II/API 2025.1

#### New features

Support for multiple streams feature implemented by certain CoaXPress cameras.

Support for TapGeometry (1X-2YE) implemented by certain CoaXPress cameras.

Added support for CLHS compatible frame grabbers:

Predator II CLHS compatible

Komodo II CLHS compatible

Komodo III CLHS compatible

Added support for Komodo III CoF Frame Grabber.

Support for Ubuntu 20.04 with Kernel 5.15.0 and Ubuntu 22.04 with Kernel 6.5.0.

#### Fixes and improvements

Fixed issue with CXP 2.0 packet tags handling.

Fixed issue with image processing that made last acquired frame dark when pixel depth more than 8 bits.

Improved stream stability on the multiple camera links.

### Release notes Vision Point II/API 2024.1 (Service pack 3)

Delivered the new version of Vision Point (see Vision Point release notes).

### Release notes Vision Point II/API 2024.1 (Service pack 2)

#### New features

Support for Firmware update.

KYParametersHandler_GetParameterAttributeValue() function was added to the KYVP ParametersHandler library.

KYFG_LoadFirmware(), KYFG_GetFirmareUpdateFileInfo(), KY_GetCameraPropertyParameterValue(), and KY_GetGrabberPropertyParameterValue() functions were added to the legacy Vision Point API Adapter.

New documents added.

#### Fixes and improvements

Fixed issue with multiple errors in logs while streaming.

Fixed problem with HEX view for 10, 12 bit Pixel format.

Fixed bug with application crash while opening a camera with non-numeric device serial numbers.

### Release notes Vision Point II/API 2024.1 (Service pack 1)

#### Fixes and improvements

Added support for "Komodo II CoF Frame Grabber" and "Predator II CoF Frame Grabber"

### Release notes Vision Point II/API 2024.1

#### Important API Notes and Limitations

Vision Point II does not support KAYA’s I generation Frame Grabbers:

Predator Dual Frame Grabber

Komodo Quad CoaXPress with Data Forwarding Frame Grabber

Komodo Camera Link High Speed Compatible Frame Grabber

Komodo Quad CoaXPress Frame Grabber

Komodo Octo CoaXPress Frame Grabber

Chameleon

Virtual frame grabbers (emulators)

This version does not support CLHS compatible Frame Grabbers of any generation1.

Does not support Chameleon camera simulators1.

New SDK supports only Windows 10 OS and Windows 11 OS2.

Remarks:

Will be supported in the next Vision Point II release.

Linux OS will be supported in the next Vision Point II release.

For Windows OS to support the latest version of Vision Point II, please make sure your Windows is up to date and all the latest updates and hotfixes are installed.
