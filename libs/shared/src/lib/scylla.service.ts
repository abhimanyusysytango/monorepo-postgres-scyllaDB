import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client, ClientOptions } from 'cassandra-driver';

@Injectable()
export class ScyllaService implements OnModuleInit, OnModuleDestroy {
  private client: Client;

  constructor() {
    const options: ClientOptions = {
      contactPoints: [process.env.SCYLLA_HOST || 'localhost'],
      localDataCenter: process.env.SCYLLA_DATACENTER || 'datacenter1',
      keyspace: process.env.SCYLLA_KEYSPACE || 'my_keyspace',
      credentials: process.env.SCYLLA_USER && process.env.SCYLLA_PASSWD ? { username: process.env.SCYLLA_USER, password: process.env.SCYLLA_PASSWD } : undefined,
    };
    this.client = new Client(options);
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.shutdown();
  }

  getClient(): Client {
    return this.client;
  }
} 