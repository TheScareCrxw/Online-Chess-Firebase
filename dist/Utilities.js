import { Canvas } from "./Canvas.js";
class Utilities {
    // generate random number R, lowerBound <= R < upperbound
    static randInt(lowerBound, upperBound) {
        return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
    }
    // Draw a line from (x1, y1) to (x2, y2) of color specified
    static drawLine(x1, y1, x2, y2, color = null) {
        const CONTEXT = Canvas.instance.context;
        if (color !== null) {
            CONTEXT.strokeStyle = color;
        }
        else {
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
//# sourceMappingURL=Utilities.js.map