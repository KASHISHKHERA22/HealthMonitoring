

function createQRCode(data) {
    // Initialize QRCode object
    var qr = qrcode(0, 'L'); // Change 'L' to adjust error correction level if needed
    qr.addData(JSON.stringify(data));
    qr.make();

    // Create image tag
    var imgElement = document.createElement('img');
    imgElement.src = qr.createDataURL(4); // Scale factor: 4
    
    // Append the QR code image to the container
    document.getElementById('qrCodeContainer').appendChild(imgElement);
}

// createQRCode(data);

