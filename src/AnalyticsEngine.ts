import {AnalyticsQueryBuilder} from "./AnalyticsBuilder";

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
 async function gatherResponse(response: Response) {
  const { status } = response;
  if (status === 200) {
    return await response.json();
  }
  throw response.text();
}

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
    const results = await gatherResponse(response);
    return results
  }
}
