import { DocumentNode, getOperationAST } from "graphql";
import { Area } from "react-easy-crop/types";
import { blobToFile } from "utils/files";
import { MouseEvent } from "react";

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

const getRadianAngle = (degreeValue: number): number =>
  (degreeValue * Math.PI) / 180;

interface IGetCroppedImg {
  imageSrc: string;
  pixelCrop: Area;
  rotation?: number;
}
interface IGetCroppedImgRes {
  b64: string;
  file: File;
}

const canvasToFile = async (canvas: HTMLCanvasElement): Promise<File> =>
  new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(blobToFile({ blob: file, fileName: "croppedImg" }));
    }, "image/jpeg");
  });

export const getCroppedImg = async (
  params: IGetCroppedImg,
): Promise<IGetCroppedImgRes> => {
  const { imageSrc, pixelCrop, rotation = 0 } = params;

  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5,
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
    );

    const b64 = canvas.toDataURL("image/jpeg");
    const file = await canvasToFile(canvas);
    return {
      b64,
      file,
    };
  } catch (error) {
    console.error("error: ", error);
  }
  return null;
};

export const getQueryOperator = (query: DocumentNode) =>
  getOperationAST(query)?.name?.value;

export const mouseClosestEdge = (mouse: MouseEvent, elem: HTMLElement) => {
  if (!elem) return null;

  const elemBounding = elem.getBoundingClientRect();

  const elementLeftEdge = elemBounding.left;
  const elementTopEdge = elemBounding.top;
  const elementRightEdge = elemBounding.right;
  const elementBottomEdge = elemBounding.bottom;

  const mouseX = mouse.pageX;
  const mouseY = mouse.pageY;

  const topEdgeDist = Math.abs(elementTopEdge - mouseY);
  const bottomEdgeDist = Math.abs(elementBottomEdge - mouseY);
  const leftEdgeDist = Math.abs(elementLeftEdge - mouseX);
  const rightEdgeDist = Math.abs(elementRightEdge - mouseX);

  const min = Math.min(
    topEdgeDist,
    bottomEdgeDist,
    leftEdgeDist,
    rightEdgeDist,
  );

  switch (min) {
    case leftEdgeDist:
      return "left";
    case rightEdgeDist:
      return "right";
    case topEdgeDist:
      return "top";
    case bottomEdgeDist:
      return "bottom";
  }
};
