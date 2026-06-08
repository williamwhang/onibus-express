using Microsoft.EntityFrameworkCore;
using OnibusExpress.Api.Models;

namespace OnibusExpress.Api.Data;

public class DatabaseSeeder(AppDbContext dbContext)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        await dbContext.Database.EnsureCreatedAsync(cancellationToken);

        if (await dbContext.Trips.AnyAsync(cancellationToken))
        {
            return;
        }

        var trips = new[]
        {
            new Trip
            {
                Origin = "São Paulo",
                Destination = "Rio de Janeiro",
                DepartureTime = new TimeSpan(6, 0, 0),
                ArrivalTime = new TimeSpan(12, 0, 0),
                Duration = "6h",
                Date = new DateOnly(2026, 6, 7),
                Price = 89.90m,
                CompanyCode = "COME0600",
                SeatsAvailable = 28,
            },
            new Trip
            {
                Origin = "São Paulo",
                Destination = "Rio de Janeiro",
                DepartureTime = new TimeSpan(8, 30, 0),
                ArrivalTime = new TimeSpan(14, 30, 0),
                Duration = "6h",
                Date = new DateOnly(2026, 6, 7),
                Price = 129.90m,
                CompanyCode = "ITAP0830",
                SeatsAvailable = 34,
            },
            new Trip
            {
                Origin = "São Paulo",
                Destination = "Rio de Janeiro",
                DepartureTime = new TimeSpan(12, 0, 0),
                ArrivalTime = new TimeSpan(18, 0, 0),
                Duration = "6h",
                Date = new DateOnly(2026, 6, 7),
                Price = 79.50m,
                CompanyCode = "UTIL1200",
                SeatsAvailable = 3,
            },
            new Trip
            {
                Origin = "São Paulo",
                Destination = "Rio de Janeiro",
                DepartureTime = new TimeSpan(23, 0, 0),
                ArrivalTime = new TimeSpan(5, 0, 0),
                Duration = "6h",
                Date = new DateOnly(2026, 6, 7),
                Price = 179.90m,
                CompanyCode = "ITAP2300",
                SeatsAvailable = 8,
            },
        };

        await dbContext.Trips.AddRangeAsync(trips, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
