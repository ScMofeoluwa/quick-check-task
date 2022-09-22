import factory from "factory-girl";
import { Item } from "../src/database/entity/Item";

const newsType = ["job", "story", "comment", "poll", "pollopt"];

//TODO: TypeORM adapter for Factory-Girl

factory.define("Item", Item, {
    hackerId: factory.chance("natural", { min: 10000000, max: 99999999 }),
    title: factory.chance("sentence", { words: 5 }),
    byHackerNews: false,
    text: factory.chance("paragraph", { sentences: 3 }),
    url: factory.chance("url"),
    type: factory.sequence("item.type", (n) => newsType[n % 5]),
});

export { factory };
