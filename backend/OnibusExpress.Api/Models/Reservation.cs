namespace OnibusExpress.Api.Models;

public class Reservation
{
    public int Id { get; set; }

    public string Code { get; set; } = string.Empty;

    public int TripId { get; set; }

    public Trip Trip { get; set; } = null!;

    public string Seat { get; set; } = string.Empty;

    public string PassengerName { get; set; } = string.Empty;

    public string PassengerCpf { get; set; } = string.Empty;

    public string PassengerEmail { get; set; } = string.Empty;

    public ReservationStatus Status { get; set; } = ReservationStatus.Confirmada;

    public DateTime CreatedAt { get; set; }
}
