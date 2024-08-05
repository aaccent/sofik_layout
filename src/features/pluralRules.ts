const pluralRules = new Intl.PluralRules('ru-RU')

interface PluralObject {
    readonly suffixes: Map<Intl.LDMLPluralRule, string>
    readonly get: (value: number) => string
}

export const suggestionPluralDay: PluralObject = {
    suffixes: new Map([
        ['one', 'день'],
        ['few', 'дня'],
        ['many', 'дней'],
    ]),
    get(value: number) {
        const rule = pluralRules.select(value)
        return this.suffixes.get(rule) || ''
    },
}
export const suggestionPluralRubles: PluralObject = {
    suffixes: new Map([
        ['one', 'рубль'],
        ['few', 'рубля'],
        ['many', 'рублей'],
    ]),
    get(value: number) {
        const rule = pluralRules.select(value)
        return this.suffixes.get(rule) || ''
    },
}
