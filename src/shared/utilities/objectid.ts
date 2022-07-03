export const ObjectID = (d = Date, m = Math, h = 16, x = (n: number) => m.floor(n).toString(h)) =>
    x(+new d(new d().toISOString()) / 1000) + ' '.repeat(h).replace(/./g, () => x(m.random() * h));