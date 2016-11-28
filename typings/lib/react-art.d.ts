
declare namespace __ReactART {

    interface EventHandlers {
        onMouseMove?: __React.MouseEventHandler
        onMouseOver?: __React.MouseEventHandler
        onMouseOut?: __React.MouseEventHandler
        onMouseUp?: __React.MouseEventHandler
        onMouseDown?: __React.MouseEventHandler
        onClick?: __React.MouseEventHandler
    }

    interface Surface {
        width?: number
        height?: number
        style?: __React.CSSProperties
        accessKey?: string
        className?: string
        draggable?: boolean
        tabIndex?: number
        title?: string
    }

    interface NodeProps extends EventHandlers {
        x?: number
        y?: number
        width?: string
        height?: string
        rotation?: number
        originX?: number
        originY?: number
        scale?: number
        scaleX?: number
        scaleY?: number
        opacity?: number
        visible?: boolean
        cursor?: string
        transform?: Transform
    }

    interface ClippingRectangle {
        x?: number
        y?: number
        width?: string
        height?: string
    }

    interface Renderable extends NodeProps {
        stroke?: any
        strokeWidth?: any
        strokeCap?: any
        strokeJoin?: any
        strokeDash?: any
        fill?: string
        d?: string
        width?: string
        height?: string
    }

    interface Text extends Renderable {
        alignment: string
        font?: {
            fontSize: any
            fontStyle: any
            fontVariant: any
            fontWeight: any
            fontFamily: any
        } | string
        path: any
    }

    interface Transform {
        new (): this
        new (xx: number, yx: number, xy: number, yy: number, x?: number, y?: number): this
        translate(x: number, y: number): this
        transform(transform: Transform): this
        transform(xx: number, yx: number, xy: number, yy: number, x?: number, y?: number): this
        transformTo(transform: Transform): this
        transformTo(xx: number, yx: number, xy: number, yy: number, x?: number, y?: number): this
        move(x: number, y: number): this
        moveTo(x: number, y: number): this
        scale(x: number, y: number): this
        scaleTo(x: number, y: number): this
        rotate(deg: number, x?: number, y?: number): this
        rotateTo(deg: number, x?: number, y?: number): this
        resize(width: number, height: number): this
        resizeTo(width: number, height: number): this
        inversePoint(x: number, y: number): this
        point(x: number, y: number): this
    }

    const Surface:  __React.ComponentClass<Surface>
    const Group: __React.ComponentClass<NodeProps>
    const Transform: Transform
    const Shape: __React.ComponentClass<Renderable>
    const ClippingRectangle: __React.ComponentClass<ClippingRectangle>
    const Text: __React.ComponentClass<Text>

    class LinearGradient {
        constructor(stops, x1, y1, x2, y2)
    }

    class RadialGradient {
        constructor(stops, fx?, fy?, rx?, ry?, cx?, cy?)
    }

    class Pattern {
        constructor(url, width, height, left?, top?)
    }

    class Path {
        constructor()
        constructor(path: string)
        move(x: number, y: number): this
        moveTo(x: number, y: number): this
        line(x: number, y: number): this
        lineTo(x: number, y: number): this
        curve(c1x, c1y, c2x, c2y, ex, ey): this
        curveTo(c1x, c1y, c2x, c2y, ex, ey): this
        arc(x, y, rx, ry, outer?, counterClockwise?, rotation?: boolean): this
        arcTo(x, y, rx, ry, outer?, counterClockwise?, rotation?: boolean): this
        counterArc(x, y, rx, ry, outer?): this
        counterArcTo(x, y, rx, ry, outer?): this
        close(): this
        reset(): this
    }
}

declare module "react-art" {
    export = __ReactART
}
