export const canvas2image =() => {
  // 创建一个canvas元素
  const $support = (function () {
    const canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

    return {
        canvas: !!ctx,
        imageData: !!ctx?.getImageData,
        dataURL: !!canvas.toDataURL,
        btoa: !!window.btoa,
    };
})();
  const saveAsImage = function (canvas:any, width:any, height:any, type:any, fileName:any) {
    if ($support.canvas && $support.dataURL) {
        if (typeof canvas == "string") {
            canvas = document.getElementById(canvas);
        }
        type = type || "png";
        let fileType = type;
        type = fixType(type);
        if (/bmp/.test(type)) {
            const data = getImageData(scaleCanvas(canvas, width, height));
            const strData = genBitmapImage(data);
            saveFile(makeURI(strData, downloadMime), fileType, fileName);
        } else {
            const strData = getDataURL(canvas, type, width, height);
            saveFile(strData.replace(type, downloadMime), fileType, fileName);
        }
    }
  }
  return {saveAsImage}
}
const downloadMime = "image/octet-stream";

function getDataURL(canvas:any, type:any, width:any, height:any) {
  canvas = scaleCanvas(canvas, width, height);
  return canvas.toDataURL(type);
}
function makeURI(strData:any, type:any) {
  return "data:" + type + ";base64," + strData;
}

function fixType(type:any) {
  type = type.toLowerCase().replace(/jpg/i, "jpeg");
  const r = type.match(/png|jpeg|bmp|gif/)[0];
  return "image/" + r;
}
function getImageData(canvas:any) {
  const w = canvas.width,
      h = canvas.height;
  return canvas.getContext("2d").getImageData(0, 0, w, h);
}
function scaleCanvas(canvas:any, width:any, height:any) {
  const w = canvas.width,
      h = canvas.height;
  width === undefined && (width = w);
  height === undefined && (height = h);

  let retCanvas = document.createElement("canvas");
  let retCtx = retCanvas.getContext("2d");
  retCanvas.width = width;
  retCanvas.height = height;
  retCtx?.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
  return retCanvas;
}
function saveFile(strData:any, fileType:any, fileName = "name") {
  let saveLink = document.createElement("a");
  saveLink.download = fileName + "." + fileType;
  saveLink.href = strData;
  saveLink.click();
}
const genBitmapImage = function (oData:any) {

  const biWidth = oData.width;
  const biHeight = oData.height;
  const biSizeImage = biWidth * biHeight * 3;
  const bfSize = biSizeImage + 54; // total header size = 54 bytes


  const BITMAPFILEHEADER = [
      // WORD bfType -- The file type signature; must be "BM"
      0x42,
      0x4d,
      // DWORD bfSize -- The size, in bytes, of the bitmap file
      bfSize & 0xff,
      (bfSize >> 8) & 0xff,
      (bfSize >> 16) & 0xff,
      (bfSize >> 24) & 0xff,
      // WORD bfReserved1 -- Reserved; must be zero
      0,
      0,
      // WORD bfReserved2 -- Reserved; must be zero
      0,
      0,
      // DWORD bfOffBits -- The offset, in bytes, from the beginning of the BITMAPFILEHEADER structure to the bitmap bits.
      54,
      0,
      0,
      0,
  ];

  const BITMAPINFOHEADER = [
      // DWORD biSize -- The number of bytes required by the structure
      40,
      0,
      0,
      0,
      // LONG biWidth -- The width of the bitmap, in pixels
      biWidth & 0xff,
      (biWidth >> 8) & 0xff,
      (biWidth >> 16) & 0xff,
      (biWidth >> 24) & 0xff,
      // LONG biHeight -- The height of the bitmap, in pixels
      biHeight & 0xff,
      (biHeight >> 8) & 0xff,
      (biHeight >> 16) & 0xff,
      (biHeight >> 24) & 0xff,
      // WORD biPlanes -- The number of planes for the target device. This value must be set to 1
      1,
      0,
      // WORD biBitCount -- The number of bits-per-pixel, 24 bits-per-pixel -- the bitmap
      // has a maximum of 2^24 colors (16777216, Truecolor)
      24,
      0,
      // DWORD biCompression -- The type of compression, BI_RGB (code 0) -- uncompressed
      0,
      0,
      0,
      0,
      // DWORD biSizeImage -- The size, in bytes, of the image. This may be set to zero for BI_RGB bitmaps
      biSizeImage & 0xff,
      (biSizeImage >> 8) & 0xff,
      (biSizeImage >> 16) & 0xff,
      (biSizeImage >> 24) & 0xff,
      // LONG biXPelsPerMeter, unused
      0,
      0,
      0,
      0,
      // LONG biYPelsPerMeter, unused
      0,
      0,
      0,
      0,
      // DWORD biClrUsed, the number of color indexes of palette, unused
      0,
      0,
      0,
      0,
      // DWORD biClrImportant, unused
      0,
      0,
      0,
      0,
  ];

  const iPadding = (4 - ((biWidth * 3) % 4)) % 4;

  const aImgData = oData.data;

  let strPixelData = "";
  const biWidth4 = biWidth << 2;
  let y = biHeight;
  const fromCharCode = String.fromCharCode;

  do {
      const iOffsetY = biWidth4 * (y - 1);
      let strPixelRow = "";
      for (let x = 0; x < biWidth; x++) {
          const iOffsetX = x << 2;
          strPixelRow +=
              fromCharCode(aImgData[iOffsetY + iOffsetX + 2]) +
              fromCharCode(aImgData[iOffsetY + iOffsetX + 1]) +
              fromCharCode(aImgData[iOffsetY + iOffsetX]);
      }

      for (let c = 0; c < iPadding; c++) {
          strPixelRow += String.fromCharCode(0);
      }

      strPixelData += strPixelRow;
  } while (--y);

  return (
      encodeData(BITMAPFILEHEADER.concat(BITMAPINFOHEADER)) +
      encodeData(strPixelData)
  );

  function encodeData(data:any) {
    if (!window.btoa) {
        // eslint-disable-next-line no-throw-literal
        throw "btoa undefined";
    }
    let str = "";
    if (typeof data == "string") {
        str = data;
    } else {
        for (let i = 0; i < data.length; i++) {
            str += String.fromCharCode(data[i]);
        }
    }

    return btoa(str);
  }
};
