using Microsoft.EntityFrameworkCore;
using OnibusExpress.Api.Models;

namespace OnibusExpress.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Trip> Trips => Set<Trip>();

    public DbSet<Reservation> Reservations => Set<Reservation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.ToTable("Trips");

            entity.HasKey(trip => trip.Id);

            entity.Property(trip => trip.Origin)
                .IsRequired()
                .HasMaxLength(120);

            entity.Property(trip => trip.Destination)
                .IsRequired()
                .HasMaxLength(120);

            entity.Property(trip => trip.Duration)
                .IsRequired()
                .HasMaxLength(32);

            entity.Property(trip => trip.Price)
                .HasPrecision(10, 2);

            entity.Property(trip => trip.CompanyCode)
                .IsRequired()
                .HasMaxLength(40);

            entity.HasMany(trip => trip.Reservations)
                .WithOne(reservation => reservation.Trip)
                .HasForeignKey(reservation => reservation.TripId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<Reservation>(entity =>
        {
            entity.ToTable("Reservations");

            entity.HasKey(reservation => reservation.Id);

            entity.Property(reservation => reservation.Code)
                .IsRequired()
                .HasMaxLength(32);

            entity.Property(reservation => reservation.Seat)
                .IsRequired()
                .HasMaxLength(16);

            entity.Property(reservation => reservation.PassengerName)
                .IsRequired()
                .HasMaxLength(160);

            entity.Property(reservation => reservation.PassengerCpf)
                .IsRequired()
                .HasMaxLength(14);

            entity.Property(reservation => reservation.PassengerEmail)
                .IsRequired()
                .HasMaxLength(160);

            entity.Property(reservation => reservation.Status)
                .IsRequired();

            entity.Property(reservation => reservation.CreatedAt)
                .IsRequired();
        });
    }
}
