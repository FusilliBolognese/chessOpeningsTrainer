export class ChessOpeningTree extends Object {
  id = '';
  pgn_text = '';
  opening_name = '';
  eco_code = '';

  public constructor(init?: Partial<ChessOpeningTree>) {
    super();
    Object.assign(this, init);
  }
}

