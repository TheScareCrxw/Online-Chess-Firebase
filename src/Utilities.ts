import { Canvas } from "./Canvas.js";

class Utilities {
  // generate random number R, lowerBound <= R < upperbound
  public static randInt(lowerBound: number, upperBound: number) {
    return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
  }

  // Draw a line from (x1, y1) to (x2, y2) of color specified
  public static drawLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string | null = null
  ): void {
    const CONTEXT: CanvasRenderingContext2D = Canvas.instance.context;
    if (color !== null) {
      CONTEXT.strokeStyle = color;
    } else {
      CONTEXT.strokeStyle = "black";
    }
    CONTEXT.beginPath();
    CONTEXT.moveTo(x1, y1);
    CONTEXT.lineTo(x2, y2);
    CONTEXT.stroke();
    CONTEXT.closePath();
  }
}
export { Utilities };
