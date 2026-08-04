# STM32 Build & Flashing Guide

This guide describes the steps to compile (Build) and flash the firmware for the IoT Node devices in the monitoring system.

## 1. Development Environment

*   **IDE:** STM32CubeIDE.
*   **Hardware:** STM32F401RE microcontroller.

## 2. Project Import Guide

1.  Open STM32CubeIDE.
2.  Select **File** -> **Import...**
3.  Choose **General** -> **Existing Projects into Workspace** -> Click **Next**.
4.  Browse to the directory containing the STM32 source code of the project.
5.  Click **Finish**.

## 3. Building the Project

1.  Right-click on the Project name in the *Project Explorer*.
2.  Select **Build Project**.
3.  Check the **Console** tab to ensure the build process has no errors (0 errors).

## 4. Flashing the Firmware

1.  Connect the STM32F401RE board to the computer.
2.  Right-click on the Project.
3.  Select **Run As** -> **1 STM32 Cortex-M C/C++ Application**.
4.  Confirm the ST-LINK configuration and click **OK** to proceed with flashing the firmware.