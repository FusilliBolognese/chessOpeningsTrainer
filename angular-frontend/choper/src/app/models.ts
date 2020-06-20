export class ChessOpening {
    id: number;
    pgn: string;
    opening_name: string;
    eco_code: string;
}

export class ChessGame {
    id: number;
    date_created: Date;
    opening: number;
    pgn: string;
    score: number;
    side: string;
}

