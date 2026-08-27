const Listing = require("../models/listing");

// --- Mapbox geocoding (commented out — requires a paid/card-linked API token) ---
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// --- Nominatim (commented out — blocked scripted requests with 403) ---
// async function geocodeLocation(query) {
//     const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
//     const res = await fetch(url, {
//         headers: { "User-Agent": "WanderLust-Project/1.0 (student project; contact: your-email@example.com)" }
//     });
//     if (!res.ok) throw new Error(`Nominatim geocoding failed with status ${res.status}`);
//     const data = await res.json();
//     if (!data.length) throw new Error(`Could not find coordinates for location: "${query}"`);
//     return { type: "Point", coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)] };
// }

// Free geocoding via Photon (Komoot), built on OpenStreetMap data — no API key required
// https://photon.komoot.io/
async function geocodeLocation(query) {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Photon geocoding failed with status ${res.status}`);
    }

    const data = await res.json();
    if (!data.features || !data.features.length) {
        throw new Error(`Could not find coordinates for location: "${query}"`);
    }

    return data.features[0].geometry;
}

module.exports.index = async (req, res) => {
    const { category, search } = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (search) {
        const regex = new RegExp(search, "i");
        filter.$or = [
            { title: regex },
            { location: regex },
            { country: regex },
        ];
    }

    const PAGE_SIZE = 6;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const skip = (page - 1) * PAGE_SIZE;

    const [pageListings, totalCount] = await Promise.all([
        Listing.find(filter).skip(skip).limit(PAGE_SIZE),
        Listing.countDocuments(filter),
    ]);

    const hasMore = skip + pageListings.length < totalCount;

    // AJAX requests (from infinite scroll) get JSON; normal page loads get the full HTML page
    if (req.query.ajax === "true") {
        return res.json({ listings: pageListings, hasMore, nextPage: page + 1 });
    }

    res.render("listings/index", {
        allListings: pageListings,
        category: category || null,
        search: search || "",
        hasMore,
        nextPage: page + 1,
    });
};

module.exports.renderNewForm = (req, res) => {    
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews", 
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    // --- Old Mapbox geocoding call (commented out) ---
    // let response = await geocodingClient
    //     .forwardGeocode({
    //         query: req.body.listing.location,
    //         limit: 1,
    //     })
    //     .send();

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    try {
        newListing.geometry = await geocodeLocation(
            `${req.body.listing.location}, ${req.body.listing.country}`
        );
        // Old Mapbox equivalent was: newListing.geometry = response.body.features[0].geometry;
    } catch (err) {
        console.error("Geocoding error:", err.message);
        req.flash("error", "Couldn't find that location on the map. Please check the location/country and try again.");
        return res.redirect("/listings/new");
    }

    let savedListing = await newListing.save();
    console.log(savedListing);
    
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250"); // Resize for display
    res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    if(!deletedListing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};