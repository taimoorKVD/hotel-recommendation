export function generateHotelData() {
    const cities = [
        { name: "New York", country: "USA", lat: 40.7128, lng: -74.0060 },
        { name: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
        { name: "Paris", country: "France", lat: 48.8566, lng: 2.3522 },
        { name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
        { name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
        { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
        { name: "Barcelona", country: "Spain", lat: 41.3851, lng: 2.1734 },
        { name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
        { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
        { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
        { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784 },
        { name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
        { name: "Miami", country: "USA", lat: 25.7617, lng: -80.1918 },
        { name: "Los Angeles", country: "USA", lat: 34.0522, lng: -118.2437 },
        { name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
    ];

    const hotelTypes = ["Luxury", "Business", "Budget", "Boutique", "Resort", "Family"];

    const amenitiesList = [
        "Free WiFi", "Swimming Pool", "Gym", "Spa", "Restaurant", "Bar",
        "Room Service", "Parking", "Airport Shuttle", "Pet Friendly",
        "Business Center", "Conference Rooms", "Concierge", "Laundry Service",
    ];

    const hotels = [];

    cities.forEach((city) => {
        for (let i = 0; i < 8; i++) {
            const hotelType = hotelTypes[Math.floor(Math.random() * hotelTypes.length)];
            const starRating = (Math.random() * 2 + 3).toFixed(1);
            const basePrice =
                hotelType === "Luxury" ? 300 : hotelType === "Budget" ? 50 : 150;
            const priceVariation = Math.floor(Math.random() * 100);

            const selectedAmenities = [...amenitiesList]
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.floor(Math.random() * 8) + 5);

            hotels.push({
                name: `${hotelType} ${city.name} Hotel ${i + 1}`,
                description: `Experience ${hotelType.toLowerCase()} accommodation in the heart of ${city.name}. Perfect for both business and leisure travelers seeking comfort and convenience.`,
                city: city.name,
                country: city.country,
                address: `${100 + i} Main Street, ${city.name}`,
                star_rating: parseFloat(starRating),
                price_per_night: basePrice + priceVariation,
                amenities: selectedAmenities,
                hotel_type: hotelType,
                image_url: `https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800`,
                latitude: city.lat + (Math.random() - 0.5) * 0.1,
                longitude: city.lng + (Math.random() - 0.5) * 0.1,
                rooms: [
                    {
                        room_type: "Standard Room",
                        capacity: 2,
                        price_per_night: basePrice + priceVariation,
                        available_rooms: Math.floor(Math.random() * 20) + 10,
                        room_amenities: ["TV", "WiFi", "Air Conditioning", "Mini Bar"],
                    },
                    {
                        room_type: "Deluxe Room",
                        capacity: 3,
                        price_per_night: basePrice + priceVariation + 50,
                        available_rooms: Math.floor(Math.random() * 15) + 5,
                        room_amenities: ["TV", "WiFi", "Air Conditioning", "Mini Bar", "Balcony", "Safe"],
                    },
                    {
                        room_type: "Suite",
                        capacity: 4,
                        price_per_night: basePrice + priceVariation + 150,
                        available_rooms: Math.floor(Math.random() * 10) + 3,
                        room_amenities: ["TV", "WiFi", "Air Conditioning", "Mini Bar", "Balcony", "Safe", "Kitchen", "Living Room"],
                    },
                ],
            });
        }
    });

    return hotels;
}
