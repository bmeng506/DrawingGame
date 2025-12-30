export interface ToolSettings {
    color: string;
    lineWidth: number;
    isEraser: boolean;
}

export interface Player {
    id: string;
    name: string;
    score: number;
    isDrawing: boolean;
}

export interface GameState {
    players: Player[];
    currentDrawer: string | null;
    currentWord: string | null;
    timeLeft: number;
    myId: string;
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
    isCorrectGuess?: boolean;
}