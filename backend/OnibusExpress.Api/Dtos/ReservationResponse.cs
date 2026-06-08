using OnibusExpress.Api.Models;

namespace OnibusExpress.Api.Dtos;

public class ReservationResponse
{
    public string Code { get; set; } = string.Empty;

    public ReservationStatus Status { get; set; }

    public string Seat { get; set; } = string.Empty;

    public string PassengerName { get; set; } = string.Empty;

    public string PassengerCpf { get; set; } = string.Empty;

    public string PassengerEmail { get; set; } = string.Empty;

    public TripResponse Trip { get; set; } = new();

    public decimal Total { get; set; }
}
