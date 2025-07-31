declare module '@/lib/mongodb' {
  import { MongoClient } from 'mongodb';

  const client: MongoClient;
  const clientPromise: Promise<MongoClient>;

  export { client, clientPromise };
}
