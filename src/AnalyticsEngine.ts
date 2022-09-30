import {AnalyticsQueryBuilder} from "./AnalyticsBuilder";

export class AnalyticsEngineDB extends AnalyticsQueryBuilder {
  private accountId: string;
  private token: string;
  constructor(accountId: string, token: string) {
    super();
    this.accountId = accountId;
    this.token = token;
  }

  async execute(params: {query: string}): Promise<any> {
    const init = {
      body: params.query,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    };
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.accountId}/analytics_engine/sql`, init);
    const results = await response.json();
    return results
  }
}
