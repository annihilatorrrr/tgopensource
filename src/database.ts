import mongodb from "mongodb";
import env from "./env";

const client = new mongodb.MongoClient(env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const getDb = () => client.db(env.DB_NAME);
const getCo = (name: string) => getDb().collection(name);

export const isRequested = async (bot: string) =>
  Boolean(await getCo("requests").findOne({ bot: bot }));

export const request = async (bot: string) => {
  if (await isRequested(bot)) throw new Error("This was previously submitted.");
  await getCo("requests").insertOne({ bot: bot });
};

export const isBanned = async (user_id: number) =>
  Boolean(await getCo("bans").findOne({ user_id: user_id }));

export const ban = async (user_id: number) => {
  if (await isBanned(user_id)) throw new Error("This user is already banned.");
  await getCo("bans").insertOne({ user_id: user_id });
};

export const unban = async (user_id: number) => {
  if (!(await isBanned(user_id))) throw new Error("This user is not banned.");
  await getCo("bans").deleteOne({ user_id: user_id });
};

export default () => client.connect();
