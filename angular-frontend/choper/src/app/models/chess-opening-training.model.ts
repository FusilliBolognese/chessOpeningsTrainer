import { ChessOpeningTree } from './chess-opening-tree.model';

export class ChessOpeningTraining extends Object {
  id = '';
  date_created = '';
  date_lastmodified = '';

  opening_tree_id = '0';
  variant = 'chess';
  is_chess360 = false;
  opening_tree = new ChessOpeningTree();

  uci_text = '';
  pgn_text = '';
  turn = 'w';
  move_number = 1;
  fen = '';
  legal_moves: string[] = [];

  public constructor(init?: Partial<ChessOpeningTraining>) {
    super();
    Object.assign(this, init);
  }



}

