export function buildHotelDocument(hotel) {
    return `
        Hotel name: ${hotel.name}
        Location: ${hotel.city}, ${hotel.country}
        Type: ${hotel.hotel_type}
        Price per night: ${hotel.price_per_night}
        Star rating: ${hotel.star_rating}
        Amenities: ${(hotel.amenities || []).join(", ")}
        Description: ${hotel.description}
        Best for: ${hotel.hotel_type} travellers
    `;
}
