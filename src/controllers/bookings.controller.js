import moment from "moment";
import { createBooking, getRoomPrice } from "../repositories/bookings.repo.js";
import { logEvent } from "../repositories/events.repo.js";

export async function create(req, res) {
    try {
        const {
            hotel_id,
            room_id,
            guest_name,
            guest_email,
            check_in,
            check_out,
            num_guests,
        } = req.body;

        const user_id = req.headers["x-user-id"] || "anon";
        const ab_group = req.headers["x-ab-group"] || "A";

        if (!hotel_id || !room_id || !check_in || !check_out) {
            return res.status(400).json({
                error: "Missing required booking details",
            });
        }

        // 🔹 Calculate price
        const pricePerNight = await getRoomPrice(room_id);
        const nights = moment(check_out).diff(moment(check_in), "days");

        if (nights <= 0) {
            return res.status(400).json({
                error: "Invalid check-in / check-out dates",
            });
        }

        const total_price = pricePerNight * nights;

        // 🔹 Create booking
        const bookingId = await createBooking({
            hotel_id,
            room_id,
            guest_name,
            guest_email,
            check_in,
            check_out,
            num_guests,
            total_price,
        });

        // 🔥 Log BOOKING event (strongest signal)
        logEvent({
            user_id,
            hotel_id,
            event_type: "booking",
            ab_group,
        }).catch(() => {});

        res.json({
            success: true,
            booking_id: bookingId,
            nights,
            total_price,
        });

    } catch (error) {
        console.error("❌ Booking failed:", error);
        res.status(500).json({
            error: "Booking failed",
            details: error.message,
        });
    }
}
