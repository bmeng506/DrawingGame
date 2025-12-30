'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { DrawData, ToolSettings } from '../types';
import Toolbar from './Toolbar'

export default function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [tools, setTools] = useState<ToolSettings>({
        color: '#000000',
        lineWidth: 5,
        isEraser: false
    });

    // Connect to server when component mounts
    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        // Listen for drawing from other players
        newSocket.on('draw', (data: DrawData) => {
            drawOnCanvas(data);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const drawOnCanvas = (data: DrawData) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (ctx) {
            if (data.isEraser) {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.lineWidth = data.lineWidth;
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = data.color;
                ctx.lineWidth = data.lineWidth;
            }

            if (data.isStart) {
                ctx.beginPath();
                ctx.moveTo(data.x, data.y);
            } else {
                ctx.lineTo(data.x, data.y);
                ctx.stroke();
            }
        }
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        // Send to server
        socket?.emit('draw', { x, y, isStart: true});
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        if (ctx) {
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        // Send to server
        socket?.emit('draw', { x, y, isStart: false});
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <canvas
            ref = {canvasRef}
            width = {800}
            height = {600}
            onMouseDown = {startDrawing}
            onMouseMove = {draw}
            onMouseUp = {stopDrawing}
            onMouseLeave = {stopDrawing}
            className = "border-2 border-gray-800 cursor-crosshair bg-white"
        />
    );
}