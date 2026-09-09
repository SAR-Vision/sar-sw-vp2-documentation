---
id: "vision-point-ii-software-installation-guide"
title: "Vision Point II Software Installation Guide"
sidebar_label: "Vision Point II Software Installation Guide"
sidebar_position: 2
---
Source: `src/Docs/Vision_Point_II_Software_Installation_Guide.docx`

Software installation guidance sourced from the existing Word document.

Vision Point II Software

Installation Guide

May 2026

Rev 2026.1.2

## Revision History

Table 1 – Revision History

Table of Contents

## Figures and Tables

### List of Figures

Figure 1 – Vision Point II Welcome screen	7

Figure 2 – Vision Point II installation location	7

Figure 3 – Installation components checkbox	8

Figure 4 – Start Menu shortcut folder	8

Figure 5 – Completing the device driver installation wizard for Windows OS	9

Figure 6 – Completing the installation	9

Figure 7 – DKMS user input	13

Figure 8 – Secure boot configuration message	13

Figure 9 – Secure boot configuration password	14

Figure 10 – Images ‘a’ to ‘e’: Enrolling MOK instructions	15

### List of Tables

Table 1 – Revision History	1

## Introduction

### Safety precautions

Please take the time to read through the precautions listed below to prevent preventable and unnecessary injuries and damage to you, other personnel, or property. Read these safety instructions carefully before your first use of the product, as these precautions contain safety instructions that must be observed. Be sure to follow this manual to prevent misuse of the product.

### Disclaimer

KAYA Vision assumes no responsibility for any damage that may ensue by using this product for any purpose other than intended, as previously stated. Without detracting from what was previously written, the company takes no responsibility for any damages caused by:

Earthquake, thunder strike, natural disasters, a fire caused by use beyond our control, willful and/or accidental misuse and/or use under other abnormal and/or unreasonable conditions.

Secondary damages caused by the use of this product or its unusable state (business interruption or others).

Use of this product in any manner that contradicts this manual or malfunctions due to connection to other devices. Damage to this product that is out of our control or failure due to modification

Accidents and/or third parties that may be involved.

Additionally, KAYA Vision assumes no responsibility or liability for:

Erasure or corruption of data caused by the use of this product.

Any consequences or other abnormalities following the use of this product

### Important Notes

Vision Point II application requires administrator privileges. Please make sure this requirement is met prior to installation execution.

## Installation Procedure for Windows

### System Requirements

Before installing, please, make sure your system meets the following requirements:

Intel or AMD 64-bit (x86-64) compatible CPU

At least 4 GB of system memory

Windows 10 64-bit, Windows 11-64 bit operating systems

1 GB available disk space

At least one of KAYA PCIe devices installed

IMPORTANT NOTES:

For Windows OS to support the latest version of Vision Point II, please make sure your Windows is up to date, and all the latest updates and hotfixes are installed.

Vision Point II currently comes as a bundled software package with the Vision Point legacy version, ensuring compatibility with all KAYA frame grabber models.

Vision Point II supports only second and third generation KAYA frame grabbers.

Vision Point II requires the latest firmware update for the KAYA frame grabber.

KAYA drivers are digitally signed according to the latest Microsoft driver signing policy and procedure. The digital signatures certificate can be found in KAYAKERN.sys driver properties. For a successful driver signature verification, please ensure your Windows is up to date and all the latest updates and hotfixes are installed.

### Installation Procedure

Start the installation executable with administrator privileges.

On the Welcome screen, click “Next”.

Figure 1 – Vision Point II Welcome screen

Define the target folder for the installation. It is recommended to keep the default folder. After selecting the installation folder, click the “Next” button.

Figure 2 – Vision Point II installation location

At “Select Components” step check “Virtual COM port for serial communication” if it is required for CLHS frame grabber communication with the camera.

Figure 3 – Installation components checkbox

It is recommended to keep the default location. Click the “Next” button to proceed.

Figure 4 – Start Menu shortcut folder

Review the settings before actual software installation. After clicking “Install”, the installation procedure will start. It will take a few minutes for the installation to complete.

During the installation procedure, a few popup windows may appear. Please follow the instructions listed in the next installation steps.

Please back up your work and example modifications if the Vision Point II application was previously installed on your computer.

When the Device Driver Installation Wizard appears, click “Next” to proceed with the driver installation.

Click “Finish” to finalize the device driver installation wizard.

Figure 5 – Completing the device driver installation wizard for Windows OS

Reboot the PC to complete the installation.

Figure 6 – Completing the installation

Installation log:

The Vision Point II application installation log files folder can be found under user’s main driver: C:\Program Files\KAYA Instruments\Log\Installer folder.

## Installation Procedure for Linux

### System Requirements

Before installing, please make sure your system meets the following requirements:

#### Ubuntu 20.04 with Kernel 5.15.0, Ubuntu 22.04 with Kernel 6.5.0 and Ubuntu 24.04 with Kernel 6.8.0

Intel or AMD 64-bit (x86-64) compatible CPU

At least 4 GB of RAM

Ubuntu 20.04 / 22.04 64-bit operating System

1 GB available disk space

At least one of KAYA PCI devices installed

IMPORTANT NOTES:

In case of using secure boot please read section ‎4.4 before continuing to installation procedure.

### Installation Procedure

Extract the provided .tar.gz file using the following terminal command:

tar -zxvf VisionPointII_2025.1.0_Ubuntu_20.04_x64.tar.gz

NOTE: Installation archive name may vary:  may contain a suffix specifying OS name, version, architecture, etc.

Enter the extracted archive’s folder and run the installation script with the following command:

sudo ./install.sh

This will install Vision Point legacy and Vision Point II software with all required components and drivers.

NOTE: The installation package includes hardware drivers for several different Linux Kernel versions and will try to select one that corresponds to your currently running Kernel. If a version for your current Kernel is not yet included in the package, a message will appear: “No suitable pre-built driver was found for your current Kernel …” Please refer to the section ‎4.5 “Building hardware driver”.

The following installation flags are available:

NOTE: Type “—help” at the beginning of the installation to view the list of available flags.

Reboot the system.

A link to the applications can be found using search or run directly from the installation directory:

Vision Point II – “/opt/KAYA_Instruments/VisionPointII/bin/VisionPointii.sh”

Vision Point legacy – “/opt/KAYA_Instruments/bin/VisionPoint.sh”

API usage samples are located here:

Vision Point II – “/opt/KAYA_Instruments/VisionPointII/Examples”

Vision Point legacy – “/opt/KAYA_Instruments/Examples”

### Uninstallation Procedure

Enter the uninstallation folder from the terminal using:

cd /opt/KAYA_Instruments/lib

Run the installation script with the following command:

sudo uninstall.sh

The following installation flags are available:

### Signing hardware driver using DKMS

In Linux operating systems a secure boot process allows only approved drivers to run and requires hardware driver signature. To support this feature, the driver installation method has been changed, allowing the user to choose to add KAYA driver to DKMS. The following steps explain the process of DKMS driver signing.

User may check whether a secure boot is activated and enabled for the OS using the following utility command:

mokutil --sb-state

NOTE: In case the secure boot was not initially installed, this utility will not be present.

Initiate the installation procedure, described in section ‎4.2.

During the installation procedure user input is required for choosing between default driver installation and signed driver installation using DKMS.

Figure 7 – DKMS user input

If secure boot is enabled, DKMS will try to sign the driver and the following message will pop up, in case systems MOK (Machine Owner Key) is NOT enrolled.

Figure 8 – Secure boot configuration message

Read the message and press “Ok”.

Create the password. This is a one-time password, meaning it will be required later.

Figure 9 – Secure boot configuration password

After the installation is completed, reboot the system.

After computer reboot, the following dialog might be displayed on the screen. Choose “Enroll MOK” and follow the instructions shown below:

Figure 10 – Images ‘a’ to ‘e’: Enrolling MOK instructions

Check the status of the driver using the following command:

systemctl status kaya_driver.service

### Building hardware driver

This section explains how to build KAYA hardware driver manually in case of a Kernel update.

NOTE: This step is not a part of the installation process and should be disregarded in case the driver was added to DKMS.

Enter subfolder “PCI_drv_Linux” folder in the installation directory and run:

sh make_all.sh

NOTE: This step should produce a new driver file named “predator_driver.ko”

Install newly built driver with the following command:

sudo ./kaya_driver_install.sh

Reboot the system.

## REFERENCES

TECHNICAL SUPPORT AND PROFESSIONAL SERVICE

If you searched the documents and could not find the answers you need, contact KAYA Vision support service:

Create a support request on the web: support.kaya.vision

Our knowledge base is available on: kb.kaya.vision

Visit us at www.kaya.vision for comprehensive information.

SUBMITTING A SUPPORT REQUEST

When opening a support request, please provide the following information when applicable:

2025 KAYA Vision, Inc. All rights reserved. KAYA Vision, the KAYA Vision Komodo logo, Predator, Iron, Zinc, Mercury and combinations thereof are trademarks of KAYA Vision, Inc. in the United States and/or other jurisdictions. Microsoft Windows® is a registered trademark of Microsoft Corporation. Linux® is a registered trademark of Linus Torvalds in the U.S. and other countries. JetPack® is a trademark of NVIDIA Corporation. HALCON® is a registered trademark of MVTec Software GmbH. Neither KAYA Vision, nor any of its products or services are affiliated with, endorsed by, or sponsored by National Instruments. MATLAB® is a registered trademark of The MathWorks, Inc. Cognex® is a registered trademark of Cognex Corporation. Other names are for informational purposes only and may be trademarks of their respective owners. KAYA Vision is not liable for harm or damage incurred by information contained in this document.2025 KAYA Vision, Inc. All rights reserved. KAYA Vision, the KAYA Vision Komodo logo, Predator, Iron, Zinc, Mercury and combinations thereof are trademarks of KAYA Vision, Inc. in the United States and/or other jurisdictions. Microsoft Windows® is a registered trademark of Microsoft Corporation. Linux® is a registered trademark of Linus Torvalds in the U.S. and other countries. JetPack® is a trademark of NVIDIA Corporation. HALCON® is a registered trademark of MVTec Software GmbH. Neither KAYA Vision, nor any of its products or services are affiliated with, endorsed by, or sponsored by National Instruments. MATLAB® is a registered trademark of The MathWorks, Inc. Cognex® is a registered trademark of Cognex Corporation. Other names are for informational purposes only and may be trademarks of their respective owners. KAYA Vision is not liable for harm or damage incurred by information contained in this document.
