import moment from "moment";
import { getRoomPriceById } from "../repositories/rooms.repo.js";
import { createBooking } from "../repositories/bookings.repo.js";

export async function createNewBooking(body) {
    const { hotel_id, room_id, guest_name, guest_email, check_in, check_out, num_guests } = body;

    const room = await getRoomPriceById(room_id);
    if (!room) {
        const err = new Error("Room not found");
        err.statusCode = 404;
        throw err;
    }

    const nights = moment(check_out).diff(moment(check_in), "days");
    if (!nights || nights <= 0) {
        const err = new Error("Invalid dates: check_out must be after check_in");
        err.statusCode = 400;
        throw err;
    }

    const total_price = Number(room.price_per_night) * nights;

    const booking_id = await createBooking({
        hotel_id,
        room_id,
        guest_name,
        guest_email,
        check_in,
        check_out,
        num_guests,
        total_price,
    });

    return { booking_id, total_price, nights };
}
