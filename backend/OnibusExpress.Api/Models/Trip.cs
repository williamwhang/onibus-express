namespace OnibusExpress.Api.Models;

public class Trip
{
    public int Id { get; set; }

    public string Origin { get; set; } = string.Empty;

    public string Destination { get; set; } = string.Empty;

    public TimeSpan DepartureTime { get; set; }

    public TimeSpan ArrivalTime { get; set; }

    public string Duration { get; set; } = string.Empty;

    public DateOnly Date { get; set; }

    public decimal Price { get; set; }

    public string CompanyCode { get; set; } = string.Empty;

    public int SeatsAvailable { get; set; }

    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}
