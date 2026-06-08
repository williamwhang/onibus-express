namespace OnibusExpress.Api.Dtos;

public class CreateReservationRequest
{
    public int TripId { get; set; }

    public string Seat { get; set; } = string.Empty;

    public string PassengerName { get; set; } = string.Empty;

    public string PassengerCpf { get; set; } = string.Empty;

    public string PassengerEmail { get; set; } = string.Empty;
}
