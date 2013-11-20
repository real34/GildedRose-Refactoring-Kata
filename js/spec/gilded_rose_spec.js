describe("Gilded Rose application", function() {

  it("should decrease sell in for the first item", function() {
    update_quality();
    expect(items[0].sell_in).toBe(9);
  });

  it("has global side effects", function() {
    update_quality();
    expect(items[0].sell_in).not.toBe(9);
  });

  it("should not change sell in for Sulfuras", function() {
    update_quality();
    expect(items[3].sell_in).toBe(0);
  });

  it("should not change quality for Sulfuras", function() {
    update_quality();
    expect(items[3].quality).toBe(80);
  });

  describe("Update quality", function() {
    beforeEach(function() {
      items = [];
    });

    it("should increase Aged Brie quality", function() {
      items.push(new Item(GildedRose.SpecialType.AgedBrie, 2, 0));
      update_quality();
      expect(items.pop().quality).toBe(1);
    });

    it("should not increase quality higher than 50", function() {
      items.push(new Item(GildedRose.SpecialType.AgedBrie, 2, 50));
      update_quality();
      expect(items.pop().quality).toBe(50);
    });

    it("should decrease Aged Brie sell in", function() {
      items.push(new Item(GildedRose.SpecialType.AgedBrie, 2, 0));
      update_quality();
      expect(items.pop().sell_in).toBe(1);
    });

    it("should increase Aged Brie quality twice when sell in is negative", function() {
      items.push(new Item(GildedRose.SpecialType.AgedBrie, 0, 10));
      update_quality();
      expect(items.pop().quality).toBe(12);
    });

    it("should increase Backstage quality by one when sell in is more than 10 days", function() {
      items.push(new Item(GildedRose.SpecialType.Backstage, 11, 10));
      update_quality();
      expect(items.pop().quality).toBe(11);
    });

    it("should increase Backstage quality by 2 when sell in is less than 10 days", function() {
      items.push(new Item(GildedRose.SpecialType.Backstage, 10, 10));
      update_quality();
      expect(items.pop().quality).toBe(12);
    });

    it("should increase Backstage quality by 3 when sell in is less than 5 days", function() {
      items.push(new Item(GildedRose.SpecialType.Backstage, 5, 10));
      update_quality();
      expect(items.pop().quality).toBe(13);
    });

    it("should drop Backstage quality to 0 after the concert", function() {
      items.push(new Item(GildedRose.SpecialType.Backstage, 0, 10));
      update_quality();
      expect(items.pop().quality).toBe(0);
    });

    it("should decrease quality by one for classic item when they are not passed", function() {
      items.push(new Item('classic item', 5, 10));
      update_quality();
      expect(items.pop().quality).toBe(9);
    });

    it("should decrease quality by 2 for classic item when they are passed", function() {
      items.push(new Item('classic item', 0, 10));
      update_quality();
      expect(items.pop().quality).toBe(8);
    });

    it("should not decrease quality below 0 for classic item not passed", function() {
      items.push(new Item('classic item', 5, 0));
      update_quality();
      expect(items.pop().quality).toBe(0);
    });

    it("should not decrease quality below 0 for classic item passed", function() {
      items.push(new Item('classic item', 0, 0));
      update_quality();
      expect(items.pop().quality).toBe(0);
    });

  });

});
