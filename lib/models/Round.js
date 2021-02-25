const pool = require('../utils/pool');

module.exports = class Round {
  id;
  date;
  location;
  name;
  strokes;
  notes;

  constructor(row) {
    this.id = row.id;
    this.date = row.date;
    this.location = row.location;
    this.name = row.name;
    this.strokes = row.strokes;
    this.notes = row.notes;
  }

  static async createRound({ date, location, name, strokes, notes }) {
    const { rows } = await pool.query(
      `INSERT INTO rounds
        (date, location, name, strokes, notes)
        VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [date, location, name, strokes, notes]
    );

    return new Round(rows[0]);
  }

  static async getRounds() {
    const { rows } = await pool.query('SELECT * FROM rounds');
    
    return rows.map(row => new Round(row));
  }

};
