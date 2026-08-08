/**
 * The curation, edited by hand. EXIF lives in src/data/gallery.generated.js.
 *
 * name    matches the generated entry, filename without extension
 * slug    the URL at /gallery/<slug>, stable once shared
 * place   real location, shown in the placard
 * alt     describes the photograph, not the location
 * weight  full spans the row, half pairs across, third triples across
 * note    optional, both languages, shown only on full weight frames
 *
 * Capture date is not here, it comes from EXIF and is formatted per locale.
 *
 * Rows must not mix orientations. Frames in a row share a column width, so a
 * portrait beside a landscape is 2.25 times taller and the row reads as broken.
 * Halves come in pairs, thirds in threes, a full frame stands alone.
 *
 * Places marked CHECK were read off the photograph rather than from EXIF, which
 * carries no GPS. The landmark is recognisable, the exact naming may not be.
 */
export const sequence = [
  {
    name: "IMG_3153",
    slug: "versailles-parterre",
    place: "Château de Versailles", // CHECK
    alt: "Formal parterre gardens of clipped box and flowerbeds, visitors spread along the gravel walks under a wide evening sky",
    weight: "full",
  },

  {
    name: "IMG_3338",
    slug: "above-the-clouds",
    place: "Somewhere over Europe", // CHECK
    alt: "A flat deck of cumulus cloud seen from a plane, the horizon fading into pale haze",
    weight: "half",
  },
  {
    name: "IMG_5860",
    slug: "geese-on-still-water",
    place: "Dresden", // CHECK
    alt: "Five geese standing in shallow rippled water, their reflections broken by the surface",
    weight: "half",
  },

  {
    name: "IMG_3006",
    slug: "eiffel-through-the-trees",
    place: "Paris",
    alt: "The Eiffel Tower framed between summer foliage, cumulus clouds behind it",
    weight: "third",
  },
  {
    name: "IMG_3360",
    slug: "warsaw-castle-square",
    place: "Castle Square, Warsaw",
    alt: "Sigismund's Column above Castle Square, the pastel townhouses of the Old Town behind it",
    weight: "third",
  },
  {
    name: "IMG_3439",
    slug: "bronze-door",
    place: "Warsaw", // CHECK
    alt: "A bronze church door in relief, three robed figures emerging from the metal",
    weight: "third",
  },

  {
    name: "IMG_6701",
    slug: "karlskirche-interior",
    place: "Karlskirche, Vienna",
    alt: "Baroque church interior looking up into the dome, a gilded sunburst above the high altar",
    weight: "full",
  },

  {
    name: "IMG_6260",
    slug: "wallenstein-garden",
    place: "Wallenstein Garden, Prague",
    alt: "Bronze statues along a clipped hedge garden, the palace loggia on the left and Prague Castle on the ridge above",
    weight: "half",
  },
  {
    name: "IMG_6266",
    slug: "lunch-with-a-coke",
    place: "Prague", // CHECK
    alt: "Hands at a restaurant table cutting into a breaded schnitzel with lemon, a glass bottle of cola beside the plate",
    weight: "half",
  },

  {
    name: "IMG_5775",
    slug: "carriage-on-the-cobbles",
    place: "Dresden",
    alt: "A horse drawn carriage on cobblestones between the Residenzschloss and the Fürstenzug mural",
    weight: "third",
  },
  {
    name: "IMG_6470",
    slug: "pallas-athena",
    place: "Parliament, Vienna",
    alt: "The Pallas Athena statue backlit against the sun, spear raised, the Austrian flag flying behind",
    weight: "third",
  },
  {
    name: "IMG_6540",
    slug: "light-on-the-pulpit",
    place: "Vienna", // CHECK
    alt: "A shaft of window light falling across a carved stone pulpit in a dark Gothic nave",
    weight: "third",
  },

  {
    name: "IMG_6282",
    slug: "folk-dancers",
    place: "Prague", // CHECK
    alt: "Dancers in embroidered folk costume mid step on an outdoor stage, a Bulgarian flag raised among them",
    weight: "full",
  },

  {
    name: "IMG_6481",
    slug: "athena-fountain-detail",
    place: "Parliament, Vienna",
    alt: "Two reclining marble river figures at the base of the Pallas Athena fountain, water running from a spout",
    weight: "half",
  },
  {
    name: "IMG_6539",
    slug: "rose-window",
    place: "Vienna", // CHECK
    alt: "A brass chandelier hanging in a dark cathedral, the rose window and organ pipes glowing behind it",
    weight: "half",
  },

  {
    name: "IMG_6647",
    slug: "vienna-tram",
    place: "Vienna",
    alt: "A red and white tram at a stop under summer trees, passengers waiting on the pavement",
    weight: "third",
  },
  {
    name: "IMG_6729",
    slug: "matthias-church-roof",
    place: "Matthias Church, Budapest",
    alt: "The patterned Zsolnay tile roof of Matthias Church in raking light, a white stone pinnacle in front",
    weight: "third",
  },
  {
    name: "IMG_6940",
    slug: "corner-house",
    place: "Budapest", // CHECK
    alt: "An ornate corner apartment building with a turret and steep roof, tram wires crossing the grey sky",
    weight: "third",
  },

  {
    name: "IMG_6944",
    slug: "twin-towers-at-dusk",
    place: "Budapest", // CHECK
    alt: "A twin towered baroque church with green copper domes silhouetted against a dusk sky",
    weight: "full",
  },

  {
    name: "IMG_7026",
    slug: "buda-castle-at-night",
    place: "Buda Castle, Budapest",
    alt: "Buda Castle floodlit at night, its dome and long wings glowing above the dark hillside",
    weight: "half",
  },
  {
    name: "IMG_7048",
    slug: "danube-embankment",
    place: "Budapest", // CHECK
    alt: "A lit neo-Renaissance building on the Danube embankment at night, its reflection stretched across the water",
    weight: "half",
  },

  {
    name: "IMG_6157",
    slug: "astronomical-clock",
    place: "Old Town Hall, Prague",
    alt: "The astronomical clock face in gold and blue, its dials and zodiac ring set into dark stone",
    weight: "third",
  },
  {
    name: "IMG_6950",
    slug: "clocktower-at-sunset",
    place: "Budapest", // CHECK
    alt: "A baroque clock tower against a pink and orange sunset, rooftops dark in the foreground",
    weight: "third",
  },
  {
    name: "IMG_6976",
    slug: "chain-bridge-at-night",
    place: "Chain Bridge, Budapest",
    alt: "A stone pylon of the Chain Bridge lit from below at night, strings of lamps running away into the dark",
    weight: "third",
  },

  {
    name: "IMG_6652",
    slug: "mozart-monument",
    place: "Burggarten, Vienna",
    alt: "The marble Mozart monument on its carved plinth, lit low against a deep blue sky",
    weight: "full",
  },
];
