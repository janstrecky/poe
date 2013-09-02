/* jshint eqeqeq: false */
/* ignore === warning in handlebars helpers */

$(document)
.on("mouseover", ".item", function(e) {
    e.stopPropagation(); // events don't affect children
    var $this = $(this);
    var popup = $this.children(".item-container");
    var pos = $this.position();

    if (pos.top - $(window).scrollTop() - 50 - 10 - popup.height() > 0) {
        popup.css({
            top: pos.top - popup.height() - 10,
            left: pos.left - (popup.width() / 2) + ($this.width() / 2)
        });
    } else {
        popup.css({
            top: pos.top,
            left: pos.left + $this.width() + 10
        });
    }


    popup.show();
})
.on("mouseleave", ".item", function(e) {
    e.stopPropagation(); // events don't affect children
    var $this = $(this);
    var popup = $this.children(".item-container");
    popup.hide();
})
.on("click", ".item", function(e) {
    var $this = $(this);

    console.log("offset", $this.offset());
    console.log("position", $this.position());
    console.log("wat", $this.offset().top - $(window).scrollTop() - 50);

    console.log("win", window.innerHeight - $this.height());
});

$(".item-type").on("mouseover", function(e) {
    console.log("wwaaaattttt");
});


/* Item stuff
 * ====================== */
var ItemType = {
    ARMOUR:   "Armour",
    WEAPON:   "Weapon",
    GEM:      "Gem",
    CURRENCY: "Currency",
    UNKNOWN:  "Unknown"
};

var ItemRarity = {
    WHITE:  "White",
    MAGIC:  "Magic",
    RARE:   "Rare",
    UNIQUE: "Unique"
};

var opt = {
    type: ItemType.ARMOUR,
    rarity: ItemRarity.RARE
};

function create(options) {

}

var armourTemplate = "";

Handlebars.registerHelper("tern", function(condition, opt1, opt2, options) {
    return condition ? opt1 : opt2;
});

Handlebars.registerHelper("eq", function(val1, val2, options) {
    var conditional = (val1 == val2);
    var type = toString.call(conditional);
    if(type === "[object Function]") { conditional = conditional.call(this); }

    if(!conditional || Handlebars.Utils.isEmpty(conditional)) {
    return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper("equal", function(val1, val2, ret, options) {
    return (val1 == val2) ? ret : "";
});

/*$.get("js/templates.html", function(o) {
    var template = $(o).filter("#template").html();

});*/

var template="";
template += "<div class=\"item\">";
template += "    {{#if mirrored}}";
template += "        <img class=\"item-mirrored\" src=\"{{img}}\" alt=\"Item Img\">";
template += "    {{else}}";
template += "        <img src=\"{{img}}\" alt=\"Item Img\">";
template += "    {{\/if}}";
template += "";
template += "    <div class=\"item-container\">";
template += "        <div class=\"item-content\">";
template += "";
template += "            <div class=\"header-{{rarity}}\">";
template += "                <div class=\"header-{{rarity}}-l\"><\/div>";
template += "                <div class=\"header-{{rarity}}-r\"><\/div>";
template += "                {{#if item_name}}";
template += "                <div class=\"color-{{rarity}}\">";
template += "                    <span class=\"item-name\">{{item_name}}<\/span>";
template += "                <\/div>";
template += "                {{\/if}}";
template += "                <div class=\"color-{{rarity}}\">";
template += "                    <span class=\"item-type\">{{item_type}}<\/span>";
template += "                <\/div>";
template += "            <\/div>";
template += "";
template += "            <div class=\"item-stats\">";
template += "                <span class=\"item-text\">";
template += "                    {{#if weapon_type}}";
template += "                    <span class=\"item-text\">{{weapon_type}}<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if gem_category}}";
template += "                    <span class=\"item-text\">{{gem_category}}<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if gem_level}}";
template += "                    Level: <span class=\"color-default\">{{gem_level}}{{equal gem_level \"20\" \" (Max)\"}}<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if gem_cost}}";
template += "                    Mana Cost: <span class=\"color-default\">{{gem_cost}}<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if quality}}";
template += "                    Quality: <span class=\"color-augmented\">+{{quality}}%<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if block_chance}}";
template += "                    Chance to Block: <span class=\"color-{{tern block_chance_aug \"augmented\" \"default\"}}\">{{block_chance}}%<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if armour}}";
template += "                    Armour: <span class=\"color-{{tern armour_aug \"augmented\" \"default\"}}\">{{armour}}<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if evasion}}";
template += "                    Evasion Rating: <span class=\"color-{{tern evasion_aug \"augmented\" \"default\"}}\">{{evasion}}<\/span><br>";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if energy_shield}}";
template += "                    Energy Shield: <span class=\"color-{{tern energy_shield_aug \"augmented\" \"default\"}}\">{{energy_shield}}<\/span><br>";
template += "                    {{\/if}}";
template += "                <\/span>";
template += "            <\/div>";
template += "";
template += "            <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "            <div class=\"requirements\">";
template += "                <span class=\"item-text\">";
template += "                    Requires Level <span class=\"color-{{tern req.level_aug \"augmented\" \"default\"}}\">{{req.level}}<\/span>";
template += "";
template += "                    {{#if req.str}}";
template += "                    , <span class=\"color-{{tern req.str_aug \"augmented\" \"default\"}}\">{{req.str}}<\/span> Str";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if req.dex}}";
template += "                    , <span class=\"color-{{tern req.dex_aug \"augmented\" \"default\"}}\">{{req.dex}}<\/span> Dex";
template += "                    {{\/if}}";
template += "";
template += "                    {{#if req.int}}";
template += "                    , <span class=\"color-{{tern req.int_aug \"augmented\" \"default\"}}\">{{req.int}}<\/span> Int";
template += "                    {{\/if}}";
template += "                <\/span>";
template += "            <\/div>";
template += "";
template += "            {{#if gem_desc}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                <span class=\"color-gem\">{{gem_desc}}<\/span>";
template += "            {{\/if}}";
template += "";
template += "            {{#if implicit_mod}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                <div class=\"explicit-mod\">";
template += "                    <span>{{implicit_mod}}<\/span>";
template += "                <\/div>";
template += "            {{\/if}}";
template += "";
template += "            {{#if mods}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                <div class=\"explicit-mod\">";
template += "                    {{#each mods}}";
template += "                        <span>{{this}}<\/span><br>";
template += "                    {{\/each}}";
template += "                <\/div>";
template += "            {{\/if}}";
template += "";
template += "            {{!--";
template += "            {{#eq rarity \"gem\"}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                <div class=\"exp-bar\"><\/div> <span class=\"color-default\">1277757084\/146782704<\/span>";
template += "            {{\/eq}}";
template += "            --}}";
template += "";
template += "            {{#eq rarity \"gem\"}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                {{#if gem_support}}";
template += "                    <div>";
template += "                        <span class=\"item-text font-italic\">This is a Support Gem. It does nto grant a bonus to<br>your character, but to skills in sockets connected to<br>it. Place into an item socket connected to a socket<br>containing the active Skill Gem you wish to augment.<br>Right click to remove from a socket.<\/span>";
template += "                    <\/div>";
template += "                {{else}}";
template += "                    <div>";
template += "                        <span class=\"item-text font-italic\">Place into an item socket of the right colour to gain<br>this skill. Right click to remove from a socket.<\/span>";
template += "                    <\/div>";
template += "                {{\/if}}";
template += "            {{\/eq}}";
template += "";
template += "            {{#if effects}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                <div class=\"item-effects\">";
template += "                    {{#each effects}}";
template += "                        <span>{{this}}<\/span><br>";
template += "                    {{\/each}}";
template += "                <\/div>";
template += "            {{\/if}}";
template += "";
template += "            {{#if mirrored}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                <div class=\"color-augmented\">";
template += "                    <span>Mirrored<\/span>";
template += "                <\/div>";
template += "            {{\/if}}";
template += "";
template += "            {{#if flavor_text}}";
template += "                <div class=\"separator-{{rarity}}\"><\/div>";
template += "";
template += "                <div class=\"flavor-text\">";
template += "                    <span>{{flavor_text}}<\/span>";
template += "                <\/div>";
template += "            {{\/if}}";
template += "        <\/div>";
template += "    <\/div>";
template += "<\/div>";

var templateFn = Handlebars.compile(template);


function createItem(options) {
    var html = templateFn(options);
    return $(_.unescape(html));
}

var armour = {
    rarity: "rare",
    mirrored: true,
    type: "armour",
    img: "http://webcdn.pathofexile.com/image/Art/2DItems/Armours/BodyArmours/BodyStrInt3C.png?scale=1",
    // weapon_type: "Staff",
    item_name: "Skull Shelter",
    item_type: "Saintly Chainmail",
    quality: 20,
    armour: 1811, armour_aug: true,
    energy_shield: 641, energy_shield_aug: true,
    // block_chance: 34, block_chance_aug: true,
    // gem_level: 20,
    // gem_category: "Fire, Cold, Lightning, AoE",
    // gem_cost: 16,

    mods: [
        "+50 to Intelligence",
        "+400 to Armour",
        "120% increased Armour and Energy Shield",
        "+145 to maximum Energy Shield",
        "+45% to Lightning Resistance",
        "+45% to Cold Resistance"
    ],
    effects: [
        "Has Exalted Armour Effect",
        "Has Exalted Cape Effect"
    ],
    req: {
        level: 70,
        str: 99,
        int: 115
    }
};

var gem = {
    rarity: "gem",
    item_name: "Double Strike",
    img: "http://webcdn.pathofexile.com/image/Art/2DItems/Gems/DoubleStrike.png?scale=1",
    quality: 20,
    gem_level: 20,
    gem_category: "Attack, Melee",
    gem_cost: 16,
    gem_desc: "Performs two fast attacks on target enemy with<br>your main hand melee weapon.",
    gem_support: false,
    req: {
        level: 68,
        dex: 151
    },
    mods: [
        "76% increased Physical Damage",
        "Deals 70% of Base Damage",
        "10% increased Attack Speed"
    ]
};

var shav = {
    img: "http://webcdn.pathofexile.com/image/Art/2DItems/Armours/BodyArmours/BodyInt1CUnique.png?scale=1",
    rarity: "unique",
    item_name: "Shavronne's Wrappings",
    item_type: "Occultist's Vestment",

    quality: 20,
    energy_shield: 588, energy_shield_aug: true,

    req: {
        level: 62,
        int: 180
    },

    implicit_mod: "10% increased Spell Damage",

    mods: [
        "250% increased Energy Shield",
        "10% increased Energy Shield Cooldown Recovery",
        "+40% Lightning Resistance",
        "Reflects 1-250 Lightning Damage to Melee Attackers",
        "Chaos Damage does not bypass Energy Shield"
    ],

    flavor_text: "Shavronne's apparel became ever more extravagant<br>as her body and soul became ever more corrupted."
};

var item1 = createItem(armour);
var item2 = createItem(gem);
var item3 = createItem(shav);

$(".well").append(item1);
$(".well").append(item2);
$(".well").append(item3);
