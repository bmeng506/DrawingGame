'use client';

interface ToolbarProps {
    color: string;
    lineWidth: number;
    isEraser: boolean;
    onColorChange: (color: string) => void;
    onLineWidthChange: (width: number) => void;
    onEraserToggle: () => void;
    onClear: () => void;
}

export default function Toolbar({
    color,
    lineWidth,
    isEraser,
    onColorChange,
    onLineWidthChange,
    onEraserToggle,
    onClear
}: ToolbarProps) {
    const colors = ['#000000', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FFFFFF'];
    const sizes = [2, 5, 10, 15];

    return ()
}