const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.ATLASDB_URL;

if (!MONGO_URL) {
    console.error("ATLASDB_URL is not set — check your .env file.");
    process.exit(1);
}

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

// Free geocoding via Photon (Komoot) — no API key required
async function geocodeLocation(query) {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Photon geocoding failed with status ${res.status}`);
    }

    const data = await res.json();
    if (!data.features || !data.features.length) {
        throw new Error(`Could not find coordinates for: "${query}"`);
    }

    return data.features[0].geometry;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Sample data has no category field, so infer a reasonable one from the title/description.
const categoryKeywords = {
    "Boats": ["houseboat", "boat", "yacht"],
    "Castles": ["castle", "villa", "palace"],
    "Arctic": ["arctic", "igloo", "snow", "ice"],
    "Domes": ["dome"],
    "Amazing Pools": ["pool"],
    "Camping": ["camp", "tent", "treehouse"],
    "Farms": ["farm", "ranch"],
    "Mountains": ["mountain", "cabin", "chalet", "lake"],
    "Iconic cities": ["loft", "downtown", "apartment", "city"],
};

function inferCategory(listing) {
    const text = `${listing.title} ${listing.description}`.toLowerCase();
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some((kw) => text.includes(kw))) {
            return category;
        }
    }
    return "Rooms"; // sensible default
}

const initDB = async () => {
    await Listing.deleteMany({});

    const owner = await User.findOne();

    if (!owner) {
        throw new Error("No user found. Create an account before running the seed script.");
    }

    const geocodedListings = [];
    for (const obj of initData.data) {
        const category = inferCategory(obj);
        try {
            const geometry = await geocodeLocation(`${obj.location}, ${obj.country}`);
            geocodedListings.push({
                ...obj,
                owner: '6a8faa41fc9c8890939f0aff', // your real user's _id
                geometry,
                category,
            });
            console.log(`Geocoded: ${obj.title} -> ${obj.location} [${category}]`);
        } catch (err) {
            console.error(`Skipping "${obj.title}" — geocoding failed: ${err.message}`);
        }
        await sleep(1100); // be polite to the free public API
    }

    await Listing.insertMany(geocodedListings);
    console.log(`data was initialized (${geocodedListings.length}/${initData.data.length} listings)`);
}

initDB();