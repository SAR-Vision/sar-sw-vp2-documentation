---
id: "kaya-serial-port-api-data-book"
title: "KAYA Serial Port API Data Book"
sidebar_label: "KAYA Serial Port API Data Book"
sidebar_position: 2
mdx:
  format: md
slug: "/kaya-serial-port-api-data-book/kaya-serial-port-api-data-book"
---
[Download PDF](/downloads/sdk/KAYA_serial_port_API_Data_Book-2026.2.0.pdf)

<!-- Source: DocsBuilder/src/KAYA serial port API Data Book.docx -->

API reference documentation for KAYA serial ports.

## Introduction

### Important API Notes and Limitations

:::note[Important notes]

KAYA’s API should <strong>NOT</strong> be used from the DllMain function on Windows OS. There are significant limits on what you can safely do at a DLL entry point. See [<strong>General Best Practices</strong>](https://docs.microsoft.com/en-us/windows/win32/dlls/dynamic-link-library-best-practices) for specific Windows APIs that are unsafe to call in DllMain. If you need anything but the simplest initialization, then do that in an initialization function for the DLL. You can require applications to call the initialization function after DllMain has run and before they call any other functions in the DLL.

:::

## clserkyi API Functions

The purpose of this document is to list and demonstrate the provided functionality of clserkyi API, a high\-level API for serial port communication to remote devices using KAYA’s standard API and suitable hardware.

### clGetNumSerialPortsEx()

Returns the number of serial ports provided by a connected remote device.

```cpp
int32_t clGetNumSerialPortsEx(
    CAMHANDLE camHandle, 
    uint32_t* numSerialPorts);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| camHandle | CAMHANDLE | Handle for connected remote device |
| numSerialPorts | uint32\_t\* | The number of serial ports in this machine supported by a selected remote device |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_PTR

### clSerialInitEx()

Initializes the device referred to by serialIndex and returns a pointer to an internal serial reference structure.

```cpp
int32_t clSerialInitEx(
    CAMHANDLE camHandle, 
    uint32_t serialIndex, 
    hSerRef* serialRefPtr);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| camHandle | CAMHANDLE | Handle for connected remote device |
| serialIndex | uint32\_t\* | A zero-based index value. For n serial ports of the connected remote device, serialIndex has a range of 0 to (n - 1) |
| serialRefPtr | hSerRef\* | A successful call points to a value that contains a pointer to the vendor-specific reference to the current session. |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_PORT\_IN\_USE

CL\_ERR\_INVALID\_INDEX

CL\_ERR\_INVALID\_PTR

### clFlushPort()

Discards any bytes that are available in the input buffer.

```cpp
int32_t clFlushPort(
    hSerRef serialRef);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_REFERENCE

### clGetNumBytesAvail()

Outputs the number of bytes received at the port specified by serialRef but are not yet read out.

```cpp
int32_t clGetNumBytesAvail(
    hSerRef serialRef, 
    uint32_t* numBytes);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |
| numBytes | uint32\_t\* | The number of bytes currently available to be read from the port |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_REFERENCE

CL\_ERR\_INVALID\_PTR

### Example code:

Example of reading data from the serial port, if data is available.

```cpp
hSerRef serialRef = 0;
int32_t error = 0;
error = clSerialInit(0, &serialRef);
if(CL_ERR_NO_ERR != error)
{
	printf("clSerialInit has failed with error=%d\n", error);
	return;
}

char buff[256];
uint32_t buffSize = sizeof(buff);
uint32_t numBytes = 0;

for(;;)
{
	error = clGetNumBytesAvail(serialRef, &numBytes);
	if(CL_ERR_NO_ERR == error &&
		numBytes > 0)
	{
		buffSize = min(sizeof(buff), numBytes);
		error = clSerialRead(serialRef, buff, &buffSize, 0);
	}
}
```

### clSerialClose()

Closes the serial device and cleans up the resources associated with serialRef. Upon return, serialRef is no longer usable.

```cpp
void clSerialClose(
    hSerRef serialRef); 
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_REFERENCE

### clSerialRead()

Reads numBytes from the serial device referred to by serialRef. Holds for when numBytes bytes are available at the serial port or specified timeout period has passed. Upon success, numBytes are copied into a buffer. In the case of any error, including CL\_ERR\_TIMEOUT, no data is copied into the buffer.

```cpp
int32_t clSerialRead(
    hSerRef serialRef, 
    char* buffer, 
    uint32_t* numBytes, 
    uint32_t serialTimeout); 
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |
| numBytes | uint32\_t\* | The number of bytes requested by the caller |
| serialTimeout | uint32\_t | Indicates the timeout, in milliseconds, for reading specified buffer size |
| buffer | char\* | Points to a user-allocated buffer. Upon a successful call, the buffer contains the data read from the serial device. Upon failure, this buffer is not affected. The caller should ensure that buffer is at least numBytes in size |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_TIMEOUT

CL\_ERR\_INVALID\_REFERENCE

<strong>Remarks:</strong>

1. Users may try reading more data than what is available on the serial port. If not enough data has been received until the timeout has expired, then CL\_ERR\_TIMEOUT error is returned, and no data is copied into the buffer.

### Example code:

Example of reading data from the serial port.

```cpp
hSerRef serialRef = 0;
int32_t error = 0;
error = clSerialInit(0, &serialRef);
if(CL_ERR_NO_ERR != error)
{
	printf("clSerialInit has failed with error=%d\n", error);
	return;
}

char buff[256];
uint32_t buffSize = sizeof(buff);
error = clSerialRead(serialRef, buff, &buffSize, 300);
switch(error)
{
case CL_ERR_NO_ERR:
    // success
	break;
case CL_ERR_TIMEOUT:
	printf("clSerialRead timed out, smaller buffer should be read\n");
	break;
default:
	printf("clSerialRead general error=%d\n", error);
	break;
}
```

### clSerialWrite()

Writes the data in the buffer to the serial device referenced by serialRef.

```cpp
int32_t clSerialWrite(
    hSerRef serialRef, 
    char* buffer, 
    uint32_t* bufferSize, 
    uint32_t serialTimeout);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |
| buffer | char\* | Contains data to write to the serial port |
| bufferSize | uint32\_t\* | Contains the buffer size indicating the maximum number of bytes to be written. Upon a successful call, bufferSize contains the number of bytes written to the serial device |
| serialTimeout | uint32\_t | Indicates the timeout, in milliseconds, for sending specified buffer size |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_TIMEOUT

CL\_ERR\_INVALID\_REFERENCE

### Example code:

Example of writing data to the serial port.

```cpp
hSerRef serialRef = 0;
int32_t error = 0;
error = clSerialInit(0, &serialRef);
if(CL_ERR_NO_ERR != error)
{
	printf("clSerialInit has failed with error=%d\n", error);
	return;
}

char buff[] = {0x00, 0x01, 0x02, 0x03, 0x04};
uint32_t buffSize = sizeof(buff);
error = clSerialWrite(serialRef, buff, &buffSize, 300);
if(CL_ERR_NO_ERR != error)
{
	printf("clSerialWrite has failed with error=%d\n", error);
}
```

### clCallbackRegister()

Registers a callback function for serial ports events specified in KYSP\_EVENT\_ID.

```cpp
int32_t clCallbackRegister(
    hSerRef serialRef, 
    clSerialPortCallback callbackFunc, 
    void* userContext);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |
| callbackFunc | clSerialPortCallback | Callback function for serial port events |
| userContext | void\* | User specific context that will be returned upon callback execution |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_REFERENCE

### Example code:

Example of registering a callback for received data. The callback is invoked whenever there is data available in the serial receive buffer.

```cpp
void KYCLSER_CALLCONV serialCallbackFunc(void* userContext, KYSP_EVENT* pEvent)
{
	int32_t error = 0;
	switch(pEvent->eventId)
	{
	case KYSP_EVENT_ID_RX_DATA_AVAIL:
	{
		KYSP_EVENT_RX_DATA_AVAIL* eventData = (KYSP_EVENT_RX_DATA_AVAIL*)pEvent;
		hSerRef serialRef = eventData->serialRef;

		uint32_t numBytes = 0;
		clGetNumBytesAvail(serialRef, &numBytes);
		const uint32_t BUFF_SIZE = 256;
		char buffer[BUFF_SIZE] = {0};
		while(numBytes > 0)
		{
			uint32_t bufferSize = min(numBytes, BUFF_SIZE);
			error = clSerialRead(serialRef, buffer, &bufferSize, 300);
			switch(error)
			{
			case CL_ERR_NO_ERR:
				// success
				break;
			case CL_ERR_TIMEOUT:
				printf("clSerialRead timed out, smaller buffer should be read");
				break;
			default:
				printf("clSerialRead general error=%d. Exiting callback", error);
				return;
				break;
			}
                    // print received data
			for(int i = 0; i < bufferSize; i++)
			{
				putchar(buffer[i]);
			}
			numBytes -= bufferSize;
		}

		break;
	}
	default:
		break;
	}
}

int main(int argc, char* argv[])
{
    hSerRef serialRef = 0;
    int32_t error = 0;
	CAMHANDLE camHandle = 0;
	... // connect to grabber and camera

	clSerialInitEx(camHandle, 0, &serialRef);
	clCallbackRegister(serialRef, serialCallbackFunc, nullptr);

    ...
    for(;;){}
}
```

### clCallbackUnregister()

Unregisters a callback function.

```cpp
int32_t clCallbackUnregister(
    hSerRef serialRef, 
    clSerialPortCallback callbackFunc);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |
| callbackFunc | clSerialPortCallback | Callback function for serial port events |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_REFERENCE

### clSerialComPortInitEx()

Creates a Virtual COM Port with a specified port number and display name.

```cpp
int32_t clSerialComPortInitEx(
    CAMHANDLE camHandle, 
    uint32_t serialIndex,
    uint32_t* portNumber, 
    const char* displayName,
    hSerRef* serialRefPtr);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| camHandle | CAMHANDLE | Handle for connected remote device |
| serialIndex | uint32\_t | A zero-based index value. For n serial ports of the connected remote device, serialIndex ranges from 0 to (n-1). |
| portNumber | uint32\_t\* | COM port number to open. If portNumber is 0, then the next available port number will be assigned. Returns actual port number assigned to COM port |
| displayName | const char\* | COM port display name. In case of NULL, a generic name would be assigned |
| serialRefPtr | hSerRef\* | A successful call points to a value that contains a pointer to the vendor-specific reference to the current session. |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_REFERENCE

CL\_ERR\_INVALID\_PTR

CL\_ERR\_INVALID\_INDEX

### Remarks:

1. If portNumber value is 0, then the next available port would be assigned.
2. If portNumber value is non 0, then the COM port with the specified number would try to be created. It is up to the user to make sure the specified COM port is not occupied.

### clSerialComPortClose()

Close created COM port.

```cpp
int32_t clSerialComPortClose(
    hSerRef serialRef);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_INVALID\_REFERENCE

### clGetNumSerialPorts()

Returns the number of serial ports in your system.

```cpp
int32_t clGetNumSerialPorts(
    uint32_t* numSerialPorts);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| numSerialPorts | uint32\_t\* | The number of serial ports in this machine supported by this DLL |

### Return value:

CL\_ERR\_NO\_ERR

### clSerialInit()

Initializes the device referred to by serialIndex and returns a pointer to an internal serial reference structure.

```cpp
int32_t clSerialInit(
    uint32_t serialIndex, 
    hSerRef* serialRefPtr);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialIndex | uint32\_t | A zero-based index value. For n serial devices in the system supported by this library, serialIndex has a range of 0 to (n - 1) |
| serialRefPtr | hSerRef\* | On a successful call, points to a value that contains a pointer to the vendor-specific reference to the current session |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_PORT\_IN\_USE

CL\_ERR\_INVALID\_INDEX

CL\_ERR\_INVALID\_PTR

### clGetErrorText()

Converts an error code to error text for display in a dialog box or a standard I/O window.

```cpp
int32_t clGetErrorText(
    int32_t errorCode, 
    char* errorText, 
    uint32_t* errorTextSize);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| errorCode | int32\_t | The error code is used to find the appropriate error text. Every function in this library returns an error code |
| errorText | char\* | User allocated buffer which contains the NULL-terminated error text on function return |
| errorTextSize | uint32\_t\* | On success, contains the number of bytes written into the buffer, including the NULL-termination character. This value should be the size in bytes of the error text buffer passed in. On CL\_ERR\_BUFFER\_TOO\_SMALL, contains the size of the buffer needed to write the error text |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_BUFFER\_TOO\_SMALL

CL\_ERR\_ERROR\_NOT\_FOUND

CL\_ERR\_INVALID\_PTR

### Example code:

Example of printing error text if clSerialInit function has failed.

```cpp
hSerRef serialRef = 0;
int32_t error = 0;
error = clSerialInit(0, &serialRef);
if(CL_ERR_NO_ERR != error)
{
	uint32_t errorTextSize = 0;
	clGetErrorText(error, NULL, &errorTextSize);
	char* errorText = (char*)malloc(errorTextSize);
	clGetErrorText(error, errorText, &errorTextSize);
	printf("clSerialInit error: '%s'", errorText);
	free(errorText);
}
```

### clGetManufacturerInfo()

Returns the name of the frame grabber manufacturer who created the DLL and the version of the Camera Link specifications with which the DLL complies.

```cpp
int32_t clGetManufacturerInfo(
    char* manufacturerName, 
    uint32_t* bufferSize, 
    uint32_t* version);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| manufacturerName | char\* | A pointer to a user-allocated buffer into which the function copies the manufacturer name. The returned name is NULL-terminated. |
| bufferSize | uint32\_t\* | As an input, this value should be the size of the buffer that is passed. On a successful return, this parameter contains the number of bytes written into the buffer, including the NULL termination character.<br /><br />On CL\_ERR\_BUFFER\_TOO\_SMALL, this parameter contains the size of the buffer needed to write the data text. |
| version | uint32\_t\* | A constant stating the version of the Camera Link specifications with which this DLL complies. |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_FUNCTION\_NOT\_FOUND

CL\_ERR\_BUFFER\_TOO\_SMALL

CL\_ERR\_INVALID\_PTR

### clSerialPortCallback

Callback function prototype for serial events.

```cpp
typedef void(KYCLSER_CALLCONV *clSerialPortCallback)(void* userContext, 
                                                                                                          KYSP_EVENT* pEvent);
```

### clGetSupportedBaudRates

Returns the valid baud rates of the current interface.

```cpp
int32_t clGetSupportedBaudRates(
    hSerRef serialRef, 
    uint32_t* baudRates);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |
| baudRates | uint32\_t\* | Bitfield that describes all supported baud rates of the serial port represented by the CL\_BAUDRATE constants |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_FUNCTION\_NOT\_FOUND

CL\_ERR\_INVALID\_REFERENCE

### clGetSerialPortIdentifier

Returns a manufacturer-specific identifier for each serial port in your system.

```cpp
int32_t clGetSerialPortIdentifier(
    uint32_t serialIndex, 
    char* portID, 
    uint32_t* bufferSize);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialIndex | uint32\_t | A zero-based index value. The valid range for serialIndex is 0 to (n–1), where n is the value of numSerialPorts, as returned by clGetNumSerialPorts |
| portID | char\* | Manufacturer-specific identifier for the serial port |
| bufferSize | uint32\_t\* | As an input, this value should be the size of the buffer that is passed. On a successful return, this parameter contains the number of bytes written into the buffer, including the NULL termination character.<br /><br />On CL\_ERR\_BUFFER\_TOO\_SMALL, this parameter contains the size of the buffer needed to write the data text |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_BUFFER\_TOO\_SMALL

CL\_ERR\_INVALID\_INDEX

CL\_ERR\_INVALID\_PTR

CL\_ERR\_FUNCTION\_NOT\_FOUND

### clSetBaudRate

Sets the baud rate for the serial port of the selected device. Use clGetSupportedBaudRate to determine supported baud rates.

```cpp
int32_t clSetBaudRate(
    hSerRef serialRef, 
    uint32_t baudRate);
```

| Parameter name | Type | Description |
| --- | --- | --- |
| serialRef | hSerRef | Handle to serial port |
| baudRate | uint32\_t | The baud rate you want to use. This parameter expects the values represented by the CL\_BAUDRATE constants |

### Return value:

CL\_ERR\_NO\_ERR

CL\_ERR\_BAUD\_RATE\_NOT\_SUPPORTED

CL\_ERR\_INVALID\_REFERENCE

CL\_ERR\_FUNCTION\_NOT\_FOUND

## Enumerations

### KYSP\_EVENT\_ID

Defines the event type received in callback function.

| Parameter name | Type | Description |
| --- | --- | --- |
| KYSP\_EVENT\_ID\_RX\_DATA\_AVAIL | 0x1010 | Callback event when data is available on serial port |

### Error Type Map

Execution of system error and status. Defines the status returned after each function execution. While some error statuses are general, some point to a specific error.

| Parameter name | Type | Description |
| --- | --- | --- |
| CL\_ERR\_NO\_ERR | 0 | Function returned successfully |
| CL\_ERR\_BUFFER\_TOO\_SMALL | \-10001 | User buffer not large enough to hold data |
| CL\_ERR\_MANU\_DOES\_NOT\_EXIST | \-10002 | The requested manufacturer’s DLL does not exist on your system |
| CL\_ERR\_PORT\_IN\_USE | \-10003 | Port is valid but cannot be opened because it is in use |
| CL\_ERR\_TIMEOUT | \-10004 | Operation not completed within the specified timeout period |
| CL\_ERR\_INVALID\_INDEX | \-10005 | Not a valid index |
| CL\_ERR\_INVALID\_REFERENCE | \-10006 | The serial reference is not valid |
| CL\_ERR\_ERROR\_NOT\_FOUND | \-10007 | Could not find the error description for this error code |
| CL\_ERR\_BAUD\_RATE\_NOT\_SUPPORTED | \-10008 | Requested baud rate not supported by this interface |
| CL\_ERR\_OUT\_OF\_MEMORY | \-10009 | The system is out of memory and could not perform the required actions |
| CL\_ERR\_REGISTRY\_KEY\_NOT\_FOUND | \-10010 | DLL location registry key was not found |
| CL\_ERR\_INVALID\_PTR | \-10011 | Some parameters' reference is invalid |
| CL\_ERR\_UNABLE\_TO\_LOAD\_DLL | \-10098 | The DLL was unable to load due to a lack of memory or because it does not export all required functions |
| CL\_ERR\_FUNCTION\_NOT\_FOUND | \-10099 | The function does not exist in the manufacturer’s library |
| CL\_ERR\_INVALID\_OPERATION | \-11000 | Operation is invalid for specified serial reference |

## Structures

### KYSP\_EVENT

General serial port event structure.

| Structure Field | Type | Description |
| --- | --- | --- |
| eventId | KYSP\_EVENT\_ID | Id of the received event. It defines how to interpret the event structure received in a callback function. |

### KYSP\_EVENT\_RX\_DATA\_AVAIL

Event structure for specific event id KYSP\_EVENT\_ID\_RX\_DATA\_AVAIL enumerated by KYSP\_EVENT\_ID

| Structure Field | Type | Description |
| --- | --- | --- |
| serialPortEvent | KYSP\_EVENT | General event data |
| serialRef | hSerRef | Handle to serial port |
