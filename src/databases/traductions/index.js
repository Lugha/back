import db from "../../services/mongo";

import schema from "./schema";

const conn = db.getConnect();

export default conn.model("traductions", schema);;