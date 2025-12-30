// Server-side types
export interface Player {
    id: string;
    name: string;
    score: number;
    isDrawing: boolean;
}

export interface Room {
    players: Player[];
    currentDrawer: string | null;
    currentWord: string | null;
    roundStartTime: number;
    roundNumber: number;
    wordChoices: string[];
}

export interface DrawData {
    x: number;
    y: number;
    isStart: boolean;
    color: string;
    lineWidth: number;
    isEraser: boolean;
}

export interface ChatMessage {
    playerId: string;
    playerName: string;
    message: string;
}