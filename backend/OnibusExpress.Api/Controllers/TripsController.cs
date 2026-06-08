using Microsoft.AspNetCore.Mvc;
using OnibusExpress.Api.Dtos;
using OnibusExpress.Api.Services;

namespace OnibusExpress.Api.Controllers;

[ApiController]
[Route("api/viagens")]
public class TripsController(TripService tripService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<IReadOnlyList<TripResponse>>(StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<TripResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var trips = await tripService.GetAllAsync(cancellationToken);
        return Ok(trips);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType<TripResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TripResponse>> GetById(int id, CancellationToken cancellationToken)
    {
        var trip = await tripService.GetByIdAsync(id, cancellationToken);

        if (trip is null)
        {
            return NotFound();
        }

        return Ok(trip);
    }
}
