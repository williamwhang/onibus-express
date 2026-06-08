using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using OnibusExpress.Api.Data;
using OnibusExpress.Api.Dtos;

namespace OnibusExpress.Api.Services;

public class TripService(AppDbContext dbContext)
{
    public async Task<IReadOnlyList<TripResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Trips
            .AsNoTracking()
            .OrderBy(trip => trip.Date)
            .ThenBy(trip => trip.DepartureTime)
            .Select(MapToResponse())
            .ToListAsync(cancellationToken);
    }

    public async Task<TripResponse?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await dbContext.Trips
            .AsNoTracking()
            .Where(trip => trip.Id == id)
            .Select(MapToResponse())
            .FirstOrDefaultAsync(cancellationToken);
    }

    private static Expression<Func<Models.Trip, TripResponse>> MapToResponse()
    {
        return trip => new TripResponse
        {
            Id = trip.Id,
            Origin = trip.Origin,
            Destination = trip.Destination,
            DepartureTime = trip.DepartureTime,
            ArrivalTime = trip.ArrivalTime,
            Duration = trip.Duration,
            Date = trip.Date,
            Price = trip.Price,
            CompanyCode = trip.CompanyCode,
            SeatsAvailable = trip.SeatsAvailable,
        };
    }
}
