import html2canvas from 'html2canvas-pro';
import React from 'react'

export const useDownloadImage = (printRef) => {

    console.log("Downloading");
    const download = async (printRef) => {
        const element = printRef.current;
        if (!element) return;

        // Use html2canvas to render the element
        const canvas = await html2canvas(element, {
            allowTaint: true, // Option to handle cross-origin images
        });

        // Convert the canvas to a data URL (PNG format)
        const dataUrl = canvas.toDataURL("image/png");

        // Create a link element to trigger the download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "component-screenshot.png"; // Specify the download file name

        // Simulate a click to download the image
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return download;
}


