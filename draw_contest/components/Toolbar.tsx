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

    return (
        <div className = "flex flex-col gap-4 p-4 bg-white border-2 border-gray-800 rounded-lg">
            <div>
                <p className = "text-sm font-bold mb-2">Colors</p>
                <div className = "flex gap-2 flex-wrap">
                    {colors.map(c => (
                        <button
                            key = {c}
                            onClick = {() => onColorChange(c)}
                            className = {`w-8 h-8 rounded border-2 ${color === c ? 'border-black' : 'border-gray-300'}`}
                            style = {{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className = "text-sm font-bold mb-2">Brush Size</p>
                <div className = "flex gap-2">
                    {sizes.map(size => (
                        <button
                            key = {size}
                            onClick = {() => onLineWidthChange(size)}
                            className = {`w-10 h-10 rounded border-2 flex items-center justify-center ${
                                lineWidth === size ? 'border-black bg-gray-100' : 'border-gray-300'
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className = "flex flex-col gap-2">
                <button
                    onClick = {onEraserToggle}
                    className = {`px-4 py-2 rounded font-bold ${
                        isEraser ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                >
                    {isEraser ? 'Brush Mode' : 'Eraser Mode'}
                </button>
                <button
                    onClick = {onClear}
                    className = "px-4 py-2 bg-red-500 text-white rounded font-bold hover:bg-red-600"
                >
                    Clear Canvas
                </button>
            </div>
        </div>
    );
}