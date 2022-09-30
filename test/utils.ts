import {DatabaseQueryBuilder} from "../src";
import {FetchTypes} from "../src/enums";

export class DatabaseQueryBuilderTest extends DatabaseQueryBuilder {
  async execute(params: {query: String, arguments?: (string | number | boolean | null)[], fetchType?: FetchTypes}): Promise<any> {
    return null
  }
}
