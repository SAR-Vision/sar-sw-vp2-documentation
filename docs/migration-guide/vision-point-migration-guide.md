---
id: "vision-point-migration-guide"
title: "Vision Point Migration Guide"
sidebar_label: "Vision Point Migration Guide"
sidebar_position: 2
mdx:
  format: md
slug: "/migration-guide/vision-point-migration-guide"
---
[Download PDF](/downloads/sdk/Vision_Point_Migration_Guide-2026.2.0.pdf)

<!-- Source: DocsBuilder/src/Vision_Point_Migration_Guide.docx -->

Migration documentation for Vision Point users.

## Overview

The purpose of this document is to list and demonstrate the ways to migrate to the new Vision Point II API.

This API is to be used with KAYA Frame Grabbers hardware provided by KAYA Vision. This is a high\-level API for connecting, configuring and capturing data streaming over 1, 2, 4 or 8 channels. KAYA Frame Grabbers are capable of connecting to various cameras at various speeds and topologies.

<a id="word-_Toc206668998"></a>

### Document Structure

This migration guide is divided into few major topics each related to different functionalities:

- Legacy Vision Point API Adapter.
- Transition to the new API.

## Legacy Vision Point API Adapter

Use the new possibilities with Vision Point II, knowing that existing code is supported. To ensure a smooth transition, a legacy Vision Point API Adapter was developed. The Adapter allows to use the Vision Point II libraries with existing code developed using the legacy Vision Point API.

<a id="word-_Toc206669000"></a>

### Old code usage

To enable the customer to use the Vision Point API Adapter, it is necessary to link to the Adapter library.

1. Install Vision Point II from the [<strong>official source</strong>](https://kaya.vision/software-and-sdk/)<strong>.</strong>
2. Open an existing project in Visual Studio (or another preferred application).
3. Add KAYA\_VISION\_POINT\_2\_LIB\_PATH to the /LIBPATH.
4. Link to the special Adapter library.

| Vision Point API library | Vision Point II API Adapter library |
| --- | --- |
| KYFGLib.lib | KYFGLibA\_vc141.lib |

*Table 2 – Adapter library*

<a id="word-_Toc206669001"></a>

### Implemented functions

The most of Vision Point function were implemented to the Adapter library. The full list is below:

<table>
<tbody>
<tr>
<th>

Function name

</th>
<th>

implemented

</th>
</tr>
<tr>
<td colspan="2">

Basic flow functions

</td>
</tr>
<tr>
<td>

KY\_GetSoftwareVersion

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFGLib\_Initialize

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_DeviceScan

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_DeviceInfo

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_OpenEx

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_Open

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_UpdateCameraList

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraScanEx

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraInfo2

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraOpen2

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraStart

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraStop

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraClose

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_Close

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td colspan="2">

Stream Interface

</td>
</tr>
<tr>
<td>

KYFG\_StreamGetInfo

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_StreamGetSize

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_StreamGetFrameIndex

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_StreamGetPtr

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_StreamCreate

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_StreamCreateAndAlloc

</td>
<td>

Since 2025.1.4

</td>
</tr>
<tr>
<td>

KYFG\_StreamBufferCallbackRegister

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_StreamBufferCallbackUnregister

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_StreamDelete

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td colspan="2">

Buffer Interface

</td>
</tr>
<tr>
<td>

KYFG\_BufferGetInfo

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_BufferRevoke

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_BufferAllocAndAnnounce

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_BufferAnnounce

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_BufferToQueue

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_BufferQueueAll

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td colspan="2">

Grabber Parameters

</td>
</tr>
<tr>
<td>

KYFG\_SetGrabberValue

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetGrabberValueInt

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetGrabberValueFloat

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetGrabberValueBool

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetGrabberValueEnum

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetGrabberValueString

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GrabberExecuteCommand

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetGrabberValueEnum\_ByValueName

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GrabberWriteReg

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_DeviceDirectHardwareWrite

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_RegisterGrabberConfigurationParameterCallback

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_UnregisterGrabberConfigurationParameterCallback

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValue

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueInt

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueEnum

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueFloat

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueBool

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueStringCopy

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueIntMaxMin

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueFloatMaxMin

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueType

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_IsGrabberValueImplemented

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetGrabberValueRegister

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GrabberReadReg

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_DeviceDirectHardwareRead

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_GetGrabberConfigurationParameterDefinitions

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_GetGrabberPropertyParameterValue

</td>
<td>

Since 2024.1.2

</td>
</tr>
<tr>
<td>

KYFG\_ReadPortReg

</td>
<td>

Since 2025.1.2

</td>
</tr>
<tr>
<td>

KYFG\_ReadPortBlock

</td>
<td>

Since 2025.1.2

</td>
</tr>
<tr>
<td>

KYFG\_WritePortReg

</td>
<td>

Since 2025.1.2

</td>
</tr>
<tr>
<td>

KYFG\_WritePortBlock

</td>
<td>

Since 2025.1.2

</td>
</tr>
<tr>
<td>

KYFG\_GetPortStatus

</td>
<td>

Since 2025.1.2

</td>
</tr>
<tr>
<td>

KYFG\_StreamLinkFramesContinuously

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_AuxDataCallbackRegister

</td>
<td>

Since 2025.1.3

</td>
</tr>
<tr>
<td>

KYFG\_AuxDataCallbackUnregister

</td>
<td>

Since 2025.1.3

</td>
</tr>
<tr>
<td>

KYFG\_StreamGetAux

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_BufferAnnounceChunks

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_BufferSubmit

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_LoadPatternData

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_LoadFileData

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_CameraSendEventMessage

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_DevicePortSendEventMessage

</td>
<td>

No

</td>
</tr>
<tr>
<td colspan="2">

Camera Parameters

</td>
</tr>
<tr>
<td>

KYFG\_SetCameraValueInt

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetCameraValueFloat

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetCameraValueBool

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetCameraValueEnum

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetCameraValueString

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraExecuteCommand

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetCameraValue

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_SetCameraValueEnum\_ByValueName

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraWriteReg

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_RegisterCameraConfigurationParameterCallback

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_UnregisterCameraConfigurationParameterCallback

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraGetXML

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueInt

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueEnum

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueFloat

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueBool

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValue

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_IsCameraValueImplemented

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueType

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueStringCopy

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueIntMaxMin

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueFloatMaxMin

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_CameraReadReg

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_GetCameraConfigurationParameterDefinitions

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KYFG\_GetCameraValueRegister

</td>
<td>

Since 2024.1.0

</td>
</tr>
<tr>
<td>

KY\_GetCameraPropertyParameterValue

</td>
<td>

Since 2024.1.2

</td>
</tr>
<tr>
<td>

KYFG\_CameraCallbackRegister (please use KYFG\_StreamBufferCallbackRegister)

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYFG\_CameraCallbackUnregister (please use KYFG\_StreamBufferCallbackUnregister)

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYDeviceEventCallBackRegister

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYDeviceEventCallBackUnregister

</td>
<td>

No

</td>
</tr>
<tr>
<td colspan="2">

Camera Simulator Parameters

</td>
</tr>
<tr>
<td>

KYCS\_InjectImageHeader

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYCS\_InjectVideoCRCErrors

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYCS\_InjectControlCRCErrors

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYCS\_ReadBootstrapRegs

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYCS\_WriteBootstrapRegs

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYCS\_GetImageHeader

</td>
<td>

No

</td>
</tr>
<tr>
<td>

KYCS\_GenerateCxpEvent

</td>
<td>

No

</td>
</tr>
<tr>
<td colspan="2">

Firmware update

</td>
</tr>
<tr>
<td>

KYFG\_LoadFirmware

</td>
<td>

Since 2024.1.2

</td>
</tr>
<tr>
<td>

KYFG\_GetFirmareUpdateFileInfo

</td>
<td>

Since 2024.1.2

</td>
</tr>
</tbody>
</table>

<a id="word-_Toc196914899"></a>

*Table 3 – Implemented functions*

In case of using not implemented function the user will receive a callback message “Function is not implemented”.

More functions might be added to the Adapter in next Vision Point II releases.

<a id="word-_Toc206669002"></a>

### Transition to the new API

When working with the Adapter as described above, it translates legacy API calls to the corresponding new API. It does so by creating new handles internally. To allow a gradual transition from legacy code to the new API, the Adapter implements additional public functions, listed below and declarated in KYFGLibA.h.

:::note[Important]

After including KYFGLibA.h, make sure to add the include directory KAYA\_VISION\_POINT\_INCLUDE\_PATH to your project's include paths.

:::

These functions allow the code to retrieve the new API handles used by the Adapter to implement legacy functionality. For instance, if you have a FGHANDLE returned by the legacy API, you can retrieve the new KYVP\_PCI\_INTERFACE\_HANDLE associated with it.

- <strong>KYFG\_Grabber\_Get\_KYVP\_PCI\_INTERFACE\_HANDLE</strong><strong>()</strong>

Returns underlying KYVP\_PCI\_INTERFACE\_HANDLE for an open FGHANDLE;

<strong>Return value:</strong>

FGSTATUS \- Status and error report.

- <strong>KYFG\_Grabber\_Get\_KYVP\_COLLECTION\_HANDLE</strong><strong>()</strong>

Returns underlying KYVP\_COLLECTION\_HANDLE for an open FGHANDLE

<strong>Return value:</strong>

FGSTATUS \- Status and error report.

- <strong>KYFG\_Camera\_Get\_KYVP\_DEVICE\_HANDLE</strong><strong>()</strong>

Returns underlying KYVP\_DEVICE\_HANDLE for an open FGHANDLE

<strong>Return value:</strong>

FGSTATUS \- Status and error report.
