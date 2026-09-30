---
id: "kyfgliba"
title: "KYFGLib adapter API"
sidebar_label: "KYFGLib adapter API"
sidebar_position: 1
---
Source: `src/Docs/DocsBuilder_Anchored_Test.docx`

DOCX-authored narrative with generated KYFGLibA API content inserted at its configured anchor.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## KYFGLib adapter API

Generated from `PUBLIC/include/KYFGLibA.h`.

Public adapter functions for accessing Vision Point II handles.

### Functions

<a id="_k_y_f_g_lib_a_8h_1ae83293e09427482276954c214f5f972e"></a>
#### `KYFG_Grabber_Get_KYVP_PCI_INTERFACE_HANDLE`

```cpp
FGSTATUS KYFG_Grabber_Get_KYVP_PCI_INTERFACE_HANDLE(FGHANDLE handle, KYVP_PCI_INTERFACE_HANDLE *_pKYVP_PCI_INTERFACE_HANDLE)
```

Returns underlying KYVP_PCI_INTERFACE_HANDLE for an open FGHANDLE.

<a id="_k_y_f_g_lib_a_8h_1a846405b7d6fb1f29f4f9f20802151fd9"></a>
#### `KYFG_Grabber_Get_KYVP_COLLECTION_HANDLE`

```cpp
FGSTATUS KYFG_Grabber_Get_KYVP_COLLECTION_HANDLE(FGHANDLE handle, KYVP_COLLECTION_HANDLE *_pKYVP_COLLECTION_HANDLE)
```

Returns underlying KYVP_COLLECTION_HANDLE for an open FGHANDLE.

<a id="_k_y_f_g_lib_a_8h_1a37476445d781e22fe4b2f78f76c30965"></a>
#### `KYFG_Camera_Get_KYVP_DEVICE_HANDLE`

```cpp
FGSTATUS KYFG_Camera_Get_KYVP_DEVICE_HANDLE(CAMHANDLE camHandle, KYVP_DEVICE_HANDLE *_pKYVP_DEVICE_HANDLE)
```

Returns underlying KYVP_DEVICE_HANDLE for an open CAMHANDLE.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
