function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

var GildedRose = {
  MAX_QUALITY: 50,
  MIN_QUALITY: 0,
  SpecialType: {
    AgedBrie: "Aged Brie",
    Backstage: "Backstage passes to a TAFKAL80ETC concert",
    Conjured: "Conjured Mana Cake",
    Sulfuras: "Sulfuras, Hand of Ragnaros"
  }
};

function update_quality() {
  items.map(update_item_quality);
}

function is_sulfuras(item) {
  return item.name == GildedRose.SpecialType.Sulfuras;
}

function is_aged_brie(item) {
  return item.name == GildedRose.SpecialType.AgedBrie;
}

function is_backstage(item) {
  return item.name == GildedRose.SpecialType.Backstage;
}

function is_conjured(item) {
  return item.name == GildedRose.SpecialType.Conjured;
}

function is_passed(item) {
  return item.sell_in < 0;
}

function get_backstage_quality_increase_for_sell_in(sell_in) {
  return (sell_in > 10) ? 1 : (sell_in > 5)  ?  2 : 3;
}

function update_item_quality(item) {
  if (is_sulfuras(item)) return;

  if (is_aged_brie(item)) {
    increase_quality(item);
  } else if (is_backstage(item)) {
    increase_quality(item, get_backstage_quality_increase_for_sell_in(item.sell_in));
  } else {
    decrease_quality(item);
  }

  decrease_sell_in(item);

  if (is_passed(item)) {
    if (is_aged_brie(item)) {
      increase_quality(item);
    } else if (is_backstage(item)) {
      item.quality = 0;
    } else {
      decrease_quality(item);
    }
  }
}

function increase_quality(item, increment) {
  increment = increment || 1;
  item.quality = Math.min(GildedRose.MAX_QUALITY, item.quality + increment);
}

function decrease_quality(item) {
  var decrement = is_conjured(item) ? 2 : 1;
  item.quality = Math.max(GildedRose.MIN_QUALITY, item.quality - decrement);
}

function decrease_sell_in(item) {
  item.sell_in = item.sell_in - 1;
}