---
id: "vision-point-ii-release-notes"
title: "Vision Point II Release Notes"
sidebar_label: "Vision Point II Release Notes"
sidebar_position: 2
mdx:
  format: md
slug: "/release-notes/vision-point-ii-release-notes"
---
[Download PDF](/downloads/sdk/Vision_Point_II_Release_Notes-2026.2.0.pdf)

<!-- Source: DocsBuilder/src/Vision_Point_II_Release_Notes.docx -->

Release notes for Vision Point II.

## Release notes

The purpose of this document is to describe the changes, enhancements, and bug fix report for the new version release of Vision Point II.

### Release notes Vision Point II/API 2026.1 (Service pack 2)

#### Fixes and improvements

1. Various bug fixes and improvements.

### Release notes Vision Point II/API 2026.1 (Service pack 1)

#### New features

1. Introduced a new GUI application, KAYA Vision Studio, which aims to replace Vision Point II in future.
2. Added the ability to save buffers as image files or RAW data (single file or batch mode).
3. Added ability to acquire a specified number of frames. (For precise control and accuracy, the use of triggers is recommended).
4. Implemented device event support via the extension library API, KYVPLibTL, and the GenTL producer.

#### Fixes and improvements

1. Fixed an issue that caused image corruption during the acquisition start/stop sequence on Komodo III CLHS compatible.
2. Fixed an issue where the GenTL producer in MATLAB could fail to detect devices in the Image Acquisition Toolbox (“no devices found” issue).
3. Fixed an issue in the Windows installation package (silent installation) where the /COMPONENTS="" command-line argument was ignored.
4. Fixed an issue where the installation process could fail during the driver build step on Ubuntu 24 with kernel 6.17.
5. Various bug fixes and improvements.

### Release notes Vision Point II/API 2026.1

#### New features

1. Added support for Zinc PCIe cameras.
2. Added a new API sample "KYVP\_ManualDetection\_Example" demonstrating the correct procedure for configuring manual detection through XML parameters.
3. Updated the "KYVP\_QueuedBuffers\_Example" API sample to demonstrate the usage of the direct stream callback.

#### Fixes and improvements

1. Fixed an issue that caused image corruption when packed-data mode was enabled on III generation frame grabbers used with cameras supporting Tap Geometry.
2. Fixed an issue that prevented streaming from starting on CLHS line scan cameras.
3. Various bug fixes and improvements.

### Release notes Vision Point II/API 2025.2 (Service pack 4)

#### New features

1. Added manual camera discovery using frame grabber XML parameters (commonly used with the KAYA GenTL provider).
2. Improved Power over CoaXPress (PoCXP) management.
3. Added support for frame grabber event handling.

#### Fixes and improvements

1. Fixed an issue with incorrect CXP packet tag assignment.
2. Fixed an issue with CLHS frame grabber sharing.
3. Fixed an issue with stream failure on CLHS cameras when using the KAYA GenTL producer.

### Release notes Vision Point II/API 2025.2 (Service pack 3)

#### New features

1. Added support for manual camera detection.
2. Added an option to retrieve the current software version through KYVPLibTL\_TLGetInfo.

#### Fixes and improvements

1. Fixed a crash that occurred when creating a stream via CL over Fiber range extender.
2. Buffer metadata is now initialized using the first (master) logical DMA channel for streams composed of multiple DMA channels.

### Release notes Vision Point II/API 2025.2 (Service pack 2)

#### Fixes and improvements

1. Fixed an issue where the timestamp in the KYVP\_IO\_AUX\_DATA structure was reported incorrectly (multiplied by 8).
2. Added support for retrieving precise buffer reception timestamps via new commands:
- KYVP\_BUFFER\_INFO\_CMD\_TIMESTAMP\_NS\_HW (activated by a debug setting)
- KYVP\_BUFFER\_INFO\_CMD\_TIMESTAMP\_NS\_CHRONO

### Release notes Vision Point II/API 2025.2 (Service pack 1)

#### New features

1. Added support for Ubuntu 24.04 with Kernel 6.8.
2. Added .NET wrapper via Legacy Vision Point API Adapter.
3. Added support for Packed data streaming.
4. Added Save image option via GUI.
5. Added enable/disable Grid Lines overlay via GUI.

#### Fixes and improvements

1. Fixed a bug causing corrupted stream images when using dual or quad link cameras with CLHS Frame Grabbers.
2. Bug fixes and improvements.

### Release notes Vision Point II/API 2025.2.0

#### New features

1. Implemented serial API interface.
2. KYFG\_StreamCreateAndAlloc was implemented to the adapter.
3. Hardware debayering support.
4. Color correction matrix support.
5. Added controll of number of buffers per stream in Vision Point II app.

#### Fixes and improvements

1. Improve performance of communication with cameras.
2. Various bug fixes and improvements.

### Release notes Vision Point II/API 2025.1 (Service pack 3)

#### New features

1. Implemented IO auxiliary callback.
2. Implemented new API functions to locking/unlocking Frame Grabber links.

#### Fixes and improvements

1. Fixed a bug causing image corruption on the Komodo III Octo CoaXPress when changing the connection speed.

### Release notes Vision Point II/API 2025.1 (Service pack 2)

#### New features

1. Added triggers support:
- Digital I/O
- Encoder
- Link trigger
- Timer
- Stream trigger
- Camera trigger
- Pulse message trigger

#### Fixes and improvements

1. Added Vision Point II API Sample KYVP\_QueuedBuffer\_Example.
2. Fixed DMA management bugs in third-generation Frame Grabbers.
3. Restored missing files in API samples.

### Release notes Vision Point II/API 2025.1 (Service pack 1)

#### New features

1. Added the Firmware update directly through the Vision Point II GUI.

### Release notes Vision Point II/API 2025.1

#### New features

1. Support for multiple streams feature implemented by certain CoaXPress cameras.
2. Support for TapGeometry (1X-2YE) implemented by certain CoaXPress cameras.
3. Added support for CLHS compatible frame grabbers:
- Predator II CLHS compatible
- Komodo II CLHS compatible
- Komodo III CLHS compatible
4. Added support for Komodo III CoF Frame Grabber.
5. Support for Ubuntu 20.04 with Kernel 5.15.0 and Ubuntu 22.04 with Kernel 6.5.0.

#### Fixes and improvements

1. Fixed issue with CXP 2.0 packet tags handling.
2. Fixed issue with image processing that made last acquired frame dark when pixel depth more than 8 bits.
3. Improved stream stability on the multiple camera links.

### Release notes Vision Point II/API 2024.1 (Service pack 3)

Delivered the new version of Vision Point (see Vision Point release notes).

### Release notes Vision Point II/API 2024.1 (Service pack 2)

#### New features

1. Support for Firmware update.
2. KYParametersHandler\_GetParameterAttributeValue() function was added to the KYVP ParametersHandler library.
3. KYFG\_LoadFirmware(), KYFG\_GetFirmareUpdateFileInfo(), KY\_GetCameraPropertyParameterValue(), and KY\_GetGrabberPropertyParameterValue() functions were added to the legacy Vision Point API Adapter.
4. New documents added.

#### Fixes and improvements

1. Fixed issue with multiple errors in logs while streaming.
2. Fixed problem with HEX view for 10, 12 bit Pixel format.
3. Fixed bug with application crash while opening a camera with non\-numeric device serial numbers.

### Release notes Vision Point II/API 2024.1 (Service pack 1)

#### Fixes and improvements

1. Added support for "Komodo II CoF Frame Grabber" and "Predator II CoF Frame Grabber"

### Release notes Vision Point II/API 2024.1

#### Important API Notes and Limitations

1. Vision Point II does not support KAYA’s I generation Frame Grabbers:
- Predator Dual Frame Grabber
- Komodo Quad CoaXPress with Data Forwarding Frame Grabber
- Komodo Camera Link High Speed Compatible Frame Grabber
- Komodo Quad CoaXPress Frame Grabber
- Komodo Octo CoaXPress Frame Grabber
- Chameleon
- Virtual frame grabbers (emulators)
2. This version does not support CLHS compatible Frame Grabbers of any generation<sup>1</sup>.
3. Does not support Chameleon camera simulators<sup>1</sup>.
4. New SDK supports only Windows 10 OS and Windows 11 OS<sup>2</sup>.

<strong>Remarks:</strong>

1. Will be supported in the next Vision Point II release.
2. Linux OS will be supported in the next Vision Point II release.
3. For Windows OS to support the latest version of Vision Point II, please make sure your Windows is up to date and all the latest updates and hotfixes are installed.
