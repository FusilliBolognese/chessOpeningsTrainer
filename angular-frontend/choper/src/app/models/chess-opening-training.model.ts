export class ChessOpeningTraining {
    id: string;
    date_created: Date;
    pgn_text: string;
    uci_text: string;
    score: number;
    side: string;
    opening_tree: number;
    eco_code: string;
    fen: string;
    turn: string;
    move_number: number;
    legal_moves: string[];
}

