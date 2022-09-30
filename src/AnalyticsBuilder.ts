import {AnalyticResult, AnalyticResultOne, SelectAll, SelectOne} from "./interfaces";
import {OrderTypes} from "./enums";



export class AnalyticsQueryBuilder {
  async execute(params: {query: string}): Promise<any> {
    throw new Error("Execute method not implemented");
  }

  async fetchOne(params: SelectOne): Promise<AnalyticResultOne> {
    const response = await this.execute({
      query: this._select({...params, limit: 1}),
    })

    return {
      ...response,
      data: response.data[0]
    }
  }

  async fetchAll(params: SelectAll): Promise<AnalyticResult> {
    return this.execute({
      query: this._select(params),
    })
  }

  _select(params: Omit<SelectAll, 'offset' | 'having'>): string {
    return (
      `SELECT ${this._fields(params.fields)} FROM ${params.tableName}` +
      this._where(params.where?.conditions) +
      this._groupBy(params.groupBy) +
      this._orderBy(params.orderBy) +
      this._limit(params.limit)
    )
  }

  _fields(value: string | Array<string>): string {
    if(typeof value === 'string') return value

    return value.join(', ')
  }

  _where(value?: string | Array<string>): string {
    if (!value) return ''
    if(typeof value === 'string') return ` WHERE ${value}`

    return ` WHERE ${value.join(' AND ')}`
  }

  _groupBy(value?: string | Array<string>): string {
    if (!value) return ''
    if(typeof value === 'string') return ` GROUP BY ${value}`

    return ` GROUP BY ${value.join(', ')}`
  }


  _orderBy(value?: string | Array<string> | Record<string, string | OrderTypes>): string {
    if (!value) return ''
    if(typeof value === 'string') return ` ORDER BY ${value}`

    if(value.constructor.name.toLowerCase() === 'array') { // @ts-ignore
      return ` ORDER BY ${value.join(', ')}`
    }

    const order: Array<string> = []
    Object.entries(value).forEach(([key, item]) => {
      order.push(`${key} ${item}`)
    })

    return ` ORDER BY ${order.join(', ')}`
  }

  _limit(value?: number): string {
    if (!value) return ''

    return ` LIMIT ${value}`
  }
}
